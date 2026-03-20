<template>
    <section id="about" class="about">
        <div class="about__image fade-left">
            <div class="about-image ss_editable" 
                :class="{ selected: selectedField === 'about-image1' }"
                @click.stop="selectField('about-image1', 'image','about_section', componentId)"
                @mouseover="hoveredField='about-image1'" 
                @mouseleave="hoveredField=null"
            >
                <span v-if="hoveredField==='about-image1'" class="edit-label">Image</span>
                <img :src="editableContent['about-image1']" alt="Marketing team in luxury boardroom">
            </div>
            <div class="about__float glass-card">
                <div
                    class="num crimson-text ss_editable"
                    :class="{ selected: selectedField === 'about-text1' }"
                    @click.stop="selectField('about-text1')"
                    @mouseover="hoveredField = 'about-text1'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'about-text1'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'about-text1'"
                        v-model="editableContent['about-text1']"
                        @blur="blurAndUpdate('about-text1', null, 'about_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['about-text1'] }}</span>
                </div>
                <div
                    class="lbl ss_editable"
                    :class="{ selected: selectedField === 'about-text2' }"
                    @click.stop="selectField('about-text2')"
                    @mouseover="hoveredField = 'about-text2'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'about-text2'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'about-text2'"
                        v-model="editableContent['about-text2']"
                        @blur="blurAndUpdate('about-text2', null, 'about_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['about-text2'] }}</span>
                </div>
            </div>
        </div>

        <div class="about__content section-padding">
            <span
                class="about__label fade-up ss_editable"
                :class="{ selected: selectedField === 'about-text3' }"
                @click.stop="selectField('about-text3')"
                @mouseover="hoveredField = 'about-text3'"
                @mouseleave="hoveredField = null"
            >
                <span v-if="hoveredField === 'about-text3'" class="edit-label">Text</span>
                <input
                    v-if="selectedField === 'about-text3'"
                    v-model="editableContent['about-text3']"
                    @blur="blurAndUpdate('about-text3', null, 'about_section', null, componentId)"
                />
                <span v-else>{{ editableContent['about-text3'] }}</span>
            </span>
            <h2 class="fade-up">
                <span
                    class="ss_editable"
                    :class="{ selected: selectedField === 'about-text4' }"
                    @click.stop="selectField('about-text4')"
                    @mouseover="hoveredField = 'about-text4'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'about-text4'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'about-text4'"
                        v-model="editableContent['about-text4']"
                        @blur="blurAndUpdate('about-text4', null, 'about_section', null, componentId)"
                    />
                    <span v-else class="about-main1">{{ editableContent['about-text4'] }}</span>
                </span>
                <em class="crimson-text">
                    <span
                        class="ss_editable"
                        :class="{ selected: selectedField === 'about-text5' }"
                        @click.stop="selectField('about-text5')"
                        @mouseover="hoveredField = 'about-text5'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'about-text5'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'about-text5'"
                            v-model="editableContent['about-text5']"
                            @blur="blurAndUpdate('about-text5', null, 'about_section', null, componentId)"
                        />
                        <span v-else>{{ editableContent['about-text5'] }}</span>
                    </span>
                </em>
            </h2>
            <p
                class="about__desc fade-up ss_editable"
                :class="{ selected: selectedField === 'about-description1' }"
                @click.stop="selectField('about-description1')"
                @mouseover="hoveredField = 'about-description1'"
                @mouseleave="hoveredField = null"
            >
                <span v-if="hoveredField === 'about-description1'" class="edit-label">Text</span>
                <textarea
                    v-if="selectedField === 'about-description1'"
                    v-model="editableContent['about-description1']"
                    @blur="blurAndUpdate('about-description1', null, 'about_section', null, componentId)"
                ></textarea>
                <span v-else>{{ editableContent['about-description1'] }}</span>
            </p>

            <div class="about__cards">
                <div class="about__card glass-card fade-up stagger">
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'about-image2' }"
                        @click.stop="selectField('about-image2', 'image', 'about_section', componentId)" 
                        @mouseover="hoveredField = 'about-image2'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'about-image2'" class="edit-label">Image</span>
                        <img
                            :src="editableContent[selectedField === 'about-image2' ? 'about-image2' : 'about-image2'] || '/images/hero.png'"
                            alt="Brand Strategy"
                        />
                    </div>
                    <div>
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'about-text6' }"
                            @click.stop="selectField('about-text6')"
                            @mouseover="hoveredField = 'about-text6'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-text6'" class="edit-label">Text</span>
                            <input
                                v-if="selectedField === 'about-text6'"
                                v-model="editableContent['about-text6']"
                                @blur="blurAndUpdate('about-text6', null, 'about_section', null, componentId)"
                            />
                            <h3 v-else>{{ editableContent['about-text6'] }}</h3>
                        </div>
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'about-description2' }"
                            @click.stop="selectField('about-description2')"
                            @mouseover="hoveredField = 'about-description2'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-description2'" class="edit-label">Text</span>
                            <textarea
                                v-if="selectedField === 'about-description2'"
                                v-model="editableContent['about-description2']"
                                @blur="blurAndUpdate('about-description2', null, 'about_section', null, componentId)"
                            ></textarea>
                            <p v-else>{{ editableContent['about-description2'] }}</p>
                        </div>
                    </div>
                </div>
                <div class="about__card glass-card fade-up stagger">
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'about-image3' }"
                        @click.stop="selectField('about-image3', 'image', 'about_section', componentId)" 
                        @mouseover="hoveredField = 'about-image3'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'about-image3'" class="edit-label">Image</span>
                        <img
                            :src="editableContent[selectedField === 'about-image3' ? 'about-image3' : 'about-image3'] || '/images/hero.png'"
                            alt="Precision Design"
                        />
                    </div>
                    <div>
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'about-text7' }"
                            @click.stop="selectField('about-text7')"
                            @mouseover="hoveredField = 'about-text7'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-text7'" class="edit-label">Text</span>
                            <input
                                v-if="selectedField === 'about-text7'"
                                v-model="editableContent['about-text7']"
                                @blur="blurAndUpdate('about-text7', null, 'about_section', null, componentId)"
                            />
                            <h3 v-else>{{ editableContent['about-text7'] }}</h3>
                        </div>
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'about-description3' }"
                            @click.stop="selectField('about-description3')"
                            @mouseover="hoveredField = 'about-description3'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-description3'" class="edit-label">Text</span>
                            <textarea
                                v-if="selectedField === 'about-description3'"
                                v-model="editableContent['about-description3']"
                                @blur="blurAndUpdate('about-description3', null, 'about_section', null, componentId)"
                            ></textarea>
                            <p v-else>{{ editableContent['about-description3'] }}</p>
                        </div>
                    </div>
                </div>
                <div class="about__card glass-card fade-up stagger">
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'about-image4' }"
                        @click.stop="selectField('about-image4', 'image', 'about_section', componentId)" 
                        @mouseover="hoveredField = 'about-image4'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'about-image4'" class="edit-label">Image</span>
                        <img
                            :src="editableContent[selectedField === 'about-image4' ? 'about-image4' : 'about-image4'] || '/images/hero.png'"
                            alt="Premium Analytics"
                        />
                    </div>
                    <div>
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'about-text8' }"
                            @click.stop="selectField('about-text8')"
                            @mouseover="hoveredField = 'about-text8'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-text8'" class="edit-label">Text</span>
                            <input
                                v-if="selectedField === 'about-text8'"
                                v-model="editableContent['about-text8']"
                                @blur="blurAndUpdate('about-text8', null, 'about_section', null, componentId)"
                            />
                            <h3 v-else>{{ editableContent['about-text8'] }}</h3>
                        </div>
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'about-description4' }"
                            @click.stop="selectField('about-description4')"
                            @mouseover="hoveredField = 'about-description4'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-description4'" class="edit-label">Text</span>
                            <textarea
                                v-if="selectedField === 'about-description4'"
                                v-model="editableContent['about-description4']"
                                @blur="blurAndUpdate('about-description4', null, 'about_section', null, componentId)"
                            ></textarea>
                            <p v-else>{{ editableContent['about-description4'] }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="fade-up">
                <div
                    class="ss_editable"
                    :class="{ selected: selectedField === 'about-button1' }"
                    @mouseover="hoveredField = 'about-button1'"
                    @mouseleave="hoveredField = null"
                    v-if="editableContent['about-button1']"
                >
                    <span v-if="hoveredField === 'about-button1'" class="edit-label">Button</span>

                    <!-- Button that opens the sidebar -->
                    <button
                        class="btn-royal filled"
                        @click.stop="selectField('about-button1', 'button', 'about_section', componentId)"
                    >
                        {{ editableContent['about-button1'] }}
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
        "about-text1": "Enter about text1",
        "about-text2": "Enter about text2",
        "about-text3": "Enter about text3",
        "about-text4": "Enter about text4",
        "about-text5": "Enter about text5",
        "about-description1": "Enter about description1",
        "about-image2": "",
        "about-text6": "Enter about text6",
        "about-description2": "Enter about description2",
        "about-image3": "",
        "about-text7": "Enter about text7",
        "about-description3": "Enter about description3",
        "about-image4": "",
        "about-text8": "Enter about text8",
        "about-description4": "Enter about description4",
        "about-button1": "Contact Us"
    }),
  },
});

const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_MARKETING_ABOUT2_106';

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

.about__image .ss_editable {
  position: relative;
  z-index: 2;
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

.about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}
@media (max-width: 1024px) {
  .about { grid-template-columns: 1fr; }
}

.about__image {
  position: relative;
  min-height: 50vh;
}
.about__image img { width: 100%; height: 100%; object-fit: cover; }
.about__image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent, #110a0d);
  pointer-events: none;
}
@media (max-width: 1024px) {
  .about__image::after { background: linear-gradient(to bottom, transparent, #110a0d); }
}

.about__float {
  position: absolute;
  bottom: 2.5rem;
  left: 2.5rem;
  z-index: 5;
  padding: 1.5rem;
  text-align: center;
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.about__float .num { font-family: 'Playfair Display', Georgia, serif; font-size: 2.25rem; font-weight: 700; }
.about__float .lbl { font-size: 0.75rem; color: #87707a; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.25rem; }

.about__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #110a0d;
}

.about__label {
  color: #b42d5a;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.about h2 {
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}
.about h2 em { font-style: italic; }

.about__desc {
  color: #87707a;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 32rem;
}

.about__cards { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }

.about__card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  transition: border-color 0.3s;
}
.about__card:hover { border-color: rgba(180, 45, 90, 0.4); }
.about__card img { width: 4rem; height: 4rem; border-radius: 0.5rem; object-fit: cover; flex-shrink: 0; }
.about__card h3 { font-family: 'Playfair Display', Georgia, serif; font-size: 1.125rem; font-weight: 600; margin-bottom: 0.25rem; color: #fff; }
.about__card p { font-size: 0.875rem; color: #87707a; }

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
  /* transform: translateX(-40px); */
  transition: opacity 0.9s ease, transform 0.9s ease;
}
.fade-left.visible { opacity: 1; transform: translateX(0); }

.fade-right {
  opacity: 1;
  transform: translateX(40px);
  transition: opacity 0.9s ease, transform 0.9s ease;
}
.fade-right.visible { opacity: 1; transform: translateX(0); }

span.about-main1 {
    color: #fff;
}
</style>