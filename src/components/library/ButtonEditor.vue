<template>
    <div class="editor-sidebar__section">
        <label class="editor-sidebar__title">Button Settings:</label>
        <div v-if="loading" class="three-body">
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
        </div>
        <div class="tab-pane" id="Buttons" role="tabpanel">
            <EditSiteSettingsButtonFormBuilder
                :siteSettingsFormFields="siteSettingsFormFields"
                :websiteDomain="siteSettingsDetail?.website_domain"
                @submit-custom-fields="submitCustomFields"
            />
        </div>
        <div class="button-wrapper">
          <button
            type="submit"
            class="preview-btn"
            @click="handleTabClick"
            :disabled="btnDisable"
          >
            <i class="fa fa-upload" aria-hidden="true"></i>
            Publish
          </button>
          <div class="three-bodyc" v-if="btnDisable">
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
          </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import WordpressService from "@/service/WordpressService";
import EditSiteSettingsButtonFormBuilder from "@/components/common/EditSiteSettingsButtonFormBuilder.vue";
import { useStore } from "@/stores/store";
import { EventBus } from "@/EventBus";

// Props
const props = defineProps({
  sectionType: String, 
  activeComponentId: String, 
});

const router = useRouter();
const route = useRoute();
const store = useStore();

// Reactive state
const activeComponentsDetail = ref([]);
const loading = ref(true);
const btnDisable = ref(false);
const siteSettingsFormFields = ref([]);
const siteSettingsDetail = ref();
const componentsFieldsUnderEdit = ref({ id: null, type: 'button' });
const currentTab = ref("button");
const pageId = ref(route.query.page_id ? parseInt(route.query.page_id) : null);
const initialLoading = ref(true);
const pageLoading = ref(false);
const componentIdsByType = ref({});

const withLoader = async (asyncFn) => {
  loading.value = true;
  try {
    await asyncFn();
  } finally {
    loading.value = false;
  }
};

// ---------- ON MOUNT ----------
onMounted(async () => {
  try {
    await withLoader(async () => {
      await getSiteDetails();
      // await getActiveComponentIds();
      await fetchCustomComponentsAndFieldsValue();
    });
  } finally {
    initialLoading.value = false;
  }
});

// ---------- WATCHERS ----------
watch(() => store.websiteId, async () => {
  await getSiteDetails();
});

watch(pageId, async (newPageId) => {
  if (!newPageId) return;
  router.push({ query: { ...route.query, page_id: newPageId } });
  pageLoading.value = true;
  activeComponentsDetail.value = [];
  pageLoading.value = false;
});

// ---------- METHODS ----------
const getSiteDetails = async () => {
  if (!store.websiteId) return;
  try {
    const response = await WordpressService.WebsiteSettings.getSiteDetail({ website_id: store.websiteId });
    if (response.status === 200 && response.data.success) {
      siteSettingsDetail.value = response.data.settings_detail;
    }
  } catch (error) {
    console.error("Error fetching site details:", error);
  }
};

const fetchCustomComponentsAndFieldsValue = async () => {
  const activeComponentId = props.activeComponentId;
  if (!activeComponentId) {
    siteSettingsFormFields.value = [];
    return;
  }
  try {
    const res = await WordpressService.CustomComponentsAndFieldValues.getCustomComponentsAndFieldValues({
      website_domain: siteSettingsDetail.value.website_domain,
      page_id: pageId.value,
      component_ids: [activeComponentId],
    });

    if (res.status === 200 && res.data.success) {
      const allFields = res.data.data.flatMap(c => c.fields || []);
      siteSettingsFormFields.value = allFields;
    }
  } catch (error) {
    console.error("Error fetching component fields:", error);
  }
};

const submitCustomFields = async (data) => {
  try {
    loading.value = true;
    btnDisable.value = true;

    const formFields = Object.keys(data).reduce((acc, key) => {
      const modifiedKey = key.replace(/-meta1|-meta2|-formId/g, "");
      const existingFieldIndex = acc.findIndex(f => f.field_name === modifiedKey);

      let meta1 = null, meta2 = null, formId = null;

      if (existingFieldIndex !== -1) {
        const existing = acc[existingFieldIndex];
        meta1 = existing.meta1 || (key.includes("meta1") ? data[key] : null);
        meta2 = existing.meta2 || (key.includes("meta2") ? data[key] : null);
        formId = existing.formId || (key.includes("formId") ? data[key] : null);
        acc[existingFieldIndex] = { ...existing, meta1, meta2, formId };
      } else {
        acc.push({
          field_name: modifiedKey,
          field_value: data[key],
          type: componentsFieldsUnderEdit.value.type,
          meta1, meta2, formId,
          field_type: null
        });
      }
      return acc;
    }, []);

    const activeComponentId = props.activeComponentId;

    const response = await WordpressService.ComponentsFormField.updateComponentsFormField({
      website_url: siteSettingsDetail.value?.website_domain,
      component_unique_id: activeComponentId,
      form_fields: formFields,
    });

    if (response.status === 200 && response.data.success) {
      store.updateFlashMeassge(true, "Changes Saved Successfully");
    }

  } catch (error) {
    console.error("Error submitting custom fields:", error);
  } finally {
    btnDisable.value = false;
    loading.value = false;
  }
};

const handleTabClick = () => {
  loading.value = true;
  if (currentTab.value === "button") {
    EventBus.emit("submitButtonFormChildMethod");
  }
  loading.value = false;
};

</script>
