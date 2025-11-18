<template>
  <FlashMessage :visible="store.flashMeassge" v-if="store.flashMeassge" :class="flashClass" />
  <NavBar
    @logout="logout"
    @nav-bar-toggle="navBarToggle"
    :dashboardData="dashboardData?.user"
  />
  <SideBar :dashboardData="dashboardData" :toggled="isSidebarToggled" />

  <div class="dashboard-withdraw-page container-fluid py-3">
    <div class="content-area">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h2 class="m-0">Payment History</h2>

        <div class="d-flex align-items-center gap-2">
          <div v-if="dataLoaded" class="totals-summary d-flex gap-3 align-items-center me-2">
            <div class="summary-card">
              <div class="label">Total Earned</div>
              <div class="value">₹{{ totalEarningsValue }}</div>
            </div>
            <div class="summary-card">
              <div class="label">Total Withdrawn</div>
              <div class="value">₹{{ totalWithdrawalAmountDisplay }}</div>
            </div>
            <div class="summary-card balance">
              <div class="label">Available Balance</div>
              <div class="value">₹{{ balanceDisplay }}</div>
            </div>
          </div>

          <button class="btn btn-primary withdrawal" @click="openWithdrawModal">
            Withdraw
          </button>
        </div>
      </div>

      <Loader v-if="initialLoading" />
      <!-- Tabs -->
      <div v-else>
        <div class="mb-3 d-flex align-items-center justify-content-start gap-2">
          <button
            class="btn"
            :class="selectedTab === 'plans' ? 'btn-outline-primary active-tab' : 'btn-light'"
            @click="selectTab('plans')"
          >
            <i class="fa fa-id-card me-1" aria-hidden="true"></i>
            User Plan History
          </button>
          <button
            class="btn"
            :class="selectedTab === 'withdrawals' ? 'btn-outline-primary active-tab' : 'btn-light'"
            @click="selectTab('withdrawals')"
          >
            <i class="fa fa-history me-1" aria-hidden="true"></i>
            Withdrawal History
          </button>
        </div>

        <!-- Tables container -->
        <div class="card">
          <div class="card-body">
            <!-- Plans Table -->
            <div v-if="selectedTab === 'plans'">
              <div class="table-responsive">
                <table class="table table-hover table-striped align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Plan Name</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="userPlanHistory.length === 0">
                      <td colspan="5" class="text-center py-3 text-muted">
                        No user is referred.
                      </td>
                    </tr>
                    <tr v-for="(row, idx) in userPlanHistory" :key="row.id || idx">
                      <td>{{ idx + 1 }}</td>
                      <td>{{ row.plan_name }}</td>
                      <td>₹{{ formatNumber(row.plan_amount) }}</td>
                      <td>{{ formatDate(row.created_at) }}</td>
                      <td>₹{{ formatNumber(row.commission_paid) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Withdrawals Table -->
            <div v-if="selectedTab === 'withdrawals'">
              <div class="table-responsive">
                <table class="table table-hover table-striped align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="withdrawalHistory.length === 0">
                      <td colspan="5" class="text-center py-3 text-muted">
                        No withdrawal history found.
                      </td>
                    </tr>
                    <tr v-for="(row, idx) in withdrawalHistory" :key="row.id || idx">
                      <td>{{ idx + 1 }}</td>
                      <td>₹{{ formatNumber(row.amount) }}</td>
                      <td>
                        <span
                          class="badge"
                          :class="{
                            'bg-success': row.status === 'completed' || row.status === 'approved',
                            'bg-warning': row.status === 'pending',
                            'bg-danger': row.status === 'rejected'
                          }"
                        >
                          {{ row.status ?? 'pending' }}
                        </span>
                      </td>
                      <td>{{ formatDate(row.created_at) }}</td>
                      <td>{{ row.method ?? 'Card' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Withdraw Modal -->
    <div v-if="showWithdrawModal" class="withdraw-modal-backdrop">
      <div class="withdraw-modal card p-3">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <!-- <h5 class="m-0">Withdraw Funds</h5> -->
          <button class="btn-close" @click="closeWithdrawModal"></button>
        </div>

        <div class="row g-2">
          <div class="col-12">
            <label class="form-label">Card Holder Name</label>
            <input type="text" v-model="withdrawForm.card_name" class="form-control" />
            <div v-if="validationErrors.card_name" class="text-danger small">
              {{ validationErrors.card_name }}
            </div>
          </div>

          <div class="col-12">
            <label class="form-label">Card Number</label>
            <input type="text" v-model="withdrawForm.card_number" class="form-control" />
            <div v-if="validationErrors.card_number" class="text-danger small">
              {{ validationErrors.card_number }}
            </div>
          </div>

          <div class="col-6">
            <label class="form-label">Expiry Month</label>
            <input type="text" v-model="withdrawForm.exp_month" class="form-control" />
            <div v-if="validationErrors.exp_month" class="text-danger small">
              {{ validationErrors.exp_month }}
            </div>
          </div>

          <div class="col-6">
            <label class="form-label">Expiry Year</label>
            <input type="text" v-model="withdrawForm.exp_year" class="form-control" />
            <div v-if="validationErrors.exp_year" class="text-danger small">
              {{ validationErrors.exp_year }}
            </div>
          </div>

          <div class="col-6">
            <label class="form-label">CVV</label>
            <input type="password" v-model="withdrawForm.cvv" class="form-control" />
            <div v-if="validationErrors.cvv" class="text-danger small">
              {{ validationErrors.cvv }}
            </div>
          </div>

          <div class="col-12 withdrawalAmount">
            <label class="form-label fw-bold me-1">Withdrawal Amount:</label>
            <span class="fw-bold">{{ balanceDisplay }}</span>

            <div v-if="validationErrors.amount" class="text-danger small mt-1">
              {{ validationErrors.amount }}
            </div>
          </div>

          <div class="col-12 mt-2 d-flex justify-content-end gap-2">
            <button class="btn btn-secondary" @click="closeWithdrawModal">Cancel</button>
            <button class="btn requestWithdrawal" :disabled="submittingWithdraw" @click="submitWithdrawal">
              {{ submittingWithdraw ? 'Requesting...' : 'Request Withdrawal' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import { useAuth } from "../../service/useAuth";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store";
import WordpressService from "@/service/WordpressService";
import FlashMessage from "@/components/common/FlashMessage.vue";
import Loader from "@/components/common/Loader.vue";

const isSidebarToggled = ref(false);
const navBarToggle = (value) => { isSidebarToggled.value = value; };

const store = useStore();
const router = useRouter();
const { logout } = useAuth();

const dashboardData = ref({});
const showWithdrawModal = ref(false);

const totalWithdrawalAmount = ref(null);
const withdrawalHistory = ref([]);
const totalEarningsValue = ref(null);
const userPlanHistory = ref([]);
const initialLoading = ref(true);
const selectedTab = ref("plans");
const MIN_WITHDRAWAL_AMOUNT = 100;
const withdrawLoading = ref(false);

// Withdraw form
const withdrawForm = ref({
  card_name: "",
  card_number: "",
  exp_month: "",
  exp_year: "",
  cvv: "",
  amount: ""
});
const submittingWithdraw = ref(false);
const accountDetails = ref(null);
const dataLoaded = computed(() => {
  return totalEarningsValue.value !== null && totalWithdrawalAmount.value !== null;
});
// Flash class
const flashClass = computed(() => 
    store.flashMeassgeType === 'error' ? 'flash-error' : 'flash-success'
);

const openWithdrawModal = async () => {
  const balance = totalEarningsValue.value - Number(totalWithdrawalAmount.value || 0);
  if (balance < MIN_WITHDRAWAL_AMOUNT) {
    store.updateFlashMeassge(true, `Minimum balance of ₹${MIN_WITHDRAWAL_AMOUNT} is required to withdraw.`, "error");
    return; // do not open modal
  }

  if (withdrawalHistory.value && withdrawalHistory.value.length > 0) {
    // Only fetch account details if there are previous withdrawals
    await fetchAffiliateAccountDetails();
  } else {
    // If no withdrawals exist, just reset the form
    withdrawForm.value = {
      card_name: "",
      card_number: "",
      exp_month: "",
      exp_year: "",
      cvv: "",
      amount: ""
    };
  }

  showWithdrawModal.value = true;
};

const closeWithdrawModal = () => { showWithdrawModal.value = false; };

const fetchAffiliateAccountDetails = async () => {
  try {
    const response = await WordpressService.AffiliateDetails.fetchAffiliateAccountDetails({
      agent_id: dashboardData.value.user?.id
    });
    if (response.data.success) {
      accountDetails.value = response.data.response;
      withdrawForm.value.card_name = accountDetails.value.account_holder_name;
      withdrawForm.value.card_number = accountDetails.value.card_number;
      withdrawForm.value.exp_month = accountDetails.value.expiry_month;
      withdrawForm.value.exp_year = accountDetails.value.expiry_year;
      withdrawForm.value.cvv = accountDetails.value.cvv;
    } else {
      accountDetails.value = null;
      withdrawForm.value = { card_name: "", card_number: "", exp_month: "", exp_year: "", cvv: "", amount: "" };
    }
  } catch (error) {
    console.error(error);
  }
};

const validationErrors = ref({
  card_name: "",
  card_number: "",
  exp_month: "",
  exp_year: "",
  cvv: "",
  amount: ""
});

const submitWithdrawal = async () => {
  // Clear previous errors
  Object.keys(validationErrors.value).forEach(key => validationErrors.value[key] = "");

  const balance = totalEarningsValue.value - Number(totalWithdrawalAmount.value || 0);
  const { card_name, card_number, exp_month, exp_year, cvv } = withdrawForm.value;

  let hasError = false;

  if (!card_name) {
    validationErrors.value.card_name = "Card holder name is required.";
    hasError = true;
  }
  if (!card_number) {
    validationErrors.value.card_number = "Card number is required.";
    hasError = true;
  } else if (!/^\d{16}$/.test(card_number)) {
    validationErrors.value.card_number = "Card number must be 16 digits.";
    hasError = true;
  }
  if (!cvv) {
    validationErrors.value.cvv = "CVV is required.";
    hasError = true;
  } else if (!/^\d{3,4}$/.test(cvv)) {
    validationErrors.value.cvv = "CVV must be 3 or 4 digits.";
    hasError = true;
  }
  const monthNum = Number(exp_month);
  if (!exp_month) {
    validationErrors.value.exp_month = "Expiry month is required.";
    hasError = true;
  }

  const yearNum = Number(exp_year);
  const currentYear = new Date().getFullYear();
  if (!exp_year) {
    validationErrors.value.exp_year = "Expiry year is required.";
    hasError = true;
  } else if (!yearNum || yearNum < currentYear) {
    validationErrors.value.exp_year = "Expiry year must be current or future year.";
    hasError = true;
  }

  if (balance < MIN_WITHDRAWAL_AMOUNT) {
    validationErrors.value.amount = `Minimum balance of ₹${MIN_WITHDRAWAL_AMOUNT} is required to withdraw.`;
    hasError = true;
  }

  if (hasError) return; // Stop if any validation fails

  // Proceed with API submission
  submittingWithdraw.value = true;
  try {
    const response = await WordpressService.AffiliateDetails.sendWithdrawalData({
      card_name,
      card_number,
      exp_month,
      exp_year,
      cvv,
      amount: balance,
      agent_id: dashboardData.value?.user?.id
    });

    if (response?.data?.success) {
      closeWithdrawModal();
      await fetchWithdrawalHistory();
      await fetchTotalEarnings();
      await fetchTotalWithdrawalAmount();
      store.updateFlashMeassge(true, "Withdrawal request submitted successfully", "success");
    } else {
      store.updateFlashMeassge(true, response?.data?.message || "Failed to submit withdrawal", "error");
    }
  } catch (error) {
    console.error(error);
    store.updateFlashMeassge(true, "An error occurred while submitting the withdrawal", "error");
  } finally {
    submittingWithdraw.value = false;
  }
};

const selectTab = (tab) => { selectedTab.value = tab; };

const formatNumber = (n) => Number(n || 0).toLocaleString("en-IN");
const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : "-";

const totalWithdrawalAmountDisplay = computed(() => formatNumber(totalWithdrawalAmount.value));
const balanceDisplay = computed(() => formatNumber(totalEarningsValue.value - Number(totalWithdrawalAmount.value || 0)));

const fetchDashboardData = async () => {
  try {
    const response = await WordpressService.fetchDashboardData();
    if (response.status === 200 && response.data.success) {
      dashboardData.value = response.data;
      await fetchTotalWithdrawalAmount();
      await fetchWithdrawalHistory();
      await fetchUserPlanHistory();
      await fetchTotalEarnings();
    } else {
      console.error("Error fetching dashboard data");
    }
  } catch (error) {
    console.error(error);
    if (error?.response?.status === 401) {
      localStorage.removeItem("access_token");
      router.push("/login");
    }
  }
};

const fetchTotalWithdrawalAmount = async () => {
  try {
    const response = await WordpressService.ReferredUsers.fetchTotalWithdrawalAmount({
      referral_code: dashboardData.value.user?.referral_code,
    });
    if (response.status === 200 && response.data.success) {
      totalWithdrawalAmount.value = Number(response.data.response.total_withdrawal_amount || 0);
    }
  } catch (error) { console.error(error); }
};

const fetchWithdrawalHistory = async () => {
  try {
    const response = await WordpressService.ReferredUsers.fetchWithdrawalHistory({
      referral_code: dashboardData.value.user?.referral_code
    });
    if (response.status === 200 && response.data.success) {
      withdrawalHistory.value = response.data.response.withdrawal_history || [];
    }
  } catch (error) { console.error(error); }
};

const fetchUserPlanHistory = async () => {
  try {
    const response = await WordpressService.ReferredUsers.fetchUserPlanHistory({
      referral_code: dashboardData.value.user?.referral_code
    });
    if (response.status === 200 && response.data.success) {
      userPlanHistory.value = response.data.response.referred_users_plan_history || [];
    }
  } catch (error) { console.error(error); }
};

const fetchTotalEarnings = async () => {
  try {
    const response = await WordpressService.ReferredUsers.fetchTotalEarnings({
      referral_code: dashboardData.value.user?.referral_code
    });
    if (response.status === 200 && response.data.success) {
      totalEarningsValue.value = Number(response.data.response.total_earnings).toFixed(2);
    }
  } catch (error) { console.error(error); }
};

onMounted( async () =>{
  try{
    await fetchDashboardData()
  } finally {
    initialLoading.value = false; 
  }
});
</script>

<style scoped>
.container-fluid {
  max-width: 1360px;
}

.content-area {
    margin: 100px 0px 0px 203px;
}

/* Header summary cards */
.totals-summary {
  gap: 12px;
}
.summary-card {
  background: #f8f9fa;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
  min-width: 140px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}
.summary-card .label {
  font-size: 12px;
  color: #6c757d;
}
.summary-card .value {
  font-weight: 700;
  font-size: 16px;
}
.summary-card.balance {
  background: linear-gradient(90deg,#e6f4ff,#eef9f4);
}

/* Tabs */
.active-tab {
  border-color: #1d2b64 !important;
  background: #1d2b64;
  color: #fff;
}

/* Card */
.card {
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(16,24,40,0.03);
}

/* Withdraw modal */
.withdraw-modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.45);
  z-index: 2000;
}
.withdraw-modal {
  width: 640px;
  max-width: 95%;
  border-radius: 10px;
}
.btn-close {
  background: transparent;
  border: none;
  font-size: 20px;
}

/* Table header hover pointer */
.table thead th {
  user-select: none;
}

/* small responsive */
@media (max-width: 768px) {
  .totals-summary {
    display: none;
  }
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
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

.btn.withdrawal {
  background-color: #1d2b64;
  border: 2px solid #1d2b64;
  padding: 10px 10px 10px 10px;
  font-size: 18px;
  font-weight: 600;
}

.btn.withdrawal:hover {
  background-color: transparent;
  color: #1d2b64;
}

.btn.requestWithdrawal {
  background-color: #1d2b64;
  color: #fff;
  border: 2px solid #1d2b64;
}

.btn.requestWithdrawal:hover {
  background-color: #fff;
  color: #1d2b64;
}

.withdrawalAmount {
  background: #e6e8ea;
  text-align: center;
  margin: 20px 0px 14px 0px;
}
</style>
