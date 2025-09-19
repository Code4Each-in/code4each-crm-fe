<template>
    <div class="editor-sidebar__section">
      <label>Menu Items:</label>
      <div class="ifYqM">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div
            v-for="(item, index) in outeritems"
            :key="item.id"
            class="accordion-item"
          >
            <h2 class="accordion-header" :id="'heading' + item.id">
              <button
                class="accordion-button"
                :class="{ collapsed: !item.open }"
                type="button"
                @click="toggleItemOuter(index, item.value)"
                :aria-expanded="item.open ? 'true' : 'false'"
                :aria-controls="'collapse' + item.id"
              >
                {{ item.name }}
              </button>
            </h2>
            <div
              :id="'collapse' + item.id"
              class="accordion-collapse collapse"
              :class="{ show: item.open }"
              :aria-labelledby="'heading' + item.id"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <button
                  type="button"
                  class="accordion-button1"
                  @click="showForm = !showForm"
                >
                  <i class="fa fa-plus" aria-hidden="true"></i> Add button
                </button>
              </div>
  
              <!-- Add Menu Form -->
              <form id="multi-step-form" enctype="multipart/form-data">
                <div
                  v-if="showForm"
                  class="row row-cols-lg-auto g-3 align-items-center"
                >
                  <div class="col-12">
                    <label for="businessCategory" class="form-label">Menu Type*</label>
                    <select
                      class="form-select select-category"
                      v-model="values.menu_value_type"
                    >
                      <option value="">Select Type</option>
                      <option value="internal">Internal</option>
                      <option value="external">External</option>
                    </select>
                    <div class="text-danger">{{ allErrors.menu_value_type }}</div>
                  </div>
                  <div v-if="values.menu_value_type" class="col-12">
                    <label for="name" class="form-label">Menu Name*</label>
                    <input type="text" class="form-control" v-model="values.name" />
                    <div class="text-danger">{{ allErrors.name }}</div>
                  </div>
                  <div v-if="values.menu_value_type === 'internal'" class="col-12">
                    <label class="form-label">Section*</label>
                    <select class="form-select" v-model="values.type">
                      <option value="">Select Section</option>
                      <option v-for="option in sections" :key="option.value" :value="option.value">
                        {{ option.label }}
                      </option>
                    </select>
                    <div class="text-danger">{{ allErrors.type }}</div>
                  </div>
                  <div v-if="values.menu_value_type === 'external'" class="col-12">
                    <label class="form-label">External Link*</label>
                    <input type="text" class="form-control" v-model="values.external" />
                    <div class="text-danger">{{ allErrors.external }}</div>
                  </div>
                  <div class="col-12">
                    <button
                      class="btn speedy-btn"
                      type="button"
                      :disabled="!values.menu_value_type || submitLoading"
                      @click="handleSubmitAddMenu(item.value)"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
  
              <!-- Draggable Menu Items -->
              <VueDraggableNext
                :list="dataAPi"
                @end="(itemValue) => handleChange(itemValue, item.value)"
                class="menus-div"
              >
                <div v-for="(itemi, idx) in dataAPi" :key="itemi.id">
                  <div v-if="itemi.menu_type == item.value" class="accordion-item">
                    <h2 class="accordion-header sub-headingOne">
                      <button
                        class="accordion-button sub-headingOne-btn"
                        :class="{ collapsed: !itemi.open }"
                        type="button"
                        @click="toggleItem(idx, itemi)"
                      >
                        {{ itemi.name }}
                      </button>
                    </h2>
                    <div class="accordion-collapse collapse" :class="{ show: itemi.open }">
                      <div class="accordion-body">
                        <!-- Edit Menu Form -->
                        <form class="row row-cols-lg-auto g-3 align-items-center">
                          <div class="col-12">
                            <label class="form-label">Menu Type*</label>
                            <select class="form-select" v-model="eachValues.menu_value_type">
                              <option value="">Select Type</option>
                              <option value="internal">Internal</option>
                              <option value="external">External</option>
                            </select>
                            <div class="text-danger">{{ allErrorsEach.menu_value_type }}</div>
                          </div>
                          <div v-if="eachValues.menu_value_type" class="col-12">
                            <label class="form-label">Menu Name*</label>
                            <input type="text" class="form-control" v-model="eachValues.name" />
                            <div class="text-danger">{{ allErrorsEach.name }}</div>
                          </div>
                          <div v-if="eachValues.menu_value_type === 'internal'" class="col-12">
                            <label class="form-label">Section*</label>
                            <select class="form-select" v-model="eachValues.type">
                              <option value="">Select Section</option>
                              <option v-for="option in sections" :key="option.value" :value="option.value">
                                {{ option.label }}
                              </option>
                            </select>
                            <div class="text-danger">{{ allErrorsEach.type }}</div>
                          </div>
                          <div v-if="eachValues.menu_value_type === 'external'" class="col-12">
                            <label class="form-label">External Link*</label>
                            <input type="text" class="form-control" v-model="eachValues.external" />
                            <div class="text-danger">{{ allErrorsEach.external }}</div>
                          </div>
                          <div class="col-12 d-flex align-items-center gap-2">
                            <i class="fa fa-trash" style="cursor:pointer" @click="showDeletePopup(itemi.id)"></i>
                            <button class="btn speedy-btn" :disabled="!eachValues.menu_value_type || submitLoading" @click="editMenu()">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </VueDraggableNext>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { useRouter } from "vue-router";
import {
  ref,
  defineProps,
  onMounted,
  watch,
  computed,
} from "vue";
import WordpressService from "@/service/WordpressService";
import { useStore } from "@/stores/store";
import { VueDraggableNext } from "vue-draggable-next";
import { useForm } from "vee-validate";
import * as yup from "yup";

const router = useRouter();
const activeComponentsDetail = ref([]);
const store = useStore();
const buttonStates = ref();
const loading = ref(true);
const dashboardData = ref([]);
const siteSettingsDeatil = ref();
const menuUnderDelete = ref(null);
const selectedCategory = ref("");

const submitLoading = ref(false);

const sections = computed(() => [
  { value: "home", label: "home" },
  { value: "about", label: "about" },
  { value: "service", label: "service" },
  { value: "footer", label: "footer" },
]);

const outeritems = ref([
  { id: 1, name: "Header Menu", open: false, value: "header" },
  { id: 2, name: "Footer Menu", open: false, value: "footer" },
]);
const values = ref({
  type: "",
  menu_value_type: "",
});

const eachValues = ref({
  type: "",
  menu_value_type: "",
});

const allErrors = ref({});
const allErrorsEach = ref({});
const confirmDelete = ref(false);

const { handleSubmit } = useForm();
const dataAPi = ref({});
const showForm = ref(false);

const validationSchema = yup.object({
  type: yup.string().required("Please select a section"),
  name: yup.string().required("Please provide a menu name"),
});

const validationSchemaExternal = yup.object({
  name: yup.string().required("Please provide a menu name"),
  external: yup
    .string()
    .url("Invalid format for external link URL")
    .required("Please provide a external link"),
});

const handleSubmitAddMenu = (id) => {
  values.value.menu_type = id;
  submitAddMenu();
};

const submitAddMenu = handleSubmit(async () => {
  try {
    submitLoading.value = true;
    let data = {};
    let formValues = values.value;
    if (formValues.menu_value_type === "internal") {
      await validationSchema.validate(formValues, { abortEarly: false });
      data.value = formValues.type;
    } else if (formValues.menu_value_type === "external") {
      await validationSchemaExternal.validate(formValues, {
        abortEarly: false,
      });
      data.value = formValues.external;
    }
    data.name = formValues.name;
    data.menu_value_type = formValues.menu_value_type;
    data.menu_type = formValues.menu_type;
    allErrors.value = {};
    const response = await WordpressService.Menus.addMenu({
      website_url: siteSettingsDeatil.value?.website_domain,
      menu_data: data,
    });
    if (response.status === 200 && response.data.success) {
      store.updateFlashMeassge(true, "Menus Added sucessfully");
      await fetchDashboardData();
      await getMenus();
      values.value = {
        type: "",
        menu_value_type: "",
      };
    }
  } catch (validationErrors) {
    const errors = validationErrors.inner.reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});
    allErrors.value = errors;
  }
  submitLoading.value = false;
});

const editMenu = handleSubmit(async () => {
  try {
    submitLoading.value = true;
    let data = {};
    let formValues = eachValues.value;
    if (formValues.menu_value_type === "internal") {
      await validationSchema.validate(formValues, { abortEarly: false });
      data.value = formValues.type;
    } else if (formValues.menu_value_type === "external") {
      await validationSchemaExternal.validate(formValues, {
        abortEarly: false,
      });
      data.value = formValues.external;
    }
    data.name = formValues.name;
    data.id = formValues.id;
    data.menu_value_type = formValues.menu_value_type;

    allErrorsEach.value = {};
    const response = await WordpressService.Menus.editMenu({
      website_url: siteSettingsDeatil.value?.website_domain,
      menu_data: data,
    });
    if (response.status === 200 && response.data.success) {
      store.updateFlashMeassge(true, "Menus Updated sucessfully");
      await fetchDashboardData();
      await getMenus();
    }
  } catch (validationErrors) {
    const errors = validationErrors.inner.reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});

    allErrorsEach.value = errors;
  }
  submitLoading.value = false;
});

const showDeletePopup = (id) => {
  menuUnderDelete.value = id;
  confirmDelete.value = true;
};

const handleChange = async (newList, menu_type) => {
  try {
    let headerItems = dataAPi.value.filter(
      (item) => item.menu_type === menu_type
    );
    headerItems.forEach((item, index) => {
      item.position = index + 1;
    });

    const response = await WordpressService.Menus.changePosition({
      website_url: siteSettingsDeatil.value?.website_domain,
      menu_data: headerItems,
    });
    if (response.status === 200 && response.data.success) {
      store.updateFlashMeassge(true, "Menus Position Changed sucessfully");
      await fetchDashboardData();
      await getMenus();
    }
  } catch (validationErrors) {}
};

const toggleItem = (index, eachVal) => {
  dataAPi.value[index].open = !dataAPi.value[index].open;

  if (dataAPi.value[index].open) {
    (eachValues.value.type = eachVal.value),
      (eachValues.value.menu_value_type = eachVal.menu_value_type),
      (eachValues.value.name = eachVal.name),
      (eachValues.value.external = eachVal.value),
      (eachValues.value.position = eachVal.position),
      (eachValues.value.id = eachVal.id);
  } else {
  }
};

const toggleItemOuter = (index, menu_type) => {
  showForm.value = false;
  outeritems.value[index].open = !outeritems.value[index].open;
  // values.value.menu_type = menu_type;
};

const fetchDashboardData = async () => {
  try {
    const response = await WordpressService.fetchDashboardData();
    if (response.status === 200 && response.data.success) {
      dashboardData.value = response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Authentication failed. Please log in.", error);
      error.value = true;
      localStorage.removeItem("access_token");
      router.push("/login");
    } else {
      console.error("An error occurred:", error.message);
    }
  }
};

const getMenus = async () => {
  try {
    const response = await WordpressService.Menus.getMenus({
      website_url: siteSettingsDeatil.value?.website_domain,
    });

    if (response.status === 200 && response.data.success) {
      let data = response.data.response;
      if (response.data.response.length > 0) {
        const modifiedArray = data.map((item) => {
          return {
            ...item,
            open: false,
          };
        });
        dataAPi.value = modifiedArray;
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const getActiveComponentsData = async () => {
  try {
    const response = await WordpressService.Components.getActiveComponents({
      website_url: siteSettingsDeatil.value?.website_domain,
    });

    if (response.status === 200 && response.data.success) {
      activeComponentsDetail.value = response.data.components_detail;
      let firstActiveComponent = activeComponentsDetail.value[0];
      activeComponentsDetail.value.forEach((image) => {
        activeComponentsDetail.dragging = false;
      });
      buttonStates.value = new Array(activeComponentsDetail.value.length).fill(
        false
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

onMounted(async () => {
  await getSiteDeatils();
  await fetchDashboardData();
  await getActiveComponentsData();
  await getMenus();
  loading.value = false;
});

watch(
  () => store.websiteId,
  async (newWebsiteId, oldWebsiteId) => {
    await getSiteDeatils();
    await fetchDashboardData();
    await getMenus();
    await getActiveComponentsData();

    loading.value = false;
  }
);

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

</script>
  