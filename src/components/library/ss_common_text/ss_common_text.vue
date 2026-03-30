<template>
    <section class="ss_commontext">
        <div class="container py-14 py-md-17">
            <div class="row gx-lg-8 gx-xl-10 mb-lg-19 mb-xl-22 align-items-center">
                <!-- LEFT IMAGE -->
                <div class="col-lg-6">
                    <div 
                        class="image-wrapper ss_editable"
                        :class="{ selected: selectedField === 'common-image1' }"
                        @click.stop="selectField('common-image1', 'image', 'common_text', componentId)"
                        @mouseover="hoveredField = 'common-image1'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'common-image1'" class="edit-label">Image</span>
                        <img 
                            :src="editableContent['common-image1'] || '/images/common.png'" 
                            alt="Common Image" 
                            data-cue="fadeIn"
                            data-show="true"
                            style="animation-name: fadeIn; animation-duration: 700ms; animation-timing-function: ease; animation-delay: 0ms; animation-direction: normal; animation-fill-mode: both;"
                        />
                    </div>
                </div>
                <!-- RIGHT TEXT CONTENT -->
                <div class="col-lg-6">
                    <!-- Heading 1 -->
                    <h2 
                        class="fs-15 text-uppercase text-muted mb-3 ss_editable"
                        :class="{ selected: selectedField === 'common-text1' }"
                        @click.stop="selectField('common-text1')"
                        @mouseover="hoveredField = 'common-text1'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'common-text1'" class="edit-label">Text</span>
                        <span v-if="selectedField === 'common-text1'">
                            <input v-model="editableContent['common-text1']" @blur="blurAndUpdate('common-text1', null, null, null, componentId)" />
                        </span>
                        <span v-else>{{ editableContent['common-text1'] }}</span>
                    </h2>
                    <!-- Heading 2 -->
                    <h3 
                        class="display-4 mb-3 ss_editable"
                        :class="{ selected: selectedField === 'common-text2' }"
                        @click.stop="selectField('common-text2')"
                        @mouseover="hoveredField = 'common-text2'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'common-text2'" class="edit-label">Text</span>
                        <span v-if="selectedField === 'common-text2'">
                            <textarea v-model="editableContent['common-text2']" @blur="blurAndUpdate('common-text2', null, null, null, componentId)" />
                        </span>
                        <span v-else>{{ editableContent['common-text2'] }}</span>
                    </h3>
                    <!-- Description -->
                    <p 
                        class="ss_editable"
                        :class="{ selected: selectedField === 'common-description1' }"
                        @click.stop="selectField('common-description1')"
                        @mouseover="hoveredField = 'common-description1'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'common-description1'" class="edit-label">Text</span>
                        <span v-if="selectedField === 'common-description1'">
                            <textarea v-model="editableContent['common-description1']" @blur="blurAndUpdate('common-description1', null, null, null, componentId)" />
                        </span>
                        <span v-else>{{ editableContent['common-description1'] }}</span>
                    </p>
                    <!-- PROCESS STEPS (3) -->
                    <div class="row gy-6 gx-xxl-8 process-wrapper" data-cues="slideInUp" data-group="process" data-disabled="true">
                        <div 
                            class="col-md-4" 
                            v-for="i in 3" 
                            :key="i"
                            data-cue="slideInUp" 
                            data-group="process" 
                            data-show="true"
                            style="animation-name: slideInUp; animation-duration: 700ms; animation-timing-function: ease; animation-delay: 0ms; animation-direction: normal; animation-fill-mode: both;"
                        >
                            <!-- Process Image -->
                            <div 
                                class="process-image mb-3 ss_editable"
                                :class="{ selected: selectedField === 'common-image' + (i + 1) }"
                                @click.stop="selectField('common-image' + (i + 1), 'image', 'common_text', componentId)"
                                @mouseover="hoveredField = 'common-image' + (i + 1)"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'common-image' + (i + 1)" class="edit-label">Image</span>
                                <img 
                                    :src="editableContent['common-image' + (i + 1)] || '/images/common.png'" 
                                    alt="process" 
                                    class="img-fluid rounded"
                                />
                            </div>

                            <!-- Process Title -->
                            <h4 
                                class="mb-1 ss_editable"
                                :class="{ selected: selectedField === 'common-text' + (i + 2) }"
                                @click.stop="selectField('common-text' + (i + 2))"
                                @mouseover="hoveredField = 'common-text' + (i + 2)"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'common-text' + (i + 2)" class="edit-label">Text</span>
                                <span v-if="selectedField === 'common-text' + (i + 2)">
                                    <input v-model="editableContent['common-text' + (i + 2)]" @blur="blurAndUpdate('common-text' + (i + 2), null, null, null, componentId)" />
                                </span>
                                <span v-else>{{ editableContent['common-text' + (i + 2)] }}</span>
                            </h4>

                            <!-- Process Description -->
                            <p 
                                class="mb-0 ss_editable"
                                :class="{ selected: selectedField === 'common-description' + (i + 1) }"
                                @click.stop="selectField('common-description' + (i + 1))"
                                @mouseover="hoveredField = 'common-description' + (i + 1)"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'common-description' + (i + 1)" class="edit-label">Text</span>
                                <span v-if="selectedField === 'common-description' + (i + 1)">
                                    <textarea v-model="editableContent['common-description' + (i + 1)]" @blur="blurAndUpdate('common-description' + (i + 1), null, null, null, componentId)" />
                                </span>
                                <span v-else>{{ editableContent['common-description' + (i + 1)] }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Sidebar Editor -->
    <SidebarEditor
        :isOpen="isSidebarOpen"
        :type="activeEditorType"
        :editableContent="editableContent"
        :activeSectionType="activeSectionType"
        :activeField="selectedField"
        :activeComponentId="activeComponentId"
        @close="closeSidebar"
        @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file, componentId)"
        @image-upload="(e, field) => handleImageUpload(e, field, 'common_text', componentId)"
    />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useEditable } from '../library';
import SidebarEditor from '../SidebarEditor.vue';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({
        'common-image1': '/images/common.png',
        'common-text1': 'How It Works',
        'common-text2': 'Welcome to our website! We create modern, responsive, and user-friendly designs. Our goal is to help your business stand out online and reach more customers.',
        'common-description1': 'We build creative and professional websites that make a strong first impression. From design to development, we bring your ideas to life with clean, modern solutions.',
        'common-image2': '/images/common2.png',
        'common-text3': 'Your website',
        'common-description2': 'We make it beautiful, fast, and easy to use.',
        'common-image3': '/images/common3.png',
        'common-text4': 'Creative and Professional',
        'common-description3': 'Websites that make a strong first impression.',
        'common-image4': '/images/common4.png',
        'common-text5': 'Our goal',
        'common-description4': 'Is to help your business stand out online.',
        }),
    },
});

const emit = defineEmits(['field-updated']);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_COMMON_TEXT_78';

watch(() => props.data, (newVal) => {
    editableContent.value = { ...newVal };
}, { immediate: true, deep: true });

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

    section.ss_commontext {
        padding: 50px 0 50px;
    }

    section.ss_commontext h3.display-4.mb-5 {
        font-size: 3rem;
        color: #222222;
    }

    section.ss_commontext p.mb-8 {
        color: #222222;
        font-size: 20px;
        margin-bottom: 30px;
    }

    .process-image img {
        width: 40%;
        height: 70px;
    }

    .process-wrapper p {
        font-size: 16px;
        color: #222222;
        padding-top: 5px;
        line-height: 25px;
    }
</style>