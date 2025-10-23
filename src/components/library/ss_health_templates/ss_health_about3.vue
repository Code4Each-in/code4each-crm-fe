<template>
    <section class="section about">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-4 col-sm-6">
                    <div class="about-img">
                        <span class="ss_editable" 
                            :class="{ selected: selectedField === 'about-image1' }"
                            @click.stop="selectField('about-image1', 'image','about_section', componentId)"
                            @mouseover="hoveredField='about-image1'" 
                            @mouseleave="hoveredField=null"
                        >
                            <span v-if="hoveredField==='about-image1'" class="edit-label">Image</span>
                            <img :src="editableContent['about-image1']" alt="About Us" class="img-fluid">
                        </span>
                        <span class="ss_editable" 
                            :class="{ selected: selectedField === 'about-image2' }"
                            @click.stop="selectField('about-image2', 'image','about_section', componentId)"
                            @mouseover="hoveredField='about-image2'" 
                            @mouseleave="hoveredField=null"
                        >
                            <span v-if="hoveredField==='about-image2'" class="edit-label">Image</span>
                            <img :src="editableContent['about-image2']" alt="About Us" class="img-fluid mt-4">
                        </span>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="about-img mt-4 mt-lg-0">
                        <div class="ss_editable" 
                            :class="{ selected: selectedField === 'about-image3' }"
                            @click.stop="selectField('about-image3', 'image','about_section', componentId)"
                            @mouseover="hoveredField='about-image3'" 
                            @mouseleave="hoveredField=null"
                        >
                            <span v-if="hoveredField==='about-image3'" class="edit-label">Image</span>
                            <img :src="editableContent['about-image3']" alt="About Us" class="img-fluid">
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                      <div class="about-content pl-4 mt-4 mt-lg-0">
                        <h2
                            class="title-color ss_editable"
                            :class="{ selected: selectedField === 'about-text1' }"
                            @click.stop="selectField('about-text1')"
                            @mouseover="hoveredField = 'about-text1'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-text1'" class="edit-label">Text</span>
                            <input
                                v-if="selectedField === 'about-text1'"
                                v-model="editableContent['about-text1']"
                                @blur="blurAndUpdate('about-text1', null, null, null, componentId)"
                            />
                            <span v-else>{{ editableContent['about-text1'] }}</span>
                        </h2>

                        <div
                            class="mt-4 mb-3 ss_editable"
                            :class="{ selected: selectedField === 'about-description1' }"
                            @click.stop="selectField('about-description1')"
                            @mouseover="hoveredField = 'about-description1'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-description1'" class="edit-label">Text</span>
                            <input
                                v-if="selectedField === 'about-description1'"
                                v-model="editableContent['about-description1']"
                                @blur="blurAndUpdate('about-description1', null, null, null, componentId)"
                            />
                            <p v-else>{{ editableContent['about-description1'] }}</p>
                        </div>

                        <div 
                            class="mbr-section-btn ss_editable"
                            :class="{ selected: selectedField === 'about-button1' }"
                            @mouseover="hoveredField = 'about-button1'"
                            @mouseleave="hoveredField = null"
                            v-if="editableContent['about-button1']"
                        >
                            <span v-if="hoveredField === 'about-button1'" class="edit-label">Button</span>

                            <!-- Button that opens the sidebar -->
                            <button
                                class="btn btn-main-2 btn-round-full btn-icon"
                                @click.stop="selectField('about-button1', 'button', 'about_section', componentId)"
                            >
                                {{ editableContent['about-button1'] }}
                            </button>
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
        :activeComponentId = "activeComponentId"
        @close="closeSidebar"
        @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file, componentId)"
        @image-upload="(e, field) => handleImageUpload(e, field, 'about_section', componentId)"
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
        "about-image1": "",
        "about-image2": "",
        "about-image3": "",
        "about-text1": "Our",
        "about-description1": "for You",
        "about-button1": "Learn More",
    }),
  },
});

const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_EDUCATION_ABOUT1_70';

watch(
  () => props.data,
  (newVal) => {
    editableContent.value = { ...newVal };
  },
  { immediate: true, deep: true }
);

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
  activeComponentId,
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
  margin-bottom: 70px;
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
.about-img img {
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px rgba(0, 42, 106, 0.1);
}
</style>