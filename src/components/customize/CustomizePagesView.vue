<script setup>
/* =========================
   Imports
========================= */
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import Loader from "@/components/common/Loader.vue";
import FlashMessage from "@/components/common/FlashMessage.vue";
import { componentLibrary } from "@/components/library/library.js";

import { ref, computed, onMounted, provide, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "@/service/useAuth";
import { useStore } from "@/stores/store";
import WordpressService from "@/service/WordpressService";

/* =========================
   Router, Auth & Store
========================= */
const router = useRouter();
const route = useRoute();
const { logout } = useAuth();
const store = useStore();

/* =========================
   Reactive State Variables
========================= */
const isSidebarToggled = ref(false);
const initialLoading = ref(true);
const loading = ref(true);
const isSaving = ref(false);
const saveTimeout = ref(null);

const dashboardData = ref([]);
const siteComponentFields = ref([]);
const globalVariables = ref([]);
const siteSettingsDetail = ref(null);
const componentIdsByType = ref({});
const headerMenus = ref([]);
const footerMenus = ref([]);
const pageId = ref(route.query.page_id ? parseInt(route.query.page_id) : null);
const templatePages = ref([]);
const selectedCategory = ref("");


/* =========================
   Component Registry
========================= */
const componentRegistry = componentLibrary;

/* =========================
   UI Methods
========================= */
const navBarToggle = (value) => (isSidebarToggled.value = value);

/* =========================
   Helper Functions
========================= */
// Decode HTML for rendering in template
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

// Get fields for a specific component type safely
const getFieldsByComponentType = (type) => {
  const component = siteComponentFields.value.find((c) => c.type === type);
  return component?.fields || [];
};

// Helper to get field value by name
const getFieldValue = (fields, name, metaIndex = null) => {
  const field = fields.find((f) => f.field_name === name);
  if (!field) return "";
  return metaIndex ? field[`meta${metaIndex}`] || "" : field.value || "";
};

/* =========================
   Computed Properties
========================= */
// Hero block
const heroBlockData = computed(() => {
  const fields = getFieldsByComponentType("header");
  if (!fields.length) return null;

  const websiteDomain = siteSettingsDetail.value?.website_domain || "";
  const logoField = globalVariables.value.find((item) => item.name === "logo");
  const baseUrl = websiteDomain.replace(/\/$/, "") + "/wp-content/themes/codeforeach/";

  return {
    logo: logoField ? baseUrl + logoField.value.replace(/^\//, "") : "",
    menu: headerMenus.value.map((m) => m.name),
    "header-text1": getFieldValue(fields, "header-text1"),
    "header-text2": getFieldValue(fields, "header-text2"),
    "header-description1": getFieldValue(fields, "header-description1"),
    "header-button1": getFieldValue(fields, "header-button1"),
    buttonUrl: getFieldValue(fields, "header-button1", 1) || "#",
    buttonTarget: getFieldValue(fields, "header-button1", 2) || "_self",
   "header-image": getFieldValue(fields, "header-img") || "",
  };
});

// About block
const aboutBlockData = computed(() => {
  const fields = getFieldsByComponentType("about_section");
  if (!fields.length) return null;

  const services = Array.from({ length: 6 }, (_, i) => ({
    [`about-image${i + 1}`]: getFieldValue(fields, `about-img${i + 1}`),
    [`about-text${i + 5}`]: getFieldValue(fields, `about-text${i + 5}`),
  }));

  return {
    "about-text1": getFieldValue(fields, "about-text1"),
    "about-text2": getFieldValue(fields, "about-text2"),
    "about-text3": getFieldValue(fields, "about-text3"),
    "about-text4": getFieldValue(fields, "about-text4"),
    services,
  };
});

// Service block
const serviceBlockData = computed(() => {
  const fields = getFieldsByComponentType("service_section");
  if (!fields.length) return null;

  const services = Array.from({ length: 2 }, (_, i) => ({
    [`service-image${i + 1}`]: getFieldValue(fields, `service-image${i + 1}`),
    [`service-text${i + 2}`]: getFieldValue(fields, `service-text${i + 2}`),
    [`service-description${i + 2}`]: getFieldValue(fields, `service-description${i + 2}`),
  }));

  return {
    "service-text1": getFieldValue(fields, "service-text1"),
    "service-description1": getFieldValue(fields, "service-description1"),
    services,
  };
});

// Footer block
const footerBlockData = computed(() => {
  const fields = getFieldsByComponentType("footer");
  if (!fields.length) return null;

  const logoField = globalVariables.value.find((item) => item.name === "logo");

  // Map social link icons
  const socialLinkIcons = {
    whatsApp: "fa fa-whatsapp",
    facebook: "fa fa-facebook",
    youTube: "fa fa-youtube",
    instagram: "fa fa-instagram",
    x: "fa fa-twitter",
  };

  // Map social links dynamically from globalVariables
  const socialLinks = globalVariables.value
    .filter((item) => socialLinkIcons[item.name] && item.value)
    .map((item) => ({
      url: item.value,
      icon: socialLinkIcons[item.name],
    }));

  // Helper to get global variable by name
  const getGlobalVar = (name, fallback = "") => {
    const item = globalVariables.value.find((v) => v.name === name);
    return item ? item.value : fallback;
  };

  // Build full address
  const fullAddress = [
    getGlobalVar("address"),
    getGlobalVar("city"),
    getGlobalVar("state"),
    getGlobalVar("country"),
    getGlobalVar("pincode")
  ]
    .filter(Boolean) // remove empty parts
    .join(", ");

  return {
    logo: logoField
      ? "https://alphafour.speedysites.in/wp-content/themes/codeforeach/" +
        logoField.value.replace(/^\//, "")
      : "",
    "footer-description1": getFieldValue(fields, "footer-description1"),
    "footer-button1": getFieldValue(fields, "footer-button1"),
    phone: getGlobalVar("phone", "8475937593"),
    address: fullAddress || "Test Test",
    "footer-text1": getFieldValue(fields, "footer-text1"),
    "footer-text2": getFieldValue(fields, "footer-text2"),
    "footer-text3": getFieldValue(fields, "footer-text3"),
    menu: footerMenus.value.map((m) => m.name),
    socialLinks,
    copyright: getGlobalVar("agency_name", "Your Agency"),
  };
});

// All sections for editor rendering
const sections = computed(() => [
  { key: "header", data: heroBlockData.value },
  { key: "about_section", data: aboutBlockData.value },
  { key: "service_section", data: serviceBlockData.value },
  { key: "footer", data: footerBlockData.value },
]);

/* =========================
   Data Fetching Functions
========================= */
const fetchDashboardData = async () => {
  try {
    const res = await WordpressService.fetchDashboardData();
    if (res.status === 200 && res.data.success) {
      dashboardData.value = res.data;
      loading.value = false;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      router.push("/login");
    } else console.error("Dashboard fetch error:", error);
  }
};

const getSiteDetails = async () => {
  if (!store.websiteId) return;
  try {
    const res = await WordpressService.WebsiteSettings.getSiteDetail({ website_id: store.websiteId });
    if (res.status === 200 && res.data.success) {
      siteSettingsDetail.value = res.data.settings_detail;
      selectedCategory.value = siteSettingsDetail.value.agency_website_detail.website_category_name?.trim() || "";
    }
  } catch (error) {
    console.error("Error fetching site details:", error);
  }
};

const getActiveComponentIds = async () => {
  try {
    const res = await WordpressService.Components.getActiveComponents({
      website_url: siteSettingsDetail.value?.website_domain,
      page_id: pageId.value,
    });
    if (res.status === 200 && res.data.success) {
      const map = {};
      res.data.components_detail.forEach((comp) => (map[comp.type] = comp.id));
      componentIdsByType.value = map;
    }
  } catch (error) {
    console.error("Error fetching active components:", error);
  }
};

const fetchGlobalVariables = async () => {
  if (!siteSettingsDetail.value?.website_domain) return;
  try {
    const res = await WordpressService.getGlobalVariables({ website_domain: siteSettingsDetail.value.website_domain });
    if (res.status === 200 && res.data.success) globalVariables.value = res.data.global_variables || [];
  } catch (error) {
    console.error("Error fetching global variables:", error);
  }
};

const getMenus = async () => {
  try {
    const res = await WordpressService.Menus.getMenus({ website_url: siteSettingsDetail.value?.website_domain });
    if (res.status === 200 && res.data.success) {
      headerMenus.value = res.data.response.filter((m) => m.menu_type === "header");
      footerMenus.value = res.data.response.filter((m) => m.menu_type === "footer");
    }
  } catch (error) {
    console.error("Error fetching menus:", error);
  }
};

const fetchCustomComponentsAndFieldsValue = async () => {
  try {
    const res = await WordpressService.CustomComponentsAndFieldValues.getCustomComponentsAndFieldValues({
      website_domain: siteSettingsDetail.value.website_domain,
      page_id: pageId.value,
      component_ids: componentIdsByType.value,
    });
    if (res.status === 200 && res.data.success) siteComponentFields.value = res.data.data;
  } catch (error) {
    console.error("Error fetching component fields:", error);
  }
};

/* =========================
   Save Field with Debounce
========================= */
const saveCustomComponentsFieldValues = (field_name, value, type = "text", file) => {
  if (!pageId.value) return;
  isSaving.value = true;

  if (saveTimeout.value) clearTimeout(saveTimeout.value);
  if (typeof field_name === "object") {
    const data = field_name;
    value = data.value;
    type = data.type || "text"; 
    field_name = data.field_name;
    file = data.file;
  }

  saveTimeout.value = setTimeout(async () => {
    try {
      let formData = new FormData();
      formData.append("website_url", siteSettingsDetail.value?.website_domain);
      formData.append("page_id", pageId.value);
      formData.append("field_name", field_name);
      formData.append("value", value);
      formData.append("type", type);

      if (file) {
        formData.append("file", file);
      }

      const res = await WordpressService.CustomComponentsAndFieldValues.saveCustomComponentsFieldValues(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200 && res.data.success) {
        store.updateFlashMeassge(true, `Changes are saved successfully!`, 'success');
      }
    } catch (error) {
      console.error("Error saving field:", error);
      store.updateFlashMeassge(true, `Error saving the changes`, 'error');
    } finally {
      isSaving.value = false;
    }
  }, 800);
};

// -------------------------
// Fetch Template Pages
// -------------------------
const getTemplatePage = async () => {
    try {
        const response = await WordpressService.TemplatePages.getTemplatePage({
            website_domain: siteSettingsDetail.value.website_domain,
        });

        if (response.status === 200 && response.data.success) {
            templatePages.value = response.data.response;
        }
    } catch (error) {
        console.error(error);
    }
};

const currentPage = computed(() => {
  if (!pageId.value || !templatePages.value.length) return null;
  return templatePages.value.find(p => p.page_id === pageId.value) || null;
});

/* =========================
   Lifecycle Hooks
========================= */
onMounted(async () => {
  try {
    await fetchDashboardData();
    await getSiteDetails();
    await getActiveComponentIds();
    await fetchGlobalVariables();
    await getMenus();
    await fetchCustomComponentsAndFieldsValue();
    await getTemplatePage();
  } finally {
    initialLoading.value = false;
  }
});

/* =========================
   Watchers
========================= */
watch(() => store.websiteId, async () => {
  await getSiteDetails();
  await fetchDashboardData();
});

watch(pageId, (newId) => {
  if (newId) router.push({ query: { ...route.query, page_id: newId } });
});

/* =========================
   Provide Methods
========================= */
provide("dashBoardMethods", { fetchDashboardData });
</script>

<template>
  <div class="page">
    <!-- Flash Message -->
    <FlashMessage v-if="store.flashMeassge" :visible="store.flashMeassge" />

    <!-- Navbar -->
    <NavBar @logout="logout" @nav-bar-toggle="navBarToggle" :dashboardData="dashboardData?.user" />

    <!-- Sidebar -->
    <SideBar :dashboardData="dashboardData" :toggled="isSidebarToggled" />

    <!-- Main Content -->
    <section id="content-wrapper main-content side-content">
       <!-- Saving Indicator -->
       <div v-if="isSaving" class="saving-indicator">
        <i class="fa fa-spinner fa-spin"></i> Saving...
      </div>

      <!-- Loader -->
      <Loader v-if="initialLoading" />

      <template v-else>
        <!-- Page Title & Template Selector -->
        <div v-if="currentPage" class="page-title mt-2">
          <h2>{{ decodeHtml(currentPage.page_name) }} Page Customization</h2>
          <button class="back-btn" @click="router.push('/customize/template-pages')">
            <i class="fa fa-arrow-left"></i> Back To Pages
          </button>
        </div>

        <!-- Component Editor -->
        <div class="side-app">
          <div class="main-container-components container">
            <div class="eidtor-site">
              <div v-for="(section, index) in sections" :key="section.key">
                <div class="eidtor-img">
                  <component
                    v-if="section.data"
                    :is="componentRegistry[section.key]"
                    :data="section.data"
                    :isEditing="true"
                    @field-updated="saveCustomComponentsFieldValues"
                  />
                </div>
                <!-- Add new section button -->
                <div v-if="index !== sections.length - 1" class="main-div1">
                  <div class="edit-section"></div>
                  <h1><i class="fa fa-plus"></i> Add new section <i class="fa fa-plus"></i></h1>
                  <div class="edit-section1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>

<style scoped>
.eidtor-site {
  max-width: 100% !important;
}
.main-container-components.container {
  width: 80% !important;
  position: absolute !important;
  left: 17% !important;
}

.saving-indicator {
  position: absolute;
  right: 20px;
  color: #222831;
  font-size: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0px;
}

.page-title {
  margin-left: 256px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-btn {
  background: #1d2b64;
  color: #fff;
  border: 1px solid #1d2b64;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s ease;
  margin-right: 57px;
}

.back-btn:hover {
  background: transparent;
  color: #1d2b64;
}

.side-app {
    padding-top: 12px;
}

</style>
