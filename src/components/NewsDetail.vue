<template>
  <div class="container mt-4">
    <div v-if="article" class="mb-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <router-link :to="{ name: 'news' }" class="btn btn-outline-primary">
          &larr; Back to News
        </router-link>
        <span class="badge bg-primary">{{ article.category }}</span>
      </div>

      <h1 class="mb-3">{{ article.title }}</h1>
      <p class="text-muted mb-4">
        {{ formatDate(article.date) }} | {{ article.author }}
      </p>

      <div class="card mb-4">
        <div class="card-body">
          <p
            class="card-text"
            v-for="(paragraph, index) in articleParagraphs"
            :key="index"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div class="d-flex justify-content-between">
        <router-link
          v-if="prevArticleId"
          :to="{ name: 'news-detail', params: { id: prevArticleId } }"
          class="btn btn-outline-secondary"
        >
          &larr; Previous Article
        </router-link>
        <div v-else></div>

        <router-link
          v-if="nextArticleId"
          :to="{ name: 'news-detail', params: { id: nextArticleId } }"
          class="btn btn-outline-primary"
        >
          Next Article &rarr;
        </router-link>
      </div>
    </div>

    <div v-else class="alert alert-danger">Article not found.</div>
  </div>
</template>

<script>
import newsData from "../assets/news.json";

export default {
  name: "NewsDetailComponent",
  data() {
    return {
      news: newsData,
    };
  },
  computed: {
    article() {
      return this.news.find(
        (item) => item.id === parseInt(this.$route.params.id)
      );
    },
    articleParagraphs() {
      return this.article ? this.article.content.split("\n\n") : [];
    },
    currentIndex() {
      return this.news.findIndex(
        (item) => item.id === parseInt(this.$route.params.id)
      );
    },
    prevArticleId() {
      return this.currentIndex > 0 ? this.news[this.currentIndex - 1].id : null;
    },
    nextArticleId() {
      return this.currentIndex < this.news.length - 1
        ? this.news[this.currentIndex + 1].id
        : null;
    },
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>
