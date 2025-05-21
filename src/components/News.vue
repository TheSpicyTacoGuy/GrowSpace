<template>
  <div class="container bg-body-tertiary rounded-5 shadow-sm p-4">
    <h1 class="mb-4">Latest News</h1>

    <!-- Search filters -->
    <form @submit.prevent="applyFilters" class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-3">
            <label for="searchTitle" class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              id="searchTitle"
              name="searchTitle"
              v-model="filters.title"
              placeholder="Search by title"
            />
          </div>
          <div class="col-md-3">
            <label for="searchCategory" class="form-label">Category</label>
            <select
              class="form-select"
              id="searchCategory"
              name="searchCategory"
              v-model="filters.category"
            >
              <option value="">All Categories</option>
              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="searchDateFrom" class="form-label">From Date</label>
            <input
              type="date"
              class="form-control"
              id="searchDateFrom"
              v-model="filters.dateFrom"
            />
          </div>
          <div class="col-md-3">
            <label for="searchDateTo" class="form-label">To Date</label>
            <input
              type="date"
              class="form-control"
              id="searchDateTo"
              v-model="filters.dateTo"
            />
          </div>
          <div class="col-md-12">
            <label for="searchContent" class="form-label">Content</label>
            <input
              type="text"
              class="form-control"
              id="searchContent"
              v-model="filters.content"
              placeholder="Search in article content"
            />
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button type="submit" class="btn btn-primary me-2">Search</button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="resetFilters"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>

    <!-- News list -->
    <div v-if="filteredNews.length > 0">
      <div class="row row-cols-1 g-4 mb-4">
        <div v-for="article in paginatedNews" :key="article.id" class="col">
          <div class="card h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <span class="badge bg-primary">{{ article.category }}</span>
                <small class="text-muted">{{ formatDate(article.date) }}</small>
              </div>
              <h5 class="card-title">{{ article.title }}</h5>
              <p class="card-text">
                {{ article.content.substring(0, 150) }}...
              </p>
              <router-link
                :to="{ name: 'news-detail', params: { id: article.id } }"
                class="btn btn-outline-primary btn-sm"
              >
                Read More
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav aria-label="News pagination">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="currentPage--"
              >Previous</a
            >
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <a class="page-link" href="#" @click.prevent="currentPage = page">{{
              page
            }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a class="page-link" href="#" @click.prevent="currentPage++"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>

    <div v-else class="alert alert-info">
      No news articles match your search criteria.
    </div>
  </div>
</template>

<script>
import { showToast } from "/js/toast";
import newsData from "../assets/news.json";

export default {
  name: "NewsComponent",
  data() {
    return {
      news: newsData,
      filters: {
        title: "",
        category: "",
        content: "",
        dateFrom: "",
        dateTo: "",
      },
      currentPage: 1,
      itemsPerPage: 5,
      appliedFilters: null,
    };
  },
  computed: {
    categories() {
      // Get unique categories
      return [...new Set(this.news.map((item) => item.category))];
    },
    filteredNews() {
      if (!this.appliedFilters) {
        return this.news;
      }

      return this.news.filter((article) => {
        const matchTitle = this.appliedFilters.title
          ? article.title
              .toLowerCase()
              .includes(this.appliedFilters.title.toLowerCase())
          : true;

        const matchCategory = this.appliedFilters.category
          ? article.category === this.appliedFilters.category
          : true;

        const matchContent = this.appliedFilters.content
          ? article.content
              .toLowerCase()
              .includes(this.appliedFilters.content.toLowerCase())
          : true;

        // Date filter
        let matchDate = true;
        const articleDate = new Date(article.date);

        if (this.appliedFilters.dateFrom) {
          const fromDate = new Date(this.appliedFilters.dateFrom);
          matchDate = matchDate && articleDate >= fromDate;
        }

        if (this.appliedFilters.dateTo) {
          const toDate = new Date(this.appliedFilters.dateTo);
          matchDate = matchDate && articleDate <= toDate;
        }

        return matchTitle && matchCategory && matchContent && matchDate;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredNews.length / this.itemsPerPage);
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredNews.slice(start, end);
    },
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    applyFilters() {
      this.appliedFilters = { ...this.filters };
      this.currentPage = 1;
      // Show toast message
      showToast("Filters applied successfully!", "success", 3000);
    },
    resetFilters() {
      this.filters = {
        title: "",
        category: "",
        content: "",
        dateFrom: "",
        dateTo: "",
      };
      this.appliedFilters = null;
      this.currentPage = 1;
      // Show toast message
      showToast("Filters reset successfully!", "info", 3000);
    },
  },
};
</script>
