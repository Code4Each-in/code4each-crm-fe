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
const isDeleting = ref(false);
const adminEmail = ref("")
const showReplacePopup = ref(false);
const replaceComponentType = ref("");
const replaceComponentOptions = ref([]); 
const currentReplacingKey = ref(null);
const selectedReplacementId = ref(null);
const componentUniqueIdsByType = ref({});
const actionLoading = ref(false);
const replaceLoading = ref(false);
const usedComponentIds = computed(() => Object.values(componentUniqueIdsByType.value).flat());
const showAddSectionPopup = ref(false);
const addSectionOptions = ref([]);
const selectedAddSectionId = ref(null);
const addSectionType = ref("");
const activeComponents = ref([]); 
const globalToggle = ref({
  header: false,
  footer: false
});

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
const getFieldsByComponentType = (type, componentuniqueId) => {
  const component = siteComponentFields.value.find((c) => c.type === type && c.component_unique_id === componentuniqueId);
  return component?.fields || [];
};


// Helper to get field value by name
const getFieldValue = (fields, name, metaIndex = null) => {
  const field = fields.find(
    (f) => f.field_name === name || f.name === name 
  );
  if (!field) return "";
  return metaIndex ? field[`meta${metaIndex}`] || "" : field.value || "";
};

/* =========================
   Computed Properties
========================= */
// Hero block
const heroBlockData = (componentuniqueId) => {
  const fields = getFieldsByComponentType("header", componentuniqueId);
  if (!fields.length) return null;

  const websiteDomain = siteSettingsDetail.value?.staging_domain || "";
  const logoField = globalVariables.value.find((item) => item.name === "logo");
  const baseUrl = websiteDomain.replace(/\/$/, "") + "/wp-content/themes/codeforeach/";

  // Helper to get global variable by name
  const getGlobalVar = (name, fallback = "") => {
    const item = globalVariables.value.find((v) => v.name === name);
    return item ? item.value : fallback;
  };

  // Map social link icons
  const socialLinkIcons = {
    whatsApp: "fa fa-whatsapp",
    facebook: "fa fa-facebook",
    youTube: "fa fa-youtube-play",
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

  // Build full address
  const fullAddress = [
    getGlobalVar("address"),
    getGlobalVar("city"),
    getGlobalVar("state"),
    getGlobalVar("country"),
    getGlobalVar("pincode")
  ]
    .filter(Boolean) 
    .join(", ");

  return {
    logo: logoField ? baseUrl + logoField.value.replace(/^\//, "") : "",
    menu: headerMenus.value.map((m) => m.name),
    "header-text1": getFieldValue(fields, "header-text1"),
    "header-text2": getFieldValue(fields, "header-text2"),
    "header-description1": getFieldValue(fields, "header-description1"),
    "header-button1": getFieldValue(fields, "header-button1"),
    buttonUrl: getFieldValue(fields, "header-button1", 1) || "#",
    buttonTarget: getFieldValue(fields, "header-button1", 2) || "_self",
    "header-image1": getFieldValue(fields, "header-img1") || getFieldValue(fields, "header-image1"),
    address: fullAddress,
    phone: getGlobalVar("phone", ""),
    socialLinks,
    email: adminEmail.value,
    "header-images1": getFieldValue(fields, "header-images"),
  };
};

// About block
const aboutBlockData = (componentuniqueId) => {
  const fields = getFieldsByComponentType("about_section", componentuniqueId);
  if (!fields.length) return null;

  return {
    "about-text1": getFieldValue(fields, "about-text1"),
    "about-text2": getFieldValue(fields, "about-text2"),
    "about-text3": getFieldValue(fields, "about-text3"),
    "about-text4": getFieldValue(fields, "about-text4"),
    "about-description1": getFieldValue(fields, "about-description1"),
    "about-description2": getFieldValue(fields, "about-description2"),
    "about-button1": getFieldValue(fields, "about-button1"),
    "about-image1": getFieldValue(fields, "about-img1") || getFieldValue(fields, "about-image1"),
    "about-image2": getFieldValue(fields, "about-img2") || getFieldValue(fields, "about-image2"),
    "about-image3": getFieldValue(fields, "about-img3") || getFieldValue(fields, "about-image3"),
    "about-image4": getFieldValue(fields, "about-img4"),
    "about-image5": getFieldValue(fields, "about-img5"),
    "about-image6": getFieldValue(fields, "about-img6"),
    "about-text5": getFieldValue(fields, "about-text5"),
    "about-text6": getFieldValue(fields, "about-text6"),
    "about-text7": getFieldValue(fields, "about-text7"),
    "about-text8": getFieldValue(fields, "about-text8"),
    "about-text9": getFieldValue(fields, "about-text9"),
    "about-text10": getFieldValue(fields, "about-text10"),
    "about-service1": getFieldValue(fields, "about-service1"),
    "about-service2": getFieldValue(fields, "about-service2"),
    "about-service3": getFieldValue(fields, "about-service3"),
    "about-service4": getFieldValue(fields, "about-service4"),
    "about-service5": getFieldValue(fields, "about-service5"),
    "about-service6": getFieldValue(fields, "about-service6"),
  };
};

// Service block
const serviceBlockData = (componentuniqueId) => {
  const fields = getFieldsByComponentType("service_section", componentuniqueId);
  if (!fields.length) return null;

  return {
    "service-text1": getFieldValue(fields, "service-text1"),
    "service-text2": getFieldValue(fields, "service-text2"),
    "service-image1": getFieldValue(fields, "service-image1"),
    "service-text3": getFieldValue(fields, "service-text3"),
    "service-description1": getFieldValue(fields, "service-description1"),
    "service-button1": getFieldValue(fields, "service-button1"),
    "service-image2": getFieldValue(fields, "service-image2"),
    "service-text4": getFieldValue(fields, "service-text4"),
    "service-description2": getFieldValue(fields, "service-description2"),
    "service-button2": getFieldValue(fields, "service-button2"),
    "service-image3": getFieldValue(fields, "service-image3"),
    "service-text5": getFieldValue(fields, "service-text5"),
    "service-description3": getFieldValue(fields, "service-description3"),
    "service-button3": getFieldValue(fields, "service-button3"),
    "service-image4": getFieldValue(fields, "service-image4"),
    "service-text6": getFieldValue(fields, "service-text6"),
    "service-description4": getFieldValue(fields, "service-description4"),
    "service-button4": getFieldValue(fields, "service-button4"),
    "service-image5": getFieldValue(fields, "service-image5"),
    "service-image6": getFieldValue(fields, "service-image6"),
    "service-description5": getFieldValue(fields, "service-description5"),
    "service-description6": getFieldValue(fields, "service-description6"),
    "service-text7": getFieldValue(fields, "service-text7"),
    "service-text8": getFieldValue(fields, "service-text8"),
  };
};

// Footer block
const footerBlockData = (componentuniqueId) => {
  const fields = getFieldsByComponentType("footer", componentuniqueId);
  if (!fields.length) return null;

  const logoField = globalVariables.value.find((item) => item.name === "logo");

  // Social link icons mapping
  const socialLinkIcons = {
    whatsApp: "fa fa-whatsapp",
    facebook: "fa fa-facebook",
    youTube: "fa fa-youtube-play",
    instagram: "fa fa-instagram",
    x: "fa fa-twitter",
  };

  // Map social links dynamically
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
    getGlobalVar("pincode"),
  ]
    .filter(Boolean) // remove empty parts
    .join(", ");

  // Dynamically build footer images
  const footerimages = {};
  for (let i = 1; i <= 6; i++) {
    const field = fields.find((f) => f.field_name === `footer-image${i}`);
    footerimages[`footer-image${i}`] = field?.value || field?.default_value || `/images/service-image${i}.png`;
  }
  console.log(logoField.value);
  return {
    logo: logoField
      ? "https://alphafour.speedysites.in/wp-content/themes/codeforeach/" +
        logoField.value.replace(/^\//, "")
      : "/images/logo.png",
    "footer-description1": getFieldValue(fields, "footer-description1"),
    "footer-button1": getFieldValue(fields, "footer-button1"),
    phone: getGlobalVar("phone", "+91 99999 99999"),
    address: fullAddress || "123 Street, City, State, Country",
    "footer-text1": getFieldValue(fields, "footer-text1"),
    "footer-text2": getFieldValue(fields, "footer-text2"),
    "footer-text3": getFieldValue(fields, "footer-text3"),
    "footer-text4": getFieldValue(fields, "footer-text4"),
    menu: footerMenus.value.map((m) => m.name),
    socialLinks,
    copyright: getGlobalVar("agency_name", "Your Agency"),
    email: adminEmail.value || "default@gmail.com",
    ...footerimages, 
  };
};

// Common Text 
const commonTextBlockData = (componentuniqueId) => {
  const fields = getFieldsByComponentType("common_text", componentuniqueId);
  if (!fields.length) return null;

  return {
    'common-image1': getFieldValue(fields, "common-image1"),
    'common-text1': getFieldValue(fields, "common-text1"),
    'common-text2': getFieldValue(fields, "common-text2"),
    'common-description1': getFieldValue(fields, "common-description1"),
    'common-image2': getFieldValue(fields, "common-image2"),
    'common-text3': getFieldValue(fields, "common-text3"),
    'common-description2': getFieldValue(fields, "common-description2"),
    'common-image3': getFieldValue(fields, "common-image3"),
    'common-text4': getFieldValue(fields, "common-text4"),
    'common-description3': getFieldValue(fields, "common-description3"),
    'common-image4': getFieldValue(fields, "common-image4"),
    'common-text5': getFieldValue(fields, "common-text5"),
    'common-description4': getFieldValue(fields, "common-description4"),
  };
}

// Common Contact Form
const commonContactFormBlockData = (componentuniqueId) => {
  const fields = getFieldsByComponentType("contact_form", componentuniqueId);
  if (!fields.length) return null;

  // Find the field with field_name = 'contact-button1'
  const buttonField = fields.find(field => field.field_name === 'contact-button1');
  const formId = buttonField ? buttonField.form_id : null;

  return {
    'contact-text1': getFieldValue(fields, "contact-text1"),
    'contact-text2': getFieldValue(fields, "contact-text2"),
    'contact-text3': getFieldValue(fields, "contact-text3"),
    'contact-description1': getFieldValue(fields, "contact-description1"),
    'contact-button1': getFieldValue(fields, "contact-button1"),
    'form_id': formId
  };
}

// Common Google Map
const commonGoogleMapBlockData = (componentuniqueId) => {
  const fields = getFieldsByComponentType("google_map", componentuniqueId);
  if (!fields.length) return null;

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
    .filter(Boolean) 
    .join(", ");

  return {
    'googlemap-text1': getFieldValue(fields, "googlemap-text1"),
    'googlemap-text2': getFieldValue(fields, "googlemap-text2"),
    'googlemap-description1': getFieldValue(fields, "googlemap-description1"),
    'googlemap-text3': getFieldValue(fields, "googlemap-text3"),
    'googlemap-text4': getFieldValue(fields, "googlemap-text4"),
    'googlemap-text5': getFieldValue(fields, "googlemap-text5"),
    'googlemap-text6': getFieldValue(fields, "googlemap-text6"),
    'googlemap-text7': getFieldValue(fields, "googlemap-text7"),
    'googlemap-text8': getFieldValue(fields, "googlemap-text8"),
    'googlemap-text9': getFieldValue(fields, "googlemap-text9"),
    'googlemap-text10': getFieldValue(fields, "googlemap-text10"),
    address: fullAddress,
    phone: getGlobalVar("phone", ""),
    email: adminEmail.value,
  };
}

// Gallery Section
const commonGallerySectionBlockData = (componentuniqueId) => {
  const fields = getFieldsByComponentType("gallery_section", componentuniqueId);
  if (!fields.length) return null;

  return {
    'gallery-text1': getFieldValue(fields, "gallery-text1"),
    'gallery-text2': getFieldValue(fields, "gallery-text2"),
    'gallery-image1': getFieldValue(fields, "gallery-image1"),
    'gallery-image2': getFieldValue(fields, "gallery-image2"),
    'gallery-image3': getFieldValue(fields, "gallery-image3"),
    'gallery-image4': getFieldValue(fields, "gallery-image4"),
    'gallery-image5': getFieldValue(fields, "gallery-image5"),
    'gallery-image6': getFieldValue(fields, "gallery-image6"),
  };
};

// All sections for editor rendering
const sections = computed(() => {
  return activeComponents.value
    .map((comp) => {
      let data = null;

      if (comp.type === "header") data = heroBlockData(comp.id);
      else if (comp.type === "about_section") data = aboutBlockData(comp.id);
      else if (comp.type === "service_section") data = serviceBlockData(comp.id);
      else if (comp.type === "footer") data = footerBlockData(comp.id);
      else if (comp.type === "common_text") data = commonTextBlockData(comp.id);
      else if (comp.type === "contact_form") data = commonContactFormBlockData(comp.id);
      else if (comp.type === "google_map") data = commonGoogleMapBlockData(comp.id);
      else if (comp.type === "gallery_section") data = commonGallerySectionBlockData(comp.id);

      if (!data || Object.keys(data).length === 0) return null;

      return { key: comp.id, type: comp.type, data };
    })
    .filter(Boolean);
});

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
      website_url: siteSettingsDetail.value?.staging_domain,
      page_id: pageId.value,
    });
    if (res.status === 200 && res.data.success) {
      activeComponents.value = res.data.components_detail;
      const map = {};
      const uniqueMap = {};
      res.data.components_detail.forEach((comp) => {
        if (!map[comp.type]) map[comp.type] = [];
        map[comp.type].push(comp.id);

        if (!uniqueMap[comp.type]) uniqueMap[comp.type] = [];
        uniqueMap[comp.type].push(comp.id);
      });
      componentIdsByType.value = map;
      componentUniqueIdsByType.value = uniqueMap;
    }
  } catch (error) {
    console.error("Error fetching active components:", error);
  }
};

const fetchGlobalVariables = async () => {
  if (!siteSettingsDetail.value?.staging_domain) return;
  try {
    const res = await WordpressService.getGlobalVariables({ website_domain: siteSettingsDetail.value.staging_domain });
    if (res.status === 200 && res.data.success) {
      globalVariables.value = res.data.global_variables || [];
      adminEmail.value = res.data.admin_email || "";

      // Map backend variables to toggles
      globalVariables.value.forEach((variable) => {
        if (variable.name === "global-header-value") {
          globalToggle.value.header = variable.value === "on";
        } else if (variable.name === "global-footer-value") {
          globalToggle.value.footer = variable.value === "on";
        }
      });
    }
  } catch (error) {
    console.error("Error fetching global variables:", error);
  }
};

const getMenus = async () => {
  try {
    const res = await WordpressService.Menus.getMenus({ website_url: siteSettingsDetail.value?.staging_domain });
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
    const componentIds = activeComponents.value.map(c => c.id);
    const res = await WordpressService.CustomComponentsAndFieldValues.getCustomComponentsAndFieldValues({
      website_domain: siteSettingsDetail.value.staging_domain,
      page_id: pageId.value,
      component_ids: componentIds,
    });
    if (res.status === 200 && res.data.success) siteComponentFields.value = res.data.data;
  } catch (error) {
    console.error("Error fetching component fields:", error);
  }
};

/* =========================
   Save Field with Debounce
========================= */
const saveCustomComponentsFieldValues = (field_name, value, type = "text", file, componentId) => {
  if (!pageId.value) return;
  isSaving.value = true; 

  if (saveTimeout.value) clearTimeout(saveTimeout.value);
  if (typeof field_name === "object") {
    const data = field_name;
    value = data.value;
    type = data.type || "text"; 
    field_name = data.field_name;
    file = data.file;
    componentId = data.componentId;
  }

  saveTimeout.value = setTimeout(async () => {
    try {
      let formData = new FormData();
      formData.append("website_url", siteSettingsDetail.value?.staging_domain);
      formData.append("page_id", pageId.value);
      formData.append("field_name", field_name);
      formData.append("value", value);
      formData.append("type", type);
      formData.append("component_id", componentId);
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
            website_domain: siteSettingsDetail.value.staging_domain,
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

const deleteCustomComponent = async (componentUniqueId) => {
  const compId = componentUniqueId; 
  if (!compId) {
    console.error("Component ID not found for type:", type);
    return;
  }

  if (!confirm("Are you sure you want to delete this component?")) return;

  try {
    actionLoading.value = true;
    const res = await WordpressService.CustomComponentsAndFieldValues.deleteCustomComponent({
      component_unique_id: compId,
      website_domain: siteSettingsDetail.value?.staging_domain,
    });

    if (res.status === 200 && res.data.success) {
      await getActiveComponentIds();
      await fetchCustomComponentsAndFieldsValue();
      store.updateFlashMeassge(true, "Component deleted successfully!", "success");
    } else {
      store.updateFlashMeassge(true, "Failed to delete component.", "error");
    }
  } catch (error) {
    console.error("Error deleting component:", error);
    store.updateFlashMeassge(true, "Error deleting component.", "error");
  } finally {
    actionLoading.value = false;
  }
};

const getComponentsByType = async (type) => {
  try {
    const res = await WordpressService.CustomComponentsAndFieldValues.getComponentsByType({ type });
    if (res.status === 200 && res.data.success) {
      const baseUrl = import.meta.env.VITE_CRM_API_URL;
      replaceComponentOptions.value = (res.data.component || []).map(comp => ({
        id: comp.id, 
        unique_id: comp.component_unique_id, 
        type: comp.type,
        preview_url: `${baseUrl}${comp.preview}`,
        data: comp.data || {}
      }));
    }
  } catch (error) {
    console.error("Error fetching components by type:", error);
  }
};

const replaceComponent = async (componentKey) => {
  currentReplacingKey.value = componentKey;

  const section = sections.value.find(s => s.key === componentKey);
  if (!section) return;

  replaceComponentType.value = section.type;
  showReplacePopup.value = true;
  replaceLoading.value = true;
  // Fetch replacements
  await getComponentsByType(section.type);
  replaceLoading.value = false;
};

const selectReplacement = (unique_id) => {
  selectedReplacementId.value = unique_id;
};

// Send replacement to API
const replaceCustomComponent = async () => {
  if (!selectedReplacementId.value || !currentReplacingKey.value) return;

  showReplacePopup.value = false;

  const type = replaceComponentType.value;
  const newComponentId = selectedReplacementId.value;
  const oldComponentUniqueId = currentReplacingKey.value;

  try {
    actionLoading.value = true;
    const res = await WordpressService.CustomComponentsAndFieldValues.replaceCustomComponent({
      website_domain: siteSettingsDetail.value.staging_domain,
      old_component_id: oldComponentUniqueId,
      new_component_id: newComponentId,
      type,
      page_id: pageId.value,
    });

    if (res.status === 200 && res.data.success) {
      // Close popup
      selectedReplacementId.value = null;
      currentReplacingKey.value = null;

      // Refresh the components
      await getActiveComponentIds();
      await fetchCustomComponentsAndFieldsValue();
      store.updateFlashMeassge(true, "Component replaced successfully!", "success");
    } else {
      store.updateFlashMeassge(true, "Failed to replace component.", "error");
    }
  } catch (error) {
    console.error("Error replacing component:", error);
    store.updateFlashMeassge(true, "Error replacing component.", "error");
  } finally {
    actionLoading.value = false;
  }
};

const onGlobalToggle = async (type, event) => {
  const newValue = event.target.checked;

  if (!newValue) {
    // If user is turning it OFF
    const confirmed = window.confirm(
      `Are you sure you want to turn OFF global updates for ${type.toUpperCase()}?\n` +
      `If you turn it off, any changes you make to the ${type} will only apply to this page.`
    );

    if (!confirmed) {
      // revert toggle back to ON
      event.target.checked = true;
      return;
    }
  }

  // Update local value
  globalToggle.value[type] = newValue;

  try {
    const res = await WordpressService.CustomComponentsAndFieldValues.addGlobalSwitchValue({
      website_domain: siteSettingsDetail.value.staging_domain,
      type, 
      value: newValue ? "on" : "off",
    });
    if (res.status === 200 && res.data.success) {
      store.updateFlashMeassge(true, "Switch Updated Globally", "success");
    }
  } catch (error) {
    console.error("Error updating global toggle:", error);
    globalToggle.value[type] = !newValue;
    event.target.checked = !newValue;
    alert("Something went wrong while updating. Please try again.");
  }
}

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

const closeReplacePopup = () => {
  showReplacePopup.value = false;
  selectedReplacementId.value = null;
};

const closeAddNewSectionPopup = () => {
  showAddSectionPopup.value = false;
  selectedAddSectionId.value = null;
}

/* =========================
   Add Section Popup Logic
========================= */
const alwaysTypesToAdd = ["about_section", "service_section", "common_text", "contact_form", "google_map", "gallery_section"];

const openAddSectionPopup = async (sectionKey) => {
  showAddSectionPopup.value = true;
  addSectionType.value = "custom";
  currentReplacingKey.value = sectionKey;

  // Exclude already used IDs
  const excludeIds = alwaysTypesToAdd
  .map(t => componentIdsByType.value[t])
  .filter(Boolean)
  .flat(); 

  try {
    replaceLoading.value = true;
    const res = await WordpressService.CustomComponentsAndFieldValues.getComponentForNewSection({
      type: alwaysTypesToAdd,
      exclude_ids: excludeIds,
    });

    if (res.status === 200 && res.data.success) {
      const baseUrl = import.meta.env.VITE_CRM_API_URL;
      addSectionOptions.value = (res.data.component || []).map(comp => ({
        id: comp.id,
        unique_id: comp.component_unique_id,
        type: comp.type,
        preview_url: `${baseUrl}${comp.preview}`,
        data: comp.data || {},
      }));
    }
  } catch (error) {
    console.error("Error fetching components for add section:", error);
  } finally {
    replaceLoading.value = false;
  }
};

const selectAddSection = (unique_id) => {
  selectedAddSectionId.value = unique_id;
};

const addNewSection = async () => {
  if (!selectedAddSectionId.value || !currentReplacingKey.value) return;

  const newComponentId = selectedAddSectionId.value;
  const afterSectionKey = currentReplacingKey.value;
  showAddSectionPopup.value = false;
  try {
    actionLoading.value = true;

    // Reset popup state
    selectedAddSectionId.value = null;

    // Find the position of after_section_id from already fetched active components
    const afterSection = activeComponents.value.find(comp => comp.id === afterSectionKey);
    const afterSectionPosition = afterSection ? afterSection.position : null;

    const res = await WordpressService.CustomComponentsAndFieldValues.addNewSection({
      website_domain: siteSettingsDetail.value.staging_domain,
      page_id: pageId.value,
      new_component_id: newComponentId,
      previous_component_id: afterSectionKey, 
      previous_section_position: afterSectionPosition,
    });

    if (res.status === 200 && res.data.success) {
      // Refresh active components & fields
      await getActiveComponentIds();
      await fetchCustomComponentsAndFieldsValue();
      store.updateFlashMeassge(true, "Section added successfully!", "success");
    } else {
      store.updateFlashMeassge(true, "Failed to add section.", "error");
    }
  } catch (error) {
    console.error("Error adding new section:", error);
    store.updateFlashMeassge(true, "Error adding new section.", "error");
  } finally {
    actionLoading.value = false;
  }
};

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
      <div v-if="isDeleting" class="delete-loader-overlay">
        <div class="three-body">
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
        </div>
      </div>
       <!-- Saving Indicator -->
       <div v-if="isSaving" class="saving-indicator">
        <i class="fa fa-spinner fa-spin"></i> Saving...
      </div>

      <!-- Loader -->
      <Loader v-if="initialLoading || actionLoading" />

      <template v-else>
        <!-- Page Title & Template Selector -->
        <div v-if="currentPage" class="page-title">
          <h2>{{ decodeHtml(currentPage.page_name) }} Page Customization</h2>
          <button class="back-btn" @click="router.push('/customize/template-pages')">
            <i class="fa fa-arrow-left"></i> Back To Pages
          </button>
        </div>

        <!-- Component Editor -->
        <div class="side-app">
          <div class="main-container-components container">
            <div class="eidtor-site">

              <!-- No components fallback -->
              <div v-if="!sections.some(section => section.data)">
                <div class="no-components">
                  <i class="fa fa-info-circle"></i>
                  No components are assigned for this page yet.
                </div>
              </div>

              <!-- Render sections -->
              <div v-else v-for="(section, index) in sections" :key="section.key" class="component-wrapper">
                <div class="eidtor-img">
                  <!-- Show Global Toggle only for Header & Footer -->
                  <div
                    v-if="['header', 'footer'].includes(section.type)"
                    class="global-toggle-container"
                  >
                    <label class="switch">
                      <input
                        type="checkbox"
                        :checked="globalToggle[section.type]"
                        @change="onGlobalToggle(section.type, $event)"
                      />
                      <span class="slider round"></span>
                    </label>
                    <span class="toggle-label">Global Changes</span>
                  </div>
                  <!-- Action tab -->
                  <div class="component-actions">
                    <!-- Replace button: show for all -->
                    <button class="replace-btn" @click="replaceComponent(section.key)" title="Replace">
                      <i class="fa fa-exchange"></i>
                    </button>

                    <!-- Delete button: hide for header/footer -->
                    <button
                      v-if="!['header', 'footer'].includes(section.type)"
                      class="delete-btn"
                      @click="deleteCustomComponent(section.key)"
                      title="Delete"
                    >
                      <i class="fa fa-trash"></i>
                    </button>
                  </div>

                  <!-- Component -->
                  <component
                    v-if="section.data"
                    :is="componentRegistry[section.key]"
                    :data="section.data"
                    :isEditing="true"
                    @field-updated="saveCustomComponentsFieldValues"
                  />
                </div>

                <!-- Add new section button -->
                <div
                  v-if="index !== sections.length - 1"
                  class="main-div1"
                  @click="openAddSectionPopup(section.key)"
                >
                  <div class="edit-section"></div>
                  <h1>
                    <i class="fa fa-plus"></i> Add new section <i class="fa fa-plus"></i>
                  </h1>
                  <div class="edit-section1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </section>
    <!-- Replace Component Popup -->
    <div v-if="showReplacePopup" class="replace-popup-overlay">
      <div class="replace-popup">
        <button class="close-btn" @click="closeReplacePopup" title="Close">&times;</button>
        <h3>Select a component to replace</h3>

        <!-- Loader overlay inside popup -->
        <Loader v-if="replaceLoading" />

        <div class="components-grid" v-else>
          <div
            v-for="comp in replaceComponentOptions"
            :key="comp.id"
            class="component-item"
            :class="{ selected: selectedReplacementId === comp.unique_id, disabled: usedComponentIds.includes(comp.unique_id) }"
            @click="!usedComponentIds.includes(comp.unique_id) && selectReplacement(comp.unique_id)"
          >
            <img :src="comp.preview_url" :alt="comp.component_unique_id" />
            <div v-if="selectedReplacementId === comp.unique_id" class="tick-overlay">
              <i class="fa fa-check"></i>
            </div>
            <div v-if="usedComponentIds.includes(comp.unique_id)" class="used-overlay">
              Already in use
            </div>
          </div>
        </div>

        <div v-if="selectedReplacementId && !actionLoading" class="save-replacement-btn">
          <button @click="replaceCustomComponent">Save</button>
        </div>
      </div>
    </div>

    <div v-if="showAddSectionPopup" class="replace-popup-overlay">
      <div class="replace-popup">
        <button class="close-btn" @click="closeAddNewSectionPopup" title="Close">&times;</button>
        <h3>Select a component to add</h3>

        <Loader v-if="replaceLoading" />

        <div class="components-grid" v-else>
          <div
            v-for="comp in addSectionOptions"
            :key="comp.id"
            class="component-item"
            :class="{ selected: selectedAddSectionId === comp.unique_id, disabled: usedComponentIds.includes(comp.unique_id) }"
            @click="!usedComponentIds.includes(comp.unique_id) && selectAddSection(comp.unique_id)"
          >
            <img :src="comp.preview_url" :alt="comp.component_unique_id" />
            <div v-if="selectedAddSectionId === comp.unique_id" class="tick-overlay">
              <i class="fa fa-check"></i>
            </div>
            <div v-if="usedComponentIds.includes(comp.unique_id)" class="used-overlay">
              Already in use
            </div>
          </div>
        </div>

        <div v-if="selectedAddSectionId && !actionLoading" class="save-replacement-btn">
          <button @click="addNewSection">Add Section</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.eidtor-site {
  max-width: 100% !important;
  padding: 35px 35px;
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
  margin-top: 37px !important;
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

.no-components {
  /* margin: 40px auto; */
  text-align: center;
  font-size: 20px;
  color: #555;
  padding: 20px;
  border: 1px dashed #ccc;
  border-radius: 6px;
  background: #f9f9f9;
}
.no-components i {
  margin-right: 8px;
  color: #1d2b64;
}
.component-wrapper {
  position: relative;
  /* margin-bottom: 30px; */
}

.component-actions {
  position: absolute;
  top: -15px;
  right: -1px;
  display: flex;
  gap: 3px;
  background: rgb(29 43 100);
  padding: 0px 3px;
  /* border-radius: 6px; */
  z-index: 10;
}

.component-actions button {
  color: #fff;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.component-actions button:hover {
  color: #ffcc00;
}

.eidtor-img {
  border: 1px dashed #959292;
  border-radius: 5px;
  padding: 5px 10px;
  position: relative;
  box-shadow: 0 3px 4px #00000029, 0 5px 20px #0000003b;
  margin-bottom: 10px;
  margin-top: 0;
  cursor: pointer;
  padding: 20px 20px;
}

/* Show action buttons only on hover */
.eidtor-img .component-actions {
  opacity: 0;           /* hide by default */
  pointer-events: none;  /* prevent clicking */
  transition: opacity 0.3s ease;
}

.eidtor-img:hover .component-actions {
  opacity: 1;           /* show on hover */
  pointer-events: auto;  /* allow clicking */
}

.replace-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.replace-popup {
  background: #fff;
  padding: 30px 20px 20px;
  border-radius: 10px;
  width: 1028px;
  height: 500px;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.replace-popup h3 {
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 24px;
}

.replace-popup ul {
  list-style: none;
  padding: 0;
}

.replace-popup li {
  margin-bottom: 10px;
}

.replace-popup button {
  padding: 1px 10px;
  border: 1px solid #1d2b64;
  background: #1d2b64;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.replace-popup button:hover {
  background: #fff;
  color: #1d2b64;
}

.components-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex: 1; 
  overflow-y: auto;  
  padding: 10px;    
}

.component-item {
  cursor: pointer;
  position: relative;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  /* width: 160px; */
  height: 168px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: #f8f8f8;
}

.component-item img {
  width: 100%;
  height: 120px;                /* taller images */
  object-fit: cover;
  border-radius: 4px;
}

.component-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 12px;
}

.close-btn:hover {
  background: #c0392b;
}

.tick-overlay {
  position: absolute;
  top: -10px;
  right: -7px;
  background: #1d2b64;
  color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  z-index: 2;
}

.save-replacement-btn {
  position: sticky;
  bottom: 0;
  background: #fff;
  padding: 10px 0;
  text-align: end;
  border-top: 1px solid #eee;
}

.save-replacement-btn button {
  padding: 8px 20px;
  border: none;
  background: #1d2b64;
  border: 1px solid #1d2b64;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
}

.save-replacement-btn button:hover {
  background: #fff;
  color: #1d2b64;
}

.component-item.disabled {
  opacity: 0.5;
  pointer-events: none; /* disables clicks */
}

.used-overlay {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  font-size: 12px;
  text-align: center;
  border-radius: 4px;
  padding: 2px 0;
}
.global-toggle-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  padding: 5px 10px;
  background: #f9f9f9;
  border-radius: 6px;
  width: fit-content;
  border: 1px solid #ddd;
}

/* Toggle switch styling */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #007bff;
}

input:checked + .slider:before {
  transform: translateX(24px);
}

.toggle-label {
  font-weight: 600;
  color: #333;
}

</style>
