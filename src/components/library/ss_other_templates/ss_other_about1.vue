<template>
    <section class="section about" id="about">
        <div class="container">
            <div class="section-title">
                <div
                    class="ss_editable"
                    :class="{ selected: selectedField === 'about-text1' }"
                    @click.stop="selectField('about-text1')"
                    @mouseover="hoveredField = 'about-text1'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'about-text1'" class="edit-label">Heading</span>
                    <input
                        v-if="selectedField === 'about-text1'"
                        v-model="editableContent['about-text1']"
                        @blur="blurAndUpdate('about-text1', null, 'about_section', null, componentId)"
                    />
                    <h2 v-else>{{ editableContent['about-text1'] }}</h2>
                </div>
                <div
                    class="ss_editable"
                    :class="{ selected: selectedField === 'about-text2' }"
                    @click.stop="selectField('about-text2')"
                    @mouseover="hoveredField = 'about-text2'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'about-text2'" class="edit-label">Heading</span>
                    <input
                        v-if="selectedField === 'about-text2'"
                        v-model="editableContent['about-text2']"
                        @blur="blurAndUpdate('about-text2', null, 'about_section', null, componentId)"
                    />
                    <p v-else>{{ editableContent['about-text2'] }}</p>
                </div>
                <div class="accent-line"></div>
            </div>
            <div class="about-grid">
                <div class="about-image ss_editable" 
                    :class="{ selected: selectedField === 'about-image1' }"
                    @click.stop="selectField('about-image1', 'image','about_section', componentId)"
                    @mouseover="hoveredField='about-image1'" 
                    @mouseleave="hoveredField=null"
                >
                    <span v-if="hoveredField==='about-image1'" class="edit-label">Image</span>
                    <img :src="editableContent['about-image1']" alt="About Us" class="img-fluid">
                </div>
                <div class="about-content">
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'about-text3' }"
                        @click.stop="selectField('about-text3')"
                        @mouseover="hoveredField = 'about-text3'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'about-text3'" class="edit-label">Heading</span>
                        <input
                            v-if="selectedField === 'about-text3'"
                            v-model="editableContent['about-text3']"
                            @blur="blurAndUpdate('about-text3', null, 'about_section', null, componentId)"
                        />
                        <h3 v-else>{{ editableContent['about-text3'] }}</h3>
                    </div>
                    <div
                        class="ss_editable"
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
                        />
                        <p v-else>{{ editableContent['about-description1'] }}</p>
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
                        />
                        <p v-else>{{ editableContent['about-description2'] }}</p>
                    </div>
                    <div class="stats">
                        <div class="stat">
                            <div
                                class="stat-number ss_editable"
                                :class="{ selected: selectedField === 'about-text4' }"
                                @click.stop="selectField('about-text4')"
                                @mouseover="hoveredField = 'about-text4'"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'about-text4'" class="edit-label">Heading</span>
                                <input
                                    v-if="selectedField === 'about-text4'"
                                    v-model="editableContent['about-text4']"
                                    @blur="blurAndUpdate('about-text4', null, 'about_section', null, componentId)"
                                />
                                <span v-else>{{ editableContent['about-text4'] }}</span>
                            </div>
                            <div
                                class="stat-label ss_editable"
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
                            </div>
                        </div>
                        <div class="stat">
                            <div
                                class="stat-number ss_editable"
                                :class="{ selected: selectedField === 'about-text6' }"
                                @click.stop="selectField('about-text6')"
                                @mouseover="hoveredField = 'about-text6'"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'about-text6'" class="edit-label">Heading</span>
                                <input
                                    v-if="selectedField === 'about-text6'"
                                    v-model="editableContent['about-text6']"
                                    @blur="blurAndUpdate('about-text6', null, 'about_section', null, componentId)"
                                />
                                <span v-else>{{ editableContent['about-text6'] }}</span>
                            </div>
                            <div
                                class="stat-label ss_editable"
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
                                <span v-else>{{ editableContent['about-text7'] }}</span>
                            </div>
                        </div>
                        <div class="stat">
                            <div
                                class="stat-number ss_editable"
                                :class="{ selected: selectedField === 'about-text8' }"
                                @click.stop="selectField('about-text8')"
                                @mouseover="hoveredField = 'about-text8'"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'about-text8'" class="edit-label">Heading</span>
                                <input
                                    v-if="selectedField === 'about-text8'"
                                    v-model="editableContent['about-text8']"
                                    @blur="blurAndUpdate('about-text8', null, 'about_section', null, componentId)"
                                />
                                <span v-else>{{ editableContent['about-text8'] }}</span>
                            </div>
                            <div
                                class="stat-label ss_editable"
                                :class="{ selected: selectedField === 'about-text9' }"
                                @click.stop="selectField('about-text9')"
                                @mouseover="hoveredField = 'about-text9'"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'about-text9'" class="edit-label">Text</span>
                                <input
                                    v-if="selectedField === 'about-text9'"
                                    v-model="editableContent['about-text9']"
                                    @blur="blurAndUpdate('about-text9', null, 'about_section', null, componentId)"
                                />
                                <span v-else>{{ editableContent['about-text9'] }}</span>
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
        "about-text1": "About Us",
        "about-text2": "We are committed to delivering the best real estate services.",
        "about-image1": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        "about-text3": "Our Mission",
        "about-description1": "To provide exceptional service and to create lasting relationships with our clients.",
        "about-description2": "We strive to exceed expectations and help our clients find their dream properties.",
        "about-text4": "500+",
        "about-text5": "Happy Clients",
        "about-text6": "1200+",
        "about-text7": "Properties Sold",
        "about-text8": "150+",
        "about-text9": "Awards Won",
    }),
  },
});

const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_OTHER_ABOUT_92';

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

.about {
    background: #f5f0e8;
    padding: 30px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.about-image {
  position: relative;
}

.about-image img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.about-image::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  right: 20px;
  bottom: 20px;
  border: 3px solid #d4a853;
  border-radius: 8px;
  z-index: -1;
}

.about-content h3 {
  font-size: 36px;
  color: #1a2744;
  margin-bottom: 20px;
}

.about-content p {
  color: #666;
  /* margin-bottom: 30px; */
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.stat {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.stat-number {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 700;
  color: #d4a853;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.section-title h2
 {
    font-size: 42px;
    color: #1a2744;
    /* margin-bottom: 15px; */
}

.section-title {
    text-align: center;
    margin-bottom: 30px;
}

.section-title .accent-line {
    width: 80px;
    height: 3px;
    background: #d4a853;
    margin: 20px auto 0;
}
</style>