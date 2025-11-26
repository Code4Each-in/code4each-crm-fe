<template>
  <FlashMessage :visible="store.flashMeassge" v-if="store.flashMeassge" :class="flashClass" />
  <NavBar @logout="logout" @nav-bar-toggle="navBarToggle" :dashboardData="dashboardData?.user" />
  <SideBar :dashboardData="dashboardData" :toggled="isSidebarToggled" />

  <div class="google-place-wrapper">
    <div v-if="loadingGoogle" class="three-body3">
        <div class="three-body__dot1"></div>
        <div class="three-body__dot1"></div>
        <div class="three-body__dot1"></div>
    </div>
    <div v-else class="google-place-card">
        <h2 class="title">Google Business Settings</h2>
        <p class="subtitle">
            Connect your Google Business Profile to enable review collection and analytics.
        </p>

        <div class="download-guide">
          <a
            href="/uploads/How to Get Your Google Review Link.docx"
            download
            class="download-btn"
          >
            📄 Download Guide: How to Get Your Google Review Link
          </a>
        </div>

        <label class="label">Google Review Link</label>
        <input
            type="text"
            v-model="googlelink"
            placeholder="Enter Google Review Link"
            class="form-control input"
        />

        <button @click="saveGoogleReviewLink(googlelink)" class="btn-save" :disabled="loading">
        {{ loading ? 'Saving...' : (reviewLink ? 'Update Google Review Link' : 'Save Google Review Link') }}
        </button>

        <div v-if="reviewLink" class="review-section">
            <a :href="reviewLink" target="_blank" class="btn-review">
                Check Review Link
            </a>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store";
import { useAuth } from "@/service/useAuth";
import WordpressService from "@/service/WordpressService";
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import FlashMessage from "@/components/common/FlashMessage.vue";

const store = useStore();
const router = useRouter();
const { logout: doLogout } = useAuth();
const googlelink = ref("");
const reviewLink = ref(null);
const message = ref(null);
const success = ref(false);
const loading = ref(false);
const isSidebarToggled = ref(false);
const dashboardData = ref({});
const error = ref(false);
const siteSettingsDetail = ref([]);
const loadingGoogle = ref(false);
const flashClass = computed(() => 
    store.flashMeassgeType === 'error' ? 'flash-error' : 'flash-success'
);

const logout = async () => {
    await doLogout();
    router.push("/login");
};

const navBarToggle = (value) => isSidebarToggled.value = value;

const fetchDashboardData = async () => {
    try {
        const response = await WordpressService.fetchDashboardData();
        if (response.status === 200 && response.data.success) {
            dashboardData.value = response.data;
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            localStorage.removeItem("access_token");
            router.push("/login");
        } else {
            console.error(err.message);
            error.value = true;
        }
    } finally {
        loading.value = false;
    }
};

const getSiteDeatils = async () => {
    if (!store.websiteId || typeof store.websiteId !== "number") return;
    try {
        const response = await WordpressService.WebsiteSettings.getSiteDetail({
            website_id: store.websiteId,
        });
        if (response.status === 200 && response.data.success) {
            siteSettingsDetail.value = response.data.settings_detail;
        }
    } catch (error) {
        console.error(error);
    }
};

const getGoogleReviewLink = async () => {
    try {
        const response = await WordpressService.GoogleImproveBusiness.getGoogleReviewLink({
            user_id : dashboardData.value.user?.id
        });
        if (response.status === 200 && response.data.success) {
            googlelink.value = response.data.google_review_link || "";
            if (googlelink.value) {
                reviewLink.value = googlelink.value;
            }
        }
    } catch (error) {
        console.error(error);
    }
};

const saveGoogleReviewLink = async (googlelink) => {
    if (!googlelink || googlelink.trim() === "") {
        store.updateFlashMeassge(true, "Google Review Link cannot be empty!", "error");
        return;
    }

    loadingGoogle.value = true; 

    try {
        const response = await WordpressService.GoogleImproveBusiness.saveGoogleReviewLink({
            website_domain: siteSettingsDetail.value.website_domain,
            google_review_link: googlelink,
            user_id: dashboardData.value.user?.id
        });

        if (response.status === 200 && response.data.success) {
            store.updateFlashMeassge(true, `Google Review Link saved successfully.`, 'success');
            await getGoogleReviewLink();
            reviewLink.value = googlelink;

        } else {
            store.updateFlashMeassge(true, `Failed to save Google Review Link.`, 'error');
        }

    } catch (error) {
        console.error(error);
        store.updateFlashMeassge(true, "An error occurred while saving.", "error");
    } finally {
        loadingGoogle.value = false; 
    }
};

onMounted(async () => {
    loadingGoogle.value = true;
    await fetchDashboardData();
    await getSiteDeatils();
    await getGoogleReviewLink();
    loadingGoogle.value = false;
});

</script>

<style scoped>
.google-place-wrapper {
  width: 100%;
  padding-left: 240px;
  padding-top: 120px;
  display: flex;
  justify-content: center;
}

.google-place-card {
  width: 500px;
  background: #ffffff;
  padding: 30px 35px;
  border-radius: 14px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  text-align: center;
  animation: fadeIn 0.4s ease-in-out;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #2b2b2b;
}

.subtitle {
  font-size: 14px;
  color: #777;
  margin-bottom: 25px;
}

.label {
  display: block;
  font-weight: 600;
  text-align: left;
  margin-bottom: 6px;
  color: #444;
}

.input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 18px;
  transition: 0.2s;
}

.input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0,123,255,0.3);
}

.btn-save {
  width: 100%;
  padding: 12px;
  background: #1d2b64;
  border: 2px solid #1d2b64;
  font-size: 16px;
  font-weight: 600;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-save:hover {
  background: #fff;
  color: #1d2b64;
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.review-section {
  margin-top: 22px;
}

.btn-review {
  display: inline-block;
  padding: 12px 15px;
  background: #28a745;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s;
}

.btn-review:hover {
  background: #218838;
}

/* Card fade-in animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .google-place-wrapper {
    padding-left: 0;
    padding-top: 100px;
  }

  .google-place-card {
    width: 90%;
  }
}
.three-body3 {
    top: 37% !important;
    right: 42% !important;
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
.download-guide {
  margin-bottom: 20px;
  text-align: center;
}

.download-btn {
  display: inline-block;
  background: #1d2b64;
  color: #fff;
  padding: 10px 18px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: 0.3s ease;
}

.download-btn:hover {
  background: #1d2b64;
}
</style>