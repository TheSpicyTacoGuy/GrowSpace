<script setup>
import { ref } from "vue";

const props = defineProps({
  isAdding: {
    type: Boolean,
    default: false,
  },
  addPlant: {
    type: Function,
    required: true,
  },
  greenhouses: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["modalClosed"]);

const newPlant = ref({
  name: "",
  type: "",
  greenhouseId: "",
  notes: "",
  waterFrequency: 7,
  fertiliseFrequency: 30,
});

// Common plant types for the dropdown
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

// Watering schedule options
const wateringSchedules = [
  { value: 1, label: "Every day" },
  { value: 2, label: "Every 2 days" },
  { value: 3, label: "Every 3 days" },
  { value: 5, label: "Every 5 days" },
  { value: 7, label: "Weekly" },
  { value: 14, label: "Every 2 weeks" },
  { value: 21, label: "Every 3 weeks" },
  { value: 30, label: "Monthly" },
];

// Fertilising schedule options
const fertilisingSchedules = [
  { value: 7, label: "Weekly" },
  { value: 14, label: "Every 2 weeks" },
  { value: 30, label: "Monthly" },
  { value: 60, label: "Every 2 months" },
  { value: 90, label: "Every 3 months" },
  { value: 180, label: "Every 6 months" },
  { value: 365, label: "Annually" },
];

const resetForm = () => {
  newPlant.value = {
    name: "",
    type: "",
    greenhouseId: "",
    notes: "",
    waterFrequency: 7,
    fertiliseFrequency: 30,
  };
};

const submitForm = async () => {
  try {
    await props.addPlant(newPlant.value);
    resetForm();
    emit("modalClosed");
  } catch (error) {
    return error;
    // Error is handled in the composable
  }
};
</script>

<template>
  <div
    class="modal fade"
    id="addPlantModal"
    tabindex="-1"
    aria-labelledby="addPlantModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addPlantModalLabel">Add New Plant</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetForm"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="plantName" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="plantName"
                v-model="newPlant.name"
                required
              />
            </div>
            <div class="mb-3">
              <label for="plantType" class="form-label">Type</label>
              <select
                class="form-select"
                id="plantType"
                v-model="newPlant.type"
              >
                <option
                  v-for="type in plantTypes"
                  :key="type.value"
                  :value="type.value"
                >
                  {{ type.label }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="plantGreenhouse" class="form-label">Greenhouse</label>
              <select
                class="form-select"
                id="plantGreenhouse"
                v-model="newPlant.greenhouseId"
              >
                <option value="">None (Outdoors)</option>
                <option
                  v-for="greenhouse in greenhouses"
                  :key="greenhouse.id"
                  :value="greenhouse.id"
                >
                  {{ greenhouse.name }}
                </option>
              </select>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="waterFrequency" class="form-label"
                  >Watering Schedule</label
                >
                <select
                  class="form-select"
                  id="waterFrequency"
                  v-model.number="newPlant.waterFrequency"
                >
                  <option
                    v-for="schedule in wateringSchedules"
                    :key="schedule.value"
                    :value="schedule.value"
                  >
                    {{ schedule.label }}
                  </option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label for="fertiliseFrequency" class="form-label"
                  >Fertilising Schedule</label
                >
                <select
                  class="form-select"
                  id="fertiliseFrequency"
                  v-model.number="newPlant.fertiliseFrequency"
                >
                  <option
                    v-for="schedule in fertilisingSchedules"
                    :key="schedule.value"
                    :value="schedule.value"
                  >
                    {{ schedule.label }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <label for="plantNotes" class="form-label">Notes</label>
              <textarea
                class="form-control"
                id="plantNotes"
                v-model="newPlant.notes"
                rows="3"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="resetForm"
            :disabled="isAdding"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="submitForm"
            :disabled="isAdding"
          >
            <span
              v-if="isAdding"
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            {{ isAdding ? "Adding..." : "Add Plant" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
