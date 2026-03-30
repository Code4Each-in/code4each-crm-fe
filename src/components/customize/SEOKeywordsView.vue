<script setup>
import { ref , onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store";
import { useAuth } from "@/service/useAuth";
import WordpressService from "@/service/WordpressService";

import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import FlashMessage from "@/components/common/FlashMessage.vue";

// Stores & Router
const store = useStore();
const router = useRouter();
const { logout: doLogout } = useAuth();

// Sidebar state
const isSidebarToggled = ref(false);
const dashboardData = ref({});
const loading = ref(true);

// SEO keywords (Vue reactive array)
const pageLoading = ref(true);
const saving = ref(false); 
const seoKeywords = ref([]);
const newKeyword = ref("");

const siteSettingsDetail = ref([]);
const globalVariables = ref([]);

// Flash class
const flashClass = computed(() => 
    store.flashMeassgeType === 'error' ? 'flash-error' : 'flash-success'
);

// -------------------------
// Sidebar toggle
// -------------------------
const navBarToggle = (value) => (isSidebarToggled.value = value);

// -------------------------
// Fetch Dashboard Data
// -------------------------
const fetchDashboardData = async () => {
  try {
    const response = await WordpressService.fetchDashboardData();
    if (response.status === 200 && response.data.success) {
      dashboardData.value = response.data;
      if (response.data.seo_keywords) {
        seoKeywords.value = response.data.seo_keywords;
      }
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("access_token");
      router.push("/login");
    } else {
      console.error(err.message);
    }
  } finally {
    loading.value = false;
  }
};

// -------------------------
// Get Site Details
// -------------------------
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

// -------------------------
// SEO Keywords (Vue logic)
// -------------------------
const addKeyword = async () => {
  const input = newKeyword.value.trim();
  if (!input) return;

  // Split ONLY by commas
  const keywordsToAdd = input
    .split(',')               // split on commas only
    .map(k => k.trim())       // trim spaces
    .filter(k => k.length > 0); // remove empty

  let addedAny = false;
  let duplicateFound = false;

  keywordsToAdd.forEach(keyword => {
    if (seoKeywords.value.includes(keyword)) {
      duplicateFound = true;
    } else {
      seoKeywords.value.push(keyword);
      addedAny = true;
    }
  });

  if (addedAny) {
    await saveKeywords();
    store.updateFlashMeassge(true, "Keywords added successfully!", "success");
  }

  if (duplicateFound) {
    store.updateFlashMeassge(true, "Some keywords were already added!", "error");
  }

  newKeyword.value = "";
};

const removeKeyword = async (index) => {
  const removedKeyword = seoKeywords.value[index]; // capture before removing
  seoKeywords.value.splice(index, 1);
  await saveKeywords(); // auto-save after removing
  store.updateFlashMeassge(true, `Keyword "${removedKeyword}" removed successfully!`, "success");
};

// -------------------------
// Save Keywords
// -------------------------
const saveKeywords = async () => {
  try {
    saving.value = true;
    const response = await WordpressService.SEOKeywords.saveSEOKeywords({
      website_domain: siteSettingsDetail.value.staging_domain,
      seo_keywords: seoKeywords.value,
    });
    if (response.status === 200 && response.data.success) {
      store.updateFlashMeassge(true, "Keywords saved successfully!", "success");
      showEmailEditor.value = false;
    } else {
      store.updateFlashMeassge(true, "Failed to save keywords!", "error");
    }
  } catch (error) {
    console.error("An error occurred while saving:", error);
  } finally {
    saving.value = false;
  }
};

// -------------------------
// GET GLOBAL VARIABLES
// -------------------------
const fetchGlobalVariables = async () => {
    try {
        loading.value = true;
        const response = await WordpressService.getGlobalVariables({
            website_domain: siteSettingsDetail.value.staging_domain,
        });
        if (response.status === 200 && response.data.success) {
            globalVariables.value = response.data.global_variables || [];
            const seoKeywordsRow = globalVariables.value.find(
                (item) => item.name === "c4e_seo_keywords"
            );

            if (seoKeywordsRow && seoKeywordsRow.value) {
                try {
                seoKeywords.value = JSON.parse(seoKeywordsRow.value); 
                } catch (e) {
                console.error("Invalid JSON in c4e_seo_keywords:", e);
                seoKeywords.value = [];
                }
            }
        }
    } catch (error) {
        console.error("Error fetching global variables:", error);
    } finally {
        loading.value = false;
    }
};

// -------------------------
// Logout
// -------------------------
const logout = async () => {
  await doLogout();
  router.push("/login");
};

// -------------------------
// Mounted
// -------------------------
onMounted(async () => {
  pageLoading.value = true;
  try {
    await fetchDashboardData();
    await getSiteDeatils();
    if (siteSettingsDetail.value.staging_domain) {
      await fetchGlobalVariables();
    }
  } finally {
    pageLoading.value = false;
  }
});
</script>

<template>
    <div class="page">
      <FlashMessage
        v-if="store.flashMeassge"
        :visible="store.flashMeassge"
        :class="flashClass"
      />
  
      <NavBar
        @logout="logout"
        @nav-bar-toggle="navBarToggle"
        :dashboardData="dashboardData?.user"
      />
  
      <SideBar :dashboardData="dashboardData" :toggled="isSidebarToggled" />
  
        <div class="container seo-keywords-container mt-5">
            <div v-if="pageLoading" class="loader-wrapper">
                <div class="three-body">
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                </div>
            </div>
            <div v-else class="section-seo-keywords">
                <div class="d-flex justify-content-between seo-subheading">
                  <h4 class="mb-3 heading">SEO Keywords</h4>
                  <!-- Instruction Note -->
                  <p class="instruction-note mb-3">
                    <strong>NOTES:</strong> Type a keyword and press <strong>Enter</strong>. Changes save automatically.
                    <span v-if="saving" class="saving-indicator ms-2">
                      <i class="fa fa-spinner fa-spin"></i> Saving...
                    </span>
                  </p>
                </div>
        
                <!-- Input Field -->
                <div class="keyword-input-wrapper mb-1">
                <input
                    v-model="newKeyword"
                    @keyup.enter.prevent="addKeyword"
                    type="text"
                    placeholder="Type a keyword & press Enter"
                    class="form-control keyword-input"
                />
                </div>

        
                <!-- Keywords List -->
                <div class="keywords-list d-flex flex-wrap gap-2">
                <span
                    v-for="(tag, index) in seoKeywords"
                    :key="index"
                    class="keyword-badge"
                >
                    {{ tag }}
                    <i class="fa fa-times-circle-o ms-2 remove-icon" @click="removeKeyword(index)"></i>
                </span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.page {
  display: flex;
  min-height: 100vh;
}
/* Container inside dashboard */
.seo-keywords-container {
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 100%;
  overflow-y: auto; 
}

.section-seo-keywords {
    margin-left: 210px;
    margin-top: 43px;
}

/* Input Wrapper */
.keyword-input-wrapper {
  position: relative;
  max-width: 100%;
}

.keyword-input {
  padding-right: 2.5rem;
  border-radius: 50px;
  border: 1px solid #ced4da;
  transition: all 0.2s ease;
  width: 100%;
}

.keyword-input:focus {
  outline: none;
  border-color: #0d6efd;
  box-shadow: 0 0 5px rgba(13, 110, 253, 0.3);
}

/* Input icon */
.input-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #0d6efd;
  pointer-events: none;
  font-size: 1.1rem;
}

/* Keywords List */
.keywords-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.keyword-badge {
    display: inline-flex;
    align-items: center;
    background: linear-gradient(90deg, #1d2b64, #195cc5);
    color: white;
    padding: 5px 20px;
    border-radius: 10px;
    font-size: 18px;
    transition: all 0.2s ease;
    max-width: calc(100% - 10px);
    word-break: break-word;
}

/* Remove icon */
.remove-icon {
  cursor: pointer;
  font-size: 19px;
  margin-left: 6px;
  transition: all 0.2s ease;
}

/* Responsive adjustments inside sidebar layout */
@media (max-width: 992px) {
  .seo-keywords-container {
    padding: 15px;
  }
  .section-seo-keywords {
    margin-left: 100px;
    margin-top: 43px;
  }
  .keyword-input {
    font-size: 0.9rem;
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

.btn-saveSeo {
    color: #fff;
    background-color: #1d2b64;
    border: 2px solid #1d2b64;
    font-weight: 600;
}

.btn-saveSeo:hover {
    color: #1d2b64;
    background-color: #fff;
}

.loader-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 240px;
}

.instruction-note {
  font-size: 15px;
  color: #6c757d;
  margin: 4px;
}

.saving-indicator {
  font-size: 20px;
  color: rgb(29, 43, 100);
}

</style>
