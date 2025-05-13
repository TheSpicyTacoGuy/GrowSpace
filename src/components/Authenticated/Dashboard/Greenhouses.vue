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
  sortBy,
  setSortBy,
  sortedGreenhouses,
} = useGreenhouses();

// Modal controls
const addModal = ref(null);
const deleteModal = ref(null);
const greenhouseToDelete = ref(null);

// Search
const handleSearch = async (query) => {
  try {
    if (typeof searchGreenhouses === "function") {
      await searchGreenhouses(query);
    } else {
      await fetchGreenhouses(false, query);
    }
  } catch (err) {
    console.error("Search error:", err);
  }
};

// Sort
const handleSort = (event) => {
  setSortBy(event.target.value);
};

// Add Modal
const openAddModal = () => {
  if (!addModal.value) {
    addModal.value = new Modal(document.getElementById("addGreenhouseModal"));
  }
  addModal.value.show();
};
const closeAddModal = () => {
  if (addModal.value) addModal.value.hide();
};

// Delete Modal
const confirmDelete = (greenhouse) => {
  greenhouseToDelete.value = greenhouse;
  if (!deleteModal.value) {
    deleteModal.value = new Modal(
      document.getElementById("deleteGreenhouseModal")
    );
  }
  deleteModal.value.show();
};
const handleDelete = async () => {
  if (!greenhouseToDelete.value) return;
  try {
    await deleteGreenhouse(greenhouseToDelete.value.id);
    if (deleteModal.value) deleteModal.value.hide();
    greenhouseToDelete.value = null;
  } catch (err) {
    return err;
  }
};

// Load More
const handleLoadMore = async (loadMore = false) => {
  await fetchGreenhouses(loadMore);
};

// Lifecycle
onMounted(async () => {
  await fetchGreenhouses();
});
onUnmounted(() => {
  if (addModal.value) addModal.value.dispose();
  if (deleteModal.value) deleteModal.value.dispose();
  reset();
});

defineOptions({ name: "GreenhousesComponent" });
</script>

<template>
  <div class="dashboard-container p-3">
    <!-- Header with Add Button and Search -->
    <GreenhouseHeader :openAddModal="openAddModal" :onSearch="handleSearch" />

    <!-- Sort By Dropdown -->
    <div class="row mb-3">
      <div class="col-12 col-md-4 ms-auto">
        <label for="sortGreenhouses" class="form-label visually-hidden"
          >Sort by</label
        >
        <select
          id="sortGreenhouses"
          class="form-select"
          v-model="sortBy"
          @change="handleSort"
          aria-label="Sort greenhouses"
        >
          <option value="name">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="created">Newest First</option>
          <option value="created-asc">Oldest First</option>
        </select>
      </div>
    </div>

    <!-- Greenhouses List -->
    <GreenhousesList
      :greenhouses="sortedGreenhouses"
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
