<template>
    <section class="about" id="about">
        <div class="container about-content">
            <div class="about-image fade-in-left">
                <div class="ss_editable" 
                    :class="{ selected: selectedField === 'about-image1' }"
                    @click.stop="selectField('about-image1', 'image','about_section', componentId)"
                    @mouseover="hoveredField='about-image1'" 
                    @mouseleave="hoveredField=null"
                >
                    <span v-if="hoveredField==='about-image1'" class="edit-label">Image</span>
                    <img :src="editableContent['about-image1']" alt="about-image">
                </div>
                <div class="experience-badge">
                    <span class="badge-number ss_editable"
                        :class="{ selected: selectedField==='about-text1' }"
                        @click.stop="selectField('about-text1')"
                        @mouseover="hoveredField='about-text1'"
                        @mouseleave="hoveredField=null">
                        <span v-if="hoveredField==='about-text1'" class="edit-label">Text</span>
                        <span v-if="selectedField==='about-text1'">
                            <input v-model="editableContent['about-text1']" @blur="blurAndUpdate('about-text1', null, null, null, componentId)"/>
                        </span>
                        <span v-else>{{ editableContent['about-text1'] }}</span>
                    </span>
                    <span class="badge-text ss_editable"
                        :class="{ selected: selectedField==='about-text2' }"
                        @click.stop="selectField('about-text2')"
                        @mouseover="hoveredField='about-text2'"
                        @mouseleave="hoveredField=null">
                        <span v-if="hoveredField==='about-text2'" class="edit-label">Text</span>
                        <span v-if="selectedField==='about-text2'">
                            <input v-model="editableContent['about-text2']" @blur="blurAndUpdate('about-text2', null, null, null, componentId)"/>
                        </span>
                        <span v-else>{{ editableContent['about-text2'] }}</span>
                    </span>
                </div>
            </div>
      
            <div class="about-text fade-in-right">
                <span class="section-label ss_editable"
                    :class="{ selected: selectedField==='about-text3' }"
                    @click.stop="selectField('about-text3')"
                    @mouseover="hoveredField='about-text3'"
                    @mouseleave="hoveredField=null">
                    <span v-if="hoveredField==='about-text3'" class="edit-label">Text</span>
                    <span v-if="selectedField==='about-text3'">
                        <input v-model="editableContent['about-text3']" @blur="blurAndUpdate('about-text3', null, null, null, componentId)"/>
                    </span>
                    <span v-else>{{ editableContent['about-text3'] }}</span>
                </span>
                <h2 class="section-title ss_editable"
                    :class="{ selected: selectedField==='about-text4' }"
                    @click.stop="selectField('about-text4')"
                    @mouseover="hoveredField='about-text4'"
                    @mouseleave="hoveredField=null">
                    <span v-if="hoveredField==='about-text4'" class="edit-label">Text</span>
                    <span v-if="selectedField==='about-text4'">
                        <input v-model="editableContent['about-text4']" @blur="blurAndUpdate('about-text4', null, null, null, componentId)"/>
                    </span>
                    <span v-else>{{ editableContent['about-text4'] }}</span>
                </h2>
                <p class="about-description ss_editable"
                    :class="{ selected: selectedField==='about-description1' }"
                    @click.stop="selectField('about-description1')"
                    @mouseover="hoveredField='about-description1'"
                    @mouseleave="hoveredField=null">
                    <span v-if="hoveredField==='about-description1'" class="edit-label">Text</span>
                    <span v-if="selectedField==='about-description1'">
                        <textarea v-model="editableContent['about-description1']" @blur="blurAndUpdate('about-description1', null, null, null, componentId)"/>
                    </span>
                    <span v-else>{{ editableContent['about-description1'] }}</span>
                </p>
                <p class="about-description-secondary ss_editable"
                    :class="{ selected: selectedField==='about-description2' }"
                    @click.stop="selectField('about-description2')"
                    @mouseover="hoveredField='about-description2'"
                    @mouseleave="hoveredField=null">
                    <span v-if="hoveredField==='about-description2'" class="edit-label">Text</span>
                    <span v-if="selectedField==='about-description2'">
                        <textarea v-model="editableContent['about-description2']" @blur="blurAndUpdate('about-description2', null, null, null, componentId)"/>
                    </span>
                    <span v-else>{{ editableContent['about-description2'] }}</span>
                </p>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </div>
                        <span class="stat-value ss_editable"
                            :class="{ selected: selectedField==='about-text5' }"
                            @click.stop="selectField('about-text5')"
                            @mouseover="hoveredField='about-text5'"
                            @mouseleave="hoveredField=null"
                        >
                            <span v-if="hoveredField==='about-text5'" class="edit-label">Text</span>
                            <span v-if="selectedField==='about-text5'">
                                <input v-model="editableContent['about-text5']" @blur="blurAndUpdate('about-text5', null, null, null, componentId)"/>
                            </span>
                            <span v-else>{{ editableContent['about-text5'] }}</span>
                        </span>
                        <span class="stat-label ss_editable"
                            :class="{ selected: selectedField==='about-text6' }"
                            @click.stop="selectField('about-text6')"
                            @mouseover="hoveredField='about-text6'"
                            @mouseleave="hoveredField=null"
                        >
                            <span v-if="hoveredField==='about-text6'" class="edit-label">Text</span>
                            <span v-if="selectedField==='about-text6'">
                                <input v-model="editableContent['about-text6']" @blur="blurAndUpdate('about-text6', null, null, null, componentId)"/>
                            </span>
                            <span v-else>{{ editableContent['about-text6'] }}</span>
                        </span>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        </div>
                        <span class="stat-value ss_editable"
                            :class="{ selected: selectedField==='about-text7' }"
                            @click.stop="selectField('about-text7')"
                            @mouseover="hoveredField='about-text7'"
                            @mouseleave="hoveredField=null"
                        >
                            <span v-if="hoveredField==='about-text7'" class="edit-label">Text</span>
                            <span v-if="selectedField==='about-text7'">
                                <input v-model="editableContent['about-text7']" @blur="blurAndUpdate('about-text7', null, null, null, componentId)"/>
                            </span>
                            <span v-else>{{ editableContent['about-text7'] }}</span>
                        </span>
                        <span class="stat-label ss_editable"
                            :class="{ selected: selectedField==='about-text8' }"
                            @click.stop="selectField('about-text8')"
                            @mouseover="hoveredField='about-text8'"
                            @mouseleave="hoveredField=null"
                        >
                            <span v-if="hoveredField==='about-text8'" class="edit-label">Text</span>
                            <span v-if="selectedField==='about-text8'">
                                <input v-model="editableContent['about-text8']" @blur="blurAndUpdate('about-text8', null, null, null, componentId)"/>
                            </span>
                            <span v-else>{{ editableContent['about-text8'] }}</span>
                        </span>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                        </div>
                        <span class="stat-value ss_editable"
                            :class="{ selected: selectedField==='about-text9' }"
                            @click.stop="selectField('about-text9')"
                            @mouseover="hoveredField='about-text9'"
                            @mouseleave="hoveredField=null"
                        >
                            <span v-if="hoveredField==='about-text9'" class="edit-label">Text</span>
                            <span v-if="selectedField==='about-text9'">
                                <input v-model="editableContent['about-text9']" @blur="blurAndUpdate('about-text9', null, null, null, componentId)"/>
                            </span>
                            <span v-else>{{ editableContent['about-text9'] }}</span>
                        </span>
                        <span class="stat-label ss_editable"
                            :class="{ selected: selectedField==='about-text10' }"
                            @click.stop="selectField('about-text10')"
                            @mouseover="hoveredField='about-text10'"
                            @mouseleave="hoveredField=null"
                        >
                            <span v-if="hoveredField==='about-text10'" class="edit-label">Text</span>
                            <span v-if="selectedField==='about-text10'">
                                <input v-model="editableContent['about-text10']" @blur="blurAndUpdate('about-text10', null, null, null, componentId)"/>
                            </span>
                            <span v-else>{{ editableContent['about-text10'] }}</span>
                        </span>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
                        </div>
                        <span class="stat-value ss_editable"
                            :class="{ selected: selectedField==='about-text11' }"
                            @click.stop="selectField('about-text11')"
                            @mouseover="hoveredField='about-text11'"
                            @mouseleave="hoveredField=null"
                        >
                            <span v-if="hoveredField==='about-text11'" class="edit-label">Text</span>
                            <span v-if="selectedField==='about-text11'">
                                <input v-model="editableContent['about-text11']" @blur="blurAndUpdate('about-text11', null, null, null, componentId)"/>
                            </span>
                            <span v-else>{{ editableContent['about-text11'] }}</span>
                        </span>
                        <span class="stat-label ss_editable"
                            :class="{ selected: selectedField==='about-text12' }"
                            @click.stop="selectField('about-text12')"
                            @mouseover="hoveredField='about-text12'"
                            @mouseleave="hoveredField=null"
                        >
                            <span v-if="hoveredField==='about-text12'" class="edit-label">Text</span>
                            <span v-if="selectedField==='about-text12'">
                                <input v-model="editableContent['about-text12']" @blur="blurAndUpdate('about-text12', null, null, null, componentId)"/>
                            </span>
                            <span v-else>{{ editableContent['about-text12'] }}</span>
                        </span>
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
        'about-image1': 'https://via.placeholder.com/400x400',
        'about-text1': '10+',
        'about-text2': 'Years Experience',
        'about-text3': 'About Us',
        'about-text4': 'Leading Healthcare Solutions',
        'about-description1': 'We are committed to providing top-notch healthcare services with a focus on patient well-being and innovation.',
        'about-description2': 'Our team of experts works tirelessly to ensure that every patient receives personalized care and attention.',
        'about-text5': '500+',
        'about-text6': 'Happy Patients',
        'about-text7': '150+',
        'about-text8': 'Qualified Doctors',
        'about-text9': '300+',
        'about-text10': 'Successful Treatments',
        'about-text11': '50+',
        'about-text12': 'Medical Staff',
    }),
  },
});

const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_HEALTH_ABOUT4_97';

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

/* ===== CSS Variables (Design System) ===== */
:root {
  --primary: hsl(174, 62%, 40%);
  --primary-foreground: hsl(0, 0%, 100%);
  --primary-hover: hsl(174, 62%, 35%);
  
  --background: hsl(180, 20%, 99%);
  --foreground: hsl(200, 25%, 15%);
  
  --card: hsl(0, 0%, 100%);
  --card-foreground: hsl(200, 25%, 15%);
  
  --secondary: hsl(180, 30%, 96%);
  --secondary-foreground: hsl(200, 25%, 25%);
  
  --muted: hsl(180, 15%, 94%);
  --muted-foreground: hsl(200, 10%, 45%);
  
  --accent: hsl(174, 50%, 92%);
  --accent-foreground: hsl(174, 62%, 30%);
  
  --border: hsl(180, 20%, 90%);
  
  --radius: 0.75rem;
  --shadow: 0 4px 20px hsla(200, 25%, 15%, 0.08);
  --shadow-hover: 0 8px 30px hsla(174, 62%, 40%, 0.15);
  
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Playfair Display', Georgia, serif;
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
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

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
  color: hsl(0, 0%, 100%);
  padding: 1rem 2rem;
  font-size: 1rem;
  box-shadow: 0 10px 30px hsla(174, 62%, 40%, 0.3);
}

.btn-hero:hover {
  background-color: hsl(174, 62%, 35%);
  transform: scale(1.05);
  box-shadow: 0 15px 40px hsla(174, 62%, 40%, 0.4);
}

.btn-hero-outline {
  background-color: transparent;
  color: hsl(0, 0%, 100%);
  padding: 1rem 2rem;
  font-size: 1rem;
  border: 2px solid hsla(0, 0%, 100%, 0.5);
}

.btn-hero-outline:hover {
  background-color: hsl(0, 0%, 100%);
  color:hsl(200, 25%, 15%);
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

.about-image {
  position: relative;
}

.about-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 8px 30px hsla(174, 62%, 40%, 0.15);
}

.experience-badge {
  position: absolute;
  bottom: -1.5rem;
  right: -1.5rem;
  background-color: hsl(0, 0%, 100%);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 8px 30px hsla(174, 62%, 40%, 0.15);
  text-align: center;
}

@media (max-width: 1023px) {
  .experience-badge {
    right: 1rem;
    bottom: -1rem;
  }
}

.badge-number {
  display: block;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: hsl(174, 62%, 40%);
}

.badge-text {
  color: hsl(200, 10%, 45%);
  font-size: 0.875rem;
}

.section-label {
  display: inline-block;
  color: hsl(174, 62%, 40%);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
}

.section-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2rem;
  font-weight: 700;
  color:hsl(200, 25%, 15%);
  margin-top: 0.75rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .section-title {
    font-size: 3rem;
  }
}

.about-description {
  color: hsl(200, 10%, 45%);
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.about-description-secondary {
  color: hsl(200, 10%, 45%);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-item {
  text-align: center;
}

.stat-icon {
  width: 48px;
  height: 48px;
  background-color: hsl(174, 50%, 92%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.75rem;
  color: hsl(174, 62%, 40%);
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color:hsl(200, 25%, 15%);
}

.stat-label {
  font-size: 0.875rem;
  color: hsl(200, 10%, 45%);
}
</style>