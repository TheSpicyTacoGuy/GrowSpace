<template>
  <div
    id="application-form"
    class="py-3 d-flex border border-2 rounded-3 shadow-sm"
    aria-labelledby="application-form-heading"
  >
    <form
      method="post"
      action="https://mercury.swin.edu.au/it000000/formtest.php"
      @submit.prevent="validateForm"
      class="container-fluid"
    >
      <h1 class="mb-4" id="application-form-heading">Application Form</h1>
      <fieldset class="mb-4">
        <legend class="fw-bold">Personal Information</legend>
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="firstName" class="form-label">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              v-model="form.firstName"
              @input="validateFirstName"
              class="form-control"
            />
            <div
              :class="[
                'form-text small',
                errors.firstName ? 'text-danger' : 'text-muted',
              ]"
            >
              {{
                errors.firstName ||
                "Enter letters only, no spaces or special characters"
              }}
            </div>
          </div>
          <div class="col-md-6">
            <label for="lastName" class="form-label">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              v-model="form.lastName"
              @input="validateLastName"
              class="form-control"
            />
            <div
              :class="[
                'form-text small',
                errors.lastName ? 'text-danger' : 'text-muted',
              ]"
            >
              {{
                errors.lastName ||
                "Enter letters only, no spaces or special characters"
              }}
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="dob" class="form-label">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            placeholder="Enter your date of birth"
            v-model="form.dob"
            @input="validateDOB"
            class="form-control"
          />
          <div
            :class="[
              'form-text small',
              errors.dob ? 'text-danger' : 'text-muted',
            ]"
          >
            {{ errors.dob || "You must be at least 16 years old" }}
          </div>
        </div>
      </fieldset>

      <fieldset class="mb-4">
        <legend class="fw-bold">Account Information</legend>
        <div class="row mb-3">
          <div class="col-md-6 mb-3">
            <label for="username" class="form-label">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter a username"
              v-model="form.username"
              @input="validateUsername"
              class="form-control"
            />
            <div
              :class="[
                'form-text small',
                errors.username ? 'text-danger' : 'text-muted',
              ]"
            >
              {{ errors.username || "Must be at least 3 characters" }}
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="password" class="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a strong password"
              v-model="form.password"
              @input="validatePassword"
              class="form-control"
            />
            <div
              :class="[
                'form-text small',
                errors.password ? 'text-danger' : 'text-muted',
              ]"
            >
              {{
                errors.password ||
                "Must be at least 8 characters, with one Special Character ($, %, ^, &, *)"
              }}
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="confirmPassword" class="form-label"
              >Confirm Password:</label
            >
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              v-model="form.confirmPassword"
              @input="validateConfirmPassword"
              class="form-control"
            />
            <div
              :class="[
                'form-text small',
                errors.confirmPassword ? 'text-danger' : 'text-muted',
              ]"
            >
              {{ errors.confirmPassword || "" }}
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="email" class="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              v-model="form.email"
              @input="validateEmail"
              class="form-control"
            />
            <div
              :class="[
                'form-text small',
                errors.email ? 'text-danger' : 'text-muted',
              ]"
            >
              {{ errors.email || "Must be a valid email format" }}
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset class="mb-4">
        <legend class="fw-bold">Address</legend>
        <div class="row mb-3">
          <div class="col-md-6 mb-3">
            <label for="streetAddress" class="form-label"
              >Street Address:</label
            >
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              placeholder="Enter your street address"
              v-model="form.streetAddress"
              maxlength="40"
              class="form-control"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="suburb" class="form-label">Suburb:</label>
            <input
              type="text"
              id="suburb"
              name="suburb"
              placeholder="Enter your suburb"
              v-model="form.suburb"
              maxlength="20"
              class="form-control"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="postcode" class="form-label">Postcode:</label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              placeholder="Enter your postcode"
              v-model="form.postcode"
              @input="validatePostcode"
              class="form-control"
            />
            <div
              :class="[
                'form-text small',
                errors.postcode ? 'text-danger' : 'text-muted',
              ]"
            >
              {{ errors.postcode || "Must be exactly 4 digits" }}
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="mobile" class="form-label">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter your mobile number"
              v-model="form.mobile"
              @input="validateMobile"
              class="form-control"
            />
            <div
              :class="[
                'form-text small',
                errors.mobile ? 'text-danger' : 'text-muted',
              ]"
            >
              {{
                errors.mobile || "Must be exactly 10 digits, starting with 04"
              }}
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset class="mb-4">
        <legend class="fw-bold">Preferences</legend>
        <div class="mb-3">
          <label for="jobCategory" class="form-label"
            >Preferred Job Category:</label
          >
          <select
            id="jobCategory"
            name="jobCategory"
            aria-label="Select your preferred job category"
            v-model="form.jobCategory"
            @change="validateJobCategory"
            class="form-select"
          >
            <option value="" disabled>Select a category</option>
            <option value="AI">AI</option>
            <option value="Data Science">Data Science</option>
            <option value="Web Development">Web Development</option>
          </select>
          <div
            :class="[
              'form-text small',
              errors.jobCategory ? 'text-danger' : 'text-muted',
            ]"
          >
            {{ errors.jobCategory || "" }}
          </div>
        </div>
      </fieldset>

      <div class="mb-3">
        <button type="button" @click="toggleTerms" class="btn btn-secondary">
          Terms and Conditions
        </button>
        <p v-if="showTerms" class="mt-2">
          By submitting this form, you agree to our terms and conditions. Please
          read them carefully before proceeding.
        </p>
      </div>

      <div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <div class="form-text small mt-2" v-if="Object.keys(errors).length > 0">
          Please correct the errors above before submitting.
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { showToast } from "../js/toast";
export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        streetAddress: "",
        suburb: "",
        postcode: "",
        mobile: "",
        dob: "",
        jobCategory: "",
      },
      errors: {},
      showTerms: false,
    };
  },
  methods: {
    validateForm() {
      this.validateFirstName();
      this.validateLastName();
      this.validateUsername();
      this.validatePassword();
      this.validateConfirmPassword();
      this.validateEmail();
      this.validatePostcode();
      this.validateMobile();
      this.validateDOB();
      this.validateJobCategory();

      if (Object.keys(this.errors).length === 0) {
        // Get the form element
        const formEl = this.$el.querySelector("form");

        // Create a new form element to submit in a new tab
        const newForm = document.createElement("form");
        newForm.action = formEl.action;
        newForm.method = formEl.method;
        newForm.target = "_blank";

        // Copy all form fields
        const formData = new FormData(formEl);
        for (let [name, value] of formData.entries()) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          input.value = value;
          newForm.appendChild(input);
        }

        // Add to document, submit, and remove
        document.body.appendChild(newForm);
        newForm.submit();
        document.body.removeChild(newForm);

        // Show success message
        showToast("Form submitted successfully!", "success");
      } else {
        // Show error message
        showToast("Please correct the errors before submitting.", "error");
        // Find the first field with an error and scroll to it
        this.$nextTick(() => {
          const firstErrorField = this.$el
            .querySelector(".text-danger")
            .closest(".mb-3");
          if (firstErrorField) {
            firstErrorField.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        });
      }
    },
    validateFirstName() {
      const regex = /^[A-Za-z]+$/;
      if (!this.form.firstName) {
        this.errors.firstName = "First name is required.";
      } else if (!regex.test(this.form.firstName)) {
        this.errors.firstName = "First name must contain only letters.";
      } else {
        delete this.errors.firstName;
      }
    },
    validateLastName() {
      const regex = /^[A-Za-z]+$/;
      if (!this.form.lastName) {
        this.errors.lastName = "Last name is required.";
      } else if (!regex.test(this.form.lastName)) {
        this.errors.lastName = "Last name must contain only letters.";
      } else {
        delete this.errors.lastName;
      }
    },
    validateUsername() {
      if (!this.form.username) {
        this.errors.username = "Username is required.";
      } else if (this.form.username.length < 3) {
        this.errors.username = "Username must be at least 3 characters.";
      } else {
        delete this.errors.username;
      }
    },
    validatePassword() {
      const regex = /[$%^&*@]/;
      if (!this.form.password) {
        this.errors.password = "Password is required.";
      } else if (this.form.password.length < 8) {
        this.errors.password = "Password must be at least 8 characters.";
      } else if (!regex.test(this.form.password)) {
        this.errors.password =
          "Password must include at least one special character ($, %, ^, &, *).";
      }
      if (
        this.form.password &&
        this.form.password.length >= 8 &&
        regex.test(this.form.password)
      ) {
        delete this.errors.password;
      }
    },
    validateConfirmPassword() {
      if (this.form.confirmPassword !== this.form.password) {
        this.errors.confirmPassword = "Passwords do not match.";
      } else {
        delete this.errors.confirmPassword;
      }
    },
    validateEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.form.email) {
        this.errors.email = "Email is required.";
      } else if (!regex.test(this.form.email)) {
        this.errors.email = "Email must be a valid format.";
      } else {
        delete this.errors.email;
      }
    },
    validatePostcode() {
      const regex = /^\d{4}$/;
      if (!this.form.postcode) {
        this.errors.postcode = "Postcode is required.";
      } else if (!regex.test(this.form.postcode)) {
        this.errors.postcode = "Postcode must be exactly 4 digits.";
      } else {
        delete this.errors.postcode;
      }
    },
    validateMobile() {
      const regex = /^04\d{8}$/;
      if (!this.form.mobile) {
        this.errors.mobile = "Mobile number is required.";
      } else if (!regex.test(this.form.mobile)) {
        this.errors.mobile =
          "Mobile number must be exactly 10 digits and start with 04.";
      } else {
        delete this.errors.mobile;
      }
    },
    validateDOB() {
      if (!this.form.dob) {
        this.errors.dob = "Date of birth is required.";
      } else {
        const dob = new Date(this.form.dob);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < dob.getDate())
        ) {
          age--;
        }
        if (age < 16) {
          this.errors.dob = "You must be at least 16 years old.";
        } else {
          delete this.errors.dob;
        }
      }
    },
    validateJobCategory() {
      if (!this.form.jobCategory) {
        this.errors.jobCategory = "Preferred job category is required.";
      } else {
        delete this.errors.jobCategory;
      }
    },
    toggleTerms() {
      this.showTerms = !this.showTerms;
    },
  },
};
</script>
