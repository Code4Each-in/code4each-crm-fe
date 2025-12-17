<template>
    <section class="section gallery" id="gallery">
        <div class="container">
            <div class="section-title">
                <div
                    class="ss_editable"
                    :class="{ selected: selectedField === 'gallery-text1' }"
                    @click.stop="selectField('gallery-text1')"
                    @mouseover="hoveredField = 'gallery-text1'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'gallery-text1'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'gallery-text1'"
                        v-model="editableContent['gallery-text1']"
                        @blur="blurAndUpdate('gallery-text1', null, 'gallery_section', null, componentId)"
                    />
                    <h1 v-else >{{ editableContent['gallery-text1'] }}</h1>
                </div>
                <div
                    class="ss_editable"
                    :class="{ selected: selectedField === 'gallery-text2' }"
                    @click.stop="selectField('gallery-text2')"
                    @mouseover="hoveredField = 'gallery-text2'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'gallery-text2'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'gallery-text2'"
                        v-model="editableContent['gallery-text2']"
                        @blur="blurAndUpdate('gallery-text2', null, 'gallery_section', null, componentId)"
                    />
                    <p v-else >{{ editableContent['gallery-text2'] }}</p>
                </div>
                <div class="accent-line"></div>
            </div>
            <div class="gallery-grid">
                <div
                    v-for="(img, index) in 6"
                    :key="index"
                    class="gallery-item ss_editable"
                    :class="{ selected: selectedField === `gallery-image${index + 1}` }"
                    @click.stop="selectField(`gallery-image${index + 1}`, 'image', 'gallery_section', componentId)"
                    @mouseover="hoveredField = `gallery-image${index + 1}`"
                    @mouseleave="hoveredField = null"
                >
                    <span
                    v-if="hoveredField === `gallery-image${index + 1}`"
                    class="edit-label"
                    >
                    Image
                    </span>

                    <img
                    :src="
                        editableContent[`gallery-image${index + 1}`] ||
                        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80'
                    "
                    :alt="`Gallery ${index + 1}`"
                    />
                </div>
            </div>
        </div>
    </section>

    <div class="lightbox" id="lightbox">
        <button class="lightbox-close" onclick="closeLightbox()">✕</button>
        <img src="" alt="Lightbox Image" id="lightboxImg">
    </div>

    <SidebarEditor
      :isOpen="isSidebarOpen"
      :type="activeEditorType"
      :editableContent="editableContent"
      :activeSectionType="activeSectionType"
      :activeField="selectedField"
      :activeComponentId="activeComponentId"
      @close="closeSidebar"
      @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file, componentId)"
      @image-upload="(e, field) => handleImageUpload(e, field, 'gallery_section', componentId)"
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
        "gallery-text1": "Our Gallery",
        "gallery-text2": "Explore our collection of beautiful images showcasing our work and creativity.",
        "gallery-image1": "",
        "gallery-image2": "",
        "gallery-image3": "",
        "gallery-image4": "",   
        "gallery-image5": "",
        "gallery-image6": "",
    }),
  },
});

// parent listens to "field-updated"
const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_GALLERY_SECTION_95';

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

.gallery {
    background: #f5f0e8;
    padding: 80px;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
}

.gallery-item img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    transition: transform 0.5s;
}

.gallery-item:hover img {
    transform: scale(1.1);
}

.gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(26, 39, 68, 0.8), transparent);
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    align-items: flex-end;
    padding: 20px;
}

.gallery-item:hover .gallery-overlay {
    opacity: 1;
}

.gallery-overlay span {
    color: white;
    font-weight: 500;
}

.lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.9);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.lightbox.active {
    display: flex;
}

.lightbox img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 8px;
}

.lightbox-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
}

.section-title {
    text-align: center;
    margin-bottom: 50px;
}

.section-title .accent-line {
    width: 80px;
    height: 3px;
    background: #d4a853;
    margin: 20px auto 0;
}
</style>