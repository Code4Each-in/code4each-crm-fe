<script setup>
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import { ref, reactive, onMounted, computed} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/store";
import { useAuth } from "@/service/useAuth";
import WordpressService from "@/service/WordpressService";
import FlashMessage from "@/components/common/FlashMessage.vue";

const router = useRouter();
const route = useRoute(); 
const store = useStore();
const { logout } = useAuth() || {};
const planLoading = ref(false);
const dashboardData = ref([]);
const decodedPlanId = route.params.planId ? atob(route.params.planId) : null;
const billing_id = ref(null);

// -------------------- Plan & Billing --------------------
const selectedPlan = ref(null);
const billing = reactive({
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
  country: "",
});

// Object to store errors
const errors = reactive({
  name: "",
  email: "",
  phone: "",
});

const flashClass = computed(() => 
    store.flashMeassgeType === 'error' ? 'flash-error' : 'flash-success'
);

// -------------------- Load selected plan --------------------
onMounted(() => {
  const storedPlan = localStorage.getItem("selectedPlan");
  if (storedPlan) {
    selectedPlan.value = JSON.parse(storedPlan);
    console.log("Selected Plan Object:", selectedPlan.value);
  } else {
    console.error("No plan selected. Redirecting...");
  }
  fetchDashboardData();
});

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

// -------------------- Validation --------------------
const validate = () => {
  let valid = true;

  // Reset errors
  errors.name = "";
  errors.email = "";
  errors.phone = "";

  if (!billing.name.trim()) {
    errors.name = "Full Name is required";
    valid = false;
  }
  if (!billing.email.trim()) {
    errors.email = "Email is required";
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(billing.email)) {
    errors.email = "Invalid email format";
    valid = false;
  }

  if (!billing.phone.trim()) {
    errors.phone = "Phone number is required";
    valid = false;
  } else if (!/^\d{10}$/.test(billing.phone)) {
    errors.phone = "Phone must be 10 digits";
    valid = false;
  }

  return valid;
};

const createOrder = async (planRazorId) => {
  try {
    planLoading.value = true;
    const monthlyAmount = parseFloat(selectedPlan.value.price);
    const duration = selectedPlan.value.duration_months;
    const totalPayable = monthlyAmount * duration * 1.18;
    const amountInPaise = Math.round(totalPayable * 100);
    const plan_id = selectedPlan.value.id;

    // Call your backend service
    const response = await WordpressService.Payment.createOrder({
      razor_id: planRazorId,
      plan_id: plan_id,
      amount: amountInPaise,
      billing_id: billing_id.value,
      user_id: dashboardData.value?.user.id,
      agency_id: dashboardData.value?.user.agency_id,
      website_id: dashboardData.value?.user.agency.agency_websites[0]?.website_detail?.id,
    });

    if (response.status === 200) {
      console.log("Order created:", response.data.order_id);
      // Proceed with payment submission
      await submitPayment(response.data.order_id, planRazorId, plan_id);
    } else {
      console.error("Failed to create order", response);
    }
  } catch (error) {
    console.error("Error creating order:", error);
  } finally {
    planLoading.value = false;
  }
};

const submitPayment = async (orderId, planRazorId, plan_id) => {
  const options = {
    key: "rzp_test_3kOO5za17PvQpv",
    name: billing.name, // Use the name entered in the form
    order_id: orderId,
    description: "Payment",
    handler: function (response) {
      handleSubmission(response, planRazorId, plan_id);
    },
    prefill: {
      name: billing.name,  
      email: billing.email, 
      contact: billing.phone || "", 
    },
    notes: {
      address: billing.address,
      order_id: 'subscriptionId',
    },
    theme: {
      color: "#F37254"
    }
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();
};

const handleSubmission = async (responseh, planRazorId, plan_id) => {
  try {
    // Attach subscription info
    responseh.plan_id = plan_id;
    responseh.user_id = dashboardData.value?.user.id;
    responseh.agency_id = dashboardData.value?.user.agency_id;
    responseh.website_id = dashboardData.value?.user.agency.agency_websites[0]?.website_detail?.id;

    // Attach billing info from the form
    responseh.name = billing.name;
    responseh.email = billing.email;
    responseh.phone = billing.phone;
    responseh.address = billing.address;
    responseh.city = billing.city;
    responseh.zip = billing.zip;
    responseh.country = billing.country;
    responseh.amount = Math.round((selectedPlan.value.price * (selectedPlan.value.duration_months) * 1.18) * 100);

    const response = await WordpressService.subscriptionPayment(responseh);

    if (response.status === 200 && response.data.success) {;
      store.updateFlashMeassge(true, `Payment successful!`, 'success');
      router.push("/dashboard");
    } else {
      console.error("Payment submission failed:", response);
    }
  } catch (error) {
    console.error("Error submitting payment:", error);
  }
};


// -------------------- Form Submit --------------------
const handleSubmit = async () => {
  if (!validate()) return; 

  console.log("Billing submitted:", billing);
  console.log("Plan:", selectedPlan.value);

  const payload = {
    name: billing.name,
    email: billing.email,
    phone: billing.phone,
    address: billing.address,
    city: billing.city,
    zip: billing.zip,
    country: billing.country,
    agency_id: dashboardData.value?.user.agency_id,
    website_id: dashboardData.value?.user.agency.agency_websites[0]?.website_detail?.id,
    plan_id: selectedPlan.value.id,
    user_id: dashboardData.value?.user.id,
  };

  try {
    const res = await WordpressService.BillingDetails.userBillingDetails(payload);
    console.log("Billing Details Saved`:", res.data);
     billing_id.value = res.data.billing_id ?? res.data.data?.billing_id ?? null;
    console.log("Billing Details Response:", billing_id.value);
    console.log("Saved Billing ID:", billing_id.value);
  } catch (error) {
    console.error("Error saving billing details:", error);
  }

  if (selectedPlan.value && selectedPlan.value.razor_id) {
    await createOrder(selectedPlan.value.razor_id);
  } else {
    console.error("Plan Razorpay ID not found!");
  }
};

</script>

<template>
    <FlashMessage :visible="store.flashMeassge" v-if="store.flashMeassge" :class="flashClass" />
    <NavBar
      @logout="logout"
      @nav-bar-toggle="navBarToggle"
      :dashboardData="dashboardData?.user"
    />
    <div class="checkout-page">
      <div class="max-width checkout-container">
        <!-- LEFT SIDE: BILLING FORM -->
        <div class="billing-section">
          <h2>Billing Address</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label>Full Name</label>
              <input v-model="billing.name" type="text" placeholder="Enter your full name" />
              <span class="error" v-if="errors.name">{{ errors.name }}</span>
            </div>
  
            <div class="form-group">
              <label>Email</label>
              <input v-model="billing.email" type="email" placeholder="you@example.com" />
              <span class="error" v-if="errors.email">{{ errors.email }}</span>
            </div>
  
            <div class="form-group">
              <label>Phone</label>
              <input v-model="billing.phone" type="text" placeholder="Enter your phone number" />
              <span class="error" v-if="errors.phone">{{ errors.phone }}</span>
            </div>
  
            <div class="form-group">
              <label>Address</label>
              <input v-model="billing.address" type="text" placeholder="Street address" />
            </div>
  
            <div class="form-group">
              <label>City</label>
              <input v-model="billing.city" type="text" placeholder="City" />
            </div>
  
            <div class="form-group">
              <label>ZIP / Postal Code</label>
              <input v-model="billing.zip" type="text" placeholder="ZIP Code" />
            </div>
  
            <div class="form-group">
              <label>Country</label>
              <input v-model="billing.country" type="text" placeholder="Country" />
            </div>
            <button
                class="pay-now-button"
                type="submit"
                :disabled="planLoading"
            >
                <span v-if="planLoading">Processing...</span>
                <span v-else>Proceed to Pay</span>
            </button>
          </form>
        </div>
  
        <!-- RIGHT SIDE: PLAN SUMMARY -->
        <div class="summary-section" v-if="selectedPlan">
          <h2>Payment Summary</h2>
          <p><strong>{{ selectedPlan.name.replace(' Plan', '') }}</strong> Subscription</p>
  
          <table class="summary-table">
            <tr>
              <td>Monthly Price:</td>
              <td>₹{{ selectedPlan.price }}</td>
            </tr>
            <tr>
              <td>Duration:</td>
              <td>{{ selectedPlan.duration_months || 6 }} Months</td>
            </tr>
            <tr>
              <td>Total Base Price:</td>
              <td>₹{{ (selectedPlan.price * (selectedPlan.duration_months || 6)).toFixed(2) }}</td>
            </tr>
            <tr>
              <td>GST (18%):</td>
              <td>₹{{ ((selectedPlan.price * (selectedPlan.duration_months || 6)) * 0.18).toFixed(2) }}</td>
            </tr>
            <tr>
              <td><strong>Total Payable:</strong></td>
              <td><strong>₹{{ ((selectedPlan.price * (selectedPlan.duration_months || 6)) * 1.18).toFixed(2) }}</strong></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
</template>  

<style scoped>
    .checkout-page {
    padding: 100px;
    background: #f9fafb;
    }

    .checkout-container {
    display: flex;
    gap: 40px;
    }

    .billing-section,
    .summary-section {
    flex: 1;
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    .billing-section h2,
    .summary-section h2 {
    margin-bottom: 20px;
    font-weight: 600;
    }

    .form-group {
    margin-bottom: 15px;
    }

    .form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    }

    .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    }

    .summary-table {
    width: 100%;
    border-collapse: collapse;
    }

    .summary-table td {
    padding: 8px 0;
    }

    .pay-now-button {
        width: 95%;
        background-color: #007bff;
        border: none;
        color: white;
        padding: 12px;
        font-size: 16px;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 10px;
    }

    .save-now-button {
        width: 95%;
        background-color: #007bff;
        border: none;
        color: white;
        padding: 12px;
        font-size: 16px;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 10px;
    }

    .summary-section {
        height: 412px;
        padding-right: 0px !important;
    }

    .error {
        color: red;
        font-size: 13px;
        margin-top: 4px;
        display: block;
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
