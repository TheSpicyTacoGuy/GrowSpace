<script setup>
import { ref, onMounted, watch } from "vue";
import { showToast } from "/js/toast.js";

const props = defineProps({
  job_id: String, // Accept job_id as a prop
});

const job = ref(null);

const fetchJobDetails = async (jobId) => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}jobs.txt`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    job.value = data.find((job) => job.job_id === jobId);
    if (!job.value) {
      job.value = "not found"; // Set job to null if not found
      showToast("Job not found. Please check the job ID.", "error");
    }
  } catch (error) {
    console.error("Error fetching job details:", error);
    showToast("Error fetching job details. Please try again later.", "error");
  }
};

const updateJobDetails = () => {
  fetchJobDetails(props.job_id);
};

onMounted(() => {
  updateJobDetails();
});

watch(
  () => props.job_id,
  () => {
    updateJobDetails();
  }
);
</script>

<template>
  <div class="mt-md-5 pt-3" v-if="job !== null && job !== 'not found'">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title" id="job-overview-heading">
          {{ job.job_title }} ({{ job.job_id }})
        </h2>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><strong>ID:</strong> {{ job.job_id }}</li>
          <li class="list-group-item">
            <strong>Category:</strong> {{ job.category }}
          </li>
          <li class="list-group-item">
            <strong>Location:</strong> {{ job.location }}
          </li>
          <li class="list-group-item">
            <strong>Employment Type:</strong> {{ job.employment_type }}
          </li>
          <li class="list-group-item">
            <strong>Salary Range:</strong> {{ job.salary_range }}
          </li>
          <li class="list-group-item">
            <strong>Job Level:</strong> {{ job.job_level }}
          </li>
          <li class="list-group-item">
            <strong>Required Skills:</strong>
            {{ job.required_skills.join(", ") }}
          </li>
          <li class="list-group-item">
            <strong>Preferred Qualifications:</strong>
            {{ job.preferred_qualifications.join(", ") }}
          </li>
          <li class="list-group-item">
            <strong>Description:</strong> {{ job.job_description }}
          </li>
          <li class="list-group-item">
            <strong>Application Deadline:</strong>
            {{ job.application_deadline }}
          </li>
          <li class="list-group-item">
            <strong>Posted Date:</strong> {{ job.posted_date }}
          </li>
          <li class="list-group-item">
            <strong>Company:</strong> {{ job.company }}
          </li>
          <li class="list-group-item">
            <strong>Supervisor:</strong> {{ job.supervisor }}
          </li>
          <li class="list-group-item">
            <strong>Positions Available:</strong> {{ job.positions_available }}
          </li>
          <li class="list-group-item">
            <strong>Start Date:</strong> {{ job.start_date }}
          </li>
          <li class="list-group-item">
            <strong>Tags:</strong> {{ job.tags.join(", ") }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else-if="job === 'not found'">
    <div class="alert alert-danger mt-3" role="alert">
      Job not found. Please check the job ID.
    </div>
  </div>
  <div v-else>
    <div
      class="d-flex justify-content-center align-items-center mt-5 pt-2"
      style="height: 100px"
    >
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>
