<template>
    <FlashMessage :visible="store.flashMeassge" v-if="store.flashMeassge" :class="flashClass" />
    <NavBar
        @logout="logout"
        @nav-bar-toggle="navBarToggle"
        :dashboardData="dashboardData?.user"
    />
    <SideBar :dashboardData="dashboardData" :toggled="isSidebarToggled" />

    <div class="page-wrapper">

        <!-- SHOW CURRENT DOMAIN + DOMAIN LIST ONLY WHEN NOT IN SETUP -->
        <div v-if="!showSetup" class="content-area" style="width:100%; margin-left: 200px;">

            <!-- CURRENT DOMAIN CARD -->
            <div class="card">
                <h2>Current Domain</h2>

                <div v-if="currentDomain" class="domain-box">
                    <input type="text" :value="currentDomain" readonly class="domain-input">

                    <button class="icon-btn" @click="copyDomain">
                        <i class="fa fa-copy"></i>
                    </button>

                    <a :href="currentDomain" target="_blank" class="icon-btn">
                        <i class="fa fa-external-link"></i>
                    </a>
                </div>

                <p v-else>No domain is configured yet.</p>
            </div>

            <!-- MANAGE YOUR DOMAINS -->
            <div class="card" style="margin-top:20px;">
                <div class="domain-header">
                    <h2>Manage Your Domains</h2>
                    <button class="primary-btn" @click="startSetup">+ Add Domain</button>
                </div>

                <table class="domain-table">
                    <thead>
                        <tr>
                            <th>Domain</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in domains" :key="item.id">
                            <td>{{ item.domain }}</td>
                            <td>{{ item.status }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <!-- SETUP WIZARD -->
        <div v-if="showSetup" class="wizard-wrap">

            <!-- Sidebar Stepper -->
            <div class="stepper">
                <div class="step-header">
                    <a href="javascript:void(0)" class="back-link" @click="showSetup = false">← Back</a>
                    <h1>Add your Domain</h1>
                    <p class="sub-text">Follow the steps below to configure your domain</p>
                </div>

                <div class="steps">
                    <div class="step" :class="{ active: currentStep === 1 }">
                        <div class="number">1</div>
                        <span>Set Website URL</span>
                    </div>

                    <div class="step" :class="{ active: currentStep === 2 }">
                        <div class="number">2</div>
                        <span>Configure SSL Certificate</span>
                    </div>

                    <div class="step" :class="{ active: currentStep === 3 }">
                        <div class="number">3</div>
                        <span>Update DNS</span>
                    </div>
                </div>
            </div>

            <!-- Right Content -->
            <div class="content-area">

                <!-- STEP 1 -->
                <div v-if="currentStep === 1" class="card">
                    <h2>Setup Domain Name</h2>

                    <label class="label">Domain Name <span class="required">*</span></label>
                    <input
                        v-model="domain"
                        type="text"
                        placeholder="example.com"
                        class="input"
                    />

                    <div class="actions">
                        <button class="cancel-btn" @click="showSetup = false">Cancel</button>
                        <button 
                            class="primary-btn" 
                            :disabled="!domain"
                            @click="currentStep = 2"
                        >
                            Continue
                        </button>
                    </div>
                </div>

                <!-- STEP 2 -->
                <div v-if="currentStep === 2" class="card">
                    <h2>Configure SSL Certificate</h2>
                    <p>This is a placeholder for SSL verification instructions.</p>

                    <div class="actions">
                        <button class="cancel-btn" @click="currentStep = 1">Back</button>
                        <button class="primary-btn" @click="currentStep = 3">Continue</button>
                    </div>
                </div>

                <!-- STEP 3 -->
                <div v-if="currentStep === 3" class="card">
                    <h2>Update DNS</h2>
                    <p>This is where your DNS records will appear.</p>

                    <div class="actions">
                        <button class="cancel-btn" @click="currentStep = 2">Back</button>
                        <button class="primary-btn">Finish</button>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "../../service/useAuth";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store";
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import FlashMessage from "@/components/common/FlashMessage.vue";
import WordpressService from "@/service/WordpressService";

const isSidebarToggled = ref(false);
const navBarToggle = (value) => { isSidebarToggled.value = value; };

const store = useStore();
const router = useRouter();
const { logout } = useAuth();

const showSetup = ref(false);
const currentStep = ref(1);
const domain = ref("");

const dashboardData = ref({});
const currentDomain = ref("");
const domains = ref([]);

const startSetup = () => {
    showSetup.value = true;
    currentStep.value = 1;
};

const fetchDashboardData = async () => {
  try {
    const response = await WordpressService.fetchDashboardData();

    if (response.status === 200 && response.data.success) {
        dashboardData.value = response.data;

        const info = response.data.agency_website_info?.[0];

        currentDomain.value = info?.website_detail?.website_domain || "";

        // Adjust based on your API structure
        domains.value = response.data.agency_domains || [];
    }
  } catch (error) {
    console.error(error);
    if (error?.response?.status === 401) {
      localStorage.removeItem("access_token");
      router.push("/login");
    }
  }
};

const copyDomain = () => {
    navigator.clipboard.writeText(currentDomain.value);
    store.setFlashMessage("Domain copied to clipboard!", "success");
};

onMounted(async () => {
    await fetchDashboardData();
});
</script>

<style>
/* Layout */
.page-wrapper {
    display: flex;
    padding: 30px;
    background: #f5f8fc;
    height: 90vh;
    box-sizing: border-box;
    font-family: sans-serif;
    margin-top: 77px;
}

/* Wizard layout */
.wizard-wrap {
    display: flex;
    width: 100%;
}

/* SIDEBAR */
.stepper {
  width: 300px;
  padding-right: 40px;
  border-right: 1px solid #e3e6ea;
  margin-left: 200px;
}

.step-header .back-link {
  color: #2271b1;
  font-size: 14px;
  text-decoration: none;
}

.step-header h1 {
  margin: 15px 0 5px;
  font-size: 24px;
}

.sub-text {
  font-size: 14px;
  color: #6c757d;
}

.steps {
  margin-top: 40px;
}

.step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  color: #6c757d;
}

.step.active {
  color: #2271b1;
  font-weight: 600;
}

.step .number {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}

.step.active .number {
  border-color: #2271b1;
  background: #2271b1;
  color: white;
}

/* RIGHT CONTENT */
.content-area {
  flex: 1;
  padding: 20px 40px;
}

/* CARD */
.card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.06);
  margin-bottom: 20px;
}

.label {
  display: block;
  margin: 20px 0 8px;
}

.required {
  color: red;
}

.input {
  width: 100%;
  padding: 12px;
  border: 1px solid #cfd6df;
  border-radius: 6px;
  font-size: 15px;
}

.actions {
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn {
  padding: 10px 18px;
  border: 1px solid #cfd6df;
  background: white;
  border-radius: 6px;
  cursor: pointer;
}

.primary-btn {
  padding: 10px 20px;
  background: #2271b1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.primary-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Domain Table Styles */
.domain-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
}

.domain-table th,
.domain-table td {
    padding: 12px;
    border: 1px solid #cfd6df;
    text-align: left;
}

.domain-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.domain-box {
    display: flex;
    align-items: center;
    margin-top: 10px;
    background: #f8fafc;
    border: 1px solid #cfd6df;
    border-radius: 8px;
    padding: 6px 10px;
}

.domain-input {
    width: 100%;
    padding: 10px;
    border: none;
    background: transparent;
    font-size: 15px;
    color: #333;
}

.domain-input:focus {
    outline: none;
}

.icon-btn {
    width: 38px;
    height: 38px;
    background: #eef2f6;
    border: 1px solid #cfd6df;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: 8px;
}

.icon-btn:hover {
    background: #e2e8f0;
}

.icon-btn i {
    font-size: 16px;
    color: #4a5568;
}

</style>
