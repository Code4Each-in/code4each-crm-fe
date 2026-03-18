<template>
    <section class="about section-padding" id="about">
        <div class="about-grid">
            <!-- Image -->
            <div class="about-image-wrapper hidden-before-animate" data-animate="slideLeft" style="animation-delay: 0.2s;">
                <div
                    class="about-image-inner ss_editable"
                    :class="{ selected: selectedField === 'about-image1' }"
                    @click.stop="selectField('about-image1', 'image', 'about_section', componentId)" 
                    @mouseover="hoveredField = 'about-image1'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'about-image1'" class="edit-label">Image</span>
                    <img
                        :src="editableContent[selectedField === 'about-image1' ? 'about-image1' : 'about-image1'] || '/images/hero.png'"
                        alt="Shopkeeper arranging premium products in a boutique store"
                    />
                </div>
                <div class="about-image-border"></div>
            </div>
            <!-- Content -->
            <div class="hidden-before-animate" data-animate="slideRight" style="animation-delay: 0.4s;">
                <p
                    class="about-label ss_editable"
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
                </p>
                <h2 class="about-title">
                    <span
                        class="ss_editable"
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
                    </span>
                    <span class="gold-text">
                        <span
                            class="ss_editable"
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
                    </span>
                </h2>
                <div class="gold-divider" style="width: 5rem; margin-bottom: 1.5rem;"></div>
                <p
                    class="about-text ss_editable"
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
                <p
                    class="about-text ss_editable"
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
                    <span v-else>{{ editableContent['about-description2'] }}</span>
                </p>
                <div class="stats-grid">
                    <div class="stat-card">
                        <i data-lucide="clock" style="width:28px;height:28px;"></i>
                        <p
                            class="stat-value ss_editable"
                            :class="{ selected: selectedField === 'about-stat1' }"
                            @click.stop="selectField('about-stat1')"
                            @mouseover="hoveredField = 'about-stat1'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-stat1'" class="edit-label">Text</span>
                            <textarea
                                v-if="selectedField === 'about-stat1'"
                                v-model="editableContent['about-stat1']"
                                @blur="blurAndUpdate('about-stat1', null, 'about_section', null, componentId)"
                            ></textarea>
                            <span v-else>{{ editableContent['about-stat1'] }}</span>
                        </p>
                        <p
                            class="stat-label ss_editable"
                            :class="{ selected: selectedField === 'about-label1' }"
                            @click.stop="selectField('about-label1')"
                            @mouseover="hoveredField = 'about-label1'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-label1'" class="edit-label">Text</span>
                            <textarea
                                v-if="selectedField === 'about-label1'"
                                v-model="editableContent['about-label1']"
                                @blur="blurAndUpdate('about-label1', null, 'about_section', null, componentId)"
                            ></textarea>
                            <span v-else>{{ editableContent['about-label1'] }}</span>
                        </p>
                    </div>
                    <div class="stat-card">
                        <i data-lucide="users" style="width:28px;height:28px;"></i>
                        <p
                            class="stat-value ss_editable"
                            :class="{ selected: selectedField === 'about-stat2' }"
                            @click.stop="selectField('about-stat2')"
                            @mouseover="hoveredField = 'about-stat2'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-stat2'" class="edit-label">Text</span>
                            <textarea
                                v-if="selectedField === 'about-stat2'"
                                v-model="editableContent['about-stat2']"
                                @blur="blurAndUpdate('about-stat2', null, 'about_section', null, componentId)"
                            ></textarea>
                            <span v-else>{{ editableContent['about-stat2'] }}</span>
                        </p>
                        <p
                            class="stat-label ss_editable"
                            :class="{ selected: selectedField === 'about-label2' }"
                            @click.stop="selectField('about-label2')"
                            @mouseover="hoveredField = 'about-label2'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-label2'" class="edit-label">Text</span>
                            <textarea
                                v-if="selectedField === 'about-label2'"
                                v-model="editableContent['about-label2']"
                                @blur="blurAndUpdate('about-label2', null, 'about_section', null, componentId)"
                            ></textarea>
                            <span v-else>{{ editableContent['about-label2'] }}</span>
                        </p>
                    </div>
                    <div class="stat-card">
                        <i data-lucide="award" style="width:28px;height:28px;"></i>
                        <p
                            class="stat-value ss_editable"
                            :class="{ selected: selectedField === 'about-stat3' }"
                            @click.stop="selectField('about-stat3')"
                            @mouseover="hoveredField = 'about-stat3'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-stat3'" class="edit-label">Text</span>
                            <textarea
                                v-if="selectedField === 'about-stat3'"
                                v-model="editableContent['about-stat3']"
                                @blur="blurAndUpdate('about-stat3', null, 'about_section', null, componentId)"
                            ></textarea>
                            <span v-else>{{ editableContent['about-stat3'] }}</span>
                        </p>
                        <p
                            class="stat-label ss_editable"
                            :class="{ selected: selectedField === 'about-label3' }"
                            @click.stop="selectField('about-label3')"
                            @mouseover="hoveredField = 'about-label3'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-label3'" class="edit-label">Text</span>
                            <textarea
                                v-if="selectedField === 'about-label3'"
                                v-model="editableContent['about-label3']"
                                @blur="blurAndUpdate('about-label3', null, 'about_section', null, componentId)"
                            ></textarea>
                            <span v-else>{{ editableContent['about-label3'] }}</span>
                        </p>
                    </div>
                    <div class="stat-card">
                        <i data-lucide="heart" style="width:28px;height:28px;"></i>
                        <p
                            class="stat-value ss_editable"
                            :class="{ selected: selectedField === 'about-stat4' }"
                            @click.stop="selectField('about-stat4')"
                            @mouseover="hoveredField = 'about-stat4'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-stat4'" class="edit-label">Text</span>
                            <textarea
                                v-if="selectedField === 'about-stat4'"
                                v-model="editableContent['about-stat4']"
                                @blur="blurAndUpdate('about-stat4', null, 'about_section', null, componentId)"
                            ></textarea>
                            <span v-else>{{ editableContent['about-stat4'] }}</span>
                        </p>
                        <p
                            class="stat-label ss_editable"
                            :class="{ selected: selectedField === 'about-label4' }"
                            @click.stop="selectField('about-label4')"
                            @mouseover="hoveredField = 'about-label4'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'about-label4'" class="edit-label">Text</span>
                            <textarea
                                v-if="selectedField === 'about-label4'"
                                v-model="editableContent['about-label4']"
                                @blur="blurAndUpdate('about-label4', null, 'about_section', null, componentId)"
                            ></textarea>
                            <span v-else>{{ editableContent['about-label4'] }}</span>
                        </p>
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
        "about-text1": "Enter about text1",
        "about-text2": "Enter about text2",
        "about-text3": "Enter about text3",
        "about-description1": "Enter about description1",
        "about-description1": "Enter about description2",
        "about-stat1": "Enter about stat1",
        "about-label1": "Enter about label1",
        "about-stat2": "Enter about stat2",
        "about-label2": "Enter about label2",
        "about-stat3": "Enter about stat3",
        "about-label3": "Enter about label3",
        "about-stat4": "Enter about stat4",
        "about-label4": "Enter about label4",
    }),
  },
});

const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_MARKETING_ABOUT1_102';

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

h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; }

a { text-decoration: none; color: inherit; }
ul { list-style: none; }
img { display: block; max-width: 100%; }

/* ============ UTILITY CLASSES ============ */
.gold-text {
  background: linear-gradient(135deg, hsl(40, 60%, 50%), hsl(40, 70%, 65%), hsl(40, 60%, 50%));
  -webkit-background-clip: text;
  /* -webkit-text-fill-color: transparent; */
  color: hsl(40, 60%, 50%);
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

/* .hidden-before-animate { opacity: 0; } */

/* ============ ABOUT ============ */
.about { background: hsl(40, 20%, 97%); }

.about-grid {
  max-width: 80rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

.about-image-wrapper {
  position: relative;
}

.about-image-inner {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
}

.about-image-inner img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.about-image-inner::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, hsla(220, 45%, 22%, 0.4), transparent);
}

.about-image-border {
  position: absolute;
  bottom: -1rem;
  right: -1rem;
  width: 100%;
  height: 100%;
  border: 2px solid hsl(40, 60%, 50%);
  border-radius: 0.5rem;
  z-index: -1;
}

.about-label {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.125rem;
  color: hsl(40, 60%, 50%);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.about-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: hsl(220, 45%, 22%);
  margin-bottom: 1.5rem;
}

.about-text {
  font-family: 'Raleway', sans-serif;
  color: hsl(220, 15%, 45%);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.about-text:last-of-type { margin-bottom: 2rem; }

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.stat-card {
  text-align: center;
  padding: 1rem;
  border-radius: 0.5rem;
  background: hsl(30, 30%, 92%);
}

.stat-card i, .stat-card svg {
  color: hsl(40, 60%, 50%);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: hsl(220, 45%, 22%);
}

.stat-label {
  font-family: 'Raleway', sans-serif;
  font-size: 0.7rem;
  color: hsl(220, 15%, 45%);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* ============ RESPONSIVE ============ */
@media (min-width: 768px) {
  .section-padding { padding: 5rem 3rem; }
  .about-grid { grid-template-columns: 1fr 1fr; }
  .about-title { font-size: 3rem; }
}

@media (min-width: 1024px) {
  .section-padding { padding: 7rem 6rem; }
}
</style>