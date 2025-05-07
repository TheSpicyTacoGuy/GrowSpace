<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Modal } from "bootstrap";
import { useGreenhouses } from "../../../composables/useGreenhouses";

// Import components
import GreenhouseHeader from "./GreenhouseComponents/GreenhouseHeader.vue";
import GreenhousesList from "./GreenhouseComponents/GreenhousesList.vue";
import AddGreenhouseModal from "./GreenhouseComponents/AddGreenhouseModal.vue";
import DeleteGreenhouseModal from "./GreenhouseComponents/DeleteGreenhouseModal.vue";

// Use the greenhouse composable
const {
  greenhouses,
  loading,
  error,
  isAdding,
  isDeleting,
  noMoreResults,
  fetchGreenhouses,
  addGreenhouse,
  deleteGreenhouse,
  reset,
  searchGreenhouses,
} = useGreenhouses();

// Modal controls
const addModal = ref(null);
const deleteModal = ref(null);
const greenhouseToDelete = ref(null);

// Add this for search functionality
const handleSearch = async (query) => {
  try {
    // If your composable has a search method, use it
    if (typeof searchGreenhouses === "function") {
      await searchGreenhouses(query);
    } else {
      // Fall back to fetching with the search parameter
      await fetchGreenhouses(false, query);
    }
  } catch (err) {
    console.error("Search error:", err);
  }
};

// Function to open the add greenhouse modal
const openAddModal = () => {
  if (!addModal.value) {
    addModal.value = new Modal(document.getElementById("addGreenhouseModal"));
  }
  addModal.value.show();
};

// Function to close the add greenhouse modal
const closeAddModal = () => {
  if (addModal.value) {
    addModal.value.hide();
  }
};

// Function to open the delete confirmation modal
const confirmDelete = (greenhouse) => {
  greenhouseToDelete.value = greenhouse;

  if (!deleteModal.value) {
    deleteModal.value = new Modal(
      document.getElementById("deleteGreenhouseModal")
    );
  }
  deleteModal.value.show();
};

// Function to handle delete confirmation
const handleDelete = async () => {
  if (!greenhouseToDelete.value) return;

  try {
    await deleteGreenhouse(greenhouseToDelete.value.id);
    if (deleteModal.value) {
      deleteModal.value.hide();
    }
    greenhouseToDelete.value = null;
  } catch (err) {
    return err;
    // Error is handled in the composable
  }
};

// Function to handle load more
const handleLoadMore = async (loadMore = false) => {
  await fetchGreenhouses(loadMore);
};

// Initialize component
onMounted(async () => {
  await fetchGreenhouses();
});

// Clean up when component unmounts
onUnmounted(() => {
  // Dispose modals
  if (addModal.value) {
    addModal.value.dispose();
  }
  if (deleteModal.value) {
    deleteModal.value.dispose();
  }

  // Reset state
  reset();
});

defineOptions({
  name: "GreenhousesComponent",
});
</script>

<template>
  <div class="dashboard-container p-3">
    <!-- Header with Add Button and Search -->
    <GreenhouseHeader :openAddModal="openAddModal" :onSearch="handleSearch" />

    <!-- Greenhouses List (includes loading, empty, and list states) -->
    <GreenhousesList
      :greenhouses="greenhouses"
      :loading="loading"
      :error="error"
      :noMoreResults="noMoreResults"
      :onDelete="confirmDelete"
      :onLoadMore="handleLoadMore"
      :openAddModal="openAddModal"
    />

    <!-- Modals -->
    <AddGreenhouseModal
      :isAdding="isAdding"
      :addGreenhouse="addGreenhouse"
      @modalClosed="closeAddModal"
    />

    <DeleteGreenhouseModal
      :greenhouse="greenhouseToDelete"
      :isDeleting="isDeleting"
      :confirmDelete="handleDelete"
    />
  </div>
</template>
