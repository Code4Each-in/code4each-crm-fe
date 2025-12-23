<template>
    <nav class="ss_navbar" id="navbar">
        <div class="container navbar-content">
            <div
                class="hero-logo ss_editable"
                @click.stop="selectField('logo', 'logo')"
                @mouseover="hoveredField = 'logo'"
                @mouseleave="hoveredField = null"
                :class="{ selected: selectedField === 'logo' }"
            >
                <span v-if="hoveredField === 'logo'" class="edit-label">Logo</span>
                <img :src="editableContent.logo" alt="Logo" class="hero-logo-img" />
            </div>
      
            <div class="nav-links" id="navLinks">
                <ul
                    class="ss_editable"
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
                        class="text-muted"
                    >
                        <span class="nav-link">{{ item }}</span>
                    </li>
                    </template>

                    <!-- Show “Add Menu” placeholder when empty -->
                    <template v-else>
                    <li>
                        <i class="fa fa-plus me-1" style="color: #fff;"></i>
                        Add Menus
                    </li>
                    </template>
                </ul>
            </div>
      
            <div class="nav-right">
                <span class="phone-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span>{{ editableContent.phone }}</span>
                </span>
                <div
                  class="ss_editable"
                  :class="{ selected: selectedField === 'header-button1' }"
                  @mouseover="hoveredField = 'header-button1'"
                  @mouseleave="hoveredField = null"
                  v-if="editableContent['header-button1']"
                  >
                  <span v-if="hoveredField === 'header-button1'" class="edit-label">Button</span>
                  <button
                      class="btn btn-primary px-4 py-3 px-md-5 me-4 btn-border-radius"
                      @click.stop="selectField('header-button1', 'button', 'header', componentId)"
                  >
                      {{ editableContent['header-button1'] }} 
                  </button>
                  </div>
            </div>
        </div>
    </nav>

    <section class="hero" id="home">
      <div class="container hero-layout">

        <!-- LEFT: Hero Text -->
        <div class="hero-content">
          <div class="hero-text">

            <!-- Header Text 1 -->
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
              <h1 v-else class="hero-title">
                {{ editableContent['header-text1'] }}
              </h1>
            </div>

            <!-- Header Text 2 -->
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
              <p v-else class="hero-subtitle">
                {{ editableContent['header-text2'] }}
              </p>
            </div>

            <!-- Buttons -->
            <div class="hero-buttons">
              <div
                class="ss_editable"
                :class="{ selected: selectedField === 'header-button2' }"
                @mouseover="hoveredField = 'header-button2'"
                @mouseleave="hoveredField = null"
              >
                <span v-if="hoveredField === 'header-button2'" class="edit-label">Button</span>
                <button
                  class="btn btn-hero"
                  @click.stop="selectField('header-button2', 'button', 'header', componentId)"
                >
                  {{ editableContent['header-button2'] }}
                </button>
              </div>

              <div
                class="ss_editable"
                :class="{ selected: selectedField === 'header-button3' }"
                @mouseover="hoveredField = 'header-button3'"
                @mouseleave="hoveredField = null"
              >
                <span v-if="hoveredField === 'header-button3'" class="edit-label">Button</span>
                <button
                  class="btn btn-hero-outline"
                  @click.stop="selectField('header-button3', 'button', 'header', componentId)"
                >
                  {{ editableContent['header-button3'] }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Slider / Settings -->
        <div
          class="ss_editable slider hero-slider"
          :class="{ selected: selectedField === 'header-slider' }"
          @click.stop="selectField('header-slider', 'slider', 'header', componentId)"
          @mouseover="hoveredField = 'header-slider'"
          @mouseleave="hoveredField = null"
        >
          <span v-if="hoveredField === 'header-slider'" class="edit-label">
            Slider
          </span>

          <button class="slider-setting-btn">
            Slider Settings
          </button>
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
import { ref, watch } from 'vue';
import { useEditable } from '../library';
import SidebarEditor from '../SidebarEditor.vue';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            logo: '',
            phone: '+1 (555) 123-4567',
            'header-button1': 'Call Now',
            menu: ['Home', 'About', 'Services', 'Contact'],
            "header-images": [],
            'header-text1': 'Welcome to Our Health Services',
            'header-text2': 'Providing quality healthcare for you and your family.',
            'header-button2': 'Get Started',
            'header-button3': 'Learn More',
        }),
    },
});

const emit = defineEmits(['field-updated']);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_HEALTH_HEADER4_98';

watch(() => props.data, (newVal) => {
    const data = { ...newVal };
    editableContent.value = data;
}, { immediate: true, deep: true });

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
    border-color: #00adb5 !important;
}

.ss_editable.selected {
    border-color: #00adb5 !important;
}

.edit-label {
    position: absolute;
    top: -10px;
    left: 5px;
    background-color: #00adb5 !important;
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
img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

/* ===== Utilities ===== */
/* .container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
} */

@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}

.hidden {
  display: none !important;
}

/* ===== Buttons ===== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background-color: hsl(174, 62%, 40%);
  color: hsl(0, 0%, 100%);
  box-shadow: 0 4px 20px hsla(200, 25%, 15%, 0.08);
}

.btn-primary:hover {
  background-color: hsl(174, 62%, 35%);
  box-shadow: 0 8px 30px hsla(174, 62%, 40%, 0.15);
}

.btn-hero {
  background-color: hsl(174, 62%, 40%);
  color: hsl(0, 0%, 100%) !important;
  padding: 1rem 2rem !important;
  font-size: 1rem !important;
  box-shadow: 0 10px 30px hsla(174, 62%, 40%, 0.3) !important;
}

.btn-hero:hover {
  background-color: hsl(174, 62%, 35%);
  transform: scale(1.05);
  box-shadow: 0 15px 40px hsla(174, 62%, 40%, 0.4);
}

.btn-hero-outline {
  background-color: transparent !important;
  color: hsl(0, 0%, 100%) !important;
  padding: 1rem 2rem !important;
  font-size: 1rem !important;
  border: 2px solid hsla(0, 0%, 100%, 0.5) !important;
}

.btn-hero-outline:hover {
  background-color: hsl(0, 0%, 100%);
  color: hsl(200, 25%, 15%);
}

.btn-white {
  background-color: hsl(0, 0%, 100%);
  color: hsl(174, 62%, 40%);
  padding: 1rem 2rem;
  font-size: 1rem;
}

.btn-white:hover {
  background-color: hsla(0, 0%, 100%, 0.9);
}

.btn-outline-white {
  background-color: transparent;
  color: hsl(0, 0%, 100%);
  padding: 1rem 2rem;
  font-size: 1rem;
  border: 2px solid hsl(0, 0%, 100%);
}

.btn-outline-white:hover {
  background-color: hsl(0, 0%, 100%);
  color: hsl(174, 62%, 40%);
}

/* ===== Animations ===== */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.fade-in-left {
  opacity: 0;
  animation: fadeInLeft 0.6s ease forwards;
}

.fade-in-right {
  opacity: 0;
  animation: fadeInRight 0.6s ease forwards;
}

.fade-in.visible,
.fade-in-left.visible,
.fade-in-right.visible {
  animation-play-state: running;
}

/* ===== Navbar ===== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0;
  transition: all 0.3s ease;
  background: #fff;
}

.navbar.scrolled {
  background-color: hsla(0, 0%, 100%, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px hsla(200, 25%, 15%, 0.08);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background-color: hsl(174, 62%, 40%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(0, 0%, 100%);
}

.logo-text {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(200, 25%, 15%);
}

.nav-links {
  display: none;
  align-items: center;
  gap: 2rem;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
}

.nav-link {
  color: hsla(200, 25%, 15%, 0.8);
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: hsl(174, 62%, 40%);
}

.nav-right {
  display: none;
  align-items: center;
  gap: 1rem;
}

@media (min-width: 768px) {
  .nav-right {
    display: flex;
  }
}

.phone-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: hsl(200, 10%, 45%);
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.phone-link:hover {
  color: hsl(174, 62%, 40%);
}

.mobile-menu-btn {
  display: flex;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: hsl(200, 25%, 15%);
}

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}

.mobile-menu {
  background-color: hsl(0, 0%, 100%);
  border-top: 1px solid hsl(180, 20%, 90%);
  padding: 1.5rem 0;
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem 0;
  color: hsla(200, 25%, 15%, 0.8);
  font-weight: 500;
  transition: color 0.2s ease;
}

.mobile-nav-link:hover {
  color: hsl(174, 62%, 40%);
}

.mobile-cta {
  margin-top: 1rem;
  width: 100%;
}

/* ===== Hero Slider ===== */
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
}

.slider {
  /* position: absolute; */
  inset: 0;
}

.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.7s ease, transform 0.7s ease;
  transform: scale(1.1);
}

.slide.active {
  opacity: 1;
  transform: scale(1);
}

.slide-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, hsla(200, 25%, 15%, 0.9), hsla(200, 25%, 15%, 0.6), hsla(200, 25%, 15%, 0.2));
}

.hero-content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.hero-text {
  max-width: 600px;
}

.hero-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: hsl(0, 0%, 100%);
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3.5rem;
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 4rem;
  }
}

.hero-subtitle {
  font-size: 1.125rem;
  color: hsla(0, 0%, 100%, 0.9);
  margin-bottom: 2rem;
  line-height: 1.7;
}

@media (min-width: 768px) {
  .hero-subtitle {
    font-size: 1.25rem;
  }
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 640px) {
  .hero-buttons {
    flex-direction: row;
  }
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.75rem;
  background-color: hsla(0, 0%, 100%, 0.2);
  backdrop-filter: blur(4px);
  border: none;
  border-radius: 50%;
  color: hsl(0, 0%, 100%);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.slider-arrow:hover {
  background-color: hsla(0, 0%, 100%, 0.4);
}

.slider-prev {
  left: 1rem;
}

.slider-next {
  right: 1rem;
}

.slider-dots {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: hsla(0, 0%, 100%, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background-color: hsl(174, 62%, 40%);
  width: 32px;
  border-radius: 6px;
}

.dot:hover {
  background-color: hsla(0, 0%, 100%, 0.7);
}

/* ===== About Section ===== */
.about {
  padding: 5rem 0 6rem;
  background-color: hsl(180, 30%, 96%);
}

@media (min-width: 1024px) {
  .about {
    padding: 8rem 0 10rem;
  }
}

.about-content {
  display: grid;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
  }
}
.navbar .logo {
    max-height: 65px;
}
.nav-links ul{
    margin-bottom: 0px !important;
    padding: 0px !important;
    display: flex;
}
.slider-setting-btn {
    padding: 14px 28px;
    font-size: 16px;
    font-weight: 600;
    background: #00adb5;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.slider-setting-btn:hover {
    background: #008e95;
}

.hero-logo .hero-logo-img{
    height: 100px;
}

.hero-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #00adb5;
}

.hero-layout {
  display: flex;
  align-items: center;
  min-height: 100vh;
  gap: 3rem;
  background: black;
}

.hero-content {
  flex: 1;
  z-index: 2;
}

.hero-slider {
  flex: 1;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #00adb5;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-layout {
    flex-direction: column;
    text-align: center;
  }

  .hero-buttons {
    justify-content: center;
  }
}

</style>