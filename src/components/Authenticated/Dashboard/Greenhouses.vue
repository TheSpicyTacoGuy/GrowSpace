<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { Modal } from "bootstrap";
import { useGreenhouses } from "@composables/useGreenhouses";
import MobilePageHeader from "@components/MobilePageHeader.vue";
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
  version,
} = useGreenhouses();

// Modal controls
const addModal = ref(null);
const deleteModal = ref(null);
const greenhouseToDelete = ref(null);

// Mobile UI states
const searchTerm = ref("");
const showSearch = ref(false);

// Toggle search visibility - enhanced like Plants page
const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  if (showSearch.value) {
    // Focus the search input when shown
    setTimeout(() => {
      document.querySelector('input[type="search"]')?.focus();
    }, 100);
  } else {
    // Clear search when hiding
    if (searchTerm.value) {
      searchTerm.value = "";
      handleSearch("");
    }
  }
};

// Watch search term changes to trigger search - like Plants page
watch(searchTerm, (newValue) => {
  handleSearch(newValue);
});

// Search
const handleSearch = async (query) => {
  try {
    searchTerm.value = query;
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

// Watch for changes to force component updates - like Plants page
watch(
  () => version?.value,
  () => {
    // This empty watcher ensures the component reacts to changes
  },
  { immediate: true }
);

defineOptions({ name: "GreenhousesComponent" });
</script>

<template>
  <div class="dashboard-container">
    <!-- Mobile App-like Header -->
    <MobilePageHeader
      title="Greenhouses"
      actionIcon="plus-circle"
      secondaryIcon="search"
      @action="openAddModal"
      @secondaryAction="toggleSearch"
      class="d-block d-lg-none"
    />

    <!-- Mobile Search bar - shown when search is active -->
    <div
      v-if="showSearch"
      class="p-3 bg-body-secondary d-block d-lg-none rounded-3"
    >
      <div class="input-group">
        <span class="input-group-text bg-body border-end-0">
          <i class="bi bi-search"></i>
        </span>
        <input
          v-model="searchTerm"
          type="search"
          class="form-control border-start-0"
          placeholder="Search greenhouses..."
          aria-label="Search"
          @input="handleSearch(searchTerm)"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="
            searchTerm = '';
            handleSearch('');
          "
          v-if="searchTerm"
          aria-label="Clear search"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Sort Options -->
    <div class="p-3 border-bottom d-block d-lg-none">
      <div class="d-flex align-items-center">
        <span class="text-muted me-2 small">Sort:</span>
        <select
          class="form-select form-select-sm border-0 bg-transparent p-0"
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

    <!-- Desktop Header with Add Button and Search -->
    <GreenhouseHeader
      :openAddModal="openAddModal"
      :onSearch="handleSearch"
      class="d-none d-lg-block"
    />

    <!-- Greenhouses List (both desktop and mobile) -->
    <GreenhousesList
      :greenhouses="sortedGreenhouses"
      :loading="loading"
      :error="error"
      :noMoreResults="noMoreResults"
      :onDelete="confirmDelete"
      :onLoadMore="handleLoadMore"
      :openAddModal="openAddModal"
    />

    <!-- Modals - shared between mobile and desktop -->
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

<style scoped>
/* Mobile-specific styles */
.greenhouse-mobile-list {
  margin-bottom: 70px; /* Space for bottom nav */
}

.mobile-list-item {
  transition: transform 0.15s;
}

.mobile-list-item:active {
  transform: scale(0.98);
}

/* Empty state styling */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
}
</style>
