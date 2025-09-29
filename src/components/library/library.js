/* =========================
   Imports
========================= */
import { ref, onUnmounted } from "vue";
import COMP_SS_HEALTH_HEADER1_62 from "./ss_health_templates/ss_health_header1.vue";
import COMP_SS_HEALTH_ABOUT1_63 from "./ss_health_templates/ss_health_about1.vue";
import COMP_SS_HEALTH_SERVICE1_64 from "./ss_health_templates/ss_health_service1.vue";
import COMP_SS_HEALTH_FOOTER1_65 from "./ss_health_templates/ss_health_footer1.vue";
import COMP_SS_EDUCATION_HEADER1_69 from "./ss_education_templates/ss_education_header1.vue";
import COMP_SS_EDUCATION_ABOUT1_70 from "./ss_education_templates/ss_education_about1.vue";
import COMP_SS_EDUCATION_SERVICE1_71 from "./ss_education_templates/ss_education_service1.vue";
import COMP_SS_EDUCATION_FOOTER1_72 from "./ss_education_templates/ss_education_footer1.vue";

/* =========================
   Composable for editable fields
========================= */
export function useEditable(emit, editableContent) {
  const selectedField = ref('');
  const hoveredField = ref(null);

  const activeEditorType = ref(null);
  const isSidebarOpen = ref(false);
  const activeSectionType = ref('');

  function selectField(field, type = null, sectionType = null) {
    selectedField.value = field;
  
    const sidebarTypes = ["logo", "image", "button", "menus", "social"];
  
    if (type && sidebarTypes.includes(type)) {
      // open sidebar only for these types
      activeEditorType.value = type;
      isSidebarOpen.value = true;
    } else {
      // close sidebar for text fields or unknown types
      activeEditorType.value = null;
      isSidebarOpen.value = false;
    }
  
    if (sectionType) {
      activeSectionType.value = sectionType;
    }
  }

  function closeSidebar() {
    isSidebarOpen.value = false;
    activeEditorType.value = null;
    selectedField.value = null;
  }

  function blurAndUpdate(field, value = null, type = null, file =null) {
    const fieldValue = value !== null ? value : editableContent.value[field];
    emit("field-updated", { field_name: field, value: fieldValue, type, file});

    if (!file && type !== 'about_section' && type !== 'logo' && type !== 'header' && type !=='service_section' && type !== 'footer') {
      selectedField.value = null;
      activeEditorType.value = null;
    }
  }  

  function handleImageUpload(event, field_name = "image", type = null) {
    const files = event.target.files;
    if (!files || !files.length) return;

    const file = files[0];
    const originalName = file.name.split(".")[0].replace(/\s+/g, "_");
    const extension = file.name.split(".").pop();
    const newFileName = `${originalName}.${extension}`;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      if (field_name === "logo") {
        editableContent.value.logo = e.target.result;
        blurAndUpdate("logo", newFileName, "logo", file);
      } else {
        editableContent.value[field_name] = e.target.result;
        blurAndUpdate(field_name, newFileName, type || "image", file);
      }
    };
    reader.readAsDataURL(file);
  }
  

  const deselectField = (event) => {
    if (isSidebarOpen.value) return;
    if (!selectedField.value) return;
    const editableElements = document.querySelectorAll(".editable");
    let clickedInside = false;
    editableElements.forEach((el) => { if (el.contains(event.target)) clickedInside = true; });
    if (!clickedInside) selectedField.value = null;
  };

  const handleKeyUp = (event) => {
    if (event.key === "Escape") selectedField.value = null;
    else if (event.key === "Enter" && selectedField.value) blurAndUpdate(selectedField.value);
  };

  window.addEventListener("click", deselectField);
  window.addEventListener("keyup", handleKeyUp);

  onUnmounted(() => {
    window.removeEventListener("click", deselectField);
    window.removeEventListener("keyup", handleKeyUp);
  });

  return { selectedField, hoveredField, activeEditorType, isSidebarOpen, closeSidebar, selectField, blurAndUpdate, handleImageUpload, activeSectionType };
}

/* =========================
   Component library
   Export at the very end
========================= */
export const componentLibrary = {
  COMP_SS_HEALTH_HEADER1_62: COMP_SS_HEALTH_HEADER1_62,
  COMP_SS_HEALTH_ABOUT1_63: COMP_SS_HEALTH_ABOUT1_63,
  COMP_SS_HEALTH_SERVICE1_64: COMP_SS_HEALTH_SERVICE1_64,
  COMP_SS_HEALTH_FOOTER1_65: COMP_SS_HEALTH_FOOTER1_65,
  COMP_SS_EDUCATION_HEADER1_69: COMP_SS_EDUCATION_HEADER1_69,
  COMP_SS_EDUCATION_ABOUT1_70: COMP_SS_EDUCATION_ABOUT1_70,
  COMP_SS_EDUCATION_SERVICE1_71: COMP_SS_EDUCATION_SERVICE1_71,
  COMP_SS_EDUCATION_FOOTER1_72: COMP_SS_EDUCATION_FOOTER1_72,
};
