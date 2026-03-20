<template>
    <section id="services" class="services section-padding">
        <div class="services__header">
            <div>
                <span
                    class="label fade-up ss_editable"
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
                </span>
                <h2 class="fade-up">
                    <span
                        class="ss_editable"
                        :class="{ selected: selectedField === 'service-text2' }"
                        @click.stop="selectField('service-text2')"
                        @mouseover="hoveredField = 'service-text2'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-text2'" class="edit-label">Text</span>
                        <textarea
                            v-if="selectedField === 'service-text2'"
                            v-model="editableContent['service-text2']"
                            @blur="blurAndUpdate('service-text2', null, 'service_section', null, componentId)"
                        ></textarea>
                        <span v-else class="service-main1">{{ editableContent['service-text2'] }}</span>
                    </span>
                    <em class="crimson-text">
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
                    </em>
                </h2>
            </div>
            <p
                class="fade-up ss_editable"
                :class="{ selected: selectedField === 'service-description1' }"
                @click.stop="selectField('service-description1')"
                @mouseover="hoveredField = 'service-description1'"
                @mouseleave="hoveredField = null"
            >
                <span v-if="hoveredField === 'service-description1'" class="edit-label">Text</span>
                <textarea
                    v-if="selectedField === 'service-description1'"
                    v-model="editableContent['service-description1']"
                    @blur="blurAndUpdate('service-description1', null, 'service_section', null, componentId)"
                ></textarea>
                <span v-else>{{ editableContent['service-description1'] }}</span>
            </p>
        </div>

        <div class="services__grid">
            <div class="service-card glass-card fade-up">
                <div class="service-card__img">
                    <div class="ss_editable" 
                        :class="{ selected: selectedField === 'service-image1' }"
                        @click.stop="selectField('service-image1', 'image','service_section', componentId)"
                        @mouseover="hoveredField='service-image1'" 
                        @mouseleave="hoveredField=null"
                    >
                        <span v-if="hoveredField==='service-image1'" class="edit-label">Image</span>
                        <img :src="editableContent['service-image1']" alt="Brand Strategy">
                    </div>
                    <span
                        class="service-card__tag ss_editable"
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
                    </span>
                </div>
                <div class="service-card__body">
                    <h3
                        class="ss_editable"
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
                        <span v-else class="service-cards-text">{{ editableContent['service-text5'] }}</span>
                    </h3>
                    <p
                        class="ss_editable"
                        :class="{ selected: selectedField === 'service-description2' }"
                        @click.stop="selectField('service-description2')"
                        @mouseover="hoveredField = 'service-description2'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-description2'" class="edit-label">Text</span>
                        <textarea
                            v-if="selectedField === 'service-description2'"
                            v-model="editableContent['service-description2']"
                            @blur="blurAndUpdate('service-description2', null, 'service_section', null, componentId)"
                        ></textarea>
                        <span v-else>{{ editableContent['service-description2'] }}</span>
                    </p>
                </div>
            </div>

            <div class="service-card glass-card fade-up">
                <div class="service-card__img">
                    <div class="ss_editable" 
                        :class="{ selected: selectedField === 'service-image2' }"
                        @click.stop="selectField('service-image2', 'image','service_section', componentId)"
                        @mouseover="hoveredField='service-image2'" 
                        @mouseleave="hoveredField=null"
                    >
                        <span v-if="hoveredField==='service-image2'" class="edit-label">Image</span>
                        <img :src="editableContent['service-image2']" alt="Creative Design">
                    </div>
                    <span
                        class="service-card__tag ss_editable"
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
                    </span>
                </div>
                <div class="service-card__body">
                    <h3
                        class="ss_editable"
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
                        <span v-else class="service-cards-text">{{ editableContent['service-text7'] }}</span>
                    </h3>
                    <p
                        class="ss_editable"
                        :class="{ selected: selectedField === 'service-description3' }"
                        @click.stop="selectField('service-description3')"
                        @mouseover="hoveredField = 'service-description3'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-description3'" class="edit-label">Text</span>
                        <textarea
                            v-if="selectedField === 'service-description3'"
                            v-model="editableContent['service-description3']"
                            @blur="blurAndUpdate('service-description3', null, 'service_section', null, componentId)"
                        ></textarea>
                        <span v-else>{{ editableContent['service-description3'] }}</span>
                    </p>
                </div>
            </div>

            <div class="service-card glass-card fade-up">
                <div class="service-card__img">
                    <div class="ss_editable" 
                        :class="{ selected: selectedField === 'service-image3' }"
                        @click.stop="selectField('service-image3', 'image','service_section', componentId)"
                        @mouseover="hoveredField='service-image3'" 
                        @mouseleave="hoveredField=null"
                    >
                        <span v-if="hoveredField==='service-image3'" class="edit-label">Image</span>
                        <img :src="editableContent['service-image3']" alt="Performance Marketing">
                    </div>
                    <span
                        class="service-card__tag ss_editable"
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
                    </span>
                </div>
                <div class="service-card__body">
                    <h3
                        class="ss_editable"
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
                        <span v-else class="service-cards-text">{{ editableContent['service-text9'] }}</span>
                    </h3>
                    <p
                        class="ss_editable"
                        :class="{ selected: selectedField === 'service-description4' }"
                        @click.stop="selectField('service-description4')"
                        @mouseover="hoveredField = 'service-description4'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-description4'" class="edit-label">Text</span>
                        <textarea
                            v-if="selectedField === 'service-description4'"
                            v-model="editableContent['service-description4']"
                            @blur="blurAndUpdate('service-description4', null, 'service_section', null, componentId)"
                        ></textarea>
                        <span v-else>{{ editableContent['service-description4'] }}</span>
                    </p>
                </div>
            </div>

            <div class="service-card glass-card fade-up">
                <div class="service-card__img">
                    <div class="ss_editable" 
                        :class="{ selected: selectedField === 'service-image4' }"
                        @click.stop="selectField('service-image4', 'image','service_section', componentId)"
                        @mouseover="hoveredField='service-image4'" 
                        @mouseleave="hoveredField=null"
                    >
                        <span v-if="hoveredField==='service-image4'" class="edit-label">Image</span>
                        <img :src="editableContent['service-image4']" alt="Digital Presence" >
                    </div>
                    <span
                        class="service-card__tag ss_editable"
                        :class="{ selected: selectedField === 'service-text10' }"
                        @click.stop="selectField('service-text10')"
                        @mouseover="hoveredField = 'service-text10'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-text10'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'service-text10'"
                            v-model="editableContent['service-text10']"
                            @blur="blurAndUpdate('service-text10', null, 'service_section', null, componentId)"
                        />
                        <span v-else>{{ editableContent['service-text10'] }}</span>
                    </span>
                </div>
                <div class="service-card__body">
                    <h3
                        class="ss_editable"
                        :class="{ selected: selectedField === 'service-text11' }"
                        @click.stop="selectField('service-text11')"
                        @mouseover="hoveredField = 'service-text11'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-text11'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'service-text11'"
                            v-model="editableContent['service-text11']"
                            @blur="blurAndUpdate('service-text11', null, 'service_section', null, componentId)"
                        />
                        <span v-else class="service-cards-text">{{ editableContent['service-text11'] }}</span>
                    </h3>
                    <p
                        class="ss_editable"
                        :class="{ selected: selectedField === 'service-description5' }"
                        @click.stop="selectField('service-description5')"
                        @mouseover="hoveredField = 'service-description5'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-description5'" class="edit-label">Text</span>
                        <textarea
                            v-if="selectedField === 'service-description5'"
                            v-model="editableContent['service-description5']"
                            @blur="blurAndUpdate('service-description5', null, 'service_section', null, componentId)"
                        ></textarea>
                        <span v-else>{{ editableContent['service-description5'] }}</span>
                    </p>
                </div>
            </div>

            <div class="service-card glass-card fade-up">
                <div class="service-card__img">
                    <div class="ss_editable" 
                        :class="{ selected: selectedField === 'service-image5' }"
                        @click.stop="selectField('service-image5', 'image','service_section', componentId)"
                        @mouseover="hoveredField='service-image5'" 
                        @mouseleave="hoveredField=null"
                    >
                        <span v-if="hoveredField==='service-image5'" class="edit-label">Image</span>
                        <img :src="editableContent['service-image5']" alt="Digital Presence" >
                    </div>
                    <span
                        class="service-card__tag ss_editable"
                        :class="{ selected: selectedField === 'service-text12' }"
                        @click.stop="selectField('service-text12')"
                        @mouseover="hoveredField = 'service-text12'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-text12'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'service-text12'"
                            v-model="editableContent['service-text12']"
                            @blur="blurAndUpdate('service-text12', null, 'service_section', null, componentId)"
                        />
                        <span v-else>{{ editableContent['service-text12'] }}</span>
                    </span>
                </div>
                <div class="service-card__body">
                    <h3
                        class="ss_editable"
                        :class="{ selected: selectedField === 'service-text13' }"
                        @click.stop="selectField('service-text13')"
                        @mouseover="hoveredField = 'service-text13'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-text13'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'service-text13'"
                            v-model="editableContent['service-text13']"
                            @blur="blurAndUpdate('service-text13', null, 'service_section', null, componentId)"
                        />
                        <span v-else class="service-cards-text">{{ editableContent['service-text13'] }}</span>
                    </h3>
                    <p
                        class="ss_editable"
                        :class="{ selected: selectedField === 'service-description6' }"
                        @click.stop="selectField('service-description6')"
                        @mouseover="hoveredField = 'service-description6'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-description6'" class="edit-label">Text</span>
                        <textarea
                            v-if="selectedField === 'service-description6'"
                            v-model="editableContent['service-description6']"
                            @blur="blurAndUpdate('service-description6', null, 'service_section', null, componentId)"
                        ></textarea>
                        <span v-else>{{ editableContent['service-description6'] }}</span>
                    </p>
                </div>
            </div>

            <div class="service-card glass-card fade-up">
                <div class="service-card__img">
                    <div class="ss_editable" 
                        :class="{ selected: selectedField === 'service-image6' }"
                        @click.stop="selectField('service-image6', 'image','service_section', componentId)"
                        @mouseover="hoveredField='service-image6'" 
                        @mouseleave="hoveredField=null"
                    >
                        <span v-if="hoveredField==='service-image6'" class="edit-label">Image</span>
                        <img :src="editableContent['service-image6']" alt="Content Production" >
                    </div>
                    <span
                        class="service-card__tag ss_editable"
                        :class="{ selected: selectedField === 'service-text14' }"
                        @click.stop="selectField('service-text14')"
                        @mouseover="hoveredField = 'service-text14'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-text14'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'service-text14'"
                            v-model="editableContent['service-text14']"
                            @blur="blurAndUpdate('service-text14', null, 'service_section', null, componentId)"
                        />
                        <span v-else>{{ editableContent['service-text14'] }}</span>
                    </span>
                </div>
                <div class="service-card__body">
                    <h3
                        class="ss_editable"
                        :class="{ selected: selectedField === 'service-text15' }"
                        @click.stop="selectField('service-text15')"
                        @mouseover="hoveredField = 'service-text15'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-text15'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'service-text15'"
                            v-model="editableContent['service-text15']"
                            @blur="blurAndUpdate('service-text15', null, 'service_section', null, componentId)"
                        />
                        <span v-else class="service-cards-text">{{ editableContent['service-text15'] }}</span>
                    </h3>
                    <p
                        class="ss_editable"
                        :class="{ selected: selectedField === 'service-description7' }"
                        @click.stop="selectField('service-description7')"
                        @mouseover="hoveredField = 'service-description7'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'service-description7'" class="edit-label">Text</span>
                        <textarea
                            v-if="selectedField === 'service-description7'"
                            v-model="editableContent['service-description7']"
                            @blur="blurAndUpdate('service-description7', null, 'service_section', null, componentId)"
                        ></textarea>
                        <span v-else>{{ editableContent['service-description7'] }}</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="services__cta fade-up">
            <div
                class="ss_editable"
                :class="{ selected: selectedField === 'service-button1' }"
                @mouseover="hoveredField = 'service-button1'"
                @mouseleave="hoveredField = null"
                v-if="editableContent['service-button1']"
            >
                <span v-if="hoveredField === 'service-button1'" class="edit-label">Button</span>

                <!-- Button that opens the sidebar -->
                <button
                    class="btn-royal filled"
                    @click.stop="selectField('service-button1', 'button', 'service_section', componentId)"
                >
                    {{ editableContent['service-button1'] }}
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
        "service-description1": "Enter service description1",
        "service-image1": "",
        "service-text4": "Enter service text4",
        "service-text5": "Enter service text5",
        "service-description2": "Enter service description2",
        "service-image2": "",
        "service-text6": "Enter service text6",
        "service-text7": "Enter service text7",
        "service-description3": "Enter service description3",
        "service-image3": "",
        "service-text8": "Enter service text8",
        "service-text9": "Enter service text9",
        "service-description4": "Enter service description4",
        "service-image4": "",
        "service-text10": "Enter service text10",
        "service-text11": "Enter service text11",
        "service-description5": "Enter service description5",
        "service-image5": "",
        "service-text12": "Enter service text12",
        "service-text13": "Enter service text13",
        "service-description6": "Enter service description6",
        "service-image6": "",
        "service-text14": "Enter service text14",
        "service-text15": "Enter service text15",
        "service-description7": "Enter service description7",
        "service-button10": "Contact Us"
    }),
  },
});

const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_MARKETING_SERVICE2_107';

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

.service-card__img .ss_editable {
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

.services { position: relative; overflow: hidden; background-color: #110a0d;}

.services__header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: end;
  max-width: 80rem;
  margin: 0 auto 5rem;
}
@media (max-width: 1024px) { .services__header { grid-template-columns: 1fr; } }

.services__header .label {
  color: #b42d5a;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  display: block;
}

.services h2 {
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
}
.services h2 em { font-style: italic; }

.services__header p { color: #87707a; line-height: 1.7; text-align: right; }
@media (max-width: 1024px) { .services__header p { text-align: left; } }

.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 80rem;
  margin: 0 auto;
}
@media (max-width: 1024px) { .services__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .services__grid { grid-template-columns: 1fr; } }

.service-card {
  overflow: hidden;
  transition: all 0.5s;
}
.service-card:hover { border-color: rgba(180, 45, 90, 0.5); }

.service-card__img {
  position: relative;
  height: 12rem;
  overflow: hidden;
}
.service-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}
.service-card:hover .service-card__img img { transform: scale(1.1); }
.service-card__img::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #110a0d, transparent);
}

.service-card__tag {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: rgba(180, 45, 90, 0.8);
  backdrop-filter: blur(8px);
  color: #f2e8ec;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

.service-card__body { padding: 1.5rem; }
.service-card__body h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  transition: color 0.3s;
}
.service-card:hover .service-card__body h3 { color: #b42d5a; }
.service-card__body p { font-size: 0.875rem; color: #87707a; line-height: 1.6; margin-bottom: 1rem; }

.service-card__link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #b42d5a;
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s;
}
.service-card:hover .service-card__link { opacity: 1; transform: translateY(0); }

.services__cta { text-align: center; margin-top: 4rem; }

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

span.service-main1 {
    color: #fff;
}

span.service-cards-text {
    color: #fff;
}

.service-card__img::after {
  pointer-events: none;
}
</style>