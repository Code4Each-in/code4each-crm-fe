<template>
    <FlashMessage :visible="store.flashMeassge" v-if="store.flashMeassge" :class="flashClass" />
    <NavBar
        @logout="logout"
        @nav-bar-toggle="navBarToggle"
        :dashboardData="dashboardData?.user"
    />
    <SideBar :dashboardData="dashboardData" :toggled="isSidebarToggled" />

    <div v-if="loadingDomain" class="three-body3">
        <div class="three-body__dot1"></div>
        <div class="three-body__dot1"></div>
        <div class="three-body__dot1"></div>
    </div>

    <div v-else class="page-wrapper">

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

                <!-- DOMAIN LIST -->
                <div class="domains-list">
                    <div 
                        v-for="item in domains" 
                        :key="item.id"
                        class="domain-row"
                    >
                      <!-- LEFT SIDE -->
                      <div class="domain-info">
                          <div class="domain-name">{{ item.domain }}</div>

                            <!-- Primary Domain Badge -->
                            <span 
                                v-if="normalize(item.domain) === normalize(currentDomain)" 
                                class="primary-badge"
                            >
                                Primary Domain
                            </span>

                      </div>

                      <!-- RIGHT SIDE -->
                      <div class="domain-actions">

                        <!-- Show this only if NOT staging -->
                        <template v-if="item.type !== 'staging'">

                            <div class="status">
                                <span
                                  :class="item.status === 'Verified' ? 'status-dot green' : 'status-dot red'"
                                ></span>
                                {{ item.status }}
                            </div>

                            <button v-if="item.status !== 'Verified'"  class="check-btn" @click="checkDomain(item)" :disabled="checkLoading === item.id">
                                <span v-if="checkLoading === item.id">
                                    <i class="fa fa-spinner fa-spin"></i> Checking...
                                </span>
                                <span v-else>
                                    Check
                                </span>
                            </button>

                            <!-- INFO ICON WHEN DOMAIN IS VERIFIED -->
                            <i 
                                v-if="item.status === 'Verified'" 
                                class="fa fa-question-circle info-icon"
                                :data-tip="dnsTooltipMessage"
                            ></i>

                            <!-- Menu for normal domains -->
                            <div class="menu-wrapper">
                                <i class="fa fa-ellipsis-v menu-icon" @click="toggleMenu(item.id)"></i>

                                <div 
                                    v-if="activeMenu === item.id"
                                    class="menu-dropdown"
                                >
                                    <div 
                                        class="menu-item"
                                        :class="{ 
                                            disabled: item.is_primary || currentDomain === item.domain || item.status !== 'Verified'
                                        }"
                                        @click="
                                            !(item.is_primary || currentDomain === item.domain || item.status !== 'Verified') &&
                                            setPrimaryDomain(item)
                                        "
                                    >
                                        <span v-if="primaryLoading === item.id">
                                            <i class="fa fa-spinner fa-spin"></i> Processing...
                                        </span>
                                        <span v-else>
                                            Set as Primary Domain
                                        </span>
                                    </div>

                                    <div class="menu-item" @click="openDNS(item)">
                                        DNS Configuration
                                    </div>

                                    <div class="menu-item delete" @click="deleteDomain(item)">
                                        <span v-if="deleteLoading === item.id">
                                            <i class="fa fa-spinner fa-spin"></i> Deleting...
                                        </span>
                                        <span v-else>
                                            Delete Domain
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </template>


                        <!-- Show ONLY this for STAGING domains -->
                        <template v-else>
                            <div class="menu-wrapper">
                                <i class="fa fa-ellipsis-v menu-icon" @click="toggleMenu(item.id)"></i>

                                <div 
                                    v-if="activeMenu === item.id"
                                    class="menu-dropdown"
                                >
                                    <div class="menu-item" :class="{ disabled: item.is_primary || currentDomain === item.domain }"
                                        @click="!(item.is_primary || currentDomain === item.domain) && setPrimaryDomain(item)">
                                        Set as Primary Domain
                                    </div>
                                </div>
                            </div>
                        </template>

                    </div>
                  </div>
                </div>

            </div>
        </div>

        <!-- SETUP WIZARD -->
        <div v-if="showSetup" class="wizard-wrap">

            <!-- Sidebar Stepper -->
            <div class="stepper" v-if="!isEditDNS">
                <div class="step-header">
                    <a href="javascript:void(0)" class="back-link" @click="showSetup = false">← Back</a>
                    <h1>Add your Domain</h1>
                    <p class="sub-text">Follow the steps below to configure your domain</p>
                </div>

                <div class="ss_steps">
                    <div class="ss_step" :class="{ active: currentStep === 1 }">
                        <div class="number">1</div>
                        <span>Set Website URL</span>
                    </div>

                    <div class="ss_step" :class="{ active: currentStep === 2 }">
                        <div class="number">2</div>
                        <span>Update DNS</span>
                    </div>
                </div>
            </div>

            <!-- Right Content -->
            <div class="content-area">

                <!-- STEP 1 : ENTER DOMAIN -->
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
                        <button class="cancel-btn" @click="showSetup = false; activeMenu = null">Cancel</button>
                        <button 
                            class="primary-btn" 
                            :disabled="!domain"
                            @click="goToDNS"
                        >
                            Continue
                        </button>
                    </div>
                </div>

                <!-- STEP 2 : UPDATE DNS -->
                <div v-if="currentStep === 2" class="card" :style="isEditDNS ? { marginLeft: '190px' } : {}">

                    <h2>Update DNS</h2>

                    <!-- Instructions Card -->
                    <div class="instruction-card">
                        <h3>Instructions</h3>

                        <div class="instruction-box">
                            <strong>Step 1:</strong>  
                            <p>Find the <b>A record</b> with <b>@</b> or your domain and update the value below.</p>
                        </div>

                        <div class="instruction-box">
                            <strong>Step 2:</strong>  
                            <p>Find the <b>www CNAME</b> and update the value shown below.</p>
                        </div>

                        <div class="instruction-box note">
                            <strong>Note:</strong>  
                            <p>DNS may take 24–48 hours to update.</p>
                        </div>
                    </div>

                    <!-- DNS Records Card -->
                    <div class="dns-card">

                        <h3>Your DNS Records</h3>

                        <table class="dns-table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Key</th>
                                    <th>Value</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>A</td>
                                    <td>
                                      @
                                      <i class="fa fa-copy copy-icon" @click="copyText('@')"></i>
                                    </td>
                                    <td>
                                        {{ dnsData.a_record }}
                                        <i class="fa fa-copy copy-icon" @click="copyText(dnsData.a_record)"></i>
                                    </td>
                                    <td><span class="pending-tag">Pending</span></td>
                                </tr>

                                <tr>
                                    <td>CNAME</td>
                                    <td>
                                      www
                                      <i class="fa fa-copy copy-icon" @click="copyText('www')"></i>
                                    </td>
                                    <td>
                                        {{ dnsData.cname_record }}
                                        <i class="fa fa-copy copy-icon" @click="copyText(dnsData.cname_record)"></i>
                                    </td>
                                    <td><span class="pending-tag">Pending</span></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <div class="actions">
                        <button class="cancel-btn" 
                            @click="isEditDNS ? (showSetup = false) : (currentStep = 1)"
                        >
                            Back
                        </button>

                        <button 
                            v-if="!isEditDNS"
                            class="primary-btn" 
                            @click="saveNewDomain" 
                            :disabled="isLoading"
                        >
                            <span v-if="isLoading">
                                <i class="fa fa-spinner fa-spin"></i> Saving...
                            </span>
                            <span v-else>
                                Finish
                            </span>
                        </button>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed, onUnmounted } from "vue";
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
const stagingDomain = ref("");
const domains = ref([]);
const isLoading = ref(false);
const loadingDomain = ref(true);
const primaryLoading = ref(null);
const deleteLoading = ref(null);
const isEditDNS = ref(false);
const checkLoading = ref(null);

const dnsTooltipMessage = 
  "Your DNS is now correctly matched. It may take 24–48 hours for full propagation.";

const activeMenu = ref(null);
const flashClass = computed(() => 
    store.flashMeassgeType === 'error' ? 'flash-error' : 'flash-success'
);

const toggleMenu = (id) => {
    activeMenu.value = activeMenu.value === id ? null : id;
};

const checkDomain = async (item) => {
    try {
        checkLoading.value = item.id
        const payload = {
            domain: item.domain,
            user_id: dashboardData.value.user.id,
            staging_domain: stagingDomain.value
        };

        const response = await WordpressService.Domains.checkDomain(payload);

        if (!response.data.success) {
            store.updateFlashMeassge(true, "Domain check failed!", "error");
            return;
        }

        const aVerified = response.data.a_record_verified;
        const cnameVerified = response.data.cname_verified;

        if (aVerified && cnameVerified) {
            store.updateFlashMeassge(true, "Domain has verified successfully", "success");
        } else {
            store.updateFlashMeassge(true, "Domain has not been verified yet. Please check again sometime later.", "error");
        }

        await getDomains();

    } catch (error) {
        console.log(error);
        store.updateFlashMeassge('true', "Domain check failed!", "error");
    } finally {
        checkLoading.value = null; 
    }
};

const setPrimaryDomain = async (item) => {
    try {
        const info = dashboardData.value.agency_website_info?.[0];
        if (item.status !== 'Verified' && item.type !== 'staging') {
            store.updateFlashMeassge('true', "You can only set verified domains as primary.", "error");
            return;
        }
        const confirmed = confirm(
            `Are you sure you want to set "${item.domain}" as the primary domain?`
        );
        if (!confirmed) return;

        primaryLoading.value = item.id;

        const payload = {
            domain: item.domain,
            staging_domain: stagingDomain.value, 
            agency_id: info.agency_id,
            website_id: info.website_detail.id,
            user_id: dashboardData.value.user.id,
            domain_name: item.domain
        };

        const response = await WordpressService.Domains.setPrimaryDomain(payload);

        if (response.status === 200 && response.data.success) {
            store.updateFlashMeassge(true, "Primary domain updated successfully", 'success');

            await fetchDashboardData();
            await getDomains();
        }

    } catch (error) {
        console.error(error);
        store.updateFlashMeassge('true', "Failed to update primary domain", "error");
    } finally {
        primaryLoading.value = null;
        activeMenu.value = null;
    }
};

const openDNS = (item) => {
    activeMenu.value = null;
    showSetup.value = true;
    currentStep.value = 2;
    isEditDNS.value = true;
};

const deleteDomain = async (item) => {
    try {
        const info = dashboardData.value.agency_website_info?.[0];
        if (item.is_primary || currentDomain.value === item.domain) {
            store.updateFlashMeassge(
                'true',
                "This is your primary domain. Please set another domain as primary before deleting.",
                "error"
            );
            return;
        }

        const confirmed = confirm(`Are you sure you want to delete the domain "${item.domain}"?`);
        if (!confirmed) {
            return;
        }

        deleteLoading.value = item.id; 

        const payload = {
            domain_id: item.id,
        };
        const response = await WordpressService.Domains.deleteDomain(payload);

        if (response.status === 200 && response.data.success) {
            store.updateFlashMeassge(true, "Domain deleted successfully", 'success');
            await getDomains();
        }

    } catch (error) {
        console.error(error);
        store.updateFlashMeassge('true', "Failed to delete domain", "error");
    }  finally {
        deleteLoading.value = null;
    }
};

const startSetup = () => {
    activeMenu.value = null;
    showSetup.value = true;
    currentStep.value = 1;
    isEditDNS.value = false;
    domain.value = "";
};

const fetchDashboardData = async () => {
  try {
    const response = await WordpressService.fetchDashboardData();

    if (response.status === 200 && response.data.success) {
        dashboardData.value = response.data;

        const info = response.data.agency_website_info?.[0];

        currentDomain.value = info?.website_detail?.website_domain || "";
        stagingDomain.value = info?.website_detail?.staging_domain || "";

        const cleanDomain = (domain) =>
          domain.replace(/^https?:\/\//, "").replace(/\/$/, "");

        dnsData.value.cname_record = cleanDomain(stagingDomain.value);
    }
  } catch (error) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("access_token");
      router.push("/login");
    }
  }
};

const copyDomain = () => {
    navigator.clipboard.writeText(currentDomain.value);
    store.updateFlashMeassge('true', "Domain copied!", "success");
};

const dnsData = ref({
    a_record: "77.37.32.140",
    cname_record: ""
});

const goToDNS = () => {
    const enteredDomain = domain.value.trim().toLowerCase();
    const normalize = (url) =>
        url.replace(/^https?:\/\//, "")
           .replace(/\/$/, "")
           .toLowerCase();

    const alreadyExists = domains.value.some(item => 
        normalize(item.domain) === normalize(enteredDomain)
    );

    if (alreadyExists) {
        store.updateFlashMeassge('true',"This domain is already in use.", "error");
        return;
    }

    currentStep.value = 2;
};

const copyText = (text) => {
    navigator.clipboard.writeText(text);
    store.updateFlashMeassge('true', "Copied!", "success");
};

const getDomains = async () => {
    try {
        const info = dashboardData.value.agency_website_info?.[0];

        const payload = {
            website_id: info.website_detail.id,
            user_id: dashboardData.value.user.id
        };

        const response = await WordpressService.Domains.getDomains(payload);

        if (response.status === 200 && response.data.success) {
            domains.value = response.data.domains;
        }
    } catch (error) {
        console.log(error);
    }
};

const saveNewDomain = async () => {
    try {
        isLoading.value = true;
        const info = dashboardData.value.agency_website_info?.[0];

        let formattedDomain = domain.value.trim();
        if (!formattedDomain.startsWith("http")) {
            formattedDomain = "https://" + formattedDomain;
        }
        if (!formattedDomain.endsWith("/")) {
            formattedDomain += "/";
        }

        const payload = {
            new_domain: formattedDomain,
            agency_id: info.agency_id,
            website_id: info.website_detail.id,
            user_id: dashboardData.value.user.id,
            old_domain: info.website_detail.website_domain
        };

        const response = await WordpressService.Domains.saveNewDomain(payload);

        if (response.status === 200 && response.data.success) {
            store.updateFlashMeassge(true, "Domain Added Successfully", 'success');
            await fetchDashboardData();
            await nextTick();
            await getDomains();
            showSetup.value = false;
            domain.value = "";
            setTimeout(() => {
                const el = document.querySelector(".domains-list");
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
        } catch (error) {
            if (error.response) {
                
                // If domain already exists (409)
                if (error.response.status === 409) {
                    store.updateFlashMeassge('true', "This domain is already in use.", "error");
                    return;
                }

                store.updateFlashMeassge('true', error.response.data.message || "Something went wrong", "error");
            } else {
                store.updateFlashMeassge('true', "Server error occurred", "error");
            }
        } finally {
                isLoading.value = false; 
        }
};

const handleClickOutside = (event) => {
    const menu = document.querySelector(".menu-dropdown");
    const icon = document.querySelector(".menu-icon");

    if (menu && !menu.contains(event.target) && !event.target.classList.contains("menu-icon")) {
        activeMenu.value = null;
    }
};

const normalize = (url) =>
    (url || "")
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, "")
        .toLowerCase();

onMounted(async () => {
    loadingDomain.value = true;
    await fetchDashboardData();
    await nextTick();
    await getDomains();
    loadingDomain.value = false;
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
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
    overflow-y: auto;
}

/* Wizard layout */
.wizard-wrap {
    display: flex;
    width: 100%;
}

/* Domain List */
.domains-list {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.domain-row {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.domain-info {
    display: flex;
    flex-direction: column;
}

.domain-name {
    font-size: 16px;
    font-weight: 600;
}

.primary-badge {
    background: #e1efff;
    color: #2271b1;
    padding: 3px 8px;
    font-size: 12px;
    border-radius: 6px;
    margin-top: 4px;
}

.domain-actions {
    display: flex;
    align-items: center;
    gap: 18px;
}

.status {
    display: flex;
    align-items: center;
    gap: 6px;
}

.status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.green { background: #4caf50; }
.red { background: #e53935; }

.check-btn {
    background: #eef2f6;
    border: 1px solid #cfd6df;
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
}

.menu-wrapper {
    position: relative;
}

.menu-icon {
    cursor: pointer;
    font-size: 18px;
    padding: 5px;
}

.menu-dropdown {
    position: absolute;
    right: 0;
    top: 28px;
    width: 200px;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    box-shadow: 0px 4px 16px rgba(0,0,0,0.15);
    z-index: 50;
}

.menu-item {
    padding: 12px;
    cursor: pointer;
    font-size: 14px;
}

.menu-item:hover {
    background: #f3f4f6;
}

.menu-item.delete {
    color: #e53935;
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

.ss_steps {
  margin-top: 40px;
}

.ss_step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  color: #6c757d;
}

.ss_step.active {
  color: #2271b1;
  font-weight: 600;
}

.ss_step .number {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}

.ss_step.active .number {
  border-color: #2271b1;
  background: #2271b1;
  color: white;
}

/* RIGHT CONTENT */
.content-area {
  flex: 1;
  padding: 20px 40px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
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

.instruction-card {
    background: #f8fafc;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 25px;
    border: 1px solid #e3e6ea;
}

.instruction-card h3 {
    margin-bottom: 15px;
}

.instruction-box {
    padding: 10px 0;
}

.instruction-box.note {
    background: #fffbea;
    padding: 12px;
    border-radius: 6px;
}

.dns-card {
    background: #ffffff;
    border: 1px solid #e3e6ea;
    padding: 20px;
    border-radius: 10px;
}

.dns-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.dns-table th, .dns-table td {
    border: 1px solid #cfd6df;
    padding: 10px;
}

.copy-icon {
    margin-left: 10px;
    cursor: pointer;
    color: #2271b1;
}

.pending-tag {
    background: #ffe8c6;
    padding: 4px 10px;
    border-radius: 6px;
    color: #b36b00;
    font-size: 12px;
}

.wizard-wrap .content-area {
    max-height: calc(100vh - 120px);
    overflow-y: auto;
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

.loading-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(255,255,255,0.7);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader {
    width: 40px;
    height: 40px;
    border: 4px solid #ddd;
    border-top-color: #3498db;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.three-body3 {
  top: 37% !important;
  right: 41% !important;
}

.menu-item.disabled {
    opacity: 0.4;
    pointer-events: none;
}

.info-icon {
    position: relative;
    display: inline-block;
    /* color: #2271b1; */
    font-size: 18px;
    cursor: pointer;
    margin-left: -12px;
}

.info-icon:hover::after {
    content: attr(data-tip);
    position: absolute;
    top: -34px;
    right: -33px;
    background: #333;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    white-space: nowrap;
    font-size: 13px;
    z-index: 1000;
}

</style>
