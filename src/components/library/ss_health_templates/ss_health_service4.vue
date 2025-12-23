<template>
    <section class="services" id="services">
        <div class="container">
            <div class="section-header fade-in">
                <div
                    class="ss_editable"
                    :class="{ selected: selectedField === 'service-text1' }"
                    @click.stop="selectField('service-text1')"
                    @mouseover="hoveredField = 'service-text1'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-text1'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-text1'"
                        v-model="editableContent['service-text1']"
                        @blur="blurAndUpdate('service-text1', null, 'service_section', null, componentId)"
                    />
                    <span v-else class="section-label">{{ editableContent['service-text1'] }}</span>
                </div>
                <div
                    class="ss_editable"
                    :class="{ selected: selectedField === 'service-text2' }"
                    @click.stop="selectField('service-text2')"
                    @mouseover="hoveredField = 'service-text2'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-text2'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-text2'"
                        v-model="editableContent['service-text2']"
                        @blur="blurAndUpdate('service-text2', null, 'service_section', null, componentId)"
                    />
                    <h2 v-else class="section-title">{{ editableContent['service-text2'] }}</h2>
                </div>
                <div
                    class="ss_editable"
                    :class="{ selected: selectedField === 'service-description1' }"
                    @click.stop="selectField('service-description1')"
                    @mouseover="hoveredField = 'service-description1'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-description1'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-description1'"
                        v-model="editableContent['service-description1']"
                        @blur="blurAndUpdate('service-description1', null, 'service_section', null, componentId)"
                    />
                    <p v-else class="section-description">{{ editableContent['service-description1'] }}</p>
                </div>
            </div>

            <div class="services-grid">
              <div class="service-card fade-in" v-for="i in 6" :key="i">
                <div
                  class="ss_editable ss_serive_img"
                  :class="{ selected: selectedField === 'service-image' + i }"
                  @click.stop="selectField('service-image' + i, 'image', 'service_section', componentId)"
                  @mouseover="hoveredField = 'service-image' + i"
                  @mouseleave="hoveredField = null"
                >
                  <span v-if="hoveredField === 'service-image' + i" class="edit-label">Image</span>
                  <img
                    :src="editableContent['service-image' + i] || '/images/default-service.png'"
                    alt="Service Image"
                    class="service-image p-4"
                  />
                </div>
                <div
                  class="ss_editable"
                  :class="{ selected: selectedField === 'service-text' + (i + 2) }"
                  @click.stop="selectField('service-text' + (i + 2))"
                  @mouseover="hoveredField = 'service-text' + (i + 2)"
                  @mouseleave="hoveredField = null"
                >
                  <span v-if="hoveredField === 'service-text' + (i + 2)" class="edit-label">Text</span>
                  <input
                    v-if="selectedField === 'service-text' + (i + 2)"
                    v-model="editableContent['service-text' + (i + 2)]"
                    @blur="blurAndUpdate('service-text' + (i + 2), editableContent['service-text' + (i + 2)], null, null, componentId)"
                  />
                  <h3 v-else style="color: #393d72;" class="service-title">{{ editableContent['service-text' + (i + 2)] }}</h3>
                </div>
                <div
                  class="ss_editable"
                  :class="{ selected: selectedField === 'service-description' + i }"
                  @click.stop="selectField('service-description' + i)"
                  @mouseover="hoveredField = 'service-description' + i"
                  @mouseleave="hoveredField = null"
                >
                  <span v-if="hoveredField === 'service-description' + i" class="edit-label">Text</span>
                  <textarea
                    v-if="selectedField === 'service-description' + i"
                    v-model="editableContent['service-description' + i]"
                    @blur="blurAndUpdate('service-description' + i, editableContent['service-description' + i], null, null, componentId)"
                  />
                  <p v-else class="service-description">{{ editableContent['service-description' + i] }}</p>
                </div>
                <div
                  class="ss_editable"
                  :class="{ selected: selectedField === 'service-button' + i }"
                  @mouseover="hoveredField = 'service-button' + i"
                  @mouseleave="hoveredField = null"
                  v-if="editableContent['service-button' + i]"
                >
                  <span v-if="hoveredField === 'service-button' + i" class="edit-label">Button</span>
                  <button
                    class="service-link"
                    @click.stop="selectField('service-button' + i, 'button', 'service_section', componentId)"
                  >
                    {{ editableContent['service-button' + i] }}
                  </button>
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
        @image-upload="(e, field) => handleImageUpload(e, field, 'header')"
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
        "service-text1": "Our Services",
        "service-text2": "Empowering Students Through Education",
        "service-description1": "Discover a variety of services designed to support your health and well-being.",
        "service-image1": "/images/1.jpg",
        "service-text3": "Service 1",
        "service-description2": "Description 1",
        "service-button1": "Join Us",
        "service-image2": "/images/2.jpg",
        "service-text4": "Service 2",
        "service-description3": "Description 2",
        "service-button2": "Join Us",
        "service-image3": "/images/3.jpg",
        "service-text5": "Service 3",
        "service-description4": "Description 3",
        "service-button3": "Join Us",
        "service-image4": "/images/4.jpg",
        "service-text6": "Service 4",
        "service-description5": "Description 4",
        "service-button4": "Join Us",
        "service-image5": "/images/5.jpg",
        "service-text7": "Service 5",
        "service-description6": "Description 5",
        "service-button5": "Join Us",
        "service-image6": "/images/6.jpg",
        "service-text8": "Service 6",
        "service-description7": "Description 6",
        "service-button6": "Join Us",
    }),
  },
});

const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_HEALTH_SERVICE4_100';

watch(
  () => props.data,
  (newVal) => {
    editableContent.value = { ...newVal };
  },
  { immediate: true, deep: true }
);

// Reusable editable functions
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

.services {
  padding: 5rem 0 6rem;
  background-color: hsl(180, 20%, 99%);
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem;
}

.section-description {
  color: hsl(200, 10%, 45%);
  font-size: 1.125rem;
}

.services-grid {
  display: grid;
  gap: 2rem;
}

@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.service-card {
  background-color: hsl(0, 0%, 100%);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px hsla(200, 25%, 15%, 0.08);
  transition: all 0.3s ease;
}

.service-card:hover {
  box-shadow: 0 8px 30px hsla(174, 62%, 40%, 0.15);
  transform: translateY(-8px);
}

.service-icon {
  width: 56px;
  height: 56px;
  background-color: hsl(174, 50%, 92%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: hsl(174, 62%, 40%);
  transition: all 0.3s ease;
}

.service-card:hover .service-icon {
  background-color: hsl(174, 62%, 40%);
  color: hsl(0, 0%, 100%);
}

.service-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(200, 25%, 15%);
  margin-bottom: 0.75rem;
}

.service-description {
  color: hsl(200, 10%, 45%);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.service-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-weight: 500;
  transition: gap 0.3s ease;
  padding: 10px;
  background-color: hsl(174, 62%, 40%);
  border-radius: 10px;
  border: 2px solid hsl(174, 62%, 40%);
}

.service-card:hover .service-link {
  gap: 0.75rem;
}

.services-cta {
  text-align: center;
  margin-top: 4rem;
}

.ss_serive_img img {
  max-width: 100%;
  margin-left: 0%;
  height: 135px;
}

.section-label {
  display: inline-block;
  color: hsl(174, 62%, 40%);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
}
</style>