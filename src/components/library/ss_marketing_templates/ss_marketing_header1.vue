<template>
    <nav class="ss_navbar" id="ss_navbar">
        <div class="navbar-inner">
            <div
                class="navbar-brand ss_editable"
                @click.stop="selectField('logo', 'logo')"
                @mouseover="hoveredField = 'logo'"
                @mouseleave="hoveredField = null"
                :class="{ selected: selectedField === 'logo' }"
            >
                <span v-if="hoveredField === 'logo'" class="edit-label">Logo</span>
                <img :src="editableContent.logo" alt="Logo" class="logo" />
            </div>
            <ul
                class="ss_editable nav-links"
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
                    <span>{{ item }}</span>
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
    </nav>

    <!-- ============ HERO ============ -->
    <section class="hero" id="home">
        <div class="hero-bg-wrapper" id="heroBg">
            <div
                class="ss_editable"
                :class="{ selected: selectedField === 'header-image1' }"
                @click.stop="selectField('header-image1', 'image', 'header', componentId)" 
                @mouseover="hoveredField = 'header-image1'"
                @mouseleave="hoveredField = null"
            >
                <span v-if="hoveredField === 'header-image1'" class="edit-label">Image</span>

                <img
                    :src="editableContent['header-image1'] || '/images/hero.png'"
                    alt="Hero Image"
                    class="img1"
                />
            </div>
        </div>
        <div class="royal-overlay"></div>
        <div class="hero-content">
            <div class="animate-slide-up" style="animation-delay: 0.2s;">
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
                    <p v-else class="hero-subtitle">{{ editableContent['header-text1'] }}</p>
                </div>
            </div>
            <h1 class="hero-title animate-slide-up" style="animation-delay: 0.5s;">
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
                    <span v-else>{{ editableContent['header-text2'] }}</span>
                </div>
                <span class="gold-text">
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'header-text3' }"
                        @click.stop="selectField('header-text3')"
                        @mouseover="hoveredField = 'header-text3'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'header-text3'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'header-text3'"
                            v-model="editableContent['header-text3']"
                            @blur="blurAndUpdate('header-text3', null, 'header', null, componentId)"
                        />
                        <span v-else>{{ editableContent['header-text3'] }}</span>
                    </div>
                </span>
            </h1>
            <div class="gold-divider animate-slide-up" style="width: 8rem; margin: 0 auto 1.5rem; animation-delay: 0.7s;"></div>
            <p
                class="hero-desc animate-slide-up ss_editable"
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
                ></textarea>
                <span v-else>{{ editableContent['header-description1'] }}</span>
            </p>
            <div class="animate-slide-up" style="animation-delay: 1.1s;">  
                <div
                    class="ss_editable"
                    :class="{ selected: selectedField === 'header-button1' }"
                    @mouseover="hoveredField = 'header-button1'"
                    @mouseleave="hoveredField = null"
                    v-if="editableContent['header-button1']"
                >
                    <span v-if="hoveredField === 'header-button1'" class="edit-label">Button</span>

                    <!-- Button that opens the sidebar -->
                    <button
                        class="hero-btn"
                        @click.stop="selectField('header-button1', 'button', 'header', componentId)"
                    >
                        {{ editableContent['header-button1'] }}
                    </button>
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
      logo: "/images/logo.png",
      menu: ["Home", "About", "Services", "Contact"],
      'header-image1': "/images/hero.png",
      'header-text1': "Your Header Text 1",
      'header-text2': "Your Header Text 2",
      'header-text3': "Your Header Text 3",
      'header-description1': "Your description goes here.",
      'header-button1': "Click Here",
    }),
  },
});

// parent listens to "field-updated"
const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_MARKETING_HEADER1_101';

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
    /* Editable styling */
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

    .hero-bg-wrapper .ss_editable {
    height: 100%;
    }

    h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; }

    a { text-decoration: none; color: inherit; }
    ul { list-style: none; }
    img { display: block; max-width: 100%; }

    /* ============ UTILITY CLASSES ============ */
    .gold-text {
    background: linear-gradient(135deg, hsl(40, 60%, 50%), hsl(40, 70%, 65%), hsl(40, 60%, 50%));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    }

    .gold-divider {
    height: 2px;
    background: linear-gradient(90deg, transparent, hsl(40, 60%, 50%), transparent);
    }

    .royal-gradient {
    background: linear-gradient(135deg, hsl(220, 45%, 22%) 0%, hsl(220, 45%, 30%) 50%, hsl(220, 45%, 22%) 100%);
    }

    .royal-overlay {
    pointer-events: none;
    background: linear-gradient(180deg, hsl(269deg 45% 12% / 69%) 0%, hsl(220deg 45% 12% / 52%) 50%, hsla(220, 45%, 12%, 0.8) 100%);
    }

    .section-padding {
    padding: 5rem 1.5rem;
    }

    /* ============ ANIMATIONS ============ */
    @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    }

    @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideRight {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); }
    }

    .animate-float { animation: float 6s ease-in-out infinite; }

    .animate-slide-up {
    animation: slideUp 0.8s ease-out forwards;
    opacity: 0;
    }

    .animate-slide-left {
    animation: slideLeft 0.8s ease-out forwards;
    opacity: 0;
    }

    .animate-slide-right {
    animation: slideRight 0.8s ease-out forwards;
    opacity: 0;
    }

    .hidden-before-animate { opacity: 0; }

    /* ============ NAVBAR ============ */
    .navbar-brand .logo {
    height: 80px;
    width: auto;
    }

    .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 50;
    transition: all 0.5s ease;
    padding: 1.5rem 0;
    }

    .navbar.scrolled {
    background: hsla(220, 45%, 22%, 0.95);
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    padding: 0.75rem 0;
    }

    .navbar-inner {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    }

    .navbar-brand {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: hsl(40, 30%, 95%);
    letter-spacing: 0.05em;
    }

    .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
    }

    .nav-links a {
    font-family: 'Raleway', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: hsla(40, 30%, 95%, 0.8);
    transition: color 0.3s;
    position: relative;
    }

    .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: hsl(40, 60%, 50%);
    transition: width 0.3s;
    }

    .nav-links a:hover { color: hsl(40, 60%, 50%); }
    .nav-links a:hover::after { width: 100%; }

    .mobile-toggle {
    display: none;
    background: none;
    border: none;
    color: hsl(40, 30%, 95%);
    cursor: pointer;
    font-size: 1.75rem;
    }

    .mobile-menu {
    display: none;
    background: hsla(220, 45%, 22%, 0.95);
    backdrop-filter: blur(12px);
    padding: 0.5rem 1.5rem 1.5rem;
    }

    .mobile-menu.open { display: block; }

    .mobile-menu a {
    display: block;
    padding: 0.75rem 0;
    font-family: 'Raleway', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: hsla(40, 30%, 95%, 0.8);
    border-bottom: 1px solid hsla(40, 30%, 95%, 0.1);
    transition: color 0.3s;
    }

    .mobile-menu a:hover { color: hsl(40, 60%, 50%); }

    /* ============ HERO ============ */
    .hero {
    position: relative;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    }

    .hero-bg-wrapper {
    position: absolute;
    inset: -80px 0;
    }

    .hero-bg-wrapper img {
    width: 100%;
    height: 809px;
    object-fit: cover;
    pointer-events: none; /* allows parent click */
    }
    .hero .royal-overlay {
    position: absolute;
    inset: 0;
    }

    .hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 0 1.5rem;
    max-width: 56rem;
    }

    .hero-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    color: hsl(40, 60%, 50%);
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    }

    .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    color: hsl(40, 30%, 95%);
    line-height: 1.1;
    margin-bottom: 1.5rem;
    }

    .hero-desc {
    font-family: 'Raleway', sans-serif;
    font-size: 1.125rem;
    color: hsla(40, 30%, 95%, 0.8);
    max-width: 42rem;
    margin: 0 auto 2.5rem;
    }

    .hero-btn {
    display: inline-block;
    padding: 1rem 2.5rem;
    border: 2px solid hsl(40, 60%, 50%);
    color: hsl(40, 60%, 50%);
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-size: 0.875rem;
    transition: all 0.5s;
    border-radius: 2px;
    }

    .hero-btn:hover {
    background: hsl(40, 60%, 50%);
    color: hsl(220, 45%, 22%);
    }

    .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: hsl(40, 60%, 50%);
    z-index: 10;
    }

    .scroll-indicator i { font-size: 2rem; }
</style>