<template>
  <FlashMessage v-if="store.flashMeassge" :visible="store.flashMeassge" />
  <div class="editor-sidebar__section">
    <label class="editor-sidebar__title">
      Slider Settings:
    </label>

    <!-- Upload -->
    <input
      ref="fileInput"
      type="file"
      multiple
      accept="image/*"
      hidden
      @change="handleFileSelect"
    />

    <button class="slider-upload-btn" @click="fileInput.click()">
      Upload Images
    </button>
    <Loader v-if="initialLoading || actionLoading" />

    <div v-if="loading" class="slider-loader-overlay">
      <div class="three-body">
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
      </div>
    </div>

    <div v-if="localImages.length" class="slider-thumb-list">
      <div
        v-for="(img, index) in localImages"
        :key="index"
        class="slider-thumb"
      >
        <button
          class="remove-image-btn"
          @click="removeImage(index)"
        >
          ✕
        </button>

        <img :src="img" alt="Slider Image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import WordpressService from "@/service/WordpressService";
import { useRoute } from "vue-router";
import { useStore } from "@/stores/store";
import FlashMessage from "@/components/common/FlashMessage.vue";
import Loader from "@/components/common/Loader.vue";

const route = useRoute();
const store = useStore();

const siteSettingsDetail = ref(null);
const siteComponentFields = ref([]);
const activeComponents = ref([]); 
const loading = ref(false);
const fileInput = ref(null);
const localImages = ref([]);
const selectedFiles = ref([]);
const activeComponentId = ref(null);
const initialLoading = ref(false);
const actionLoading = ref(false);

const pageId = ref(route.query.page_id ? parseInt(route.query.page_id) : null);

const props = defineProps({
  sectionType: String,
});

const getActiveComponentIds = async () => {
  try {
    const res = await WordpressService.Components.getActiveComponents({
      website_url: siteSettingsDetail.value?.staging_domain,
      page_id: pageId.value,
    });
    if (res.status === 200 && res.data.success) {
      activeComponents.value = res.data.components_detail;
      const matchedComponent = res.data.components_detail.find(
        (comp) => comp.type === props.sectionType
      );

      activeComponentId.value = matchedComponent
        ? matchedComponent.id
        : null;
      const map = {};
      const uniqueMap = {};
      res.data.components_detail.forEach((comp) => {
        if (!map[comp.type]) map[comp.type] = [];
        map[comp.type].push(comp.id);

        if (!uniqueMap[comp.type]) uniqueMap[comp.type] = [];
        uniqueMap[comp.type].push(comp.id);
      });
    }
  } catch (error) {
    console.error("Error fetching active components:", error);
  }
};

const getSiteDetails = async () => {
  if (!store.websiteId) return;
  const res = await WordpressService.WebsiteSettings.getSiteDetail({
    website_id: store.websiteId
  });
  if (res.status === 200 && res.data.success) {
    siteSettingsDetail.value = res.data.settings_detail;
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

const activeSectionComponent = computed(() => {
  if (!props.sectionType || !siteComponentFields.value.length) return null;

  return siteComponentFields.value.find(
    comp => comp.type === props.sectionType
  );
});

const imageFields = computed(() => {
  if (!activeSectionComponent.value) return [];

  return activeSectionComponent.value.fields.filter(
    field => field.field_type === 'image'
  );
});

const sliderImages = computed(() => {
  if (!imageFields.value.length) return [];

  const field = imageFields.value[0];

  try {
    return field.value ? JSON.parse(field.value) : [];
  } catch (e) {
    console.error("Invalid slider image JSON", e);
    return [];
  }
});

watch(
  () => sliderImages.value,
  (val) => {
    localImages.value = [...val];
  },
  { immediate: true }
);

/* REMOVE IMAGE AND UPDATE SERVER */
const removeImage = async (index) => {
  // Remove locally
  const removedImage = localImages.value.splice(index, 1)[0];

  if (!activeSectionComponent.value) return;

  // Find the component and image field
  const component = siteComponentFields.value.find(
    c => c.component_unique_id === activeComponentId.value
  );

  if (!component) {
    console.error("Component not found for remove");
    return;
  }

  const imageField = component.fields.find(f => f.field_type === "image");
  if (!imageField) {
    console.error("No image field found for this component");
    return;
  }
  const formData = new FormData();

  formData.append('component_uniqueid', activeComponentId.value);
  formData.append('page_id', pageId.value);
  formData.append('website_domain', siteSettingsDetail.value.staging_domain);
  formData.append('type', 'image');
  formData.append('component_type', props.sectionType);
  formData.append('field_name', imageField.field_name);

  // Send the updated images (without the removed one)
  formData.append('value', JSON.stringify(localImages.value));

  console.log("Removing image and updating slider:", formData);

  try {
    loading.value = true;
    const res = await WordpressService.SliderImages.RemoveSliderImages(formData);
    if (res.status === 200 && res.data.success) {
      store.updateFlashMeassge(true, `Changes are saved successfully!`, 'success');
    }
  } catch (error) {
    console.error('Error removing image:', error);
  } finally {
    loading.value = false;
  }
};

/* FILE SELECT */
const handleFileSelect = (e) => {
  selectedFiles.value = Array.from(e.target.files);
  selectedFiles.value.forEach(file => {
    const previewUrl = URL.createObjectURL(file);
    localImages.value.push(previewUrl);
  });
  uploadSliderImages();
};

// const extractFilename = (url) => {
//   if (!url) return '';
//   return url.split('/').pop();
// };

const uploadSliderImages = async () => {
  if (!activeSectionComponent.value) return;
  const component = siteComponentFields.value.find(
    c => c.component_unique_id === activeComponentId.value
  );
  const imageField = component.fields.find(f => f.field_type === "image");

  const existingFilenames = sliderImages.value.map(img => img);
  const newFiles = selectedFiles.value; 

  const formData = new FormData();

  formData.append('component_uniqueid', activeComponentId.value);
  formData.append('page_id', pageId.value);
  formData.append('website_domain', siteSettingsDetail.value.staging_domain);
  formData.append('type', 'image');
  formData.append('component_type', props.sectionType);
  formData.append('value', JSON.stringify(existingFilenames));
  formData.append('field_name', imageField.field_name);

  newFiles.forEach((file, index) => {
    formData.append(`new_added_image[]`, file);
  });

  console.log("Uploading slider images with payload:", formData);

  try {
    loading.value = true;
    const res = await WordpressService.SliderImages.uploadSliderImages(formData);
    if (res.status === 200 && res.data.success) {
      store.updateFlashMeassge(true, `Changes are saved successfully!`, 'success');
      selectedFiles.value = []; 
    }
  } catch (error) {
    console.error('Error uploading images:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  initialLoading.value = true;
  try {
    await getSiteDetails();
    await getActiveComponentIds();
    await fetchCustomComponentsAndFieldsValue();
  }finally {
    initialLoading.value = false; 
  }
});
</script>

<style scoped>
.slider-upload-btn {
  width: 65%;
  margin: 10px 0 15px;
  padding: 10px;
  background: #1d2b64;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.slider-thumb-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.slider-thumb {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.slider-thumb img {
  width: 100%;
  height: 90px;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  cursor: pointer;
}

.remove-image-btn:hover {
  background: #e74c3c;
}

.slider-wrapper {
  position: relative;
}

.slider-loader-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>