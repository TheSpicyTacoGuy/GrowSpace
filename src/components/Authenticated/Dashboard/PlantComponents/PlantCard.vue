<script setup>
import { computed, ref, onMounted, watch } from "vue";

const props = defineProps({
  plant: {
    type: Object,
    required: true,
  },
  greenhouse: {
    type: Object,
    default: null,
  },
  onDelete: {
    type: Function,
    required: true,
  },
  onWater: {
    type: Function,
    required: true,
  },
  onFertilise: {
    type: Function,
    required: true,
  },
  onUpdate: {
    type: Function,
    required: true,
  },
});

// Common plant types for the dropdown - same as in AddPlantModal
const plantTypes = [
  { value: "", label: "Select a plant type" },
  { value: "Flowering Plant", label: "Flowering Plant" },
  { value: "Vegetable", label: "Vegetable" },
  { value: "Herb", label: "Herb" },
  { value: "Succulent", label: "Succulent" },
  { value: "Cactus", label: "Cactus" },
  { value: "Tree", label: "Tree" },
  { value: "Shrub", label: "Shrub" },
  { value: "Vine", label: "Vine" },
  { value: "Fern", label: "Fern" },
  { value: "Ornamental Grass", label: "Ornamental Grass" },
  { value: "Aquatic Plant", label: "Aquatic Plant" },
  { value: "Bulb", label: "Bulb" },
  { value: "Other", label: "Other" },
];

// For editing mode - type
const isEditingType = ref(false);
const selectedType = ref("");

// For editing mode - notes
const isEditingNotes = ref(false);
const editedNotes = ref("");

// Initialize selected type when editing starts
const startEditingType = () => {
  selectedType.value = props.plant.type || "";
  isEditingType.value = true;
};

// Save type change
const saveTypeChange = () => {
  if (selectedType.value !== props.plant.type) {
    props.onUpdate(props.plant.id, { type: selectedType.value });
  }
  isEditingType.value = false;
};

// Cancel type editing
const cancelTypeEditing = () => {
  isEditingType.value = false;
};

// Start editing notes
const startEditingNotes = () => {
  editedNotes.value = props.plant.notes || "";
  isEditingNotes.value = true;
};

// Save notes changes
const saveNotesChange = () => {
  // Only update if changed
  if (editedNotes.value !== props.plant.notes) {
    props.onUpdate(props.plant.id, { notes: editedNotes.value });
  }
  isEditingNotes.value = false;
};

// Cancel notes editing
const cancelNotesEditing = () => {
  isEditingNotes.value = false;
};

const lastWateredFormatted = computed(() => {
  if (!props.plant.lastWatered) return "Never";

  try {
    // Handle Firestore timestamp (has seconds property)
    if (props.plant.lastWatered.seconds) {
      return new Date(
        props.plant.lastWatered.seconds * 1000
      ).toLocaleDateString();
    }

    // Handle serverTimestamp() that hasn't been committed yet
    if (props.plant.lastWatered.type === "server_timestamp") {
      return new Date().toLocaleDateString();
    }

    // Handle JavaScript Date object
    if (props.plant.lastWatered instanceof Date) {
      return props.plant.lastWatered.toLocaleDateString();
    }

    // Handle string date format
    if (typeof props.plant.lastWatered === "string") {
      return new Date(props.plant.lastWatered).toLocaleDateString();
    }

    // If we get here, use current date as fallback
    return new Date().toLocaleDateString();
  } catch (err) {
    console.error("Error formatting lastWatered date:", err);
    return "Recently";
  }
});

const lastFertilisedFormatted = computed(() => {
  if (!props.plant.lastFertilised) return "Never";

  try {
    // Handle Firestore timestamp (has seconds property)
    if (props.plant.lastFertilised.seconds) {
      return new Date(
        props.plant.lastFertilised.seconds * 1000
      ).toLocaleDateString();
    }

    // Handle serverTimestamp() that hasn't been committed yet
    if (props.plant.lastFertilised.type === "server_timestamp") {
      return new Date().toLocaleDateString();
    }

    // Handle JavaScript Date object
    if (props.plant.lastFertilised instanceof Date) {
      return props.plant.lastFertilised.toLocaleDateString();
    }

    // Handle string date format
    if (typeof props.plant.lastFertilised === "string") {
      return new Date(props.plant.lastFertilised).toLocaleDateString();
    }

    // If we get here, use current date as fallback
    return new Date().toLocaleDateString();
  } catch (err) {
    console.error("Error formatting lastFertilised date:", err);
    return "Recently";
  }
});

const needsWater = computed(() => {
  if (!props.plant.lastWatered) return true;

  try {
    const now = new Date();
    let lastWatered;

    // Debug the actual value
    console.log("lastWatered value:", JSON.stringify(props.plant.lastWatered));

    // Handle Firestore timestamp
    if (props.plant.lastWatered.seconds) {
      lastWatered = new Date(props.plant.lastWatered.seconds * 1000);
    }
    // Handle serverTimestamp() placeholder that hasn't been committed yet
    else if (
      props.plant.lastWatered._methodName === "serverTimestamp" ||
      props.plant.lastWatered.type === "server_timestamp"
    ) {
      // If it's a server timestamp that's not committed yet, plant was just watered
      return false;
    }
    // Handle JavaScript Date object
    else if (props.plant.lastWatered instanceof Date) {
      lastWatered = props.plant.lastWatered;
    }
    // Handle string date format
    else if (typeof props.plant.lastWatered === "string") {
      lastWatered = new Date(props.plant.lastWatered);
    }
    // Handle number timestamp (milliseconds since epoch)
    else if (typeof props.plant.lastWatered === "number") {
      lastWatered = new Date(props.plant.lastWatered);
    }
    // If none of the above, try direct conversion
    else {
      lastWatered = new Date(props.plant.lastWatered);
    }

    // Check if the date is valid
    if (isNaN(lastWatered.getTime())) {
      console.error("Invalid watering date:", props.plant.lastWatered);
      return false; // Changed to return false for a better UX after a care action
    }

    const daysSinceWatered = Math.floor(
      (now - lastWatered) / (1000 * 60 * 60 * 24)
    );

    return daysSinceWatered >= (props.plant.waterFrequency || 7);
  } catch (err) {
    console.error("Error calculating watering needs:", err);
    return false; // Changed to return false after a care action for better UX
  }
});

const needsFertiliser = computed(() => {
  if (!props.plant.lastFertilised) return true;

  try {
    const now = new Date();
    let lastFertilised;

    // Debug the actual value
    console.log(
      "lastFertilised value:",
      JSON.stringify(props.plant.lastFertilised)
    );

    // Handle Firestore timestamp
    if (props.plant.lastFertilised.seconds) {
      lastFertilised = new Date(props.plant.lastFertilised.seconds * 1000);
    }
    // Handle serverTimestamp() placeholder that hasn't been committed yet
    else if (
      props.plant.lastFertilised._methodName === "serverTimestamp" ||
      props.plant.lastFertilised.type === "server_timestamp"
    ) {
      // If it's a server timestamp that's not committed yet, plant was just fertilized
      return false;
    }
    // Handle JavaScript Date object
    else if (props.plant.lastFertilised instanceof Date) {
      lastFertilised = props.plant.lastFertilised;
    }
    // Handle string date format
    else if (typeof props.plant.lastFertilised === "string") {
      lastFertilised = new Date(props.plant.lastFertilised);
    }
    // Handle number timestamp (milliseconds since epoch)
    else if (typeof props.plant.lastFertilised === "number") {
      lastFertilised = new Date(props.plant.lastFertilised);
    }
    // If none of the above, try direct conversion
    else {
      lastFertilised = new Date(props.plant.lastFertilised);
    }

    // Check if the date is valid
    if (isNaN(lastFertilised.getTime())) {
      console.error("Invalid fertilising date:", props.plant.lastFertilised);
      return false; // Changed to return false for a better UX after a care action
    }

    const daysSinceFertilised = Math.floor(
      (now - lastFertilised) / (1000 * 60 * 60 * 24)
    );

    return daysSinceFertilised >= (props.plant.fertiliseFrequency || 30);
  } catch (err) {
    console.error("Error calculating fertilising needs:", err);
    return false; // Changed to return false after a care action for better UX
  }
});

// Force reactivity by watching for changes to the entire plant object
watch(
  () => props.plant,
  (newPlant, oldPlant) => {
    // Only trigger status update if lastWatered or lastFertilised have changed
    if (
      JSON.stringify(newPlant.lastWatered) !==
        JSON.stringify(oldPlant?.lastWatered) ||
      JSON.stringify(newPlant.lastFertilised) !==
        JSON.stringify(oldPlant?.lastFertilised)
    ) {
      console.log(`Plant ${newPlant.name} was updated - checking status`);
      checkAndUpdateStatus();
    }
  },
  { deep: true } // Watch all properties of the plant object
);

// Modify the checkAndUpdateStatus function to force recomputation
const checkAndUpdateStatus = () => {
  // Force recomputing of the needsWater and needsFertiliser values
  const needsWaterNow = needsWater.value;
  const needsFertiliserNow = needsFertiliser.value;

  console.log(
    `Status check for ${props.plant.name}: Needs water: ${needsWaterNow}, Needs fertiliser: ${needsFertiliserNow}`
  );

  // Update plant status if needed
  if (needsWaterNow && props.plant.status !== "needs water") {
    console.log(`Updating ${props.plant.name} status to "needs water"`);
    props.onUpdate(props.plant.id, { status: "needs water" });
  } else if (!needsWaterNow && props.plant.status === "needs water") {
    console.log(`Updating ${props.plant.name} status to "healthy"`);
    props.onUpdate(props.plant.id, { status: "healthy" });
  }
};

// Check status when component is mounted
onMounted(() => {
  checkAndUpdateStatus();
});
</script>

<template>
  <div class="card h-100 shadow border-0 hover-shadow">
    <div class="card-header border-0 bg-primary text-white">
      <div class="d-flex justify-content-between align-items-center">
        <router-link
          :to="{
            name: 'plant-detail',
            params: { id: plant.id },
          }"
          class="text-white text-decoration-none"
        >
          <h5 class="card-title mb-0">{{ plant.name }}</h5>
        </router-link>
        <div class="plant-status d-flex">
          <!-- Water status indicator -->
          <div
            class="status-indicator me-1"
            :class="needsWater ? 'bg-danger' : 'bg-success'"
            v-tooltip
            :title="needsWater ? 'Needs water' : 'Water status good'"
          >
            <i class="bi bi-droplet-fill"></i>
          </div>

          <!-- Fertiliser status indicator -->
          <div
            class="status-indicator"
            :class="needsFertiliser ? 'bg-danger' : 'bg-success'"
            v-tooltip
            :title="
              needsFertiliser ? 'Needs fertiliser' : 'Fertiliser status good'
            "
          >
            <i class="bi bi-flower1"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="card-body">
      <!-- Plant Type as editable dropdown -->
      <div class="card-text mb-2">
        <div v-if="!isEditingType" class="d-flex align-items-center">
          <span>{{ plant.type || "Not specified" }}</span>
          <button
            class="btn btn-sm btn-link text-primary p-0 ms-2"
            @click="startEditingType"
            v-tooltip
            title="Edit plant type"
          >
            <i class="bi bi-pencil-fill"></i>
          </button>
        </div>
        <hr v-if="!isEditingType" class="my-1" />
        <div v-else class="mt-1">
          <select class="form-select form-select-sm" v-model="selectedType">
            <option
              v-for="type in plantTypes"
              :key="type.value"
              :value="type.value"
            >
              {{ type.label }}
            </option>
          </select>
          <div class="mt-1 d-flex">
            <button class="btn btn-sm btn-success me-1" @click="saveTypeChange">
              <i class="bi bi-check-lg"></i> Save
            </button>
            <button
              class="btn btn-sm btn-outline-secondary"
              @click="cancelTypeEditing"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <p class="card-text">
        <i class="bi bi-droplet me-1 text-info"></i>
        Last watered: {{ lastWateredFormatted }}
      </p>

      <p class="card-text">
        <i class="bi bi-flower1 me-1 text-warning"></i>
        Last fertilised: {{ lastFertilisedFormatted }}
      </p>

      <p v-if="greenhouse" class="card-text">
        <i class="bi bi-house me-1"></i>
        {{ greenhouse.name }}
      </p>

      <!-- Notes section with inline editing -->
      <div class="card-text mt-2">
        <div
          v-if="!isEditingNotes"
          @click="startEditingNotes"
          class="notes-container"
        >
          <p v-if="plant.notes" class="text-muted small mb-0">
            {{ plant.notes }}
          </p>
          <p v-else class="text-muted small fst-italic mb-0">
            Click to add notes
          </p>
          <div class="edit-overlay">
            <i class="bi bi-pencil-fill"></i>
          </div>
        </div>

        <div v-else class="mt-1">
          <textarea
            class="form-control form-control-sm"
            v-model="editedNotes"
            rows="3"
            placeholder="Add notes about your plant..."
          ></textarea>
          <div class="mt-1 d-flex">
            <button
              class="btn btn-sm btn-success me-1"
              @click="saveNotesChange"
            >
              <i class="bi bi-check-lg"></i> Save
            </button>
            <button
              class="btn btn-sm btn-outline-secondary"
              @click="cancelNotesEditing"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card-footer border-0">
      <div class="d-flex justify-content-between">
        <div>
          <button
            class="btn btn-sm me-1"
            :class="needsWater ? 'btn-info' : 'btn-outline-info'"
            v-tooltip
            title="Water Plant"
            @click="onWater(plant.id)"
          >
            <i class="bi bi-droplet-fill"></i>
          </button>
          <button
            class="btn btn-sm"
            :class="needsFertiliser ? 'btn-warning' : 'btn-outline-warning'"
            v-tooltip
            title="Fertilise Plant"
            @click="onFertilise(plant.id)"
          >
            <i class="bi bi-flower1"></i>
          </button>
        </div>

        <div>
          <router-link
            :to="{
              name: 'plant-detail',
              params: { id: plant.id },
            }"
            class="btn btn-sm btn-outline-primary me-1"
            v-tooltip
            title="View Details"
          >
            <i class="bi bi-eye"></i>
          </router-link>
          <button
            class="btn btn-sm btn-outline-danger"
            v-tooltip
            title="Delete Plant"
            @click="onDelete(plant)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
