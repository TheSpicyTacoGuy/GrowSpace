<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Modal } from "bootstrap";
import { useGreenhouses } from "../../../composables/useGreenhouses";
import MobilePageHeader from "@components/MobilePageHeader.vue";

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

// Mobile UI states
const searchTerm = ref("");
const showSearch = ref(false);

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

// Toggle search bar visibility (mobile)
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
  <div class="app-page">
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

    <!-- Mobile Greenhouses List -->
    <div class="d-block d-lg-none">
      <!-- Loading state -->
      <div v-if="loading && !sortedGreenhouses.length" class="text-center py-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!sortedGreenhouses.length" class="text-center py-5">
        <div
          class="d-flex align-items-center justify-content-center mx-auto rounded-circle bg-body-secondary empty-state"
          style="width: 100px; height: 100px"
        >
          <i class="bi bi-house text-muted display-1"></i>
        </div>
        <h2 class="h5 mb-3 mt-4">No Greenhouses Yet</h2>
        <p class="text-muted mb-4">Add your first greenhouse to get started</p>
        <button class="btn btn-primary rounded-pill px-4" @click="openAddModal">
          <i class="bi bi-plus-circle me-2"></i>Add Greenhouse
        </button>
      </div>

      <!-- Greenhouse Mobile List -->
      <div v-else class="p-3 pb-5 mb-5">
        <router-link
          v-for="greenhouse in sortedGreenhouses"
          :key="greenhouse.id"
          :to="`/dashboard/greenhouses/${greenhouse.id}`"
          class="text-decoration-none"
        >
          <div
            class="d-flex align-items-center p-3 rounded-3 shadow-sm mb-3 bg-body-secondary mobile-list-item"
          >
            <div class="flex-shrink-0 me-3">
              <div class="bg-success bg-opacity-10 rounded-circle p-3">
                <i class="bi bi-house-fill text-success fs-4"></i>
              </div>
            </div>
            <div class="flex-grow-1">
              <h3 class="h6 mb-1">{{ greenhouse.name }}</h3>
              <div class="small text-muted d-flex align-items-center">
                <i class="bi bi-flower2 me-1"></i>
                {{ greenhouse.plants ? greenhouse.plants.length : 0 }} plant(s)
              </div>
            </div>
            <div class="d-flex align-items-center">
              <button
                class="btn btn-link text-danger p-2 me-2"
                @click.prevent.stop="confirmDelete(greenhouse)"
                aria-label="Delete greenhouse"
              >
                <i class="bi bi-trash"></i>
              </button>
              <i class="bi bi-chevron-right text-muted"></i>
            </div>
          </div>
        </router-link>

        <!-- Load more button -->
        <div v-if="!noMoreResults && !loading" class="d-grid mt-4">
          <button class="btn btn-outline-primary" @click="handleLoadMore(true)">
            Load More
          </button>
        </div>

        <!-- Loading more indicator -->
        <div v-if="loading" class="text-center py-3">
          <div
            class="spinner-border spinner-border-sm text-primary"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- DESKTOP VERSION - unchanged -->
    <div class="dashboard-container p-3 d-none d-lg-block">
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
    </div>

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

.app-list-item {
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.15s;
}

.app-list-item:active {
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

/* Minimal custom CSS - only for interactive effects */
.mobile-list-item {
  transition: transform 0.15s;
}

.mobile-list-item:active {
  transform: scale(0.98);
}
</style>
