<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  openAddModal: {
    type: Function,
    required: true,
  },
  onSearch: {
    type: Function,
    required: true,
  },
  greenhouses: {
    type: Array,
    default: () => [],
  },
  onFilterByGreenhouse: {
    type: Function,
    required: true,
  },
  selectedGreenhouseId: {
    type: String,
    default: null,
  },
});

const searchTerm = ref("");
const selected = ref(props.selectedGreenhouseId);

watch(
  () => props.selectedGreenhouseId,
  (val) => {
    selected.value = val;
  }
);

const handleSearch = () => {
  props.onSearch(searchTerm.value);
};

const clearSearch = () => {
  searchTerm.value = "";
  props.onSearch("");
};
</script>

<template>
  <div
    class="dashboard-header bg-primary text-white rounded p-3 mb-4 shadow-sm"
  >
    <div class="row align-items-center mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <h1 class="h3 h2-md m-0"><i class="bi bi-flower1 me-2"></i>Plants</h1>
      </div>
      <div class="col-12 col-md-6 text-md-end">
        <div class="btn-toolbar justify-content-md-end">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-secondary"
              v-tooltip
              title="Add Plant"
              @click="openAddModal"
            >
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row g-2 g-md-3">
      <!-- Search bar -->
      <div class="col-12 col-md-6">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search plants..."
            id="plantSearchInput"
            name="plantSearchInput"
            v-model="searchTerm"
            @input="handleSearch"
            aria-label="Search plants"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="clearSearch"
            v-if="searchTerm"
            aria-label="Clear search"
          >
            <i class="bi bi-x-lg"></i>
          </button>
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="handleSearch"
            aria-label="Search"
          >
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
      <!-- Greenhouse filter -->
      <div class="col-12 col-md-6">
        <label for="greenhouseFilter" class="form-label visually-hidden">
          Filter by greenhouse
        </label>
        <select
          class="form-select"
          id="greenhouseFilter"
          name="greenhouseFilter"
          v-model="selected"
          @change="onFilterByGreenhouse(selected)"
          aria-label="Filter by greenhouse"
        >
          <option :value="null">All Greenhouses</option>
          <option
            v-for="greenhouse in greenhouses"
            :key="greenhouse.id"
            :value="greenhouse.id"
          >
            {{ greenhouse.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
