<template>
    <section class="section service gray-bg">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7 text-center">
                    <div class="section-title">
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'service-text1' }"
                            @click.stop="selectField('service-text1')"
                            @mouseover="hoveredField = 'service-text1'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'service-text1'" class="edit-label">Text</span>
                            <input
                            v-if="selectedField === 'service-text1'"
                            v-model="editableContent['service-text1']"
                            @blur="blurAndUpdate('service-text1', editableContent['service-text1'], null, null, componentId)"
                            />
                            <h2 v-else>{{ editableContent['service-text1'] }}</h2>
                        </div>
                        <div class="divider mx-auto my-4"></div>
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'service-text2' }"
                            @click.stop="selectField('service-text2')"
                            @mouseover="hoveredField = 'service-text2'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'service-text2'" class="edit-label">Text</span>
                            <textarea
                            v-if="selectedField === 'service-text2'"
                            v-model="editableContent['service-text2']"
                            @blur="blurAndUpdate('service-text2', editableContent['service-text2'], null, null, componentId)"
                            />
                            <p v-else>{{ editableContent['service-text2'] }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div 
                    class="col-lg-4 col-md-6 col-sm-6"
                    v-for="i in 6" :key="i"
                >
                    <div class="service-item mb-4">
                        <div class="icon d-flex align-items-center">
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'service-image' + i }"
                                @click.stop="selectField('service-image' + i, 'image', 'service_section', componentId)" 
                                @mouseover="hoveredField = 'service-image' + i"
                                @mouseleave="hoveredField = null"
                                >
                                <span v-if="hoveredField === 'service-image' + i" class="edit-label">Image</span>
                                <img
                                    :src="editableContent['service-image' + i]"
                                    alt="Service Image"
                                    class="img-fluid"
                                    style="width:60px; height:60px; object-fit:contain;"
                                />
                            </div>
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'service-text' + (i + 2) }"
                                @click.stop="selectField('service-text' + (i + 2))"
                                @mouseover="hoveredField = 'service-text' + (i + 2)"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'service-text' + (i + 2)" class="edit-label">Text</span>
                                <input
                                v-if="selectedField === 'service-text' + (i + 2)"
                                v-model="editableContent['service-text' + (i + 2)]"
                                @blur="blurAndUpdate('service-text' + (i + 2), editableContent['service-text' + (i + 2)], null, null, componentId)"
                                />
                                <h4 v-else class="mt-3 mb-3">{{ editableContent['service-text' + (i + 2)] }}</h4>
                            </div>
                        </div>

                        <div class="content">
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'service-description' + i }"
                                @click.stop="selectField('service-description' + i)"
                                @mouseover="hoveredField = 'service-description' + i"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'service-description' + i" class="edit-label">Text</span>
                                <input
                                v-if="selectedField === 'service-description' + i"
                                v-model="editableContent['service-description' + i]"
                                @blur="blurAndUpdate('service-description' + i, editableContent['service-description' + i], null, null, componentId)"
                                />
                                <p v-else class="mb-4">{{ editableContent['service-description' + i] }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <SidebarEditor
      :isOpen="isSidebarOpen"
      :type="activeEditorType"
      :editableContent="editableContent"
      :activeSectionType="activeSectionType"
      :activeField="selectedField"
      @close="closeSidebar"
      @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file, componentId)"
      @image-upload="(e, field) => handleImageUpload(e, field, 'service_section', componentId)"
    />
</template>

<script setup>
import { ref, watch } from "vue";
import { useEditable } from "../library";
import SidebarEditor from "../SidebarEditor.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      "service-text1": "Here Service Text1",
      "service-text2": "Here Service Text2",
      "service-image1": "Here Service Image1",
      "service-text3": "Here Service Text3",
      "service-description1": "Here Service Description1",
      "service-image2": "Here Service Image2",
      "service-text4": "Here Service Text4",
      "service-description2": "Here Service Description2",
      "service-image3": "Here Service Image3",
      "service-text5": "Here Service Text5",
      "service-description3": "Here Service Description3",
      "service-image4": "Here Service Image4",
      "service-text6": "Here Service Text6",
      "service-description4": "Here Service Description4",
      "service-image5": "Here Service Image5",
      "service-text7": "Here Service Text7",
      "service-description5": "Here Service Description5",
      "service-image6": "Here Service Image6",
      "service-text8": "Here Service Text8",
      "service-description6": "Here Service Description6",
    }),
  },
});

const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_HEALTH_SERVICE3_82';

watch(
  () => props.data,
  (newVal) => {
    editableContent.value = { ...newVal };
  },
  { immediate: true, deep: true }
);

// Reusable editable functions
const {
  selectedField,
  hoveredField,
  activeEditorType,
  isSidebarOpen,
  closeSidebar,
  selectField,
  blurAndUpdate,
  handleImageUpload,
  activeSectionType,
} = useEditable(emit, editableContent);
</script>

<style scoped>
.ss_editable {
    cursor: pointer;
    padding: 4px;
    position: relative;
    border: 2px dashed transparent;
    transition: border-color 0.2s ease;
  }
  
  .ss_editable:hover {
    border-color: #00adb5;
  }
  
  .ss_editable.selected {
    border-color: #00adb5;
  }
  
  .edit-label {
    position: absolute;
    top: -10px;
    left: 5px;
    background-color: #00adb5;
    color: white;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 3px;
    z-index: 2;
    pointer-events: none;
  }
  
  input,
  textarea {
    width: 100%;
    font-size: inherit;
    font-family: inherit;
    padding: 8px;
    border: 1px solid #ccc;
  }
  h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
  font-family: "Exo", sans-serif;
  font-weight: 700;
  /* color: #222; */
}

h1, .h1 {
  font-size: 2.5rem;
}

h2, .h2 {
  font-size: 44px;
}

h3, .h3 {
  font-size: 1.5rem;
}

h4, .h4 {
  font-size: 1.3rem;
  line-height: 30px;
}

h5, .h5 {
  font-size: 1.25rem;
}

h6, .h6 {
  font-size: 1rem;
}

p {
  line-height: 30px;
}

.navbar-toggle .icon-bar {
  background: #223a66;
}

input[type="email"], input[type="password"], input[type="text"], input[type="tel"] {
  box-shadow: none;
  height: 45px;
  outline: none;
  font-size: 14px;
}

input[type="email"]:focus, input[type="password"]:focus, input[type="text"]:focus, input[type="tel"]:focus {
  box-shadow: none;
  border: 1px solid #223a66;
}

.form-control {
  box-shadow: none;
  border-radius: 0;
}

.form-control:focus {
  box-shadow: none;
  border: 1px solid #223a66;
}

.py-7 {
  padding: 7rem 0px;
}

.btn {
  display: inline-block;
  font-size: 14px;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: .5px;
  padding: .75rem 2rem;
  font-family: "Exo", sans-serif;
  text-transform: uppercase;
  border-radius: 5px;
  border: 2px solid transparent;
  transition: all .35s ease;
}

.btn.btn-icon i {
  border-left: 1px solid rgba(255, 255, 255, 0.09);
  padding-left: 15px;
}

.btn:focus {
  outline: 0px;
  box-shadow: none;
}

.btn-main {
  background: #223a66;
  color: #fff;
  border-color: #223a66;
}

.btn-main:hover {
  background: #e12454;
  border-color: #e12454;
  color: #fff;
}

.btn-main-2 {
  background: #e12454;
  color: #fff;
  border-color: #e12454;
}

.btn-main-2:hover {
  background: #223a66;
  color: #fff;
  border-color: #223a66;
}

.btn-solid-border {
  border: 2px solid #223a66;
  background: transparent;
  color: #223a66;
}

.btn-solid-border:hover {
  border: 2px solid #223a66;
  color: #fff;
  background: #223a66;
}

.btn-solid-border:hover.btn-icon i {
  border-left: 1px solid rgba(255, 255, 255, 0.09);
}

.btn-solid-border.btn-icon i {
  border-left: 1px solid rgba(0, 0, 0, 0.09);
}

.btn-transparent {
  background: transparent;
  color: #222;
  border-color: #6F8BA4;
}

.btn-transparent:hover {
  background: #6F8BA4;
  color: #fff;
}

.btn-white {
  background: #fff;
  border-color: #fff;
  color: #222;
}

.btn-white:hover {
  background: #223a66;
  color: #fff;
  border-color: #223a66;
}

.btn-solid-white {
  border-color: #fff;
  color: #fff;
}

.btn-solid-white:hover {
  background: #fff;
  color: #222;
}

.btn-round {
  border-radius: 4px;
}

.btn-round-full {
  border-radius: 50px;
}

.btn.active:focus, .btn:active:focus, .btn:focus {
  outline: 0;
}

.bg-gray {
  background: #eff0f3;
}

.bg-primary {
  background: #223a66;
}

.bg-primary-dark {
  background: #152440;
}

.bg-primary-darker {
  background: #090f1a;
}

.bg-dark {
  background: #222;
}

.bg-gradient {
  background-image: linear-gradient(145deg, rgba(19, 177, 205, 0.95) 0%, rgba(152, 119, 234, 0.95) 100%);
  background-repeat: repeat-x;
}

.section {
  padding: 36px 52px;
}

.section-sm {
  padding: 70px 0;
}

.section-bottom {
  padding-bottom: 100px;
}

.subtitle {
  color: #223a66;
  font-size: 14px;
  letter-spacing: 1px;
}

.overlay:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  background: #223a66;
}

.overly-2 {
  position: relative;
}

.overly-2:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}

.text-sm {
  font-size: 14px;
}

.text-md {
  font-size: 2.25rem;
}

.text-lg {
  font-size: 3.75rem;
}

.no-spacing {
  letter-spacing: 0px;
}

/* Links */
a {
  color: #222;
  text-decoration: none;
  transition: all .35s ease;
}

a:focus, a:hover {
  color: #e12454;
  text-decoration: none;
}

a:focus {
  outline: none;
}

.content-title {
  font-size: 40px;
  line-height: 50px;
}

.page-title {
  padding: 120px 0px 70px 0px;
  position: relative;
}

.page-title .block h1 {
  color: #fff;
}

.page-title .block p {
  color: #fff;
}

.page-title .breadcumb-nav {
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.slick-slide:focus, .slick-slide a {
  outline: none;
}

@media (max-width: 480px) {
  h2, .h2 {
    font-size: 1.3rem;
    line-height: 36px;
  }
}

.title-color {
  color: #223a66;
}

.secondary-bg {
  background: #223a66;
}

.section-title {
  margin-bottom: 30px;
}

.section-title h2 {
  color: #223a66;
}

.text-lg {
  font-size: 50px;
}

.gray-bg {
  background: #f4f9fc;
}

@media (max-width: 480px) {
  .text-lg {
    font-size: 28px;
  }
}

@media (max-width: 400px) {
  .text-lg {
    font-size: 28px;
  }
}

.service .service-item {
  background: #fff;
  padding: 30px;
  border-radius: 5px;
}

.service .icon {
  float: left;
  margin-bottom: 10px;
}

.service i {
  color: #e12454;
}

.service h4 {
  padding-left: 20px;
}

.service .content {
  clear: both;
}

.service-block {
  padding: 20px;
  margin-top: 40px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  box-shadow: 0 0 38px rgba(21, 40, 82, 0.07);
}

.service-block img {
  width: 100%;
  margin-top: -60px;
  border: 5px solid #fff;
}
.divider {
  width: 40px;
  height: 5px;
  background: #e12454;
}
</style>