<template>
  <div class="affiliate-login-container">

    <!-- Top Logo -->
    <div class="top-logo-wrapper">
      <img class="top-logo" src="/images/ss_logo.png" alt="logo" />
    </div>

    <!-- LOGIN CARD -->
    <div class="login-card">

      <h2 class="title">Affiliate Login</h2>
      <p class="subtitle">Welcome back! Please log in to your account.</p>

      <form class="form-start">

        <!-- Email -->
        <div class="form-group">
          <label>Email</label>
          <input 
            type="email"
            class="form-control"
            v-model="formDataLogin.email"
            placeholder="Enter your email"
          />
          <div class="text-danger">{{ allErrorsLogin.email }}</div>
        </div>

        <!-- Password -->
        <div class="form-group" style="position: relative;">
          <div style="display: flex; justify-content: space-between;">
            <label>Password</label>

            <span
              @click.prevent="$router.push('/affiliate-forgot-password')"
              style="font-size: 14px; color: rgb(22 33 88); cursor: pointer;"
            >
              Forgotten?
            </span>
          </div>

          <input
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            placeholder="Enter your password"
            v-model="formDataLogin.password"
          />

          <!-- Eye Toggle -->
          <i
            :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
            @click="togglePasswordVisibility"
            class="toggle-eye"
          ></i>

          <div class="text-danger">{{ allErrorsLogin.password }}</div>

          <div v-if="backendError && Object.keys(allErrorsLogin).length === 0" 
               class="text-danger">
            {{ backendError }}
          </div>
        </div>

        <!-- Login Button -->
        <button
          class="btn btn-primary1 login-button"
          type="submit"
          @click="login"
          :disabled="underAction"
        >
          Sign In
        </button>

        <!-- Loader -->
        <div v-if="underAction" class="three-body3" style="text-align:center;">
          <div class="three-body__dot1"></div>
          <div class="three-body__dot1"></div>
          <div class="three-body__dot1"></div>
        </div>

        <!-- Signup Link -->
        <p class="signup-link">
          Don't have an account?
          <router-link to="/affiliate-signup">Sign Up</router-link>
        </p>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";
import WordpressService from "@/service/WordpressService";

const router = useRouter();
const { handleSubmit } = useForm();

const formDataLogin = ref({});
const allErrorsLogin = ref({});
const backendError = ref("");
const underAction = ref(false);
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const validationSchemaLogin = yup.object({
  email: yup
    .string()
    .email("Please enter valid email.")
    .matches(/^[^+]+@[^+]+\.[^+]+$/, "Email cannot contain '+'")
    .required("Email is required."),
  password: yup
    .string()
    .min(6, "Minimum 6 characters.")
    .max(20, "Max 20 characters.")
    .required("Password is required."),
});

const login = handleSubmit(async () => {
  try {
    underAction.value = true;
    await validationSchemaLogin.validate(formDataLogin.value, {
      abortEarly: false,
    });

    allErrorsLogin.value = {};
    backendError.value = "";

    const payload = {
      ...formDataLogin.value,
      user_type: "agent",
    };

    const response = await WordpressService.loginUser(payload);

    if (response.status === 200 && response.data.success) {
      localStorage.setItem("access_token", response.data.token);

      router.push("/affiliate-dashboard");
    }
  } catch (error) {
    allErrorsLogin.value = {};
    backendError.value = "";

    if (error.inner) {
      allErrorsLogin.value = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
    } else {
      backendError.value = error?.response?.data?.message || "Login failed.";
    }
  }

  underAction.value = false;
});
</script>

<style scoped>
/* Full page white background */
.affiliate-login-container {
  background: #ffffff;
  min-height: 100vh;
  padding: 40px 20px;
  text-align: center;
}

/* Logo */
.top-logo-wrapper {
  margin-bottom: 25px;
}

.top-logo {
  width: 220px;
}

/* Login Card */
.login-card {
  max-width: 450px;
  margin: auto;
  padding: 35px;
  border-radius: 12px;
  background: #f4f6ff; /* Light unique color */
  box-shadow: 0px 8px 25px rgba(0,0,0,0.1);
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

.login-button {
  width: 100%;
  margin-top: 15px;
}

.signup-link {
  margin-top: 18px;
  font-size: 14px;
}

.three-body3 {
  top: 32% !important;
  right: 48% !important;
}
</style>
