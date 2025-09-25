<template>
  <section class="about-sections section-margin" id="about">
  <div class="custom-large-container container">
    <!-- Title -->
    <div class="row m-b-n30">
      <div class="col-12 aos-init aos-animate" data-aos="fade-up" data-aos-duration="1100">
        <div class="service-long-title text-center hidden animate__animated animate__delay-1s">
          <h2 class="title animate__animated animate__delay-1s animate__fadeInUp">
            <!-- Text 1 -->
            <span
              class="editable"
              :class="{ selected: selectedField === 'about-text1' }"
              @click.stop="selectField('about-text1')"
              @mouseover="hoveredField = 'about-text1'"
              @mouseleave="hoveredField = null"
            >
              <span v-if="hoveredField === 'about-text1'" class="edit-label">Text</span>
              <input
                v-if="selectedField === 'about-text1'"
                v-model="editableContent['about-text1']"
                @blur="blurAndUpdate('about-text1')"
              />
              <span v-else style="color:#f7a582">{{ editableContent['about-text1'] }}</span>
            </span>

            <!-- Text 2 -->
            <span
              class="editable"
              :class="{ selected: selectedField === 'about-text2' }"
              @click.stop="selectField('about-text2')"
              @mouseover="hoveredField = 'about-text2'"
              @mouseleave="hoveredField = null"
            >
              <span v-if="hoveredField === 'about-text2'" class="edit-label">Text</span>
              <input
                v-if="selectedField === 'about-text2'"
                v-model="editableContent['about-text2']"
                @blur="blurAndUpdate('about-text2')"
              />
              <span v-else>{{ editableContent['about-text2'] }}</span>
            </span>

            <br />

            <!-- Text 3 -->
            <span
              class="editable"
              :class="{ selected: selectedField === 'about-text3' }"
              @click.stop="selectField('about-text3')"
              @mouseover="hoveredField = 'about-text3'"
              @mouseleave="hoveredField = null"
            >
              <span v-if="hoveredField === 'about-text3'" class="edit-label">Text</span>
              <input
                v-if="selectedField === 'about-text3'"
                v-model="editableContent['about-text3']"
                @blur="blurAndUpdate('about-text3')"
              />
              <span v-else>{{ editableContent['about-text3'] }}</span>
            </span>

            <!-- Text 4 -->
            <span
              class="editable text-style word-wave"
              :class="{ selected: selectedField === 'about-text4' }"
              @click.stop="selectField('about-text4')"
              @mouseover="hoveredField = 'about-text4'"
              @mouseleave="hoveredField = null"
            >
              <span v-if="hoveredField === 'about-text4'" class="edit-label">Text</span>
              <input
                v-if="selectedField === 'about-text4'"
                v-model="editableContent['about-text4']"
                @blur="blurAndUpdate('about-text4')"
              />
              <span v-else>{{ editableContent['about-text4'] }}</span>
            </span>
          </h2>
        </div>
      </div>
    </div>

    <!-- Services Grid -->
    <div class="services-wrapper">
      <div
        v-for="(service, i) in editableContent.services"
        :key="i"
        class="single-service aos-init aos-animate"
        :data-aos-duration="1100 + i * 100"
      >
        <!-- Service Image -->
        <div
          class="single-service-thumb editable"
          :class="{ selected: selectedField === 'about-image' + (i + 1) }"
          @click.stop="selectField('about-image' + (i + 1), 'image', 'about_section')"
          @mouseover="hoveredField = 'about-image' + (i + 1)"
          @mouseleave="hoveredField = null"
        >
          <span v-if="hoveredField === 'about-image' + (i + 1)" class="edit-label">Image</span>
          <img
            :src="service['about-image' + (i + 1)] || '/images/default-service.png'"
            alt="About Image"
            class="about-image"
          />
        </div>

        <!-- Service Text -->
        <div
          class="single-service-title editable"
          :class="{ selected: selectedField === 'about-text' + (i + 5) }"
          @click.stop="selectField('about-text' + (i + 5))"
          @mouseover="hoveredField = 'about-text' + (i + 5)"
          @mouseleave="hoveredField = null"
        >
          <span v-if="hoveredField === 'about-text' + (i + 5)" class="edit-label">Text</span>
          <input
            v-if="selectedField === 'about-text' + (i + 5)"
            v-model="service['about-text' + (i + 5)]"
            @blur="blurAndUpdate('about-text' + (i + 5), service['about-text' + (i + 5)])"
          />
          <h2 v-else class="title">{{ service['about-text' + (i + 5)] }}</h2>
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
    @close="closeSidebar"
    @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file)"
    @image-upload="(e, field) => handleImageUpload(e, field, 'about_section')"
  />
</section>

</template>

<script setup>
import { ref, watch } from "vue";
import { useEditable } from "../library";
import SidebarEditor from "../SidebarEditor.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      "about-text1": "About Highlight",
      "about-text2": "Our",
      "about-text3": "Best Services",
      "about-text4": "for You",
      services: [
        { "about-image1": "/images/doctor.png", "about-text5": "Best Doctors" },
        { "about-image2": "/images/affordable.png", "about-text6": "Affordable Care" },
        { "about-image3": "/images/insurance.png", "about-text7": "Insurance Partners" },
        { "about-image4": "/images/support.png", "about-text8": "24/7 Support" },
        { "about-image5": "/images/alarm.png", "about-text9": "Emergency Service" },
        { "about-image6": "/images/telemedicine.png", "about-text10": "Online Consultancy" },
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
    /* Editable highlights */
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
    
    /* Default inputs (services, etc.) */
    input,
    textarea {
      width: 100%;
      font-size: inherit;
      font-family: inherit;
      padding: 8px;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
    
    /* Heading inputs: inline size */
    .service-long-title input {
      display: inline-block;
      width: auto;       /* shrink to content */
      min-width: 50px;   /* fallback */
      font-size: inherit;
      font-family: inherit;
      padding: 4px 6px;
    }
    
    /* Section styling */
    .m-b-30 {
      margin-bottom: 30px;
    }
    .section, .section-fluid {
      float: left;
      width: 100%;
    }
    .service-long-title .title {
      text-align: center;
      width: 100%;
      margin: 0 auto 60px;
      font-size: 35px;
      line-height: 1.5;
      color: #00ADB5;
      font-weight: 800;
    }
    .service-long-title .title .text-style {
      color: #00ADB5;
    }
    
    /* Grid wrapper */
    .services-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 20px;
    }
    
    /* Service cards */
    .services-wrapper .single-service {
        flex: 1 1 calc(33.333% - 20px);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background-color: #00ADB5;
        padding: 21px 18px;
        transition: all 0.3s ease;
    }
    
    /* Service icon */
    .single-service .single-service-thumb {
        height: 73px;
        width: 73px;
        border-radius: 100%;
        background-color: #F9FAFB;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #F9FAFB;
        transition: all 0.3s ease;
        position: relative;
    }
    .single-service .single-service-thumb img {
      width: 75%;
    }
    
    /* Hover effect */
    .single-service:hover {
      background-color: #222831;
      color: #00adb5;
    }
    .single-service:hover .single-service-thumb {
      background-color: #222831;
      border-color: #00ADB5;
      color: #00ADB5;
    }
    
    /* Title */
    .single-service .single-service-title .title {
      font-size: 18px;
      font-weight: 600;
      color: #F9FAFB;
      margin: 0 0 0 20px;
      transition: all 0.3s ease;
      line-height: 23px;
    }
    .single-service:hover .single-service-title .title {
      color: #00adb5;
    }
    
    /* Large container */
    @media only screen and (min-width: 1600px) {
      .custom-large-container {
        max-width: 1560px;
        width: 100%;
        margin: 0 auto;
      }
    }
    </style>
    
    