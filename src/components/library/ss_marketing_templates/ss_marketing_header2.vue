<template>
    <section class="hero">
        <div class="hero__bg">
            <div
                class="hero__bg ss_editable"
                :class="{ selected: selectedField === 'header-image1' }"
                @click.stop="selectField('header-image1', 'image', 'header', componentId)" 
                @mouseover="hoveredField = 'header-image1'"
                @mouseleave="hoveredField = null"
            >
                <span v-if="hoveredField === 'header-image1'" class="edit-label">Image</span>

                <img
                    :src="editableContent['header-image1'] || '/images/hero.png'"
                    alt="Luxury penthouse office with burgundy interior"
                    class="img1"
                />
            </div>
        </div>

        <nav class="hero__nav">
            <div class="hero__nav-logo">
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
            </div>
            <ul
                class="hero__nav-links ss_editable"
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
        </nav>

        <div class="hero__content">
            <div
                class="fade-up ss_editable"
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
                <span v-else class="hero__badge">{{ editableContent['header-text1'] }}</span>
            </div>

            <h1 class="fade-up">
                <span
                    class="ss_editable"
                    :class="{ selected: selectedField === 'header-text2' }"
                    @click.stop="selectField('header-text2')"
                    @mouseover="hoveredField = 'header-text2'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'header-text2'" class="edit-label">Text</span>
                    <textarea
                        v-if="selectedField === 'header-text2'"
                        v-model="editableContent['header-text2']"
                        @blur="blurAndUpdate('header-text2', null, 'header', null, componentId)"
                    ></textarea>
                    <span v-else class="hero_main1">{{ editableContent['header-text2'] }}</span>
                </span><br />
                <em class="crimson-text">
                    <span
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
                        <span v-else class="hero_main2">{{ editableContent['header-text3'] }}</span>
                    </span>
                </em><br />
                <span
                    class="ss_editable"
                    :class="{ selected: selectedField === 'header-text4' }"
                    @click.stop="selectField('header-text4')"
                    @mouseover="hoveredField = 'header-text4'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'header-text4'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'header-text4'"
                        v-model="editableContent['header-text4']"
                        @blur="blurAndUpdate('header-text4', null, 'header', null, componentId)"
                    />
                    <span v-else class="hero_main3">{{ editableContent['header-text4'] }}</span>
                </span>
            </h1>
            
            <p
                class="hero__desc fade-up ss_editable"
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

            <div class="hero__buttons fade-up">
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
                        class="btn-royal filled"
                        @click.stop="selectField('header-button1', 'button', 'header', componentId)"
                    >
                        {{ editableContent['header-button1'] }}
                    </button>
                </div>

                <div
                    class="ss_editable"
                    :class="{ selected: selectedField === 'header-button2' }"
                    @mouseover="hoveredField = 'header-button2'"
                    @mouseleave="hoveredField = null"
                    v-if="editableContent['header-button2']"
                >
                    <span v-if="hoveredField === 'header-button2'" class="edit-label">Button</span>

                    <!-- Button that opens the sidebar -->
                    <button
                        class="btn-royal outline"
                        @click.stop="selectField('header-button2', 'button', 'header', componentId)"
                    >
                        {{ editableContent['header-button2'] }}
                    </button>
                </div>
            </div>

            <div class="hero__stats fade-up">
                <div>
                    <div
                        class="stat-number crimson-text ss_editable"
                        :class="{ selected: selectedField === 'header-stat1' }"
                        @click.stop="selectField('header-stat1')"
                        @mouseover="hoveredField = 'header-stat1'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'header-stat1'" class="edit-label">Text</span>
                        <textarea
                            v-if="selectedField === 'header-stat1'"
                            v-model="editableContent['header-stat1']"
                            @blur="blurAndUpdate('header-stat1', null, 'header', null, componentId)"
                        ></textarea>
                        <span v-else>{{ editableContent['header-stat1'] }}</span>
                    </div>
                    <div
                        class="stat-label ss_editable"
                        :class="{ selected: selectedField === 'header-label1' }"
                        @click.stop="selectField('header-label1')"
                        @mouseover="hoveredField = 'header-label1'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'header-label1'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'header-label1'"
                            v-model="editableContent['header-label1']"
                            @blur="blurAndUpdate('header-label1', null, 'header', null, componentId)"
                        />
                        <span v-else>{{ editableContent['header-label1'] }}</span>
                    </div>
                </div>
                <div>
                    <div
                        class="stat-number crimson-text ss_editable"
                        :class="{ selected: selectedField === 'header-stat2' }"
                        @click.stop="selectField('header-stat2')"
                        @mouseover="hoveredField = 'header-stat2'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'header-stat2'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'header-stat2'"
                            v-model="editableContent['header-stat2']"
                            @blur="blurAndUpdate('header-stat2', null, 'header', null, componentId)"
                        />
                        <span v-else>{{ editableContent['header-stat2'] }}</span>
                    </div>
                    <div
                        class="stat-label ss_editable"
                        :class="{ selected: selectedField === 'header-label2' }"
                        @click.stop="selectField('header-label2')"
                        @mouseover="hoveredField = 'header-label2'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'header-label2'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'header-label2'"
                            v-model="editableContent['header-label2']"
                            @blur="blurAndUpdate('header-label2', null, 'header', null, componentId)"
                        />
                        <span v-else>{{ editableContent['header-label2'] }}</span>
                    </div>
                </div>
                <div>
                    <div
                        class="stat-number crimson-text ss_editable"
                        :class="{ selected: selectedField === 'header-stat3' }"
                        @click.stop="selectField('header-stat3')"
                        @mouseover="hoveredField = 'header-stat3'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'header-stat3'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'header-stat3'"
                            v-model="editableContent['header-stat3']"
                            @blur="blurAndUpdate('header-stat3', null, 'header', null, componentId)"
                        />
                        <span v-else>{{ editableContent['header-stat3'] }}</span>
                    </div>
                    <div
                        class="stat-label ss_editable"
                        :class="{ selected: selectedField === 'header-label3' }"
                        @click.stop="selectField('header-label3')"
                        @mouseover="hoveredField = 'header-label3'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'header-label3'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'header-label3'"
                            v-model="editableContent['header-label3']"
                            @blur="blurAndUpdate('header-label3', null, 'header', null, componentId)"
                        />
                        <span v-else>{{ editableContent['header-label3'] }}</span>
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
        'header-image1': "/images/hero.png",
        logo: "/images/logo.png",
        menu: ["Home", "About", "Services", "Contact"],
        'header-text1': "Your Header Text 1",
        'header-text2': "Your Header Text 2",
        'header-text3': "Your Header Text 3",
        'header-text4': "Your Header Text 4",
        'header-description1': "Your description goes here.",
        'header-button1': "Click Here",
        'header-stat1': "Your Header Stat 1",
        'header-label1': "Your Header Label 1",
        'header-stat2': "Your Header Stat 2",
        'header-label2': "Your Header Label 2",
        'header-stat3': "Your Header Stat 3",
        'header-label3': "Your Header Label 3",
    }),
  },
});

// parent listens to "field-updated"
const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_MARKETING_HEADER2_105';

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

h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', Georgia, serif; }

a { color: inherit; text-decoration: none; }

.section-padding { padding: 5rem 6rem; }
@media (max-width: 768px) { .section-padding { padding: 3rem 1.5rem; } }

.crimson-gradient { background: linear-gradient(135deg, #b42d5a, #d44a76); }

.crimson-text {
    /* background: linear-gradient(135deg, #b42d5a, #d44a76) !important; */
    /* -webkit-background-clip: text; */
    /* -webkit-text-fill-color: transparent; */
    background-clip: text;
    color: #b42d5a
}

.silver-text {
  background: linear-gradient(135deg, #b8b8b8, #d9d9d9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass-card {
  background: rgba(17, 10, 13, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(180, 45, 90, 0.15);
  border-radius: 1rem;
}

.btn-royal {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-royal.filled {
  background: linear-gradient(135deg, #b42d5a, #d44a76);
  color: #f2e8ec;
  box-shadow: 0 10px 25px -5px rgba(180, 45, 90, 0.3);
}
.btn-royal.filled:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 35px -5px rgba(180, 45, 90, 0.45);
}

.btn-royal.outline {
  background: transparent;
  color: #b42d5a;
  border: 2px solid #b42d5a;
}
.btn-royal.outline:hover {
  background: #b42d5a;
  color: #f2e8ec;
}

.btn-royal.dark {
  background: #110a0d;
  color: #ebe4e7;
}
.btn-royal.dark:hover { background: rgba(17, 10, 13, 0.9); }

/* =================== HERO =================== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__bg { position: absolute; inset: 0; z-index: 0; }
.hero__bg img { width: 100%; height: 100%; object-fit: cover; }
.hero__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #110a0d, rgba(17,10,13,0.8), transparent);
}
.hero__bg::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to top, #110a0d, transparent, rgba(17,10,13,0.4));
}

.hero__bg::before,
.hero__bg::after {
  pointer-events: none;
}

.hero__nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 6rem;
}
@media (max-width: 768px) { .hero__nav { padding: 1.5rem; } }

.hero__nav-logo { font-family: 'Playfair Display', Georgia, serif; font-size: 1.5rem; font-weight: 700; }

.hero__nav-links { display: flex; gap: 2rem; font-size: 0.875rem; letter-spacing: 0.1em; text-transform: uppercase; 
  color: #fff; 
  list-style: none;
}
.hero__nav-links a:hover { color: #b42d5a; }
@media (max-width: 768px) { .hero__nav-links { display: none; } }

.hero__content {
  position: relative;
  z-index: 10;
  padding: 5rem 6rem;
  max-width: 48rem;
}
@media (max-width: 768px) { .hero__content { padding: 1rem 1.5rem 3rem; } }

.hero__badge {
  margin-top: 2rem;
  display: inline-block;
  color: #b42d5a;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  border: 1px solid rgba(180, 45, 90, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
}

.hero h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 0.95;
  margin-bottom: 2rem;
}
.hero h1 em { font-style: italic; }

.hero__desc {
  font-size: 1.125rem;
  color: #87707a;
  max-width: 32rem;
  margin-bottom: 2.5rem;
  line-height: 1.7;
}

.hero__buttons { display: flex; flex-wrap: wrap; gap: 1rem; }

.hero__stats {
  display: flex;
  gap: 3rem;
  margin-top: 1rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(42, 28, 33, 0.5);
}
.hero__stats .stat-number {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.875rem;
  font-weight: 700;
}
.hero__stats .stat-label {
  font-size: 0.75rem;
  color: #fff;
  /* color: #87707a; */
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 0.25rem;
}
.navbar-brand .logo {
  height: 80px;
  width: auto;
}

/* Arrow icon inline */
.arrow-icon { display: inline-block; width: 1rem; height: 1rem; vertical-align: middle; transition: transform 0.3s; }
.btn-royal:hover .arrow-icon { transform: translateX(4px); }

/* Animations */
.fade-up {
  opacity: 1;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-up.visible { opacity: 1; transform: translateY(0); }

.fade-left {
  opacity: 1;
  transform: translateX(-40px);
  transition: opacity 0.9s ease, transform 0.9s ease;
}
.fade-left.visible { opacity: 1; transform: translateX(0); }

.fade-right {
  opacity: 1;
  transform: translateX(40px);
  transition: opacity 0.9s ease, transform 0.9s ease;
}
.fade-right.visible { opacity: 1; transform: translateX(0); }

span.hero_main1 {
    color: #fff;
}

span.hero_main3 {
    color: #fff;
}
</style>