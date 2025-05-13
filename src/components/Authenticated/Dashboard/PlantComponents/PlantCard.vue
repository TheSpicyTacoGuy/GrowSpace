<script setup>
import { ref } from "vue";
import { usePlants } from "@composables/usePlants.js";

const props = defineProps({
  plant: { type: Object, required: true },
  greenhouse: { type: Object, default: null },
  onDelete: { type: Function, required: true },
  onUpdate: { type: Function, required: true },
});

const {
  getLastWateredFormatted,
  getLastFertilisedFormatted,
  needsWater,
  needsFertiliser,
  handleWater,
  handleFertilise,
} = usePlants();

const onWater = () => handleWater(props.plant);
const onFertilise = () => handleFertilise(props.plant);

// --- Add these for editing plant type ---
const isEditingType = ref(false);
const selectedType = ref(props.plant.type || "");
const plantTypes = [
  { value: "Herb", label: "Herb" },
  { value: "Vegetable", label: "Vegetable" },
  { value: "Flower", label: "Flower" },
  { value: "Succulent", label: "Succulent" },
  { value: "Other", label: "Other" },
];

function startEditingType() {
  isEditingType.value = true;
  selectedType.value = props.plant.type || "";
}
function cancelTypeEditing() {
  isEditingType.value = false;
  selectedType.value = props.plant.type || "";
}
async function saveTypeChange() {
  isEditingType.value = false;
  if (selectedType.value !== props.plant.type) {
    await props.onUpdate({ ...props.plant, type: selectedType.value });
  }
}

// --- Add these for editing notes if needed ---
const isEditingNotes = ref(false);
const editedNotes = ref(props.plant.notes || "");

function startEditingNotes() {
  isEditingNotes.value = true;
  editedNotes.value = props.plant.notes || "";
}
function cancelNotesEditing() {
  isEditingNotes.value = false;
  editedNotes.value = props.plant.notes || "";
}
async function saveNotesChange() {
  isEditingNotes.value = false;
  if (editedNotes.value !== props.plant.notes) {
    await props.onUpdate({ ...props.plant, notes: editedNotes.value });
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
            :class="needsWater(plant) ? 'btn-info' : 'btn-outline-info'"
            v-tooltip
            title="Water Plant"
            @click="onWater"
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
