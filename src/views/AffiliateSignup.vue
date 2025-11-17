<template>
  <div class="affiliate-page-container">

    <!-- TOP LOGO OUTSIDE CARD -->
    <div class="top-logo-wrapper">
      <img class="top-logo" src="/images/ss_logo.png" alt="logo" />
    </div>

    <!-- SIGNUP CARD -->
    <div class="signup-card">

      <h2 class="title">SpeedySites Agents</h2>
      <p class="subtitle">Become an agent and start earning!</p>

      <div class="form-start">

        <div class="form-group">
          <label>Name</label>
          <input 
            type="text"
            class="form-control"
            v-model="formData.name"
            placeholder="Enter your name"
          />
          <div class="text-danger">{{ allErrors.name }}</div>
        </div>

        <div class="form-group">
            <label for="exampleInputPassword1">Phone</label>
            <input
                type="text"
                class="form-control"
                placeholder="Enter your Phone Number"
                v-model="formData.phone"
            />
            <div class="text-danger">{{ allErrors.phone }}</div>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input 
            type="email"
            class="form-control"
            v-model="formData.email"
            placeholder="Enter your email"
          />
          <div class="text-danger">{{ allErrors.email }}</div>
        </div>

        <div class="form-group" style="position: relative;">
          <label>Password</label>
          <input 
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            v-model="formData.password"
            placeholder="Create a password"
          />

          <i 
            :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
            @click="togglePasswordVisibility"
            class="toggle-eye"
          ></i>

          <div class="text-danger">{{ allErrors.password }}</div>
          <div v-if="backendError" class="text-danger">{{ backendError }}</div>
        </div>

        <!-- BUTTON -->
        <button 
          class="btn btn-primary1 signup-button"
          @click="registerUser"
          :disabled="isDisabledSignUp"
        >
          Sign Up
        </button>

        <div v-if="loadingSignup" class="three-body3">
          <div class="three-body__dot1"></div>
          <div class="three-body__dot1"></div>
          <div class="three-body__dot1"></div>
        </div>

        <!-- LOGIN LINK -->
        <p class="login-link">
          Already have an account? 
          <router-link to="/affiliate-login">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import WordpressService from "@/service/WordpressService";
import { useRouter } from "vue-router";

const router = useRouter();

const { Errors, handleSubmit } = useForm();

const formData = ref({});
const allErrors = ref({});
const backendError = ref("");
const showPassword = ref(false);
const loadingSignup = ref(false);
const isDisabledSignUp = ref(false);

const signupValidationSchema = yup.object({
    name: yup.string().required("Please enter your name."),
    phone: yup
        .string()
        .matches(/^[0-9()+-\s]+$/, "Please enter a valid phone number.")
        .required("Please enter your phone number."),
    email: yup
        .string()
        .email("Please enter a valid email address.")
        .matches(/^[^+]+@[^+]+\.[^+]+$/, "Email address cannot contain '+'")
        .required("Please enter your email."),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters.")
        .max(20, "Password must not exceed 20 characters.")
        .required("Please enter your password."),
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const registerUser = handleSubmit(async () => {
  try {
    isDisabledSignUp.value = true;
    loadingSignup.value = true;

    await signupValidationSchema.validate(formData.value, { abortEarly: false });
    allErrors.value = {};

    const payload = {
      ...formData.value,
      user_type: "agent",
      referral_code: null,
    };

    const response = await WordpressService.registerUser(payload);

    if (response.status === 200 && response.data.success) {
      localStorage.setItem("access_token", response.data.token);
      router.push("/affiliate-dashboard");
    }

  } catch (error) {
    allErrors.value = {};
    backendError.value = "";

    if (error.inner && Array.isArray(error.inner)) {
      allErrors.value = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
    }

    else if (error.response?.status === 400 && error.response.data.errors) {
      allErrors.value = Object.fromEntries(
        Object.entries(error.response.data.errors).map(([key, val]) => [
          key, Array.isArray(val) ? val[0] : val,
        ])
      );
    }

    else if (error.response?.status === 500) {
      backendError.value = error.response.data.message || "An unexpected error occurred.";
    }

    else {
      backendError.value = "Something went wrong. Please try again later.";
    }

  }
  isDisabledSignUp.value = false;
  loadingSignup.value = false;
});
</script>

<style scoped>
/* Full page background */
.affiliate-page-container {
  background: #ffffff;  
  min-height: 100vh;
  padding: 40px 20px;
  text-align: center;
}

/* Top logo outside card */
.top-logo-wrapper {
  margin-bottom: 25px;
}

.top-logo {
  width: 220px;
}

/* Signup card with unique color */
.signup-card {
  max-width: 450px;
  margin: auto;
  padding: 35px;
  border-radius: 12px;
  background: #f4f6ff; /* Unique soft blue background */
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-group {
  text-align: left;
  margin-bottom: 18px;
}

.form-control {
  height: 45px;
}

.toggle-eye {
  position: absolute;
  right: 15px;
  top: 37px;
  cursor: pointer;
  font-size: 18px;
}

.signup-button {
  width: 100%;
  margin-top: 15px;
}

.login-link {
  margin-top: 18px;
  font-size: 14px;
}

.three-body3 {
  top: 44% !important;
  right: 48% !important;
}
</style>
