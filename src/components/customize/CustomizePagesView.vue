<script setup>
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import { useAuth } from "@/service/useAuth";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { ref, onMounted, provide, watch, computed } from "vue";
import WordpressService from "@/service/WordpressService";
import Loader from "@/components/common/Loader.vue";
import EditSiteSettingsFormBuilder from "@/components/common/EditSiteSettingsFormBuilder.vue";
import EditSiteSettingsButtonFormBuilder from "@/components/common/EditSiteSettingsButtonFormBuilder.vue";
import { useStore } from "@/stores/store";
import config from "/config";
import { openLinkInNewTab } from "@/util/helper";
import { EventBus } from "@/EventBus";
import DeleteModal from "@/components/common/DeleteModal.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";
import SelectOptionForRegenerate from "@/components/common/SelectOptionForRegenerate.vue";
import ProcessCompleteModal from "@/components/common/ProcessCompleteModal.vue";
import FlashMessage from "@/components/common/FlashMessage.vue";
import AddNewSection from "./elements/AddNewSection.vue";
import { componentLibrary } from '@/components/library/library.js';

const componentRegistry = componentLibrary;

const heroBlockData = computed(() => {
  const fields = siteSettingsFormFields.value;
  const logo = globalVariables.value?.find(item => item.name === "logo");

  if (!logo || !fields) return null;

  // Ensure no double slash when concatenating URL parts
  const baseUrl = "https://alphafour.speedysites.in/wp-content/themes/codeforeach/";
  const logoPath = logo.value.startsWith("/") ? logo.value.slice(1) : logo.value;
  const logoUrl = baseUrl + logoPath;

  const data = {
    logo: logoUrl,
    menu: ["Home", "About", "Contact"],
    title1: "",
    title2: "",
    description: "",
    buttonText: "",
    buttonUrl: "",
    buttonTarget: "_self",
    image: "",
  };

  fields.forEach((field) => {
    switch (field.field_name) {
      case "header-text1":
        data.title1 = field.value;
        break;
      case "header-text2":
        data.title2 = field.value;
        break;
      case "header-description1":
        data.description = field.value;
        break;
      case "header-button1":
        data.buttonText = field.value;
        data.buttonUrl = field.meta1 || "#";
        data.buttonTarget = field.meta2 || "_self";
        break;
      case "header-img":
        const crmBaseUrl = "https://app.speedysites.in/";
        data.image = crmBaseUrl + "storage/" + field.value;
        break;
    }
  });

  return data;
});

const aboutBlockData = computed(() => {
  const data = {
    text1: "About Highlight",
    text2: "Our",
    text3: "Best Services",
    text4: "for You",
    services: [
      {
        img: "/components/sections/ss_health_sections/health_abouts/health_about1/images/doctor.png",
        title: "Best Doctors",
      },
      {
        img: "/components/sections/ss_health_sections/health_abouts/health_about1/images/affordable.png",
        title: "Affordable Care",
      },
      {
        img: "/components/sections/ss_health_sections/health_abouts/health_about1/images/insurance.png",
        title: "Insurance Partners",
      },
      {
        img: "/components/sections/ss_health_sections/health_abouts/health_about1/images/support.png",
        title: "24/7 Support",
      },
      {
        img: "/components/sections/ss_health_sections/health_abouts/health_about1/images/alarm.png",
        title: "Emergency Service",
      },
      {
        img: "/components/sections/ss_health_sections/health_abouts/health_about1/images/telemedicine.png",
        title: "Online Consultancy",
      },
    ],
  };

  return data;
});

const serviceBlockData = computed(() => {
  const data = {
    text1: "Neonal Medical Care - 35 Years of Trusted Experience",
    description1: "Providing compassionate and comprehensive healthcare services with cutting-edge technology and expert medical professionals.",
    services: [
      {
        img: "/components/sections/ss_health_sections/health_services/health_service1/images/1.jpg",
        title: "Our Mission",
        description: "To deliver patient-centered care with integrity, compassion, and excellence, improving health outcomes in our community.",
      },
      {
        img: "/components/sections/ss_health_sections/health_services/health_service1/images/2.jpg",
        title: "Our Vision",
        description: "To be a leading healthcare provider known for innovative treatments, preventive care, and continuous improvement.",
      },
    ],
  };

  return data;
});

const footerBlockData = computed(() => {
  const data = {
    logo: "/images/logo.png",
    description: "Default footer description goes here.",
    buttonText: "Book Now",
    phone: "+91 99999 99999",
    address: "123 Street, City, State, Country",
    contactHeading: "Contact",
    menuHeading: "Quick Links",
    socialHeading: "Follow Us",
    menu: ["Home", "About", "Services", "Contact"],
    socialLinks: ["fa fa-facebook", "fa fa-instagram"],
    copyright: "© 2025 Your Agency. Site by SpeedySites.",
  };
  return data;
});

const router = useRouter();
const { logout } = useAuth();
const isSidebarToggled = ref(false);
const store = useStore();

const navBarToggle = (value) => {
  isSidebarToggled.value = value;
};

const loading = ref(true);
const dashboardData = ref([]);
const showEditComponentFieldModal = ref(false);
const siteSettingsFormFields = ref([]);
const siteSettingsDeatil = ref();
const componentsFieldsUnderEdit = ref({
  id: null,
  type: null,
});
const fileInput = ref(null);
const btnDisable = ref(false);
const selectedCategory = ref("");
const route = useRoute();
const pageId = ref(null);
const templatePages = ref(null);
const initialLoading = ref(true);
const pageLoading = ref(false);
const globalVariables = ref([]);

const fetchDashboardData = async () => {
  try {
    const response = await WordpressService.fetchDashboardData();
    if (response.status === 200 && response.data.success) {
      loading.value = false;
      dashboardData.value = response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Authentication failed. Please log in.", error);
      error.value = true;
      loading.value = false;
      localStorage.removeItem("access_token");
      router.push("/login");
    } else {
      console.error("An error occurred:", error.message);
    }
  }
};

onMounted(async () => {
  fileInput.value = ref.fileInput;
  try {
    await fetchDashboardData();
    await getSiteDeatils();
    if (siteSettingsDeatil.value.website_domain) {
      await fetchGlobalVariables();
      await handleEditComponentBtnClick();
    }
  } finally {
    initialLoading.value = false; 
  }
});

watch(
  () => store.websiteId,
  async (newWebsiteId, oldWebsiteId) => {
    await getSiteDeatils();
    await fetchDashboardData();
  }
);

watch(pageId, async (newPageId) => {
  if (newPageId) {
    router.push({
      query: { ...route.query, page_id: newPageId }
    });

    pageLoading.value = true;
    activeComponentsDetail.value = [];
    try {
      await getActiveComponentsData();
    } finally {
      pageLoading.value = false;
    }
  }
});

provide("dashBoardMethods", {
  fetchDashboardData,
});

const handleEditComponentBtnClick = async () => {
  // Static values
  const staticId = "COMP_SS_HEALTH_HEADER1_62";
  const staticType = "header";

  componentsFieldsUnderEdit.value.id = staticId;
  componentsFieldsUnderEdit.value.type = staticType;

  try {
    const response = await WordpressService.ComponentsFormField.getComponentsFormField({
      component_unique_id: staticId,
      website_url: siteSettingsDeatil.value?.website_domain || "",
    });

    if (response.status === 200 && response.data.success) {
      siteSettingsFormFields.value = response.data.data;
      showEditComponentFieldModal.value = true;
    } else {
      console.warn("Failed to fetch component fields:", response.data.message);
    }
  } catch (error) {
    console.error("An error occurred while fetching component fields:", error);
  }
};

// -------------------------
// GET GLOBAL VARIABLES
// -------------------------
const fetchGlobalVariables = async () => {
    try {
        const response = await WordpressService.getGlobalVariables({
            website_domain: siteSettingsDeatil.value.website_domain,
        });
        if (response.status === 200 && response.data.success) {
            globalVariables.value = response.data.global_variables || [];
        }
    } catch (error) {
        console.error("Error fetching global variables:", error);
    }
};

const getSiteDeatils = async () => {
  if (!store.websiteId || store.websiteId === false) {
    console.warn("websiteId is missing or invalid:", store.websiteId);
    return;
  }
  try {
    const response = await WordpressService.WebsiteSettings.getSiteDetail({
      website_id: store.websiteId,
    });
    if (response.status === 200 && response.data.success) {
      siteSettingsDeatil.value = response.data.settings_detail;
      const responseCatName = siteSettingsDeatil.value.agency_website_detail.website_category_name;
      if (responseCatName) {
        selectedCategory.value = responseCatName.trim();
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const sections = computed(() => [
  { key: "hero", data: heroBlockData.value },
  { key: "about", data: aboutBlockData.value },
  { key: "service", data: serviceBlockData.value },
  { key: "footer", data: footerBlockData.value },
]);

</script>
<template>
  <div class="page">
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
     <section id="content-wrapper main-content side-content">
      <Loader v-if="initialLoading" />

      <template v-else>
        <div v-if="currentPage" class="page-title mt-2">
         <h2>{{ decodeHtml(currentPage.page_name) }} Customization</h2>

          <div v-if="templatePages && templatePages.length > 0" class="mt-2 select-box-pages">
            <select
              id="templatePageSelect"
              v-model="pageId"
              class="form-select"
            >
              <option
                v-for="page in templatePages.filter(p => p.status === 'publish')"
                :key="page.page_id"
                :value="page.page_id"
              >
                {{ decodeHtml(page.page_name) }}
              </option>
            </select>
          </div>
        </div>

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
                  />
                </div>
                
                <div
                  v-if="index !== sections.length - 1"
                  class="main-div1"
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
    <div class="three-bodyc" v-if="btnDisable">
    <div class="three-body__dot"></div>
    <div class="three-body__dot"></div>
    <div class="three-body__dot"></div>
    <Loader v-if="loading" />
  </div>
  </div>
</template>
<style>

.eidtor-site {
  max-width: 100% !important;
}

.main-container-components.container {
    width: 80% !important;
    position: absolute !important;
    left: 17% !important;
}

</style>
