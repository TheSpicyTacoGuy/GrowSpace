<script setup>
import JobList from "./JobList.vue";
</script>

<template>
  <div
    id="jobexplorer"
    class="p-2 my-5 container-fluid border border-2 rounded-3"
    aria-labelledby="job-explorer-heading"
  >
    <div class="row">
      <div
        class="col-12 col-md-4"
        role="navigation"
        aria-labelledby="job-explorer-heading"
      >
        <h1
          id="job-explorer-heading"
          class="display-6 px-3 pb-2"
          aria-label="Job Explorer"
        >
          Job Explorer
        </h1>
        <JobList />
      </div>
      <div
        class="px-3 col-12 col-md-8"
        role="article"
        aria-labelledby="job-overview-heading"
      >
        <!-- This is where the job details will be displayed -->
        <router-view name="job_explorer_view" />
      </div>
    </div>
  </div>
</template>
