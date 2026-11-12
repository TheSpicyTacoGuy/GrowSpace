/**
 * In-memory stand-in for the Firebase Firestore SDK.
 *
 * Vite aliases `firebase/firestore` to this module when the project has no
 * Firebase credentials (see `demoMode` in vite.config.js), so the app can be
 * run and demonstrated without a backend. Only the subset of the API that
 * GrowSpace actually imports is implemented.
 */
import { createSeedDocuments } from "./mockData.js";

// "collection/.../docId" -> plain data object
const store = new Map();

let idCounter = 0;

function createId() {
  idCounter += 1;
  return `demo${idCounter.toString(36).padStart(3, "0")}${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

function toPath(parts) {
  return parts
    .flatMap((part) => (part == null ? [] : String(part).split("/")))
    .filter(Boolean)
    .join("/");
}

export function getFirestore() {
  return { type: "firestore", name: "GrowSpace demo" };
}

/**
 * Mirrors `firebase/firestore`'s Timestamp, which the app relies on for
 * `.seconds` and `.toDate()`.
 */
export class Timestamp {
  constructor(date) {
    this._date = date instanceof Date ? date : new Date(date);
  }

  get seconds() {
    return Math.floor(this._date.getTime() / 1000);
  }

  get nanoseconds() {
    return (this._date.getTime() % 1000) * 1e6;
  }

  toDate() {
    return new Date(this._date.getTime());
  }

  toMillis() {
    return this._date.getTime();
  }

  valueOf() {
    return this._date.getTime();
  }

  isEqual(other) {
    return other instanceof Timestamp && other.toMillis() === this.toMillis();
  }
}

export function doc(parent, ...pathParts) {
  if (parent && parent.type === "collection") {
    const id = pathParts.length ? toPath(pathParts) : createId();
    return makeDocRef(`${parent.path}/${id}`);
  }
  return makeDocRef(toPath(pathParts));
}

export function collection(parent, ...pathParts) {
  if (parent && parent.type === "collection") {
    return makeCollectionRef(`${parent.path}/${toPath(pathParts)}`);
  }
  return makeCollectionRef(toPath(pathParts));
}

function makeDocRef(path) {
  const segments = path.split("/");
  return { type: "doc", path, id: segments[segments.length - 1] };
}

function makeCollectionRef(path) {
  const segments = path.split("/");
  return { type: "collection", path, id: segments[segments.length - 1] };
}

export function query(reference, ...constraints) {
  const base =
    reference.type === "query" ? reference.reference : reference;

  return {
    type: "query",
    reference: base,
    constraints: [
      ...(reference.type === "query" ? reference.constraints : []),
      ...constraints,
    ],
  };
}

export function where(field, op, value) {
  return { kind: "where", field, op, value };
}

export function orderBy(field, direction = "asc") {
  return { kind: "orderBy", field, direction };
}

export function limit(count) {
  return { kind: "limit", count };
}

export function startAfter(cursor) {
  return { kind: "startAfter", cursor };
}

export function serverTimestamp() {
  return { _methodName: "serverTimestamp" };
}

export function arrayUnion(...elements) {
  return { _methodName: "arrayUnion", elements };
}

export function arrayRemove(...elements) {
  return { _methodName: "arrayRemove", elements };
}

function normalise(value) {
  return value instanceof Date ? value.getTime() : value;
}

function matchesWhere(data, constraint) {
  const value = data[constraint.field];

  switch (constraint.op) {
    case "==":
    case "===":
      return (
        value === constraint.value ||
        (value == null && constraint.value == null)
      );
    case "!=":
      return !(value === constraint.value);
    case "<":
      return normalise(value) < normalise(constraint.value);
    case "<=":
      return normalise(value) <= normalise(constraint.value);
    case ">":
      return normalise(value) > normalise(constraint.value);
    case ">=":
      return normalise(value) >= normalise(constraint.value);
    case "in":
      return constraint.value.includes(value);
    case "not-in":
      return !constraint.value.includes(value);
    case "array-contains":
      return Array.isArray(value) && value.includes(constraint.value);
    case "array-contains-any":
      return (
        Array.isArray(value) &&
        value.some((item) => constraint.value.includes(item))
      );
    default:
      throw new Error(`Unsupported where() operator: ${constraint.op}`);
  }
}

function compareDocuments(a, b, orders) {
  for (const order of orders) {
    const left = normalise(a.data[order.field]);
    const right = normalise(b.data[order.field]);

    if (left === right) {
      continue;
    }
    if (left == null) {
      return 1;
    }
    if (right == null) {
      return -1;
    }

    const result = left < right ? -1 : 1;
    return order.direction === "desc" ? -result : result;
  }
  return 0;
}

function readCollection(collectionPath) {
  const prefix = `${collectionPath}/`;
  const entries = [];

  for (const [path, data] of store.entries()) {
    if (!path.startsWith(prefix)) {
      continue;
    }
    const remainder = path.slice(prefix.length);
    if (remainder.includes("/")) {
      continue;
    }
    entries.push({ id: remainder, path, data });
  }

  return entries;
}

function toReadValue(value) {
  if (value instanceof Date) {
    return new Timestamp(value);
  }
  return value;
}

function copyData(data) {
  const copy = {};
  for (const [key, value] of Object.entries(data)) {
    copy[key] = Array.isArray(value)
      ? value.map(toReadValue)
      : toReadValue(value);
  }
  return copy;
}

function makeDocSnapshot(path) {
  const data = store.get(path);
  return {
    id: path.split("/").pop(),
    ref: makeDocRef(path),
    exists: () => data !== undefined,
    data: () => (data === undefined ? undefined : copyData(data)),
    get: (field) => (data === undefined ? undefined : toReadValue(data[field])),
  };
}

function toStorageValue(value) {
  return value instanceof Timestamp ? value.toDate() : value;
}

function resolveWrites(existing, data) {
  const resolved = {};

  for (const [key, value] of Object.entries(data)) {
    if (value && value._methodName) {
      const current = existing?.[key];

      switch (value._methodName) {
        case "serverTimestamp":
          resolved[key] = new Date();
          break;
        case "arrayUnion": {
          const list = Array.isArray(current) ? current : [];
          resolved[key] = [
            ...list,
            ...value.elements.filter((item) => !list.includes(item)),
          ];
          break;
        }
        case "arrayRemove": {
          const list = Array.isArray(current) ? current : [];
          resolved[key] = list.filter((item) => !value.elements.includes(item));
          break;
        }
        default:
          resolved[key] = toStorageValue(value);
      }
      continue;
    }

    resolved[key] = toStorageValue(value);
  }

  return resolved;
}

export async function getDoc(reference) {
  return makeDocSnapshot(reference.path);
}

export async function getDocs(reference) {
  const collectionPath =
    reference.type === "collection" ? reference.path : reference.reference.path;
  const constraints = reference.type === "query" ? reference.constraints : [];

  const filters = constraints.filter((item) => item.kind === "where");
  const orders = constraints.filter((item) => item.kind === "orderBy");
  const maximum = constraints.find((item) => item.kind === "limit");
  const cursor = constraints.find((item) => item.kind === "startAfter");

  let entries = readCollection(collectionPath).filter((entry) =>
    filters.every((filter) => matchesWhere(entry.data, filter))
  );

  if (orders.length) {
    entries.sort((a, b) => compareDocuments(a, b, orders));
  }

  if (cursor?.cursor) {
    const index = entries.findIndex((entry) => entry.id === cursor.cursor.id);
    if (index !== -1) {
      entries = entries.slice(index + 1);
    }
  }

  if (maximum) {
    entries = entries.slice(0, maximum.count);
  }

  const docs = entries.map((entry) => makeDocSnapshot(entry.path));

  return {
    docs,
    size: docs.length,
    empty: docs.length === 0,
    forEach: (callback) => docs.forEach(callback),
  };
}

export async function setDoc(reference, data, options = {}) {
  const existing = store.get(reference.path);
  const resolved = resolveWrites(existing, data);
  store.set(
    reference.path,
    options.merge ? { ...existing, ...resolved } : resolved
  );
}

export async function updateDoc(reference, data) {
  const existing = store.get(reference.path) ?? {};
  store.set(reference.path, { ...existing, ...resolveWrites(existing, data) });
}

export async function addDoc(reference, data) {
  const newReference = makeDocRef(`${reference.path}/${createId()}`);
  store.set(newReference.path, resolveWrites(undefined, data));
  return newReference;
}

export async function deleteDoc(reference) {
  store.delete(reference.path);
}

export function writeBatch() {
  const operations = [];

  return {
    set(reference, data, options) {
      operations.push(() => setDoc(reference, data, options));
    },
    update(reference, data) {
      operations.push(() => updateDoc(reference, data));
    },
    delete(reference) {
      operations.push(() => deleteDoc(reference));
    },
    async commit() {
      for (const operation of operations) {
        await operation();
      }
      operations.length = 0;
    },
  };
}

for (const [path, data] of createSeedDocuments()) {
  store.set(path, data);
}
