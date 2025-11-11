<template>
  <div v-if="showLoginModal" class="modal-backdrop fade show"></div>
  <div
    class="modal fade"
    :class="{ show: showLoginModal, 'd-block': showLoginModal }"
    tabindex="-1"
    role="dialog"
    aria-labelledby="Speedy Sites Login"
    aria-hidden="true"
  >
    <div class="modal-dialog popup-model" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="column" id="main">
            <button
              type="button"
              class="btn-close"
              @click="hideLoginModal"
              aria-label="Close"
            >
              <i class="fa fa-times"></i>
            </button>

            <a class="navbar-brand-logo" style="cursor: pointer;text-align: center;">
              <img class="imgisite" src="/images/ss_logo.png" alt="logo" style="width: 40%;">
            </a>

            <form class="form-start">
              <div class="main-form1" style="display: flex;justify-content: space-evenly;flex-wrap: wrap;">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    placeholder="Email"
                    aria-describedby="emailHelp"
                    v-model="formDataLogin.email"
                  />
                  <div class="text-danger">{{ allErrorsLogin.email }}</div>
                </div>
                <div class="form-group" style="position: relative;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <label for="exampleInputPassword1" style="margin-bottom: 0;">Password</label>
                    <a
                      class="text-body forgotPassword"
                      @click.prevent="emits('showAnotherModal', 'forget')"
                      style="font-size: 14px; color: #0d6efd; cursor: pointer;"
                    >
                      Forgotten?
                    </a>
                  </div>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    v-model="formDataLogin.password"
                  />
                  <!-- Toggle icon -->
                  <i
                    :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
                    @click="togglePasswordVisibility"
                    style="position: absolute;top: 58px;right: 15px;cursor: pointer;font-size: 18px;"
                  ></i>
                  <div class="text-danger">{{ allErrorsLogin.password }}</div>
                  <div v-if="backendError && Object.keys(allErrorsLogin).length === 0" class="text-danger">
                    {{ backendError }}
                  </div>

                </div>
                <!-- <a class="text-body forgotPassword" @click="emits('showAnotherModal', 'forget')"
                  >Forgot password?</a
                > -->

                <!-- <div class="text-danger">{{ backendError }}</div> -->
              </div>
              <div class="login-logo"  style="text-align: center;">
                <button
                  type="submit"
                  class="btn btn-primary1"
                  @click="login"
                  :disabled="underAction"
                  style="
                    width: 71%;
                    margin: 15px auto;"
                >
                  Sign In
                </button>
                <!-- Loader Overlay -->
                <div v-if="underAction" class="loader-overlay">
                  <div class="three-body3">
                    <div class="three-body__dot1"></div>
                    <div class="three-body__dot1"></div>
                    <div class="three-body__dot1"></div>
                  </div>
                </div>
              </div>
              <div class="dontAcc">
                <a href="javascript:void(0)" @click.prevent="emits('showAnotherModal', 'signup')" class="signIn-btn">Don't have an account?</a>
              </div>
            </form>
          </div>
          <div>
            <svg
              width="67px"
              height="578px"
              viewBox="0 0 67 578"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title>Path</title>
              <desc>Created with Sketch.</desc>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <path
                  d="M11.3847656,-5.68434189e-14 C-7.44726562,36.7213542 5.14322917,126.757812 49.15625,270.109375 C70.9827986,341.199016 54.8877465,443.829224 0.87109375,578 L67,578 L67,-5.68434189e-14 L11.3847656,-5.68434189e-14 Z"
                  id="Path"
                  fill="#0e1532"
                ></path>
              </g>
            </svg>
          </div>
          <div class="column" id="secondary">
            <div class="sec-content">
              <h2>Welcome Back!</h2>
              <!-- <button
                type="button"
                class="btn btn-primary"
                @click="emits('showAnotherModal', 'signup')"
              >
                Sign Up
              </button> -->
              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  watch
} from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import WordpressService from "@/service/WordpressService";
import { useRouter } from "vue-router";
import GoogleLogin from "@/components/common/modals/GoogleLogin.vue";

const { Errors, resetForm, handleSubmit } = useForm();

const allErrorsLogin = ref({})
const formDataLogin = ref({})
const emits = defineEmits(['closeModal', 'showAnotherModal']);
const underAction = ref(false);
const router = useRouter();
const backendError = ref("");

const props = defineProps({
  showLoginModal: {
      type:Boolean,
      default:false
    }
});

const resetLoginForm = () => {
  formDataLogin.value = {};
  allErrorsLogin.value = {};
  backendError.value = "";
  showPassword.value = false;
};

watch(
  () => props.showLoginModal,
  (newVal) => {
    if (newVal) {
      resetLoginForm();
    }
  }
);

// Hide modal
const hideLoginModal = () => {
  resetLoginForm();
  emits("closeModal");
};

const validationSchemaLogin = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .matches(
      /^[^+]+@[^+]+\.[^+]+$/,
      "Email address cannot contain the '+' character."
    )
    .required("Please enter your email address."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must not exceed 20 characters.")
    .required("Please enter your password."),
});

const login = handleSubmit(async () => {
  try {
    underAction.value = true;
    await validationSchemaLogin.validate(formDataLogin.value, {
      abortEarly: false,
    });
    allErrorsLogin.value = {};
    backendError.value = "";

    const response = await WordpressService.loginUser(formDataLogin.value);

    if (response.status === 200 && response.data.success) {
      const token = response.data.token;
      localStorage.setItem("access_token", token);

      const fetchDashboardData = await WordpressService.fetchDashboardData();
      if (
        fetchDashboardData.status === 200 &&
        fetchDashboardData.data.success
      ) {
        const savedPlan = localStorage.getItem("selectedPlan");
        if (savedPlan) {
          const planObj = JSON.parse(savedPlan);
          const encodedPlanId = btoa(planObj.id.toString());
          router.push(`/checkout/${encodedPlanId}`);
        } else {
          router.push("/dashboard");
        }
      } else {
        router.push("/login");
      }
    }
  } catch (error) {
    allErrorsLogin.value = {};
    backendError.value = "";

    const status = error?.response?.status || null;
    const responseMessage = error?.response?.data?.message || "";

    if (error.inner && Array.isArray(error.inner)) {
      allErrorsLogin.value = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
      underAction.value = false;
      return;
    }

    if (status === 400 && error.response?.data?.errors) {
      allErrorsLogin.value = Object.fromEntries(
        Object.entries(error.response.data.errors).map(([key, value]) => [
          key,
          Array.isArray(value) ? value[0] : value,
        ])
      );
    }

    else if (
      error.response &&
      (error.response.status === 401 || error.response.status === 405)
    ) {
      backendError.value = error?.response?.data?.message;
    } else if (
      error.response && error.response.status === 404
    ) {
      backendError.value = "An error occurred while logging in. Please try again.";
    } else {
      backendError.value = "An error occurred while logging in. Please try again.";
      console.error("Login error:", error);
    }

    underAction.value = false;
  }
});


const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

</script>