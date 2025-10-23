<template>
    <header>
        <div class="header-top-bar">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-8">
                        <ul class="top-bar-info list-inline-item pl-0 mb-0">
                            <li class="list-inline-item"><span><i class="icofont-support-faq mr-2"></i>{{ editableContent.email }}</span></li>
                            <li class="list-inline-item"><i class="icofont-location-pin mr-2"></i><span>{{ editableContent.address }}</span></li>
                        </ul>
                    </div>
                    <div class="col-lg-4">
                        <div class="text-lg-right top-right-bar mt-2 mt-lg-0" style="text-align: end;">
                            <span><span>Call Now : </span><span class="h4">{{ editableContent.phone }}</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg navigation" id="navbar">
            <div class="container">
                <div
                    class="ss_editable"
                    @click.stop="selectField('logo', 'logo')"
                    @mouseover="hoveredField = 'logo'"
                    @mouseleave="hoveredField = null"
                    :class="{ selected: selectedField === 'logo' }"
                >
                    <span v-if="hoveredField === 'logo'" class="edit-label">Logo</span>
                    <img :src="editableContent.logo" alt="Logo" class="logo" />
                </div>

                <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarmain" aria-controls="navbarmain" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="icofont-navigation-menu"></span>
                </button>
        
                <div class="collapse navbar-collapse" id="navbarmain">
                    <ul
                        class="navbar-nav ml-auto ss_editable"
                        :class="{ selected: selectedField === 'menu' }"
                        @click.stop="selectField('menu', 'menus')"
                        @mouseover="hoveredField = 'menu'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'menu'" class="edit-label">Menus</span>
                        <!-- Show menus if present -->
                        <template v-if="editableContent.menu && editableContent.menu.length">
                        <li
                            v-for="(item, index) in editableContent.menu"
                            :key="index"
                            class="nav-item"
                        >
                            <span class="nav-link">{{ item }}</span>
                        </li>
                        </template>

                        <!-- Show “Add Menu” placeholder when empty -->
                        <template v-else>
                        <li class="nav-item text-muted">
                            <i class="fa fa-plus me-1" style="color: #fff;"></i>
                            Add Menus
                        </li>
                        </template>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <section class="banner">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-12 col-xl-7">
                    <div class="block">
                        <div class="divider mb-3"></div>
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'header-text1' }"
                            @click.stop="selectField('header-text1')"
                            @mouseover="hoveredField = 'header-text1'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'header-text1'" class="edit-label">Text</span>
                            <input
                                v-if="selectedField === 'header-text1'"
                                v-model="editableContent['header-text1']"
                                @blur="blurAndUpdate('header-text1', null, 'header', null, componentId)"
                            />
                            <span v-else class="text-uppercase text-sm letter-spacing">{{ editableContent['header-text1'] }}</span>
                        </div>

                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'header-text2' }"
                            @click.stop="selectField('header-text2')"
                            @mouseover="hoveredField = 'header-text2'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'header-text2'" class="edit-label">Text</span>
                            <input
                                v-if="selectedField === 'header-text2'"
                                v-model="editableContent['header-text2']"
                                @blur="blurAndUpdate('header-text2', null, 'header', null, componentId)"
                            />
                            <h1 v-else class="mb-3 mt-3">{{ editableContent['header-text2'] }}</h1>
                        </div>
                        
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'header-description1' }"
                            @click.stop="selectField('header-description1')"
                            @mouseover="hoveredField = 'header-description1'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'header-description1'" class="edit-label">Text</span>
                            <textarea
                                v-if="selectedField === 'header-description1'"
                                v-model="editableContent['header-description1']"
                                @blur="blurAndUpdate('header-description1', null, 'header', null, componentId)"
                            />
                            <p v-else class="mb-4 pr-5">{{ editableContent['header-description1'] }}</p>
                        </div>

                        <div class="btn-container ">
                            <div
                                class="mbr-section-btn ss_editable"
                                :class="{ selected: selectedField === 'header-button1' }"
                                @mouseover="hoveredField = 'header-button1'"
                                @mouseleave="hoveredField = null"
                                v-if="editableContent['header-button1']"
                            >
                                <span v-if="hoveredField === 'header-button1'" class="edit-label">Button</span>

                                <!-- Button that opens the sidebar -->
                                <button
                                    class="btn btn-main-2 btn-icon btn-round-full"
                                    @click.stop="selectField('header-button1', 'button', 'header', componentId)"
                                >
                                    {{ editableContent['header-button1'] }}
                                </button>
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
      :activeComponentId="activeComponentId"
      @close="closeSidebar"
      @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file, componentId)"
      @image-upload="(e, field) => handleImageUpload(e, field, 'header', componentId)"
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
      email: "Your Email",
      address: "Your Address",
      phone: "Your Phone",
      logo: "/images/logo.png",
      menu: ["Home", "About", "Services", "Contact"],
      'header-text1': "Your Header Text 1",
      'header-text2': "Your Header Text 2",
      'header-description1': "Your description goes here.",
      'header-button1': "Click Here",
    }),
  },
});

// parent listens to "field-updated"
const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_HEALTH_HEADER3_80';

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
img .logo {
    height: 80px;
    width: auto;
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
  padding: 100px 0;
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

#navbarmain {
  padding: 20px 0px;
}

#navbarmain .nav-link {
  font-weight: 600;
  padding: 10px 15px;
  color: #222;
  font-family: "Exo", sans-serif;
  text-transform: capitalize;
  font-size: 16px;
  transition: all .25s ease;
}

.dropdown-toggle::after {
  display: none;
}

.navbar-brand {
  margin-top: 10px;
}

.dropdown .dropdown-menu {
  position: absolute;
  display: block;
  background: #fff;
  min-width: 240px;
  top: 130%;
  left: 0;
  right: 0px;
  opacity: 0;
  padding: 0px;
  visibility: hidden;
  transition: all 0.3s ease-out 0s;
  border: 0px;
  border-top: 5px solid #e12454;
  border-radius: 0px;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  top: 115%;
}

.dropdown .dropdown-item {
  padding: 13px 20px;
  border-bottom: 1px solid #eee;
  background: transparent;
  font-weight: 400;
  color: #555;
}

.dropdown .dropdown-item:hover {
  color: #e12454;
}

.header-top-bar {
  background: #223a66;
  font-size: 14px;
  padding: 10px 0px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  color: #fff;
}

.top-bar-info li a {
  color: #fff;
  margin-right: 20px;
}

.top-right-bar a span {
  color: #fff;
  font-weight: 600;
  letter-spacing: 1px;
}

.top-right-bar a i {
  color: #fff;
  margin-right: 10px;
}

.bg-1 {
  background: url("../images/22.jpg") no-repeat 50% 50%;
  background-size: cover;
  position: relative;
}

.banner {
  position: relative;
  overflow: hidden;
  background: #fff;
  background: url("../images/slider-bg-1.jpg") no-repeat;
  background-size: cover;
  min-height: 550px;
}

.banner .block {
  padding: 55px 10px 10px;
}

.banner .block h1 {
  font-size: 60px;
  line-height: 1.2;
  letter-spacing: -1.2px;
  text-transform: capitalize;
  color: #223a66;
}

.letter-spacing {
  letter-spacing: 2px;
}

.text-color {
  color: #223a66;
}

.text-color-2 {
  color: #e12454;
}

.divider {
  width: 40px;
  height: 5px;
  background: #e12454;
}

.navbar-collapse {
    flex-grow: 0 !important;
}

@media (max-width: 480px) {
  .banner .block h1 {
    font-size: 38px;
    line-height: 50px;
  }
  .banner {
    min-height: 450px;
    background: #fff !important;
  }
}

@media (max-width: 400px) {
  .banner .block h1 {
    font-size: 28px;
    line-height: 40px;
  }
  .banner {
    min-height: 450px;
    background: #fff !important;
  }
}

@media (max-width: 768px) {
  .banner .block h1 {
    font-size: 56px;
    line-height: 70px;
  }
  .banner {
    background: #fff !important;
  }
}

@media (max-width: 992px) {
  .banner {
    background: #fff !important;
  }
}
img.logo {
    max-width: 34%;
}
</style>