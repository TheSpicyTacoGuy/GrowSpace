<script>
import { RouterLink } from "vue-router";

export default {
  name: "JobList",
  components: {
    RouterLink,
  },
  data() {
    return {
      jobs: [],
      currentRoute: "/overview",
    };
  },
  created() {
    fetch(`${import.meta.env.BASE_URL}jobs.txt`)
      .then((response) => response.json())
      .then((data) => {
        this.jobs = data;
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  },
  watch: {
    "$route.path"(newPath) {
      //send the update to currentRoute
      this.currentRoute = newPath || "/overview";
    },
  },
};
</script>
<template>
  <div class="container">
    <ul class="list-group">
      <li
        :class="[
          'list-group-item',
          'd-flex',
          'justify-content-between',
          'align-items-center',
          currentRoute === '/overview' ? 'active' : '',
        ]"
      >
        <RouterLink to="/overview" class="text-decoration-none"
          >Overview</RouterLink
        >
      </li>
      <li
        v-for="job in jobs"
        :key="job.job_id"
        :class="[
          'list-group-item',
          'd-flex',
          'justify-content-between',
          'align-items-center',
          currentRoute === '/' + job.job_id ? 'active' : '',
        ]"
      >
        <RouterLink :to="'/' + job.job_id" class="text-decoration-none">
          {{ job.job_id }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
