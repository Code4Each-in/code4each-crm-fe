<template>
    <section class="royal-gradient section-padding" id="services">
        <div class="services-header hidden-before-animate" data-animate="slideUp">
            <p
                class="services-label ss_editable"
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
                <span v-else>{{ editableContent['service-text1'] }}</span>
            </p>
            <h2 class="services-title">
                <span
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
                    <span v-else>{{ editableContent['service-text2'] }}</span>
                </span>
                <span class="gold-text">
                    <span
                        class="ss_editable"
                        :class="{ selected: selectedField === 'service-text3' }"
                        @click.stop="selectField('service-text3')"
                        @mouseover="hoveredField = 'service-text3'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-text3'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'service-text3'"
                            v-model="editableContent['service-text3']"
                            @blur="blurAndUpdate('service-text3', null, 'service_section', null, componentId)"
                        />
                        <span v-else>{{ editableContent['service-text3'] }}</span>
                    </span>
                </span>
            </h2>
            <div class="gold-divider" style="width: 5rem; margin: 0 auto 1.5rem;"></div>
            <p
                class="services-desc ss_editable"
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
                <span v-else>{{ editableContent['service-description1'] }}</span>
            </p>
        </div>
        <div class="services-grid">
            <div class="service-card hidden-before-animate" data-animate="slideUp" style="animation-delay: 0.2s;">
                <i data-lucide="gift" class="service-icon"></i>
                <h3
                    class="service-title ss_editable"
                    :class="{ selected: selectedField === 'service-text4' }"
                    @click.stop="selectField('service-text4')"
                    @mouseover="hoveredField = 'service-text4'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-text4'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-text4'"
                        v-model="editableContent['service-text4']"
                        @blur="blurAndUpdate('service-text4', null, 'service_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['service-text4'] }}</span>
                </h3>
                <p
                    class="service-desc ss_editable"
                    :class="{ selected: selectedField === 'service-description2' }"
                    @click.stop="selectField('service-description2')"
                    @mouseover="hoveredField = 'service-description2'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-description2'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-description2'"
                        v-model="editableContent['service-description2']"
                        @blur="blurAndUpdate('service-description2', null, 'service_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['service-description2'] }}</span>
                </p>
            </div>
            <div class="service-card hidden-before-animate" data-animate="slideUp" style="animation-delay: 0.35s;">
                <i data-lucide="palette" class="service-icon"></i>
                <h3
                    class="service-title ss_editable"
                    :class="{ selected: selectedField === 'service-text5' }"
                    @click.stop="selectField('service-text5')"
                    @mouseover="hoveredField = 'service-text5'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-text5'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-text5'"
                        v-model="editableContent['service-text5']"
                        @blur="blurAndUpdate('service-text5', null, 'service_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['service-text5'] }}</span>
                </h3>
                <p
                    class="service-desc ss_editable"
                    :class="{ selected: selectedField === 'service-description3' }"
                    @click.stop="selectField('service-description3')"
                    @mouseover="hoveredField = 'service-description3'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-description3'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-description3'"
                        v-model="editableContent['service-description3']"
                        @blur="blurAndUpdate('service-description3', null, 'service_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['service-description3'] }}</span>
                </p>
            </div>
            <div class="service-card hidden-before-animate" data-animate="slideUp" style="animation-delay: 0.5s;">
                <i data-lucide="truck" class="service-icon"></i>
                <h3
                    class="service-title ss_editable"
                    :class="{ selected: selectedField === 'service-text6' }"
                    @click.stop="selectField('service-text6')"
                    @mouseover="hoveredField = 'service-text6'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-text6'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-text6'"
                        v-model="editableContent['service-text6']"
                        @blur="blurAndUpdate('service-text6', null, 'service_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['service-text6'] }}</span>
                </h3>
                <p
                    class="service-desc ss_editable"
                    :class="{ selected: selectedField === 'service-description4' }"
                    @click.stop="selectField('service-description4')"
                    @mouseover="hoveredField = 'service-description4'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-description4'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-description4'"
                        v-model="editableContent['service-description4']"
                        @blur="blurAndUpdate('service-description4', null, 'service_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['service-description4'] }}</span>
                </p>
            </div>
            <div class="service-card hidden-before-animate" data-animate="slideUp" style="animation-delay: 0.65s;">
                <i data-lucide="shield-check" class="service-icon"></i>
                <h3
                    class="service-title ss_editable"
                    :class="{ selected: selectedField === 'service-text7' }"
                    @click.stop="selectField('service-text7')"
                    @mouseover="hoveredField = 'service-text7'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-text7'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-text7'"
                        v-model="editableContent['service-text7']"
                        @blur="blurAndUpdate('service-text7', null, 'service_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['service-text7'] }}</span>
                </h3>
                <p
                    class="service-desc ss_editable"
                    :class="{ selected: selectedField === 'service-description5' }"
                    @click.stop="selectField('service-description5')"
                    @mouseover="hoveredField = 'service-description5'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-description5'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-description5'"
                        v-model="editableContent['service-description5']"
                        @blur="blurAndUpdate('service-description5', null, 'service_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['service-description5'] }}</span>
                </p>
            </div>
            <div class="service-card hidden-before-animate" data-animate="slideUp" style="animation-delay: 0.8s;">
                <i data-lucide="sparkles" class="service-icon"></i>
                <h3
                    class="service-title ss_editable"
                    :class="{ selected: selectedField === 'service-text8' }"
                    @click.stop="selectField('service-text8')"
                    @mouseover="hoveredField = 'service-text8'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-text8'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-text8'"
                        v-model="editableContent['service-text8']"
                        @blur="blurAndUpdate('service-text8', null, 'service_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['service-text8'] }}</span>
                </h3>
                <p
                    class="service-desc ss_editable"
                    :class="{ selected: selectedField === 'service-description6' }"
                    @click.stop="selectField('service-description6')"
                    @mouseover="hoveredField = 'service-description6'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-description6'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-description6'"
                        v-model="editableContent['service-description6']"
                        @blur="blurAndUpdate('service-description6', null, 'service_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['service-description6'] }}</span>
                </p>
            </div>
            <div class="service-card hidden-before-animate" data-animate="slideUp" style="animation-delay: 0.95s;">
                <i data-lucide="headphones" class="service-icon"></i>
                <h3
                    class="service-title ss_editable"
                    :class="{ selected: selectedField === 'service-text9' }"
                    @click.stop="selectField('service-text9')"
                    @mouseover="hoveredField = 'service-text9'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-text9'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-text9'"
                        v-model="editableContent['service-text9']"
                        @blur="blurAndUpdate('service-text9', null, 'service_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['service-text9'] }}</span>
                </h3>
                <p
                    class="service-desc ss_editable"
                    :class="{ selected: selectedField === 'service-description7' }"
                    @click.stop="selectField('service-description7')"
                    @mouseover="hoveredField = 'service-description7'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-description7'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-description7'"
                        v-model="editableContent['service-description7']"
                        @blur="blurAndUpdate('service-description7', null, 'service_section', null, componentId)"
                    />
                    <span v-else>{{ editableContent['service-description7'] }}</span>
                </p>
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
        @image-upload="(e, field) => handleImageUpload(e, field, 'service_section')"
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
        "service-text1": "Enter service text1",
        "service-text2": "Enter service text2",
        "service-text3": "Enter service text3",
        "service-text4": "Enter service text4",
        "service-text5": "Enter service text5",
        "service-text6": "Enter service text6",
        "service-text7": "Enter service text7",
        "service-text8": "Enter service text8",
        "service-text9": "Enter service text9",
        "service-description1": "Enter service description1",
        "service-description2": "Enter service description2",
        "service-description3": "Enter service description3",
        "service-description4": "Enter service description4",
        "service-description5": "Enter service description5",
        "service-description6": "Enter service description6",
        "service-description7": "Enter service description7",
    }),
  },
});

const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_MARKETING_SERVICE1_103';

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

/* ============ SERVICES ============ */
.services-header {
  text-align: center;
  margin-bottom: 4rem;
}

.services-label {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.125rem;
  color: hsl(40, 60%, 50%);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.services-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: hsl(40, 30%, 95%);
  margin-bottom: 1rem;
}

.services-desc {
  font-family: 'Raleway', sans-serif;
  color: hsla(40, 30%, 95%, 0.7);
  max-width: 42rem;
  margin: 0 auto;
}

.services-grid {
  max-width: 80rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.service-card {
  border-radius: 0.75rem;
  padding: 2rem;
  background: hsl(40, 30%, 95%);
  border: 1px solid hsl(40, 20%, 85%);
  transition: all 0.5s;
}

.service-card:hover {
  background: hsl(220, 45%, 22%);
  color: hsl(40, 30%, 95%);
  transform: translateY(-6px);
  box-shadow: 0 15px 35px hsla(220, 45%, 12%, 0.2);
}

.service-card .service-icon {
  color: hsl(40, 60%, 50%);
  margin-bottom: 1rem;
  width: 36px;
  height: 36px;
}

.service-card:hover .service-icon { color: hsl(40, 60%, 50%); }

.service-card .service-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(220, 45%, 22%);
  margin-bottom: 0.75rem;
}

.service-card:hover .service-title { color: hsl(40, 60%, 50%); }

.service-card .service-desc {
  font-family: 'Raleway', sans-serif;
  font-size: 0.875rem;
  color: hsl(220, 15%, 45%);
  line-height: 1.7;
}

.service-card:hover .service-desc { color: hsla(40, 30%, 95%, 0.7); }

/* ============ RESPONSIVE ============ */
@media (min-width: 768px) {
  .section-padding { padding: 5rem 3rem; }
  .services-grid { grid-template-columns: 1fr 1fr; }
  .services-title { font-size: 3rem; }
}

@media (min-width: 1024px) {
  .section-padding { padding: 7rem 6rem; }
  .services-grid { grid-template-columns: 1fr 1fr 1fr; }
}
</style>