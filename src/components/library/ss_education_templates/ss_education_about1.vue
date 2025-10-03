<template>
    <div class="container-fluid py-5 about bg-light" id="about">
        <div class="container py-5">
            <div class="row g-5 align-items-center">
                <div class="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
                    <div class="about-image editable" 
                        :class="{ selected: selectedField === 'about-image1' }"
                        @click.stop="selectField('about-image1', 'image','about_section', componentId)"
                        @mouseover="hoveredField='about-image1'" 
                        @mouseleave="hoveredField=null"
                    >
                        <span v-if="hoveredField==='about-image1'" class="edit-label">Image</span>
                        <img :src="editableContent.services?.[0]?.['about-image1']" alt="About Us" class="img-fluid">
                    </div>
                </div>
                <div class="col-lg-7 wow fadeIn" data-wow-delay="0.3s">
                    <h4 class="text-primary mb-4 border-bottom border-2 d-inline-block p-2 title-border-radius editable"
                        :class="{ selected: selectedField==='about-text1' }"
                        @click.stop="selectField('about-text1')"
                        @mouseover="hoveredField='about-text1'"
                        @mouseleave="hoveredField=null">
                        <span v-if="hoveredField==='about-text1'" class="edit-label">Text</span>
                        <span v-if="selectedField==='about-text1'">
                            <input v-model="editableContent['about-text1']" @blur="blurAndUpdate('about-text1', null, null, null, componentId)"/>
                        </span>
                        <span v-else>{{ editableContent['about-text1'] }}</span>
                    </h4>
                    <h1 class="text-dark mb-4 display-5 editable"
                        :class="{ selected: selectedField==='about-text2' }"
                        @click.stop="selectField('about-text2')"
                        @mouseover="hoveredField='about-text2'"
                        @mouseleave="hoveredField=null">
                        <span v-if="hoveredField==='about-text2'" class="edit-label">Text</span>
                        <span v-if="selectedField==='about-text2'">
                            <textarea v-model="editableContent['about-text2']" @blur="blurAndUpdate('about-text2', null, null, null, componentId)"/>
                        </span>
                        <span v-else>{{ editableContent['about-text2'] }}</span>
                    </h1>
                    <p class="text-dark mb-4 editable"
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
                    <div class="row mb-4">
                        <div 
                            class="col-lg-6" 
                            v-for="(service, index) in editableContent.services" 
                            :key="index"
                        >
                            <h6 class="mb-3 editable"
                                :class="{ selected: selectedField === 'about-service' + (index + 1) }"
                                @click.stop="selectField('about-service' + (index + 1))"
                                @mouseover="hoveredField = 'about-service' + (index + 1)"
                                @mouseleave="hoveredField = null"
                            >
                            <i class="fa fa-check-circle me-2"
                                :class="(index + 1) % 3 === 1 ? '' : ((index + 1) % 3 === 2 ? 'text-primary' : 'text-secondary')">
                            </i>

                            <span v-if="hoveredField === 'about-service' + (index + 1)" class="edit-label">Text</span>

                            <input 
                                v-if="selectedField === 'about-service' + (index + 1)"
                                v-model="service['about-service' + (index + 1)]" 
                                @blur="blurAndUpdate('about-service' + (index + 1), service['about-service' + (index + 1)], null, null, componentId)"
                            />
                            <span v-else>{{ service['about-service' + (index + 1)] }}</span>
                            </h6>
                        </div>
                    </div>
                    <div 
                        class="mbr-section-btn editable"
                        :class="{ selected: selectedField === 'about-button1' }"
                        @mouseover="hoveredField = 'about-button1'"
                        @mouseleave="hoveredField = null"
                        v-if="editableContent['about-button1']"
                    >
                        <span v-if="hoveredField === 'about-button1'" class="edit-label">Button</span>

                        <!-- Button that opens the sidebar -->
                        <button
                            class="btn btn-primary px-5 py-3 btn-border-radius"
                            @click.stop="selectField('about-button1', 'button', 'about_section', componentId)"
                        >
                            {{ editableContent['about-button1'] }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
        "about-text1": "Our",
        "about-text2": "Best Services",
        "about-description1": "for You",
        "about-button1": "Learn More",
        services: [
            {"about-image1": "/images/doctor.png"},
            {"about-service1": "/images/doctor.png"},
            {"about-service2": "/images/affordable.png"},
            {"about-service3": "/images/insurance.png"},
            {"about-service4": "/images/support.png"},
            {"about-service5": "/images/alarm.png"},
            {"about-service6": "/images/telemedicine.png"},
        ],
    }),
  },
});

const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_EDUCATION_ABOUT1_70';

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
.editable {
    cursor: pointer;
    padding: 4px;
    position: relative;
    border: 2px dashed transparent;
    transition: border-color 0.2s ease;
  }
  
  .editable:hover {
    border-color: #00adb5;
  }
  
  .editable.selected {
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
.about-image img {
    width: 100%;
    height: 100%;
    min-height: 400px;
    object-fit: cover;
    border-radius: 10px;
}

@keyframes pulse-border {
    0% {
        transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
        opacity: 1;
    }

    100% {
        transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);
        opacity: 0;
    }
}

.about-image img {
    border-radius: 50% 20% / 10% 40%;
}

.about {
    background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(../images/background.webp);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}
.bg-light {
    background-color: #ffecf2 !important;
}
.bg-primary {
    background-color: #f26ca7 !important;
}
.text-secondary {
    color: #1d70a2 !important;
}
.text-white {
    color: #fff !important;
}
a {
    color: #ff4880;
    text-decoration: none;
}
.text-primary {
    color: #ff4880 !important;
}
.header-social {
    display: flex;
    gap: 17px;
    margin: 10px;
    list-style-type: none;
}
.header-social {
    color: #1d70a2;
}

.eidtor-site img:hover {
    box-shadow: none;
}
.btn-primary {
    color: #000;
    background-color: #ff4880;
    border-color: #ff4880;
}
.bg-dark {
    background-color: #393d72 !important;
}
.border-primary {
    border-color: #ff4880 !important;
}
.title-border-radius {
    border-radius: 10% 30%;
}
.border-bottom {
    border-bottom: 1px solid #ff4880 !important;
}
.btn-border-radius {
    border-radius: 25% 10%;
}
.btn.btn-primary {
    border: 0;
    color: #fff;
}
</style>