<template>
  <div class="container-fluid p-4 bg-body-tertiary rounded-5 shadow-sm">
    <h1 class="mb-4">About GrowSpace</h1>

    <!-- App description paragraph -->
    <div class="card mb-4">
      <div class="card-body">
        <p class="lead">
          GrowSpace is a comprehensive greenhouse management solution designed
          to help growers optimize plant cultivation, monitor environmental
          conditions, and streamline operations. Our platform provides real-time
          insights into your greenhouse performance, automated task scheduling,
          and detailed analytics to maximize your growing potential while
          minimizing resource usage.
        </p>
      </div>
    </div>

    <!-- User input section -->
    <div class="card mb-4">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Welcome to GrowSpace</h4>
      </div>
      <div class="card-body">
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label for="firstName" class="form-label">First Name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              v-model="firstName"
              placeholder="Enter your first name"
            />
          </div>
          <div class="col-md-6">
            <label for="lastName" class="form-label">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              v-model="lastName"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div v-if="hasName" class="alert alert-success">
          <h5>{{ welcomeMessage }}</h5>
          <p>
            Thank you for your interest in GrowSpace. We're excited to help you
            revolutionize your greenhouse management!
          </p>
        </div>
      </div>
    </div>

    <!-- Image selection section -->
    <div class="card mb-4">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Select Your Inspiration</h4>
      </div>
      <div class="card-body">
        <p>Which environment inspires your greenhouse design?</p>

        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="radio"
            name="imageChoice"
            id="mountainOption"
            value="mountain"
            v-model="selectedImage"
          />
          <label class="form-check-label" for="mountainOption">
            Mountain Environment
          </label>
        </div>

        <div class="form-check mb-4">
          <input
            class="form-check-input"
            type="radio"
            name="imageChoice"
            id="farmOption"
            value="farm"
            v-model="selectedImage"
          />
          <label class="form-check-label" for="farmOption">
            Farm Environment
          </label>
        </div>

        <div v-if="selectedImage" class="text-center">
          <img
            :src="getImagePath"
            :alt="`${selectedImage} environment`"
            class="img-fluid rounded shadow"
            style="max-height: 300px"
          />
          <p class="mt-2 text-muted">{{ imageDescription }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutComponent",
  data() {
    return {
      firstName: "",
      lastName: "",
      selectedImage: "",
    };
  },
  computed: {
    hasName() {
      return this.firstName.trim() !== "" || this.lastName.trim() !== "";
    },
    welcomeMessage() {
      if (this.firstName && this.lastName) {
        return `Welcome, ${this.firstName} ${this.lastName}!`;
      } else if (this.firstName) {
        return `Welcome, ${this.firstName}!`;
      } else if (this.lastName) {
        return `Welcome, ${this.lastName}!`;
      }
      return "Welcome!";
    },
    getImagePath() {
      if (this.selectedImage === "mountain") {
        return "assets/images/mountain.jpg";
      } else if (this.selectedImage === "farm") {
        return "assets/images/farm.jpg";
      }
      return "";
    },
    imageDescription() {
      if (this.selectedImage === "mountain") {
        return "Mountain environments inspire sustainable designs with natural cooling and efficient space utilization.";
      } else if (this.selectedImage === "farm") {
        return "farm-inspired greenhouses often feature humidity control systems and natural ventilation patterns.";
      }
      return "";
    },
  },
};
</script>
