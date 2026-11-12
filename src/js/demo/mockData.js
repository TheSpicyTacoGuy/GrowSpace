/**
 * Seed data for demo mode. Everything here is fictional sample content used
 * when the app runs without Firebase credentials.
 */

export const DEMO_USER = {
  uid: "demo-gardener",
  displayName: "Alex Gardener",
  email: "alex@growspace.demo",
  photoURL: null,
  emailVerified: true,
  providerData: [],
};

const UID = DEMO_USER.uid;

const DAY = 24 * 60 * 60 * 1000;

function daysAgo(days) {
  return new Date(Date.now() - days * DAY);
}

function plant({
  id,
  name,
  type,
  greenhouseId,
  waterFrequency,
  fertiliseFrequency,
  lastWatered,
  lastFertilised,
  created,
  status,
  notes,
  care,
}) {
  const lastWateredOn = daysAgo(lastWatered);
  const wateringDate = new Date(
    lastWateredOn.getTime() + waterFrequency * DAY
  );

  return [
    `${UID_PATH}/plants/${id}`,
    {
      id,
      userId: UID,
      name,
      type,
      greenhouseId,
      notes: notes ?? "",
      waterFrequency,
      fertiliseFrequency,
      wateringSchedule: scheduleLabel(waterFrequency),
      lastWatered: lastWateredOn,
      lastFertilised: daysAgo(lastFertilised),
      wateringDate,
      status,
      careEvents: (care ?? []).map(([eventType, days]) => ({
        type: eventType,
        timestamp: daysAgo(days),
      })),
      createdAt: daysAgo(created),
      updatedAt: daysAgo(lastWatered),
    },
  ];
}

function scheduleLabel(days) {
  const labels = {
    1: "Every day",
    2: "Every 2 days",
    3: "Every 3 days",
    5: "Every 5 days",
    7: "Weekly",
    14: "Every 2 weeks",
    21: "Every 3 weeks",
    30: "Monthly",
  };
  return labels[days] ?? `Every ${days} days`;
}

const UID_PATH = `userData/${UID}`;

const GREENHOUSE_SEEDS = [
  {
    id: "backyard-tunnel",
    name: "Backyard Greenhouse",
    description:
      "Polycarbonate tunnel that keeps tomatoes, chillies and basil productive right through winter.",
    size: 12,
    location: "Backyard",
    created: 210,
  },
  {
    id: "kitchen-shelf",
    name: "Kitchen Herb Shelf",
    description:
      "Tiered shelf by the north-facing window for the herbs that get used every day.",
    size: 3,
    location: "Kitchen",
    created: 150,
  },
  {
    id: "balcony-planter",
    name: "Balcony Planter Box",
    description:
      "Sun-baked planter box on the balcony, home to the succulents and the lemon tree.",
    size: 5,
    location: "Balcony",
    created: 96,
  },
];

const PLANT_SEEDS = [
  {
    id: "roma-tomato",
    name: "Roma Tomato",
    type: "Vegetable",
    greenhouseId: "backyard-tunnel",
    waterFrequency: 2,
    fertiliseFrequency: 14,
    lastWatered: 4,
    lastFertilised: 9,
    created: 204,
    status: "needs water",
    notes: "Two trusses setting fruit. Pinch out the laterals each weekend.",
    care: [
      ["Watered", 4],
      ["Pruned", 6],
      ["Fertilised", 9],
      ["Watered", 11],
    ],
  },
  {
    id: "genovese-basil",
    name: "Genovese Basil",
    type: "Herb",
    greenhouseId: "backyard-tunnel",
    waterFrequency: 2,
    fertiliseFrequency: 21,
    lastWatered: 1,
    lastFertilised: 12,
    created: 188,
    status: "healthy",
    notes: "Keep pinching the flower tips to hold the leaf flavour.",
    care: [
      ["Watered", 1],
      ["Pruned", 5],
      ["Fertilised", 12],
    ],
  },
  {
    id: "birds-eye-chilli",
    name: "Bird's Eye Chilli",
    type: "Vegetable",
    greenhouseId: "backyard-tunnel",
    waterFrequency: 3,
    fertiliseFrequency: 30,
    lastWatered: 0,
    lastFertilised: 20,
    created: 176,
    status: "growing",
    care: [
      ["Watered", 0],
      ["Fertilised", 20],
    ],
  },
  {
    id: "sweet-mint",
    name: "Sweet Mint",
    type: "Herb",
    greenhouseId: "kitchen-shelf",
    waterFrequency: 2,
    fertiliseFrequency: 30,
    lastWatered: 5,
    lastFertilised: 25,
    created: 143,
    status: "needs water",
    notes: "Dropping leaves in the dry air — move it away from the heater.",
    care: [
      ["Watered", 5],
      ["Pruned", 9],
      ["Watered", 7],
    ],
  },
  {
    id: "italian-parsley",
    name: "Italian Parsley",
    type: "Herb",
    greenhouseId: "kitchen-shelf",
    waterFrequency: 3,
    fertiliseFrequency: 21,
    lastWatered: 2,
    lastFertilised: 16,
    created: 138,
    status: "healthy",
  },
  {
    id: "echeveria-elegans",
    name: "Echeveria Elegans",
    type: "Succulent",
    greenhouseId: "balcony-planter",
    waterFrequency: 14,
    fertiliseFrequency: 60,
    lastWatered: 11,
    lastFertilised: 52,
    created: 90,
    status: "healthy",
    notes: "Rosette is tight and even — the south light is doing its job.",
  },
  {
    id: "meyer-lemon",
    name: "Meyer Lemon",
    type: "Tree",
    greenhouseId: "balcony-planter",
    waterFrequency: 7,
    fertiliseFrequency: 30,
    lastWatered: 3,
    lastFertilised: 41,
    created: 84,
    status: "growing",
    notes: "Six fruit on the tree. Citrus feed is overdue.",
  },
  {
    id: "boston-fern",
    name: "Boston Fern",
    type: "Fern",
    greenhouseId: null,
    waterFrequency: 3,
    fertiliseFrequency: 30,
    lastWatered: 1,
    lastFertilised: 18,
    created: 60,
    status: "healthy",
    notes: "Waiting on the hanging bracket before it moves to the bathroom.",
  },
];

const TIP_SEEDS = [
  {
    id: "tip-water-at-the-base",
    content:
      "Water tomatoes at the base of the stem rather than over the leaves. Wet foliage overnight is the quickest way to bring on blight, and the roots get far more of the water.",
    author: "Priya Raman",
    authorId: "gardener-priya",
    authorRole: "admin",
    likes: 24,
    likedBy: ["gardener-priya", "gardener-sam", "gardener-lee", UID],
    hoursAgo: 6,
  },
  {
    id: "tip-mulch-moisture",
    content:
      "A layer of sugarcane mulch about five centimetres thick keeps the soil in a greenhouse far steadier through a hot afternoon. You water less, and the plants stop sulking at 3pm.",
    author: "Sam Whitlock",
    authorId: "gardener-sam",
    authorRole: "user",
    likes: 17,
    likedBy: ["gardener-sam", "gardener-lee", UID],
    hoursAgo: 30,
  },
  {
    id: "tip-aphid-check",
    content:
      "Check the underside of new leaves once a week for aphids. Catching a small colony early means a soapy water spray does the job, instead of losing the whole tip growth.",
    author: "Alex Gardener",
    authorId: UID,
    authorRole: "user",
    likes: 11,
    likedBy: [UID, "gardener-priya", "gardener-lee"],
    hoursAgo: 52,
  },
  {
    id: "tip-quarter-turn",
    content:
      "Turn potted plants a quarter turn every Sunday. They grow evenly instead of leaning hard into the light, which matters for anything you want to photograph or give away.",
    author: "Lee Nguyen",
    authorId: "gardener-lee",
    authorRole: "user",
    likes: 9,
    likedBy: ["gardener-lee", UID],
    hoursAgo: 74,
  },
  {
    id: "tip-morning-watering",
    content:
      "Batch your watering into the morning. Foliage that stays damp overnight invites mildew, and the plants take up more water before the heat of the day arrives.",
    author: "Priya Raman",
    authorId: "gardener-priya",
    authorRole: "admin",
    likes: 31,
    likedBy: ["gardener-priya", "gardener-sam", UID],
    hoursAgo: 96,
  },
];

const COMMENT_SEEDS = [
  {
    tipId: "tip-water-at-the-base",
    id: "comment-base-1",
    content:
      "Started doing this last season and it cut the leaf spot problems right down.",
    author: "Sam Whitlock",
    authorId: "gardener-sam",
    authorRole: "user",
    likes: 4,
    likedBy: ["gardener-sam", UID],
    hoursAgo: 4,
  },
  {
    tipId: "tip-water-at-the-base",
    id: "comment-base-2",
    content:
      "A drip line makes it effortless if you have more than a handful of plants.",
    author: "Lee Nguyen",
    authorId: "gardener-lee",
    authorRole: "user",
    likes: 2,
    likedBy: ["gardener-lee"],
    hoursAgo: 2,
  },
  {
    tipId: "tip-mulch-moisture",
    id: "comment-mulch-1",
    content: "Does lucerne hay work as well as sugarcane?",
    author: "Alex Gardener",
    authorId: UID,
    authorRole: "user",
    likes: 1,
    likedBy: [UID],
    hoursAgo: 20,
  },
];

function hoursAgo(hours) {
  return new Date(Date.now() - hours * 60 * 60 * 1000);
}

export function createSeedDocuments() {
  const documents = [];

  documents.push([
    UID_PATH,
    {
      displayName: DEMO_USER.displayName,
      email: DEMO_USER.email,
      role: "user",
      createdAt: daysAgo(212),
    },
  ]);

  documents.push([
    `${UID_PATH}/userPreferences/notifications`,
    {
      notifiedPlants: [],
      updatedAt: daysAgo(1),
    },
  ]);

  const plantsByGreenhouse = new Map();

  for (const seed of PLANT_SEEDS) {
    const [path, data] = plant(seed);
    documents.push([path, data]);

    if (seed.greenhouseId) {
      const list = plantsByGreenhouse.get(seed.greenhouseId) ?? [];
      list.push(seed.id);
      plantsByGreenhouse.set(seed.greenhouseId, list);
    }
  }

  for (const greenhouse of GREENHOUSE_SEEDS) {
    documents.push([
      `${UID_PATH}/greenhouses/${greenhouse.id}`,
      {
        id: greenhouse.id,
        name: greenhouse.name,
        description: greenhouse.description,
        size: greenhouse.size,
        location: greenhouse.location,
        plants: plantsByGreenhouse.get(greenhouse.id) ?? [],
        createdAt: daysAgo(greenhouse.created),
        updatedAt: daysAgo(greenhouse.created - 20),
      },
    ]);
  }

  documents.push([
    `${UID_PATH}/notifications/notification-water-tomato`,
    {
      title: "Plant needs water!",
      body: "Roma Tomato needs watering.",
      type: "water",
      plantId: "roma-tomato",
      plantName: "Roma Tomato",
      read: false,
      createdAt: hoursAgo(5),
    },
  ]);

  documents.push([
    `${UID_PATH}/notifications/notification-fertilise-lemon`,
    {
      title: "Plant needs fertiliser!",
      body: "Meyer Lemon needs fertilising.",
      type: "fertiliser",
      plantId: "meyer-lemon",
      plantName: "Meyer Lemon",
      read: false,
      createdAt: hoursAgo(9),
    },
  ]);

  documents.push([
    `${UID_PATH}/notifications/notification-water-mint`,
    {
      title: "Plant needs water!",
      body: "Sweet Mint needs watering.",
      type: "water",
      plantId: "sweet-mint",
      plantName: "Sweet Mint",
      read: true,
      createdAt: hoursAgo(28),
    },
  ]);

  for (const tip of TIP_SEEDS) {
    documents.push([
      `tips/${tip.id}`,
      {
        content: tip.content,
        author: tip.author,
        authorId: tip.authorId,
        authorRole: tip.authorRole,
        createdAt: hoursAgo(tip.hoursAgo),
        likes: tip.likes,
        likedBy: tip.likedBy,
      },
    ]);
  }

  for (const comment of COMMENT_SEEDS) {
    documents.push([
      `tips/${comment.tipId}/comments/${comment.id}`,
      {
        content: comment.content,
        author: comment.author,
        authorId: comment.authorId,
        authorRole: comment.authorRole,
        createdAt: hoursAgo(comment.hoursAgo),
        likes: comment.likes,
        likedBy: comment.likedBy,
      },
    ]);
  }

  return documents;
}
