<script setup>
import { ref, watch } from "vue";
import { usePlants } from "@composables/usePlants.js";

const props = defineProps({
  plant: { type: Object, required: true },
  greenhouse: { type: Object, default: null },
  onDelete: { type: Function, required: true },
  onUpdate: { type: Function, required: true },
});

// Define an emit to notify parent of changes
const emit = defineEmits(["updated"]);

const {
  getLastWateredFormatted,
  getLastFertilisedFormatted,
  needsWater,
  needsFertiliser,
  handleWater,
  handleFertilise,
  updatePlant,
} = usePlants();

const onWater = async () => {
  const updatedPlant = await handleWater(props.plant);
  if (updatedPlant) {
    emit("updated", updatedPlant);
  }
};

const onFertilise = async () => {
  const updatedPlant = await handleFertilise(props.plant);
  if (updatedPlant) {
    emit("updated", updatedPlant);
  }
};

// Notes editing functionality
const isEditingNotes = ref(false);
const editedNotes = ref(props.plant.notes || "");

// Keep notes in sync with props
watch(
  () => props.plant.notes,
  (newNotes) => {
    if (!isEditingNotes.value) {
      editedNotes.value = newNotes || "";
    }
  }
);

function startEditingNotes() {
  isEditingNotes.value = true;
  editedNotes.value = props.plant.notes || "";
}

function cancelNotesEditing() {
  isEditingNotes.value = false;
  editedNotes.value = props.plant.notes || "";
}

async function saveNotesChange() {
  try {
    isEditingNotes.value = false;
    if (editedNotes.value !== props.plant.notes) {
      // Update Firestore
      const updatedPlant = await updatePlant(props.plant.id, {
        notes: editedNotes.value,
      });

      // Notify parent about the update
      if (updatedPlant) {
        emit("updated", { ...props.plant, notes: editedNotes.value });
      }
    }
  } catch (error) {
    console.error("Error updating notes:", error);
    // Revert to original notes on error
    editedNotes.value = props.plant.notes || "";
  }
}
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
            :class="needsWater(plant) ? 'bg-danger' : 'bg-success'"
            v-tooltip
            :title="needsWater(plant) ? 'Needs water' : 'Water status good'"
          >
            <i class="bi bi-droplet-fill"></i>
          </div>

          <!-- Fertiliser status indicator -->
          <div
            class="status-indicator"
            :class="needsFertiliser(plant) ? 'bg-danger' : 'bg-success'"
            v-tooltip
            :title="
              needsFertiliser(plant)
                ? 'Needs fertiliser'
                : 'Fertiliser status good'
            "
          >
            <i class="bi bi-flower1"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="card-body">
      <!-- Plant Type - simplified to just display with no editing -->
      <div class="card-text mb-2">
        <div class="d-flex align-items-center">
          <span>
            <i class="bi bi-tag me-1 text-muted"></i>
            {{ plant.type || "Not specified" }}
          </span>
          <!-- Type edit button removed -->
        </div>
        <hr class="my-1" />
      </div>

      <p class="card-text">
        <i class="bi bi-droplet me-1 text-info"></i>
        Last watered: {{ getLastWateredFormatted(plant) }}
      </p>

      <p class="card-text">
        <i class="bi bi-flower1 me-1 text-warning"></i>
        Last fertilised: {{ getLastFertilisedFormatted(plant) }}
      </p>

      <p v-if="greenhouse" class="card-text">
        <i class="bi bi-house me-1"></i>
        {{ greenhouse.name }}
      </p>

      <!-- Notes section with inline editing (kept as is) -->
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
            :id="'plantNotes_' + plant.id"
            :name="'plantNotes_' + plant.id"
          ></textarea>
          <div class="mt-1 d-flex">
            <button
              class="btn btn-sm btn-success me-1"
              @click="saveNotesChange"
              type="button"
              :id="'saveNotes_' + plant.id"
              :name="'saveNotes_' + plant.id"
            >
              <i class="bi bi-check-lg"></i> Save
            </button>
            <button
              class="btn btn-sm btn-outline-secondary"
              @click="cancelNotesEditing"
              type="button"
              :id="'cancelNotes_' + plant.id"
              :name="'cancelNotes_' + plant.id"
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
            :class="needsWater(plant) ? 'btn-info' : 'btn-outline-info'"
            v-tooltip
            title="Water Plant"
            @click="onWater"
            id="waterPlantBtn"
            name="waterPlantBtn"
            type="button"
          >
            <i class="bi bi-droplet-fill"></i>
          </button>
          <button
            class="btn btn-sm"
            :class="
              needsFertiliser(plant) ? 'btn-warning' : 'btn-outline-warning'
            "
            v-tooltip
            title="Fertilise Plant"
            @click="onFertilise"
            id="fertilisePlantBtn"
            name="fertilisePlantBtn"
            type="button"
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
            type="button"
            :id="'deletePlant_' + plant.id"
            :name="'deletePlant_' + plant.id"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
