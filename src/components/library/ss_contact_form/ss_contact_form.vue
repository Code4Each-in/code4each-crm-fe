<template>
    <section class="about about--area about--padding  about-section-4">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-5 mb-30">
                    <div class="section-heading mb-40">
                        <span 
                            class="section-heading__title_small wow fadeInUp animated ss_editable" 
                            data-wow-delay=".2s"
                            data-wow-duration=".4s"
                            style="visibility: visible; animation-duration: 0.4s; animation-delay: 0.2s; animation-name: fadeInUp"
                            :class="{ selected: selectedField === 'contact-text1' }"
                            @click.stop="selectField('contact-text1')"
                            @mouseover="hoveredField = 'contact-text1'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'contact-text1'" class="edit-label">Text</span>
                                <span v-if="selectedField === 'contact-text1'">
                                    <input v-model="editableContent['contact-text1']" @blur="blurAndUpdate('contact-text1', null, null, null, componentId)" />
                                </span>
                            <span v-else>{{ editableContent['contact-text1'] }}</span>
                        </span>
                        <h2 
                            class="section-heading__title_big wow fadeInUp animated ss_editable"
                            data-wow-delay=".3s"
                            data-wow-duration=".5s"
                            style="visibility: visible; animation-duration: 0.5s; animation-delay: 0.3s; animation-name: fadeInUp;"
                            :class="{ selected: selectedField === 'contact-text2' }"
                            @click.stop="selectField('contact-text2')"
                            @mouseover="hoveredField = 'contact-text2'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'contact-text2'" class="edit-label">Text</span>
                            <span v-if="selectedField === 'contact-text2'">
                                <textarea v-model="editableContent['contact-text2']" @blur="blurAndUpdate('contact-text2', null, null, null, componentId)" />
                            </span>
                            <span v-else>{{ editableContent['contact-text2'] }}</span>
                        </h2>
                    </div>
                    <div class="about-content">
                        <h3 
                            class="about-content__title wow fadeInUp animated ss_editable"
                            data-wow-delay=".4s"
                            data-wow-duration=".7s"
                            style="visibility: visible; animation-duration: 0.7s; animation-delay: 0.4s; animation-name: fadeInUp;"
                            :class="{ selected: selectedField === 'contact-text3' }"
                            @click.stop="selectField('contact-text3')"
                            @mouseover="hoveredField = 'contact-text3'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'contact-text3'" class="edit-label">Text</span>
                            <span v-if="selectedField === 'contact-text3'">
                                <input v-model="editableContent['contact-text3']" @blur="blurAndUpdate('contact-text3', null, null, null, componentId)" />
                            </span>
                            <span v-else>{{ editableContent['contact-text3'] }}</span>
                        </h3>
                        <p 
                            class="about-content__text wow fadeInUp animated ss_editable" 
                            data-wow-delay=".5s" 
                            data-wow-duration=".9s"
                            style="visibility: visible; animation-duration: 0.9s; animation-delay: 0.5s; animation-name: fadeInUp;"
                            :class="{ selected: selectedField === 'contact-description1' }"
                            @click.stop="selectField('contact-description1')"
                            @mouseover="hoveredField = 'contact-description1'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'contact-description1'" class="edit-label">Text</span>
                                <span v-if="selectedField === 'contact-description1'">
                                    <textarea v-model="editableContent['contact-description1']" @blur="blurAndUpdate('contact-description1', null, null, null, componentId)" />
                                </span>
                            <span v-else>{{ editableContent['contact-description1'] }}</span>
                        </p>
                    </div>
                </div>
                <div class="col-lg-6 offset-lg-1 mb-30 text-md-center">
                    <div 
                        class="about-content__form about-content__form_right position-relative ss_editable"
                        :class="{ selected: selectedField === 'contact-button1' }"
                        @mouseover="hoveredField = 'contact-button1'"
                        @mouseleave="hoveredField = null"
                        v-if="editableContent['contact-button1']"
                    >
                        <span v-if="hoveredField === 'contact-button1'" class="edit-label">Button</span>

                        <!-- Button that opens the sidebar -->
                        <button
                            class="btn btn-primary px-5 py-3 btn-border-radius"
                            @click.stop="selectField('contact-button1', 'form', 'contact_form', componentId)"
                        >
                            {{ data.form_id ? 'Change Form' : editableContent['contact-button1'] }}
                        </button>
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
        'contact-text1': "About Company",
        'contact-text2': "What We Promise High Quality IT Solutions",
        'contact-text3': "Over 2,500+Customers",
        'contact-description1': "Grursus mal suada faci lisis Lorem ipsum dolarorit more is ame tion the a consectetur elit. Vesti at bulum nec odio aea the dumm ipsumm ipsum that dolocons rsus mal suada as and fadolorit to the consectetur elit. All a the Lorem Ipsum generators on the Internet tend.",
        'contact-button1': "Add New Form",
        'form_id': "Here FormID"
        }),
    },
});

const emit = defineEmits(['field-updated']);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_CONTACT_FORM_79';

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
    activeSectionType,
    handleImageUpload,
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

    .about--padding {
        padding: 50px 0 50px;
    }

    .section-heading__title_small {
        color: #074774;
        font-size: 1.2rem;
        font-weight: 600;
        position: relative;
        padding-left: 15px;
        text-transform: uppercase;
        letter-spacing: 1.6px;
        display: inline-block;
        margin-bottom: 8px;
    }

    .section-heading__title_small::before {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        content: "";
        height: 45px;
        width: 5px;
        background: #222222;
        left: 0;
    }

    .section-heading__title_big {
        font-size: 2.5rem;
    }

    .about-content__title {
        color: #6e6e73;
        padding-bottom: 14px;
        border-bottom: 1px solid #074774;
        /* margin-bottom: 42px; */
    }

    .primary-text-color {
        color: #6e6e73;
        font-weight: 600;
    }

    .about-content__text {
        font-size: 18px;
        line-height: 1.8;
        margin-bottom: 0;
        color: #074774;
    }

    .about-content__image {
        border-radius: 10px;
        overflow: hidden;
        display: inline-block;
    }

    .about-content__experience {
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        background: #074774;
        border-radius: 5px;
        color: #ffffff;
        font-weight: 600;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 5px 30px;
        position: absolute;
        left: 40px;
        bottom: 40px;
        transform: translatey(0px);
        -webkit-animation: float 6s ease-in-out infinite;
        animation: float 6s ease-in-out infinite;
    }

    .about-content__experience_years {
        font-size: calc(1.5625rem + 3.75vw);
        position: relative;
        padding-right: 25px;
        margin-right: 25px;
        line-height: 1.652;
        text-shadow: 0px 7px 0px rgba(0, 0, 0, 0.1);
    }

    .about-content__experience_years::after {
        content: "";
        right: 0;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        background: #ffffff;
        background: rgba(255, 255, 255, 0.2);
        height: 40px;
        width: 2px;
    }

    .about-content__experience_title {
        letter-spacing: 0.1em;
        font-size: 20px;
        line-height: 1.5;
        text-shadow: 0px 7px 0px rgba(0, 0, 0, 0.1);
        text-align: left;
    }

    h2.section-heading__title_big.wow.fadeInUp.animated {
        color: #222222;
        font-size: 2.8rem;
        font-weight: 600;
    }
</style>