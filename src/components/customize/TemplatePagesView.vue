<script setup>
import { ref , onMounted, computed, watch } from "vue";
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
const siteSettingsDetail = ref([]);
const templatePages = ref([]);
const editingPageId = ref(null);

// Loading states
const isFetchingPages = ref(false);
const isSaving = ref(false);
const deletingPageId = ref(null);

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
// Logout
// -------------------------
const logout = async () => {
  await doLogout();
  router.push("/login");
};

// -------------------------
// Get Site Details
// -------------------------
const getSiteDetails = async () => {
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
// Popup Modal State
// -------------------------
const showPopup = ref(false);
const newPage = ref({
  title: "",
  slug: "",
});

// Flag to detect manual edits
const slugEditedManually = ref(false);

// Open/close modal
const openPopup = () => { 
  showPopup.value = true; 
  newPage.value = { title: "", slug: "" };
  slugEditedManually.value = false;
  isSaving.value = false;   // reset saving state when opening
};
const closePopup = () => { 
  showPopup.value = false;
  editingPageId.value = null;  
  isSaving.value = false;      
};

// Slugify function
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")  
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-"); 
};

// Auto-generate slug from title only if user hasn't manually edited it
watch(
  () => newPage.value.title,
  (newTitle) => {
    if (!slugEditedManually.value) {
      newPage.value.slug = slugify(newTitle);
    }
  }
);

const previewPage = (page) => {
  if (page.guid) {
    window.open(page.guid, "_blank");
  } else {
    alert("Page URL not available.");
  }
};

// Full URL computed
const fullPageUrl = computed(() => {
  if (!siteSettingsDetail.value?.website_domain) return "";
  return `${siteSettingsDetail.value.website_domain}${newPage.value.slug || ""}`;
});

// Copy URL to clipboard
const copyUrl = async () => {
  try {
    if (fullPageUrl.value) {
      await navigator.clipboard.writeText(fullPageUrl.value);
      store.updateFlashMeassge(true, `Page URL copied to clipboard!`, 'success');
    }
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

// -------------------------
// Fetch Template Pages
// -------------------------
const getTemplatePage = async () => {
    try {
        isFetchingPages.value = true;
        const response = await WordpressService.TemplatePages.getTemplatePage({
            website_domain: siteSettingsDetail.value.website_domain,
        });

        if (response.status === 200 && response.data.success) {
            templatePages.value = response.data.response;
        }
    } catch (error) {
        console.error(error);
    } finally {
        isFetchingPages.value = false;
    }
};

// -------------------------
// Save New Page
// -------------------------
const saveTemplatePage = async () => {
  try {
    isSaving.value = true;

    if (editingPageId.value) {
      // Update existing page
      const response = await WordpressService.TemplatePages.updateTemplatePage({
        page_id: editingPageId.value,
        page_name: newPage.value.title,
        page_slug: newPage.value.slug,
        website_domain: siteSettingsDetail.value.website_domain,
      });

      if (response.status === 200 && response.data.success) {
        const index = templatePages.value.findIndex(p => p.page_id === editingPageId.value);
        if (index !== -1) {
          templatePages.value[index] = { ...templatePages.value[index], page_name: newPage.value.title, page_slug: newPage.value.slug };
        }
        store.updateFlashMeassge(true, `Page "${newPage.value.title}" updated successfully.`, 'success');
        closePopup();  // close immediately
      }
    } else {
        const response = await WordpressService.TemplatePages.saveTemplatePage({
            page_name: newPage.value.title,
            page_slug: newPage.value.slug,
            website_domain: siteSettingsDetail.value.website_domain,
        });

        if (response.status === 200 && response.data.success) {
            const createdPageName = response.data.response.page_name;
            store.updateFlashMeassge(true, `Page "${createdPageName}" has been created successfully.`, 'success');
            closePopup();  // close immediately
        } 
    }
    await getTemplatePage();
  } catch (err) {
    console.error("Error creating page:", err);
  } finally {
    isSaving.value = false;
  }
};

const editPage = (page) => {
  newPage.value = { title: page.page_name, slug: page.page_slug };
  slugEditedManually.value = true;
  editingPageId.value = page.page_id; 
  showPopup.value = true;
  isSaving.value = false; // reset button state
};

const deletePage = async (page) => {
  if (!confirm(`Are you sure you want to delete "${page.page_name}"?`)) return;

  try {
    deletingPageId.value = page.page_id;

    const response = await WordpressService.TemplatePages.deleteTemplatePage({
      page_id: page.page_id,
      website_domain: siteSettingsDetail.value.website_domain,
    });

    if (response.status === 200 && response.data.success) {
      templatePages.value = templatePages.value.filter(p => p.page_id !== page.page_id);
      store.updateFlashMeassge(true, `Page "${page.page_name}" deleted successfully.`, 'success');
    } else {
      store.updateFlashMeassge(true, response.data.message || 'Failed to delete page', 'error');
    }
  } catch (error) {
    console.error("Error deleting page:", error);
    store.updateFlashMeassge(true, 'An error occurred while deleting page.', 'error');
  } finally {
    deletingPageId.value = null;
  }
};

// -------------------------
// Mounted
// -------------------------
onMounted(async () => {
    await fetchDashboardData();
    await getSiteDetails();
    if (siteSettingsDetail.value.website_domain) {
        await getTemplatePage();
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

        <!-- Main Content -->
        <div class="content templatepages-container mt-5">
            <div class="header templatepages-header d-flex justify-content-between">
                <h4 class="mt-2 heading">Template Pages</h4>
                <button class="btn btn-addnewpage shadow-sm" @click="openPopup">
                    Add New Page
                </button>
            </div>

            <!-- Loader while fetching -->
            <div v-if="isFetchingPages" class="text-center my-4">
              <div class="spinner-border text-primary"></div>
              <p class="mt-2">Loading pages...</p>
            </div>

            <!-- Pages List in Table -->
            <div v-else-if="templatePages && templatePages.length > 0" class="table-responsive card shadow-sm mt-3 pages-table">
              <table class="table align-middle mb-0">
                  <thead>
                  <tr>
                      <th>#</th>
                      <th>Page Name</th>
                      <th>Preview Page</th>
                      <th class="text-center">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(page, index) in templatePages" :key="page.page_id || index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ page.page_name }}</td>
                      <td>
                        <button 
                            class="btn btn-sm btn-info"
                            @click="previewPage(page)"
                        >
                            Preview
                        </button>
                      </td>
                      <!-- Action Icons -->
                      <td class="text-center">
                        <button 
                            class="btn btn-sm btn-outline-primary me-2"
                            @click="editPage(page)"
                            title="Edit Page"
                        >
                            <i class="fa fa-pencil"></i>
                        </button>

                        <button 
                            class="btn btn-sm btn-outline-danger me-2"
                            @click="deletePage(page)"
                            :disabled="deletingPageId === page.page_id"
                            :title="deletingPageId === page.page_id ? 'Deleting...' : 'Delete Page'"
                        >
                            <span v-if="deletingPageId === page.page_id" class="spinner-border spinner-border-sm"></span>
                            <i v-else class="fa fa-trash"></i>
                        </button>

                        <button 
                            class="btn btn-sm btn-outline-warning"
                            @click="customizePage(page)"
                            title="Customizer"
                        >
                            <i class="fa fa-cogs"></i>
                        </button>
                      </td>
                  </tr>
                  </tbody>
              </table>
            </div>

            <!-- Empty State -->
            <div v-else class="text-muted mt-3 text-center">
            No template pages found.
            </div>
        </div>

        <!-- Popup Modal -->
        <div v-if="showPopup" class="modal-overlay">
            <div class="modal-content">
                <h5>{{ editingPageId ? "Edit Page" : "Add New Page" }}</h5>
                <form @submit.prevent="saveTemplatePage">
                    <div class="form-group">
                        <label>Title</label>
                        <input v-model="newPage.title" type="text" class="form-control" />
                    </div>

                    <div class="form-group url-group">
                        <label>Page URL</label>
                        <span class="copy-icon" @click="copyUrl" title="Copy URL">
                            <i class="fa fa-clipboard" aria-hidden="true"></i>
                        </span>
                        <div class="url-wrapper">
                            <span class="input-prefix">{{ siteSettingsDetail?.website_domain }}</span>
                            <input 
                                v-model="newPage.slug" 
                                type="text" 
                                class="form-control slug-input"
                                @input="slugEditedManually = true"
                            />
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" @click="closePopup" :disabled="isSaving">Cancel</button>
                        <button type="submit" class="btn btn-primary" :disabled="isSaving">
                          <span v-if="isSaving" class="spinner-border spinner-border-sm me-2"></span>
                          {{ editingPageId ? (isSaving ? "Updating..." : "Update") : (isSaving ? "Saving..." : "Save") }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    min-height: 100vh;
}

.templatepages-container {
    background-color: #f8f9fa;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    width: 100%;
    max-width: 100%;
    overflow-y: auto; 
}

.templatepages-header{
    margin-left: 210px;
    margin-top: 43px;
}

.btn-addnewpage{
    background: #1d2b64;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
}

.btn-addnewpage:hover {
    background: #fff;
    color: #1d2b64;
    border: 2px solid #1d2b64;
}

/* Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}
.modal-content {
    background: #fff;
    padding: 20px;
    width: 500px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.modal-content h5 {
    margin-bottom: 15px;
}
.form-group {
    margin-bottom: 15px;
}
.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
.btn-primary {
    background: #1d2b64;
    color: #fff;
    border: none;
    padding: 8px 16px;
    font-weight: 600;
    cursor: pointer;
}
.btn-secondary {
    background: #ccc;
    color: #000;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
}
.url-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.input-prefix {
  background: #f1f1f1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-right: none;
  border-radius: 4px 0 0 4px;
}
.slug-input {
  flex: 1;
  padding-right: 35px; 
  border-radius: 0 4px 4px 0;
}
.copy-icon {
  position: absolute;
  right: 22px;
  top: 54%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 16px;
  color: #555;
}
.copy-icon:hover {
  color: #1d2b64;
}
.pages-table {
    margin-left: 205px;
}
.table th,
.table td {
    padding: 8px 12px;         
    vertical-align: middle; 
    text-align: center; 
}
.table thead {
    background-color: #f1f3f5;
}
.table th {
    font-weight: 600;
    text-align: center;
}
.table td:first-child,
.table th:first-child {
    text-align: left;   
}
.table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}
</style>
