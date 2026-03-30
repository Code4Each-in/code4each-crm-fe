<template>
    <section class="section services" id="services">
        <div class="container">
            <div class="section-title">
                <div
                    class="ss_editable"
                    :class="{ selected: selectedField === 'service-text1' }"
                    @click.stop="selectField('service-text1')"
                    @mouseover="hoveredField = 'service-text1'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-text1'" class="edit-label">Heading</span>
                    <input
                        v-if="selectedField === 'service-text1'"
                        v-model="editableContent['service-text1']"
                        @blur="blurAndUpdate('service-text1', null, 'service_section', null, componentId)"
                    />
                    <h2 v-else>{{ editableContent['service-text1'] }}</h2>
                </div>
                <div
                    class="ss_editable"
                    :class="{ selected: selectedField === 'service-text2' }"
                    @click.stop="selectField('service-text2')"
                    @mouseover="hoveredField = 'service-text2'"
                    @mouseleave="hoveredField = null"
                >
                    <span v-if="hoveredField === 'service-text2'" class="edit-label">Heading</span>
                    <input
                        v-if="selectedField === 'service-text2'"
                        v-model="editableContent['service-text2']"
                        @blur="blurAndUpdate('service-text2', null, 'service_section', null, componentId)"
                    />
                    <p v-else>{{ editableContent['service-text2'] }}</p>
                </div>
                <div class="accent-line"></div>
            </div>
            <div class="services-grid">
  <div
    class="service-card"
    v-for="i in 6"
    :key="i"
    :data-wow-delay="(0.1 + (i - 1) * 0.2) + 's'"
  >
    <!-- SERVICE IMAGE -->
    <div
      class="ss_editable service-icon"
      :class="{ selected: selectedField === 'service-image' + i }"
      @click.stop="selectField('service-image' + i, 'image', 'service_section', componentId)"
      @mouseover="hoveredField = 'service-image' + i"
      @mouseleave="hoveredField = null"
    >
      <span v-if="hoveredField === 'service-image' + i" class="edit-label">Image</span>
      <img
        :src="editableContent['service-image' + i] || '/images/default-service.png'"
        alt="Service Image"
      />
    </div>

    <!-- SERVICE HEADING -->
    <div
      class="ss_editable"
      :class="{ selected: selectedField === 'service-text' + (i + 2) }"
      @click.stop="selectField('service-text' + (i + 2))"
      @mouseover="hoveredField = 'service-text' + (i + 2)"
      @mouseleave="hoveredField = null"
    >
      <span v-if="hoveredField === 'service-text' + (i + 2)" class="edit-label">Heading</span>

      <input
        v-if="selectedField === 'service-text' + (i + 2)"
        v-model="editableContent['service-text' + (i + 2)]"
        @blur="blurAndUpdate(
          'service-text' + (i + 2),
          editableContent['service-text' + (i + 2)],
          'service_section',
          null,
          componentId
        )"
      />
      <h3 v-else>{{ editableContent['service-text' + (i + 2)] }}</h3>
    </div>

    <!-- SERVICE DESCRIPTION -->
    <div
      class="ss_editable"
      :class="{ selected: selectedField === 'service-description' + i }"
      @click.stop="selectField('service-description' + i)"
      @mouseover="hoveredField = 'service-description' + i"
      @mouseleave="hoveredField = null"
    >
      <span v-if="hoveredField === 'service-description' + i" class="edit-label">Description</span>

      <textarea
        v-if="selectedField === 'service-description' + i"
        v-model="editableContent['service-description' + i]"
        @blur="blurAndUpdate(
          'service-description' + i,
          editableContent['service-description' + i],
          'service_section',
          null,
          componentId
        )"
      ></textarea>

      <p v-else class="my-3">
        {{ editableContent['service-description' + i] }}
      </p>
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
        @image-upload="(e, field) => handleImageUpload(e, field, 'service_section', componentId)"
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
        "service-text2": "Discover the range of services we offer to help you manage and enhance your property investments.",
        "service-image1": "",
        "service-text3": "Service One",
        "service-description1": "Description for Service One.",
        "service-image2": "",
        "service-text4": "Service Two",
        "service-description2": "Description for Service Two.",
        "service-image3": "",
        "service-text5": "Service Three",
        "service-description3": "Description for Service Three.",
        "service-image4": "",
        "service-text6": "Service Four",
        "service-description4": "Description for Service Four.",
        "service-image5": "",
        "service-text7": "Service Five",
        "service-description5": "Description for Service Five.",
        "service-image6": "",
        "service-text8": "Service Six",
        "service-description6": "Description for Service Six.",
    }),
  },
});

const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_OTHER_SERVICE_93';

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

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.service-card {
  background: white;
  padding: 40px 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #eee;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.service-icon img {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #d4a853, #e6c47a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 28px;
}

.service-card h3 {
  font-size: 24px;
  color: #1a2744;
  margin-bottom: 15px;
}

.service-card p {
  color: #666;
  font-size: 15px;
}

.section-title h2
 {
    font-size: 42px;
    color: #1a2744;
    margin-bottom: 15px; 
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