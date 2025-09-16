<template>
    <header class="hero-header" id="hero-header">
      <!-- Navbar -->
      <nav class="hero-navbar navbar navbar-expand-lg navbar-dark">
        <div class="container">
          <!-- Editable Logo -->
          <div
            class="hero-logo editable"
            @click="selectField('logo')"
            @mouseover="hoveredField = 'logo'"
            @mouseleave="hoveredField = null"
            :class="{ selected: selectedField === 'logo' }"
          >
            <span v-if="hoveredField === 'logo'" class="edit-label">Logo</span>
            <input
              v-if="selectedField === 'logo'"
              type="file"
              @change="handleLogoUpload"
              @blur="selectedField = null"
            />
            <img v-else :src="editableContent.logo" alt="Logo" class="hero-logo-img" />
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
            <ul class="hero-menu navbar-nav ms-auto">
              <li v-for="(item, i) in editableContent.menu" :key="i" class="hero-menu-item nav-item">
                <a class="hero-menu-link nav-link" href="#">{{ item }}</a>
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
                :class="{ selected: selectedField === 'title1' }"
                @click="selectField('title1')"
                @mouseover="hoveredField = 'title1'"
                @mouseleave="hoveredField = null"
              >
                <span v-if="hoveredField === 'title1'" class="edit-label">Text</span>
                <input
                  v-if="selectedField === 'title1'"
                  v-model="editableContent.title1"
                  @blur="blurAndUpdate"
                />
                <h2 v-else class="hero-title1">{{ editableContent.title1 }}</h2>
              </div>
  
              <!-- Title 2 -->
              <div
                class="editable"
                :class="{ selected: selectedField === 'title2' }"
                @click="selectField('title2')"
                @mouseover="hoveredField = 'title2'"
                @mouseleave="hoveredField = null"
              >
                <span v-if="hoveredField === 'title2'" class="edit-label">Text</span>
                <input
                  v-if="selectedField === 'title2'"
                  v-model="editableContent.title2"
                  @blur="blurAndUpdate"
                />
                <h1 v-else class="hero-title2">{{ editableContent.title2 }}</h1>
              </div>
  
              <!-- Description -->
              <div
                class="editable"
                :class="{ selected: selectedField === 'description' }"
                @click="selectField('description')"
                @mouseover="hoveredField = 'description'"
                @mouseleave="hoveredField = null"
              >
                <span v-if="hoveredField === 'description'" class="edit-label">Text</span>
                <textarea
                  v-if="selectedField === 'description'"
                  v-model="editableContent.description"
                  @blur="blurAndUpdate"
                ></textarea>
                <p v-else class="hero-description">{{ editableContent.description }}</p>
              </div>
  
              <!-- Button -->
              <div
                class="editable"
                :class="{ selected: selectedField === 'buttonText' }"
                @click="selectField('buttonText')"
                @mouseover="hoveredField = 'buttonText'"
                @mouseleave="hoveredField = null"
                v-if="editableContent.buttonText"
              >
                <span v-if="hoveredField === 'buttonText'" class="edit-label">Text</span>
                <input
                  v-if="selectedField === 'buttonText'"
                  v-model="editableContent.buttonText"
                  @blur="blurAndUpdate"
                />
                <a v-else class="btn hero-btn" href="#">
                  {{ editableContent.buttonText }}
                </a>
              </div>
            </div>
  
            <!-- Image Column -->
            <div class="col-lg-6">
              <div
                class="hero-image-wrapper editable"
                :class="{ selected: selectedField === 'image' }"
                @click="selectField('image')"
                @mouseover="hoveredField = 'image'"
                @mouseleave="hoveredField = null"
              >
                <span v-if="hoveredField === 'image'" class="edit-label">Image</span>
                <input
                  v-if="selectedField === 'image'"
                  type="file"
                  @change="handleImageUpload"
                  @blur="selectedField = null"
                />
                <img
                  v-else
                  :src="editableContent.image"
                  alt="Hero Image"
                  class="hero-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({
        logo: "/images/logo.png",
        menu: ["Home", "About", "Services", "Contact"],
        title1: "Your Header Text 1",
        title2: "Your Header Text 2",
        description: "Your description goes here.",
        buttonText: "Click Here",
        image: "/images/hero.png",
      }),
    },
  });
  
  const emit = defineEmits(["update"]);
  
    // const content = props.data;
    const editableContent = ref({ ...props.data });


    watch(
    () => props.data,
    (newVal) => {
        editableContent.value = { ...newVal };
    },
    { immediate: true, deep: true }
    );

  
  const selectedField = ref(null);
  const hoveredField = ref(null);
  
  function selectField(field) {
    selectedField.value = field;
  }
  
  function blurAndUpdate() {
    emit("update", editableContent.value);
    selectedField.value = null;
  }
  
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        editableContent.value.image = e.target.result;
        emit("update", editableContent.value);
        selectedField.value = null;
      };
      reader.readAsDataURL(file);
    }
  }
  
  function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        editableContent.value.logo = e.target.result;
        emit("update", editableContent.value);
        selectedField.value = null;
      };
      reader.readAsDataURL(file);
    }
  }
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
  