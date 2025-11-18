<script setup>
import { ref, onMounted } from "vue";
// import Chart from "chart.js/auto";
import NavBar from "./layouts/navbar.vue";
import SideBar from "./layouts/sidebar.vue";
import { useAuth } from "../../service/useAuth";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store";
import WordpressService from "@/service/WordpressService";
import FlashMessage from "@/components/common/FlashMessage.vue";
import Loader from "@/components/common/Loader.vue";

const isSidebarToggled = ref(false);
const navBarToggle = (value) => {
  isSidebarToggled.value = value;
};

const store = useStore();
const router = useRouter();
const { logout } = useAuth();
const dashboardData = ref([]);
const loading = ref(true);
const referralLink = ref("");
const totalReferredUsers = ref(0);
const timeDifferenceLabel = ref("");
const timeDifferenceValue = ref("");
const totalEarningsValue = ref(0);
const totalWithdrawalAmount = ref(0);
const initialLoading = ref(true);
const earningsData = ref({
  labels: [],
  values: []
});

const withdrawalHistory = ref([]);

const fetchDashboardData = async () => {
  try {
    const response = await WordpressService.fetchDashboardData();
    if (response.status === 200 && response.data.success) {
      dashboardData.value = response.data;
      referralLink.value = `https://speedysites.in/?ref=${dashboardData.value.user.referral_code}`;
      calculateTimeDifference();

      // Wait for all the other API calls
      await Promise.all([
        fetchTotalReferredUsers(),
        fetchTotalEarnings(),
        fetchTotalWithdrawalAmount(),
        fetchMonthlyEarnings(),
        fetchWithdrawalHistory()
      ]);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Authentication failed. Please log in.", error);
      localStorage.removeItem("access_token");
      router.push("/login");
    } else {
      console.error("An error occurred:", error.message);
    }
  } finally {
    initialLoading.value = false; // Loader hides only after all APIs finish
  }
};

const fetchTotalReferredUsers = async () => {
  try {
    const response = await WordpressService.ReferredUsers.fetchTotalReferredUsers({
        referral_code: dashboardData.value.user.referral_code,
    });
    if (response.status === 200 && response.data.success) {
      totalReferredUsers.value = response.data.response.total_referred_users;
    }
  } catch (error) {
    console.error("An error occurred while fetching total referred users:", error.message);
  }
};

function calculateTimeDifference() {
  if (!dashboardData.value?.user?.created_at) return;

  const createdAt = new Date(dashboardData.value.user.created_at);
  const now = new Date();

  const diffMs = now - createdAt;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffYears >= 1) {
    timeDifferenceValue.value = `+${diffYears} year${diffYears > 1 ? "s" : ""}`;
    timeDifferenceLabel.value = "since joining";
  } else if (diffMonths >= 1) {
    timeDifferenceValue.value = `+${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
    timeDifferenceLabel.value = "since joining";
  } else if (diffDays >= 1) {
    timeDifferenceValue.value = `+${diffDays} day${diffDays > 1 ? "s" : ""}`;
    timeDifferenceLabel.value = "since joining";
  } else {
    timeDifferenceValue.value = "+1 day";
    timeDifferenceLabel.value = "since joining";
  }
}

const fetchTotalEarnings = async () => {
  try {
    const response = await WordpressService.ReferredUsers.fetchTotalEarnings({
        referral_code: dashboardData.value.user.referral_code,
    });
    if (response.status === 200 && response.data.success) {
      totalEarningsValue.value = Number(response.data.response.total_earnings).toFixed(2);
    //   console.log("Total earnings fetched:", totalEarningsValue.value);
    }
  } catch (error) {
    console.error("An error occurred while fetching total earnings:", error.message);
  }
};

const fetchTotalWithdrawalAmount = async () => {
  try {
    const response = await WordpressService.ReferredUsers.fetchTotalWithdrawalAmount({
        referral_code: dashboardData.value.user.referral_code,
    });
    if (response.status === 200 && response.data.success) {
      totalWithdrawalAmount.value = response.data.response.total_withdrawal_amount;
    }
  } catch (error) {
    console.error("An error occurred while fetching total withdrawal amount:", error.message);
  }
};

const fetchMonthlyEarnings = async () => {
  try {
    const response = await WordpressService.ReferredUsers.fetchMonthlyEarnings({
      referral_code: dashboardData.value.user.referral_code,
    });

    if (response.status === 200 && response.data.success) {
      earningsData.value.labels = response.data.response.monthly_earnings.map(item => item.month);
      earningsData.value.values = response.data.response.monthly_earnings.map(item => item.total);
      // initializeChart(); // re-render chart with real data
    }
  } catch (err) {
    console.error("Error fetching monthly earnings:", err);
  }
};

const fetchWithdrawalHistory = async () => {
  try {
    const response = await WordpressService.ReferredUsers.fetchWithdrawalHistory({
      referral_code: dashboardData.value.user.referral_code,
    });

    if (response.status === 200 && response.data.success) {
      withdrawalHistory.value = response.data.response.withdrawal_history;
    }
  } catch (err) {
    console.error("Error fetching withdrawal history:", err);
  }
};

// Canvas ref
// const chartCanvas = ref(null);
// Initialize Chart
// function initializeChart() {
//   if (!chartCanvas.value) return;

//   new Chart(chartCanvas.value.getContext("2d"), {
//     type: "line",
//     data: {
//       labels: earningsData.value.labels,
//       datasets: [
//         {
//           label: "Monthly Earnings",
//           data: earningsData.value.values,
//           borderColor: "hsl(200, 95%, 45%)",
//           backgroundColor: "hsla(200, 95%, 45%, 0.1)",
//           fill: true,
//           tension: 0.4,
//           pointBackgroundColor: "hsl(200, 95%, 45%)",
//           pointBorderColor: "#fff",
//           pointRadius: 5,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//     },
//   });
// }

const copyReferralLink = () => {
  if (!referralLink.value) return;
  navigator.clipboard.writeText(referralLink.value)
    .then(() => {
      store.updateFlashMeassge(true, `Referral link copied to clipboard!`, 'success');
    })
    .catch(() => {
      store.updateFlashMeassge(true, `Failed to copy referral link.`, 'success');
    });
};

// When component loads
onMounted(() => {
    fetchDashboardData();
});
</script>
<template>
    <FlashMessage :visible="store.flashMeassge" v-if="store.flashMeassge" />
    <NavBar
      @logout="logout"
      @nav-bar-toggle="navBarToggle"
      :dashboardData="dashboardData?.user"
    ></NavBar>
    <SideBar
      :dashboardData="dashboardData"
      :toggled="isSidebarToggled"
    ></SideBar>
    <body class="affiliate-body">
        <div class="affiliate-container">
            <header class="affiliate-header">
                <div class="affiliate-header-top">
                <div>
                    <h1>Agent Dashboard</h1>
                    <p class="affiliate-subtitle">Track your referrals and earnings</p>
                </div>

                <div class="referral-link-wrapper">
                    <button @click="copyReferralLink" class="btn btn-primary">
                    <i class="fa fa-link" aria-hidden="true"></i>
                    Copy Referral Link
                    </button>
                </div>
                </div>
            </header>
            <Loader v-if="initialLoading" />
            <!-- Metric Cards -->
            <div v-else class="affiliate-metrics-grid">
                
                <router-link 
                :to="{ name: 'referred_user' }" 
                class="affiliate-metric-card-link"
                style="text-decoration: none; color: inherit;"
                >
                <div class="affiliate-metric-card clickable-card">
                    <div class="affiliate-card-content">
                        <div class="affiliate-card-header">
                            <div class="affiliate-card-info">
                                <p class="affiliate-card-title">Total Users Joined</p>
                                <h3 class="affiliate-card-value" id="totalUsers">
                                    {{ totalReferredUsers }}
                                </h3>
                            </div>
                            <div class="affiliate-card-icon">
                                <i class="fa fa-users" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="affiliate-card-trend">
                            <span class="affiliate-trend-value">{{ timeDifferenceValue }}</span>
                            <span class="affiliate-trend-label">{{ timeDifferenceLabel }}</span>
                        </div>
                    </div>
                </div>
                </router-link>

                <!-- Primary Card -->
                <router-link 
                :to="{ name: 'affiliate_history' }" 
                class="affiliate-metric-card-link"
                style="text-decoration: none; color: inherit;"
                >
                    <div class="affiliate-metric-card affiliate-metric-card-primary">
                        <div class="affiliate-card-content">
                            <div class="affiliate-card-header">
                                <div class="affiliate-card-info">
                                    <p class="affiliate-card-title">Total Earnings</p>
                                    <h3 class="affiliate-card-value" id="totalEarnings">
                                        ₹{{ totalEarningsValue }}
                                    </h3>
                                </div>
                                <div class="affiliate-card-icon">
                                    <i class="fa fa-inr" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="affiliate-card-trend">
                                <span class="affiliate-trend-value">{{ timeDifferenceValue }}</span>
                                <span class="affiliate-trend-label">{{ timeDifferenceLabel }}</span>
                            </div>
                        </div>
                    </div>
                </router-link>

                <!-- Pending Withdrawal -->
                <router-link 
                :to="{ name: 'affiliate_history' }" 
                class="affiliate-metric-card-link"
                style="text-decoration: none; color: inherit;"
                >
                    <div class="affiliate-metric-card">
                        <div class="affiliate-card-content">
                            <div class="affiliate-card-header">
                                <div class="affiliate-card-info">
                                    <p class="affiliate-card-title">Total Amount Withdrawn</p>
                                    <h3 class="affiliate-card-value" id="pendingWithdrawals">
                                        ₹{{ totalWithdrawalAmount }}
                                    </h3>
                                </div>
                                <div class="affiliate-card-icon">
                                    <i class="fa fa-inr" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="affiliate-card-trend">
                                <span class="affiliate-trend-value">{{ timeDifferenceValue }}</span>
                                <span class="affiliate-trend-label">{{ timeDifferenceLabel }}</span>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>

            <!-- Dashboard Grid -->
            <!-- <diEmail Verified

                <div class="affiliate-chart-card">
                    <div class="affiliate-card-header-section">
                        <h3 class="affiliate-card-section-title">Earnings Overview</h3>
                        <p class="affiliate-card-section-description">
                            Your earnings over the last 6 months
                        </p>
                    </div>
                    <div class="affiliate-chart-container">
                        <canvas ref="chartCanvas"></canvas>
                    </div>
                </div>

                <div class="affiliate-history-card">
                    <div class="affiliate-card-header-section">
                        <h3 class="affiliate-card-section-title">Withdrawal History</h3>
                        <p class="affiliate-card-section-description">Recent withdrawal requests</p>
                    </div>
                    <div class="affiliate-history-list">
                        <div 
                        v-for="item in withdrawalHistory" 
                        :key="item.id" 
                        class="affiliate-history-item"
                        >
                            <div class="history-left">
                                <p class="history-amount">₹{{ item.amount }}</p>
                                <p class="history-date">{{ new Date(item.created_at).toLocaleDateString() }}</p>
                            </div>

                            <div 
                            class="history-status" 
                            :class="item.status"
                            >
                            {{ item.status }}
                            </div>
                        </div>
                    </div>
                </div>

            </div> -->

        </div>
    </body>
</template>

<style scoped>
.affiliate-body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: hsl(220, 17%, 97%);
    color: hsl(220, 15%, 15%);
    line-height: 1.5;
    padding: 50px;
    margin: 80px 0px 0px 90px;
    height: 692px;
}

.affiliate-container {
    max-width: 1200px;
    margin: 0px 0px 0px 105px;
}

.affiliate-header {
    margin-bottom: 32px;
    animation: fadeIn 0.6s ease-out;
}

.affiliate-header h1 {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, hsl(200, 95%, 45%), hsl(175, 70%, 50%));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
}

.affiliate-subtitle {
    color: hsl(220, 10%, 50%);
    font-size: 1rem;
}

/* Metrics Grid */
.affiliate-metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
}

.affiliate-metric-card {
    background: hsl(0, 0%, 100%);
    border: 1px solid hsl(220, 13%, 91%);
    border-radius: 12px;
    box-shadow: 0 4px 20px -2px hsla(220, 15%, 15%, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: fadeIn 0.6s ease-out;
}

.affiliate-metric-card:hover {
    box-shadow: 0 8px 30px -4px hsla(220, 15%, 15%, 0.12);
    transform: translateY(-2px);
}

.affiliate-metric-card-primary {
    background: linear-gradient(135deg, hsl(200, 95%, 45%), hsl(175, 70%, 50%));
    color: hsl(0, 0%, 100%);
    border: none;
}

.affiliate-card-content {
    padding: 24px;
}

.affiliate-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
}

.affiliate-card-info {
    flex: 1;
}

.affiliate-card-title {
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 8px;
    color: hsl(220, 10%, 50%);
}

.affiliate-metric-card-primary .affiliate-card-title {
    color: hsla(0, 0%, 100%, 0.8);
}

.affiliate-card-value {
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 1.2;
}

.affiliate-card-icon {
    padding: 12px;
    border-radius: 8px;
    background-color: hsla(200, 95%, 45%, 0.1);
    color: hsl(200, 95%, 45%);
}

.affiliate-metric-card-primary .affiliate-card-icon {
    background-color: hsla(0, 0%, 100%, 0.2);
    color: hsl(0, 0%, 100%);
}

.affiliate-card-trend {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
}

.affiliate-trend-value {
    font-weight: 600;
    color: var(--accent);
}

.affiliate-metric-card-primary .affiliate-trend-value {
    color: hsl(0, 0%, 100%);
}

.affiliate-trend-label {
    color: hsl(220, 10%, 50%);
}

.affiliate-metric-card-primary .affiliate-trend-label {
    color: hsla(0, 0%, 100%, 0.7);
}

/* Dashboard Grid */
.affiliate-dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
}

.affiliate-chart-card,
.affiliate-history-card {
    background: hsl(0, 0%, 100%);
    border: 1px solid hsl(220, 13%, 91%);
    border-radius: 12px;
    box-shadow: 0 4px 20px -2px hsla(220, 15%, 15%, 0.08);
    padding: 24px;
    animation: fadeIn 0.6s ease-out 0.2s backwards;
}

.affiliate-card-header-section {
    margin-bottom: 24px;
}

.affiliate-card-section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 4px;
}

.affiliate-card-section-description {
    color: hsl(220, 10%, 50%);
    font-size: 0.875rem;
}

.affiliate-chart-container {
    position: relative;
    height: 300px;
}

/* Withdrawal History */
.affiliate-history-list {
    max-height: 400px;
    overflow-y: auto;
}

.affiliate-history-item {
    padding: 16px;
    border-bottom: 1px solid hsl(220, 13%, 91%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.2s;
}

.affiliate-history-item:hover {
    background-color: hsla(220, 17%, 93%, 0.5);
}

.affiliate-history-item:last-child {
    border-bottom: none;
}

.affiliate-history-info h4 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 4px;
}

.affiliate-history-date {
    font-size: 0.75rem;
    color: hsl(220, 10%, 50%);
}

.affiliate-history-amount {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
}

.affiliate-amount {
    font-weight: 600;
    font-size: 1rem;
}

.affiliate-status-badge {
    font-size: 0.75rem;
    padding: 4px 12px;
    border-radius: 9999px;
    font-weight: 500;
}

.affiliate-status-completed {
    background-color: hsla(160, 84%, 39%, 0.1);
    color: var(--accent);
}

.affiliate-status-pending {
    background-color: hsla(45, 93%, 47%, 0.1);
    color: hsl(45, 93%, 47%);
}

.affiliate-status-processing {
    background-color: hsla(200, 95%, 45%, 0.1);
    color: hsl(200, 95%, 45%);
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Scrollbar */
.affiliate-history-list::-webkit-scrollbar {
    width: 6px;
}

.affiliate-history-list::-webkit-scrollbar-track {
    background: hsl(220, 17%, 97%);
    border-radius: 3px;
}

.affiliate-history-list::-webkit-scrollbar-thumb {
    background: hsl(220, 13%, 91%);
    border-radius: 3px;
}

.affiliate-history-list::-webkit-scrollbar-thumb:hover {
    background: hsl(220, 10%, 50%);
}

/* Responsive */
@media (max-width: 768px) {
    .affiliate-metrics-grid {
        grid-template-columns: 1fr;
    }
    
    .affiliate-dashboard-grid {
        grid-template-columns: 1fr;
    }
    
    .affiliate-header h1 {
        font-size: 1.5rem;
    }
    
    .affiliate-card-value {
        font-size: 1.5rem;
    }
}
.affiliate-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.referral-link-wrapper .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 25px;
  border: 2px solid #1d2b64;
  background: #1d2b64;
  color: #fff;
  border-radius: 8px;
  font-size: 16px;
  gap: 6px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .affiliate-header-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
</style>