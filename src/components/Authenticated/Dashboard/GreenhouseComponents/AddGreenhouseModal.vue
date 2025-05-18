<script setup>
import { ref } from "vue";

const props = defineProps({
  isAdding: {
    type: Boolean,
    default: false,
  },
  addGreenhouse: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["modalClosed"]);

const newGreenhouse = ref({
  name: "",
  description: "",
  size: null,
  location: "",
});

const errors = ref({});

const resetForm = () => {
  newGreenhouse.value = {
    name: "",
    description: "",
    size: null,
    location: "",
  };
};

const validate = () => {
  errors.value = {};
  if (!newGreenhouse.value.name.trim()) {
    errors.value.name = "Name is required.";
  }
  if (!newGreenhouse.value.size || newGreenhouse.value.size <= 0) {
    errors.value.size = "Size must be a positive number.";
  }
  return Object.keys(errors.value).length === 0;
};

const submitForm = async () => {
  if (validate()) {
    try {
      await props.addGreenhouse(newGreenhouse.value);
      resetForm();
      emit("modalClosed");
    } catch (error) {
      return error;
      // Error is handled in the composable
    }
  }
};
</script>

<template>
  <div
    class="modal fade"
    id="addGreenhouseModal"
    tabindex="-1"
    aria-labelledby="addGreenhouseModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addGreenhouseModalLabel">
            Add New Greenhouse
          </h5>
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
              <label for="greenhouseName" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="greenhouseName"
                v-model="newGreenhouse.name"
                required
                aria-label="Greenhouse name"
                :aria-invalid="!!errors.name"
                aria-describedby="greenhouseNameError"
              />
              <div
                v-if="errors.name"
                id="greenhouseNameError"
                class="text-danger"
                role="alert"
              >
                {{ errors.name }}
              </div>
            </div>
            <div class="mb-3">
              <label for="greenhouseDescription" class="form-label"
                >Description</label
              >
              <textarea
                class="form-control"
                id="greenhouseDescription"
                v-model="newGreenhouse.description"
                rows="3"
                aria-label="Greenhouse description"
              ></textarea>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="greenhouseSize" class="form-label"
                  >Size (sq mtr)</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="greenhouseSize"
                  v-model.number="newGreenhouse.size"
                  min="0"
                  aria-required="true"
                  aria-describedby="greenhouseSizeHelp"
                  aria-label="Greenhouse size in square meters"
                  :aria-invalid="!!errors.size"
                  required
                />
                <div id="greenhouseSizeHelp" class="form-text">
                  Enter the size in square meters.
                </div>
                <div
                  v-if="errors.size"
                  id="greenhouseSizeError"
                  class="text-danger"
                  role="alert"
                >
                  {{ errors.size }}
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="greenhouseLocation" class="form-label"
                  >Location</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="greenhouseLocation"
                  v-model="newGreenhouse.location"
                  aria-label="Greenhouse location"
                />
              </div>
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
            {{ isAdding ? "Adding..." : "Add Greenhouse" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
