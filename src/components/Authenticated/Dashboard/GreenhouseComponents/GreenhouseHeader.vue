<script setup>
import { ref } from "vue";

const props = defineProps({
  openAddModal: {
    type: Function,
    required: true,
  },
  onSearch: {
    type: Function,
    required: true,
  },
});

const searchTerm = ref("");

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
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="h2"><i class="bi bi-houses-fill me-2"></i>Greenhouses</h1>
      <div class="btn-toolbar">
        <div class="btn-group me-2">
          <button
            type="button"
            class="btn btn-success"
            v-tooltip
            title="Add Greenhouse"
            @click="openAddModal"
          >
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="row g-3">
      <!-- Search bar -->
      <div class="col-md-6">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search greenhouses..."
            v-model="searchTerm"
            @input="handleSearch"
          />
          <button
            class="btn"
            type="button"
            @click="clearSearch"
            v-if="searchTerm"
          >
            <i class="bi bi-x-lg"></i>
          </button>
          <button class="btn bg-body" type="button" @click="handleSearch">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
