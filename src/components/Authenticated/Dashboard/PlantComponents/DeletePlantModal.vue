<script setup>
defineProps({
  plant: {
    type: Object,
    default: null,
  },
  isDeleting: {
    type: Boolean,
    default: false,
  },
  confirmDelete: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div
    class="modal fade"
    id="deletePlantModal"
    tabindex="-1"
    aria-labelledby="deletePlantModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deletePlantModalLabel">Confirm Delete</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            Are you sure you want to delete
            <strong>{{ plant?.name }}</strong
            >?
          </p>
          <p class="text-danger">This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            :disabled="isDeleting"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="confirmDelete"
            :disabled="isDeleting"
          >
            <span
              v-if="isDeleting"
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            {{ isDeleting ? "Deleting..." : "Delete Plant" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
