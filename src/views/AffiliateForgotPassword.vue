<template>
    <FlashMessage :visible="store.flashMeassge" v-if="store.flashMeassge" :class="flashClass" />
    <div class="affiliate-passforgot-container">

        <!-- Top Logo -->
        <div class="top-logo-wrapper">
            <router-link to="/affiliate">
                <img class="top-logo" src="/images/ss_logo.png" alt="logo" />
            </router-link>
        </div>

        <!-- RESET CARD -->
        <div class="passforgot-card">

        <h2 class="title">Reset Password</h2>
        <p class="subtitle">Enter your registered email and we’ll help you reset your password.</p>

        <form class="form-start" @submit.prevent="sendResetLink">

            <!-- Email -->
            <div class="form-group">
            <label>Email</label>
            <input 
                type="email"
                class="form-control"
                v-model="formData.email"
                placeholder="Enter your registered email"
            />
            <div class="text-danger mt-1">{{ errors.email }}</div>
            </div>

            <!-- Backend Error -->
            <div v-if="backendError" class="text-danger mt-1">{{ backendError }}</div>

            <!-- Reset Button -->
            <button
            class="btn btn-primary1 passforgot-button"
            type="submit"
            :disabled="loading"
            >
            Email Reset Link
            </button>

            <!-- Loader -->
            <div v-if="loading" class="three-body3" style="text-align:center;">
            <div class="three-body__dot1"></div>
            <div class="three-body__dot1"></div>
            <div class="three-body__dot1"></div>
            </div>

            <!-- Back Link -->
            <p class="signup-link">
            Back to
            <router-link to="/affiliate-login">Login</router-link>
            </p>

        </form>

        </div>

    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import * as yup from "yup";
import { useRouter } from "vue-router";
import WordpressService from "@/service/WordpressService";
import { useStore } from "@/stores/store";
import FlashMessage from "@/components/common/FlashMessage.vue";

const store = useStore();
const router = useRouter();

const formData = ref({ email: "" });
const errors = ref({});
const backendError = ref("");
const loading = ref(false);
const flashClass = computed(() => 
    store.flashMeassgeType === 'error' ? 'flash-error' : 'flash-success'
);

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .matches(/^[^+]+@[^+]+\.[^+]+$/, "Email cannot contain '+'")
    .required("Email is required"),
});

const sendResetLink = async () => {
  try {
    loading.value = true;
    errors.value = {};
    backendError.value = "";

    await schema.validate(formData.value, { abortEarly: false });

    const response = await WordpressService.ResetPassword.forgotPassword(formData.value);

    if (response.data.success) {
      store.updateFlashMeassge(
        true,
        "Password reset link has been sent to your email."
      );
      formData.value.email = "";
      backendError.value = "";
      setTimeout(() => {
        router.push("/affiliate-login");
      }, 1000);
    }
  } catch (error) {
    if (error.inner) {
      errors.value = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
    } else {
      backendError.value = error?.response?.data?.message || "Something went wrong";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.affiliate-passforgot-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  min-height: 100vh;
  background: #f5f7fb;
}

.top-logo-wrapper {
  margin-bottom: 20px;
}

.top-logo {
  width: 160px;
}

.passforgot-card {
  width: 400px;
  background: #f4f6ff;
  padding: 30px 35px;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.08);
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #162158;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 25px;
  font-size: 14px;
}

.form-group label {
  font-weight: 600;
}

.passforgot-button {
  width: 100%;
  margin-top: 10px;
}

.signup-link {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.flash-success {
  background-color: #d4edda;
  color: #155724;
}

.flash-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 2px solid #721c24;
}
</style>
