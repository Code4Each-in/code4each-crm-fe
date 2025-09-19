<template>
  <header class="hero-header" id="hero-header">
    <!-- Navbar -->
    <nav class="hero-navbar navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <!-- Editable Logo -->
        <div
          class="hero-logo editable"
          @click.stop="selectField('logo', 'logo')"
          @mouseover="hoveredField = 'logo'"
          @mouseleave="hoveredField = null"
          :class="{ selected: selectedField === 'logo' }"
        >
          <span v-if="hoveredField === 'logo'" class="edit-label">Logo</span>
          <img :src="editableContent.logo" alt="Logo" class="hero-logo-img" />
        </div>

        <button
          class="hero-navbar-toggler navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#heroNavbarNav"
        >
          <span class="fa fa-bars"></span>
        </button>

        <div class="collapse navbar-collapse" id="heroNavbarNav">
          <ul
            class="hero-menu navbar-nav ms-auto editable"
            :class="{ selected: selectedField === 'menu' }"
            @click.stop="selectField('menu', 'menus')"
            @mouseover="hoveredField = 'menu'"
            @mouseleave="hoveredField = null"
          >
            <span v-if="hoveredField === 'menu'" class="edit-label">Menus</span>
            <li
              v-for="(item, index) in editableContent.menu"
              :key="index"
              class="hero-menu-item nav-item"
            >
              <span class="hero-menu-link nav-link">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Content -->
    <section class="hero-section" id="hero-section">
      <div class="hero-layer shape-1 d-none d-md-block"></div>
      <div class="container">
        <div class="row">
          <!-- Text Column -->
          <div class="col-lg-6 hero-content">
            <!-- Title 1 -->
            <div
              class="editable"
              :class="{ selected: selectedField === 'header-text1' }"
              @click.stop="selectField('header-text1')"
              @mouseover="hoveredField = 'header-text1'"
              @mouseleave="hoveredField = null"
            >
              <span v-if="hoveredField === 'header-text1'" class="edit-label">Text</span>
              <input
                v-if="selectedField === 'header-text1'"
                v-model="editableContent['header-text1']"
                @blur="blurAndUpdate('header-text1')"
              />
              <h2 v-else class="hero-title1">{{ editableContent['header-text1'] }}</h2>
            </div>

            <!-- Title 2 -->
            <div
              class="editable"
              :class="{ selected: selectedField === 'header-text2' }"
              @click.stop="selectField('header-text2')"
              @mouseover="hoveredField = 'header-text2'"
              @mouseleave="hoveredField = null"
            >
              <span v-if="hoveredField === 'header-text2'" class="edit-label">Text</span>
              <input
                v-if="selectedField === 'header-text2'"
                v-model="editableContent['header-text2']"
                @blur="blurAndUpdate('header-text2')"
              />
              <h1 v-else class="hero-title2">{{ editableContent['header-text2'] }}</h1>
            </div>

            <!-- Description -->
            <div
              class="editable"
              :class="{ selected: selectedField === 'header-description1' }"
              @click.stop="selectField('header-description1')"
              @mouseover="hoveredField = 'header-description1'"
              @mouseleave="hoveredField = null"
            >
              <span v-if="hoveredField === 'header-description1'" class="edit-label">Text</span>
              <textarea
                v-if="selectedField === 'header-description1'"
                v-model="editableContent['header-description1']"
                @blur="blurAndUpdate('header-description1')"
              ></textarea>
              <p v-else class="hero-description">{{ editableContent['header-description1'] }}</p>
            </div>

            <!-- Button -->
            <div
              class="editable"
              :class="{ selected: selectedField === 'header-button1' }"
              @click.stop="selectField('header-button1')"
              @mouseover="hoveredField = 'header-button1'"
              @mouseleave="hoveredField = null"
              v-if="editableContent['header-button1']"
            >
              <span v-if="hoveredField === 'header-button1'" class="edit-label">Text</span>
              <input
                v-if="selectedField === 'header-button1'"
                v-model="editableContent['header-button1']"
                @blur="blurAndUpdate('header-button1')"
              />
              <a v-else class="btn hero-btn" href="#">{{ editableContent['header-button1'] }}</a>
            </div>
          </div>

          <!-- Image Column -->
           
          <div class="col-lg-6">
            <div
              class="hero-image-wrapper editable"
              :class="{ selected: selectedField === 'image' }"
              @click.stop="selectField('image', 'image')" 
              @mouseover="hoveredField = 'image'"
              @mouseleave="hoveredField = null"
            >
              <span v-if="hoveredField === 'image'" class="edit-label">Image</span>
              <!-- Show first image or fallback -->
              <img
                :src="(editableContent.images && editableContent.images[0]) || editableContent.image"
                alt="Hero Image"
                class="hero-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <SidebarEditor
      :isOpen="isSidebarOpen"
      :type="activeEditorType"
      :editableContent="editableContent"
      @close="closeSidebar"
      @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file)"
      @image-upload="(e, field) => handleImageUpload(e, field, 'header')"
    />
  </header>
</template>

<script setup>
import { ref, watch } from "vue";
import { useEditable } from "../library";
import SidebarEditor from "../SidebarEditor.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      logo: "/images/logo.png",
      menu: ["Home", "About", "Services", "Contact"],
      'header-text1': "Your Header Text 1",
      'header-text2': "Your Header Text 2",
      'header-description1': "Your description goes here.",
      'header-button1': "Click Here",
      image: "/images/hero.png",
      images: []     
    }),
  },
});

// parent listens to "field-updated"
const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });

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
} = useEditable(emit, editableContent);

</script>

  <style scoped>
  /* General */
  .hero-header {
    background: #222831;
    color: #f9fafb;
  }
  
  /* Editable styling */
  .editable {
    cursor: pointer;
    padding: 4px;
    position: relative;
    border: 2px dashed transparent;
    transition: border-color 0.2s ease;
  }
  
  .editable:hover {
    border-color: #00adb5;
  }
  
  .editable.selected {
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
  
  /* Navbar */

  .hero-logo .hero-logo-img{
    height: 100px;
  }
  .hero-navbar-toggler {
    border: none;
    color: #f9fafb;
    font-size: 18px;
  }
  .navbar .hero-menu-link {
    font-size: 18px;
    padding: 0.7rem 20px;
    color: #f9fafb;
    font-weight: 600;
  }
  .navbar .hero-menu-link:hover,
  .navbar .hero-menu-link:focus,
  .navbar .hero-menu-link.active {
    color: #00adb5;
  }
  
  /* Hero section */
  .hero-section {
    padding: 10px 0;
    background-color: #222831;
    position: relative;
  }
  .hero-title1 {
    font-size: 30px;
    font-weight: 400;
  }
  .hero-title2 {
    font-size: 3rem;
    font-weight: 700;
  }
  .hero-description {
    font-size: 24px;
    line-height: 1.6;
  }
  .hero-btn {
    font-weight: 600;
    letter-spacing: 1px;
    margin: 0.4rem 0.8rem;
    padding: 12px 24px;
    border-radius: 6px;
    background: none;
    border: 1px solid #ffffff;
    color: #f9fafb;
    transition: all 0.3s ease-in-out;
  }
  .hero-btn:hover {
    background-color: #ffffff;
    color: #393e46;
    border-color: #393e46;
  }
  
  /* Image */
  .hero-image-wrapper {
    position: relative;
  }
  .hero-img {
    width: 100%;
  }
  
  /* Layers */
  .hero-layer.shape-1 {
    position: absolute;
    right: 0;
    top: -51px;
    height: 397px;
    width: 200px;
    background-color: #00adb5;
    opacity: 0.1;
    border-radius: 180px;
    pointer-events: none;
    z-index: -1;
  }
  .hero-section .hero-content::after {
    position: absolute;
    content: "";
    height: 488px;
    top: 13%;
    width: 310px;
    background-color: #00adb5;
    opacity: 0.1;
    border-radius: 180px;
    left: 15%;
    pointer-events: none;
    z-index: -1;
  }
  </style>
  