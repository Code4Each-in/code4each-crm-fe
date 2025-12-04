<template>
  <div class="editor-sidebar__section">
    <!-- <label class="editor-sidebar__title">Form Settings:</label> -->

    <!-- Loader -->
    <div v-if="loading" class="three-body">
      <div class="three-body__dot"></div>
      <div class="three-body__dot"></div>
      <div class="three-body__dot"></div>
    </div>

    <!-- Forms Dropdown -->
    <div v-else class="form-select-wrapper">
      <label for="formSelect" class="form-label">Select a Form:</label>
      <select
        id="formSelect"
        v-model="selectedForm"
        class="form-select"
        @change="handleFormSelect"
      >
        <option disabled value="">-- Choose Form --</option>
        <option v-for="form in forms" :key="form.id" :value="form.id">
          {{ form.name }}
        </option>
      </select>

      <!-- If no forms -->
      <p v-if="!forms.length" class="no-forms-text">
        No forms available for this site.
        <button class="create-form-btn" @click="goToFormBuilder">
          Create a Form
        </button>
      </p>
    </div>

    <!-- Publish Button -->
    <div class="button-wrapper">
      <button
        type="submit"
        class="preview-btn"
        @click="handlePublish"
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
import { ref, onMounted } from "vue";
import WordpressService from "@/service/WordpressService";
import { useStore } from "@/stores/store";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useStore();

const loading = ref(true);
const forms = ref([]);
const siteSettingsDetail = ref({});
const selectedForm = ref("");
const btnDisable = ref(false);
const pageId = ref(route.query.page_id ? parseInt(route.query.page_id) : null);

const props = defineProps({
  activeComponentId: String, 
  activeFieldName: String, 
});

const goToFormBuilder = () => {
  router.push("/form-builder");
};

/* ===============================
   Fetch Forms
================================ */
const fetchForms = async () => {
  try {
    const response = await WordpressService.FormBuilder.fetchForms({
      website_domain: siteSettingsDetail.value.staging_domain,
    });

    if (response.status === 200 && response.data.success) {
      forms.value = response.data.response.map((f) => ({
        id: f.id,
        name: f.form_name,
        status: f.status === "active" ? "Active" : "Inactive",
      }));
    } else {
      forms.value = [];
    }
  } catch (error) {
    console.error("Error fetching forms:", error);
  } finally {
    loading.value = false;
  }
};

/* ===============================
   Get Site Details
================================ */
const getSiteDetails = async () => {
  try {
    if (!store.websiteId || typeof store.websiteId !== "number") return;
    const response = await WordpressService.WebsiteSettings.getSiteDetail({
      website_id: store.websiteId,
    });

    if (response.status === 200 && response.data.success) {
      siteSettingsDetail.value = response.data.settings_detail;
    }
  } catch (error) {
    console.error("Error getting site details:", error);
  }
};

/* ================================
  Get Component Fields Value
================================= */
const fetchCustomComponentsAndFieldsValue = async () => {
  try {
    const res = await WordpressService.CustomComponentsAndFieldValues.getCustomComponentsAndFieldValues({
      website_domain: siteSettingsDetail.value.staging_domain,
      page_id: pageId.value,
      component_ids: [props.activeComponentId],
    });
    if (res.status === 200 && res.data.success && Array.isArray(res.data.data)) {
      const componentData = res.data.data.find(
        c => c.component_unique_id === props.activeComponentId
      );

      if (componentData && Array.isArray(componentData.fields)) {
        const matchingField = componentData.fields.find(
          f => f.field_name === props.activeFieldName && f.meta2 === "form"
        );

        if (matchingField && matchingField.form_id) {
          selectedForm.value = matchingField.form_id.toString();
          console.log("Preselected form:", selectedForm.value);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching component fields:", error);
  }
};

/* ===============================
   Handlers
================================ */
function handleFormSelect() {
  console.log("Selected form ID:", selectedForm.value);
  // You can emit event to parent if needed:
  // emit("update-field", { field_name: "selectedForm", value: selectedForm.value });
}

/* ===============================
   Publish Form 
================================ */
const handlePublish = async () => {
  if (!selectedForm.value) {
    alert("Please select a form first!");
    return;
  }

  btnDisable.value = true;

  try {
    const response = await WordpressService.CustomComponentsAndFieldValues.addForm({
      website_domain: siteSettingsDetail.value.staging_domain,
      form_id: selectedForm.value,
      type: "form",
      field_name: props.activeFieldName,
      component_uniqueId: props.activeComponentId,
      page_id: pageId.value
    });

    if (response.status === 200 && response.data.success) {
      await fetchCustomComponentsAndFieldsValue();
      store.updateFlashMeassge(true, `Changes are saved successfully!`, 'success');
    }
  } catch (error) {
    console.error("Error publishing form:", error);
  } finally {
    btnDisable.value = false;
  }
}

/* ===============================
   Lifecycle
================================ */
onMounted(async () => {
  loading.value = true;
  await getSiteDetails();
  await fetchCustomComponentsAndFieldsValue();
  await fetchForms();
});
</script>

<style scoped>
.form-select-wrapper {
  margin-top: 10px;
}

.form-select {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;
}

.no-forms-text {
  color: #999;
  font-size: 13px;
  margin-top: 8px;
}

.button-wrapper {
  margin-top: 20px;
}

.no-forms-box {
  margin-top: 15px;
  padding: 12px;
  background: #f7f7f7;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
  border: 1px solid #ddd;
}

.create-form-btn {
  margin-top: 10px;
  padding: 6px 12px;
  background: #007bff;
  color: #fff;
  font-size: 13px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.create-form-btn:hover {
  background: #0056b3;
}

</style>
