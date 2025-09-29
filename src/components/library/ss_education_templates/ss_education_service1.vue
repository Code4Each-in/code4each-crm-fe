<template>
    <section class="section service-section service" id="service">
        <div class="container py-5">
            <div class="mx-auto text-center wow fadeIn" data-wow-delay="0.1s" style="max-width: 700px;">
                <div
                    class="editable"
                    :class="{ selected: selectedField === 'service-text1' }"
                    @click.stop="selectField('service-text1')"
                    @mouseover="hoveredField = 'service-text1'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-text1'" class="edit-label">Text</span>
                    <input
                    v-if="selectedField === 'service-text1'"
                    v-model="editableContent['service-text1']"
                    @blur="blurAndUpdate('service-text1', editableContent['service-text1'])"
                    />
                    <h4 v-else class="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius">{{ editableContent['service-text1'] }}</h4>
                </div>
  
                <div
                    class="editable"
                    :class="{ selected: selectedField === 'service-text2' }"
                    @click.stop="selectField('service-text2')"
                    @mouseover="hoveredField = 'service-text2'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-text2'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'service-text2'"
                        v-model="editableContent.services[0]['service-text2']"
                        @blur="blurAndUpdate('service-text2', editableContent.services[0]['service-text2'])"
                    />
                    <h1 v-else class="mb-5 display-3">{{ editableContent.services[0]['service-text2'] }}</h1>
                </div>
            </div>

            <div class="row g-5">
                <div
                    class="col-md-6 col-lg-6 col-xl-3"
                    v-for="(service, i) in editableContent.services"
                    :key="i"
                >
                    <div class="text-center border-primary border bg-white service-item">
                        <div class="service-content d-flex align-items-center justify-content-center p-4">
                            <div class="service-content-inner">
                                <!-- Service Image -->
                                <div
                                    class="editable"
                                    :class="{ selected: selectedField === 'service-image' + (i + 1) }"
                                    @click.stop="selectField('service-image' + (i + 1), 'image', 'service_section')"
                                    @mouseover="hoveredField = 'service-image' + (i + 1)"
                                    @mouseleave="hoveredField = null"
                                >
                                    <span v-if="hoveredField === 'service-image' + (i + 1)" class="edit-label">Image</span>
                                    <img
                                    :src="service['service-image' + (i + 1)] || '/images/default-service.png'"
                                    alt="Service Image"
                                    class="service-image p-4"
                                    />
                                </div>

                                <!-- Service Title -->
                                <div
                                    class="editable"
                                    :class="{ selected: selectedField === 'service-text' + (i + 2) }"
                                    @click.stop="selectField('service-text' + (i + 2))"
                                    @mouseover="hoveredField = 'service-text' + (i + 2)"
                                    @mouseleave="hoveredField = null"
                                >
                                    <span v-if="hoveredField === 'service-text' + (i + 2)" class="edit-label">Text</span>
                                    <input
                                    v-if="selectedField === 'service-text' + (i + 2)"
                                    v-model="service['service-text' + (i + 2)]"
                                    @blur="blurAndUpdate('service-text' + (i + 2), service['service-text' + (i + 2)])"
                                    />
                                    <h4 v-else>{{ service['service-text' + (i + 2)] }}</h4>
                                </div>

                                <!-- Service Description -->
                                <div
                                    class="editable"
                                    :class="{ selected: selectedField === 'service-description' + (i + 1) }"
                                    @click.stop="selectField('service-description' + (i + 1))"
                                    @mouseover="hoveredField = 'service-description' + (i + 1)"
                                    @mouseleave="hoveredField = null"
                                >
                                    <span v-if="hoveredField === 'service-description' + (i + 1)" class="edit-label">Text</span>
                                    <textarea
                                        v-if="selectedField === 'service-description' + (i + 1)"
                                        v-model="service['service-description' + (i + 1)]"
                                        @blur="blurAndUpdate('service-description' + (i + 1), service['service-description' + (i + 1)])"
                                    />
                                    <p v-else class="my-3">{{ service['service-description' + (i + 1)] }}</p>
                                </div>

                                <!-- Service Button -->
                                <div
                                    class="editable mbr-section-btn"
                                    :class="{ selected: selectedField === 'service-button' + (i + 1) }"
                                    @mouseover="hoveredField = 'service-button' + (i + 1)"
                                    @mouseleave="hoveredField = null"
                                    v-if="service['service-button' + (i + 1)]"
                                >
                                    <span v-if="hoveredField === 'service-button' + (i + 1)" class="edit-label">Button</span>
                                    <button
                                    class="btn btn-primary text-white px-4 py-2 my-2 btn-border-radius"
                                    @click.stop="selectField('service-button' + (i + 1), 'button', 'service_section')"
                                    >
                                    {{ service['service-button' + (i + 1)] }}
                                    </button>
                                </div>

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
      @close="closeSidebar"
      @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file)"
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
      "service-text1": "Our Services",
      services: [
        { "service-text2": "Empowering Students Through Education" },
        { "service-image1": "/images/1.jpg", "service-text3": "Service 1", "service-description1": "Description 1", "service-button1": "Join Us" },
        { "service-image2": "/images/2.jpg", "service-text4": "Service 2", "service-description2": "Description 2", "service-button2": "Join Us" },
        { "service-image3": "/images/3.jpg", "service-text5": "Service 2", "service-description3": "Description 3", "service-button3": "Join Us" },
        { "service-image4": "/images/4.jpg", "service-text6": "Service 2", "service-description4": "Description 4", "service-button4": "Join Us" },
      ],
    }),
  },
});

const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });

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
/*** service Start ***/
.service {
    background: linear-gradient(rgba(255, 72, 128, 0.05), rgba(255, 72, 128, 0.2)) !important;
}

.service .service-item {
    box-shadow: 0 0 45px rgba(0, 0, 0, .1);
    width: 100%;
    height: 100%;
    border-radius: 50% 20% / 10% 40%;
    transition: 0.5s;
    position: relative;
}

.service-content::after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    right: auto;
    background: transparent;
    border-radius: 50% 20% / 10% 40%;
    transition: .5s;
}

.service-item:hover {
    border: 1px solid #00b4d8 !important;
}

.service-item:hover .service-content::after {
    background: #00b4d8;
    width: 100%;
    opacity: 1;
    z-index: 1;
}

.service-item .service-content .service-content-inner {
    position: relative;
    z-index: 2;
}

.service-item .service-content-inner i,
.service-item .service-content-inner p,
.service-item .service-content-inner a.h4 {
    transition: 0.5s;
}

.service-item:hover .service-content-inner i,
.service-item:hover .service-content-inner p {
    color: #fff !important;
}
.service-item:hover .service-content-inner a.h4 {
    color: #FF4880;
}

.service-item:hover .service-content-inner a.btn-primary {
    background: #fff !important;
    color: #FF4880 !important;
}

.service-item .service-content-inner a.btn-primary:hover {
    background: #FF4880 !important;
    color: #fff !important;
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
  