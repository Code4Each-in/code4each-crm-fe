<script setup>
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import { useAuth } from "../../service/useAuth";
import { ref, onMounted } from "vue";
import FlashMessage from "@/components/common/FlashMessage.vue";
import { useStore } from "@/stores/store";
import WordpressService from "@/service/WordpressService";
import { EventBus } from "@/EventBus";
import { useRouter } from 'vue-router';
import Loader from "@/components/common/Loader.vue";

// Reactive variables
const { logout } = useAuth() || {};
const isSidebarToggled = ref(false);
const dashboardData = ref([]);
const store = useStore();
const plans = ref();
const router = useRouter();
const initialLoading = ref(true);

// Sidebar toggle handler
const navBarToggle = (value) => {
  isSidebarToggled.value = value;
};

const fetchDashboardData = async () => {
  try {
    const response = await WordpressService.fetchDashboardData();

    if (response.status === 200 && response.data.success) {
    //   loading.value = false;
      dashboardData.value = response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Authentication failed. Please log in.", error);
      error.value = true;
    //   loading.value = false;
      localStorage.removeItem("access_token");
      router.push("/login");
    } else {
      console.error("An error occurred:", error.message);
    }
  }
};

const fetchPlans = async (paymentId) => {
  try {
    const response = await WordpressService.Payment.fetchPlans();
    if (response.status === 200 && response.data.success) {
      plans.value = response.data?.plans
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const goToCheckout = (plan, index) => {
  // Add duration manually if your API doesn’t include it
  if (index === 0) {
    plan.duration_months = 1;
  } else if (index === 1) {
    plan.duration_months = 6;
  } else if (index === 2) {
    plan.duration_months = 12;
  }

  localStorage.setItem('selectedPlan', JSON.stringify(plan));
  const encodedPlanId = btoa(plan.id.toString());
  router.push(`/checkout/${encodedPlanId}`);
};

onMounted(async () => {
  fetchPlans();
  await fetchDashboardData();
  EventBus.on("fetchDashboardData", fetchDashboardData);
  initialLoading.value = false; 
}); 
</script>
<template>
  <div class="page">
    <FlashMessage :visible="store.flashMeassge" v-if="store.flashMeassge" />
    <NavBar
      @logout="logout"
      @nav-bar-toggle="navBarToggle"
      :dashboardData="dashboardData?.user"
    />
    <SideBar
      :dashboardData="dashboardData"
      :toggled="isSidebarToggled"
    />
    <div class="payment-plans-section">
      <div class="max-width">
        <div class="header">
          <h1 class="title">Choose Your Perfect Plan</h1>
          <p class="subtitle">
            Select the plan that fits your needs. All plans include our core features with flexible pricing options.
          </p>
        </div>
        <Loader v-if="initialLoading" />
        <div class="grid">
          <div
            class="payment-card"
            v-for="(plan, index) in plans"
            :key="plan.id"
            :class="{ popular: index === 2 }"
          >
            <div v-if="index !== 0" class="badge">Pre-Launch</div>

            <div class="payment-card-header">
              <h3 class="plan-name">{{ plan.name.replace(' Plan', '') }}</h3>
              <p class="plan-description">
                {{ index === 0
                  ? "Perfect for getting started"
                  : index === 1
                  ? "Great for short-term projects"
                  : "Best value for long-term success"
                }}
              </p>

              <div class="pricing">
                <span class="price">₹{{ plan.price }}</span>
                <div v-if="index !== 0" class="price-details">
                  <span class="original-price">₹999</span>
                  <span class="period">/mo</span>
                </div>
              </div>
            </div>

            <!-- <ul class="features">
              <li class="feature">
                <div class="check-icon"></div>
                <span class="feature-text">Max Websites: {{ plan.max_websites }}</span>
              </li>
              <li class="feature" v-if="index !== 0">
                <div class="check-icon"></div>
                <span class="feature-text">Priority Support</span>
              </li>
              <li class="feature" v-if="index === 2">
                <div class="check-icon"></div>
                <span class="feature-text">API Access</span>
              </li>
            </ul> -->

            <!-- BUTTON SECTION -->
            <div class="add-listing">
              <!-- Hide button completely if free plan -->
              <template v-if="plan.price > 0">
                <button
                  class="button"
                  :class="index === 2 ? 'button-primary hover-top' : 'button-outline hover-top'"
                  :disabled="dashboardData?.user?.plan_id === plan.id"
                  @click="goToCheckout(plan, index)"
                >
                  <!-- Dynamic text based on whether it's current plan -->
                  {{
                    dashboardData?.user?.plan_id === plan.id
                      ? "Current Plan"
                      : "Get Started"
                  }}
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .payment-plans-section {
    /* background-color: #fff; */
    padding: 98px 60px 88px 60px;
    margin-left: 200px;
  }

  .payment-plans-section .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .payment-plans-section .title {
    font-size: 3rem;
    font-weight: bold;
    background: #1d2b64;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .payment-plans-section .subtitle {
    font-size: 22px;
    color: #dc3545;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .payment-plans-section .payment-card {
    position: relative;
    padding: 2rem;
    background: hsl(0, 0%, 100%);
    border: 1px solid hsl(0, 0%, 90%);
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .payment-plans-section .payment-card:hover {
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
  }

  .payment-plans-section .payment-card.popular {
    border: 2px solid hsl(200, 100%, 50%);
    box-shadow: 0 10px 30px -10px rgba(0, 150, 255, 0.3);
    transform: scale(1.05);
  }

  .payment-plans-section .badge {
    position: absolute;
    top: -0.75rem;
    right: 1rem;
    padding: 10px 20px;
    background: hsl(200, 100%, 95%);
    color: hsl(200, 100%, 30%);
    font-size: 14px;
    font-weight: 500;
    border-radius: 9999px;
  }

  .payment-plans-section .payment-card-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .plan-name {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .plan-description {
    font-size: 0.875rem;
    color: hsl(0, 0%, 45%);
    margin-bottom: 1rem;
  }

  .pricing {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.75rem;
  }

  .price {
    font-size: 3.75rem;
    font-weight: 800;
    background: #1d2b64de;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 4px 6px rgba(0, 150, 255, 0.3));
  }

  .price-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }

  .original-price {
    font-size: 0.875rem;
    color: hsl(0, 0%, 45%);
    text-decoration: line-through;
    text-decoration-color: hsl(0, 84%, 60%);
    text-decoration-thickness: 1px;
  }

  .period {
    font-size: 0.875rem;
    color: hsl(0, 0%, 45%);
    font-weight: 500;
  }

  .features {
    list-style: none;
    margin-bottom: 2rem;
  }

  .feature {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .check-icon {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: hsl(200, 100%, 95%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.125rem;
  }

  .check-icon::before {
    content: "✓";
    color: hsl(200, 100%, 30%);
    font-size: 0.75rem;
    font-weight: bold;
  }

  .feature-text {
    font-size: 0.875rem;
  }

  .payment-plans-section .button {
    width: 100%;
    padding: 0.75rem 2rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    line-height: 0px;
    position: unset;
    transform: none;
  }

  .payment-plans-section .button-primary {
    background: hsl(200, 100%, 50%);
    color: white;
  }

  .payment-plans-section .button-primary:hover {
    background: hsl(200, 100%, 45%);
  }

  .payment-plans-section .button-outline {
      background: transparent;
      color: hsl(0, 0%, 3.9%);
      border: 1px solid hsl(0, 0%, 90%);
  }

  .payment-plans-section .button-outline:hover {
    background: hsl(200, 100%, 95%);
    color: hsl(200, 100%, 30%);
  }

  .current-plan-badge {
    position: absolute;
    top: -0.75rem;
    left: 1rem;
    padding: 8px 14px;
    background: #28a745;
    color: white;
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 500;
  }

  .three-body {
    top: 50% !important;
    left: 53% !important;
  }
</style>