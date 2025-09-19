/* =========================
   Imports
========================= */
import { ref, onUnmounted } from "vue";
import HeroSection from "./ss_health_templates/ss_health_header1.vue";
import AboutSection from "./ss_health_templates/ss_health_about1.vue";
import ServiceSection from "./ss_health_templates/ss_health_service1.vue";
import FooterSection from "./ss_health_templates/ss_health_footer1.vue";

/* =========================
   Composable for editable fields
========================= */
export function useEditable(emit, editableContent) {
  const selectedField = ref(null);
  const hoveredField = ref(null);

  const activeEditorType = ref(null);
  const isSidebarOpen = ref(false);

  function selectField(field, type = null) {
    selectedField.value = field;
    if (type) {
      activeEditorType.value = type;
      isSidebarOpen.value = true;
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
    selectedField.value = null;
  }  

  function handleImageUpload(event, field_name = "image", type = null) {
    const files = event.target.files;
    if (!files || !files.length) return;
  
    Array.from(files).forEach((file) => {
      // Generate filename
      const originalName = file.name.split(".")[0].replace(/\s+/g, "_");
      const extension = file.name.split(".").pop();
      const newFileName = `${originalName}.${extension}`;
  
      const reader = new FileReader();
  
      reader.onload = (e) => {
        if (field_name === "logo") {
          // Single logo
          editableContent.value.logo = e.target.result;
          blurAndUpdate("logo", newFileName, "logo", file);
        } 
        else if (field_name === "images") {
          if (!Array.isArray(editableContent.value.images)) {
            editableContent.value.images = [];
          }
          editableContent.value.images.push(e.target.result);
          blurAndUpdate("images", newFileName, type || "image", file); 
        } 
        else if (field_name === "image") {
          editableContent.value.image = e.target.result;
          blurAndUpdate("image", newFileName, type || "image", file);
        } 
        else {
          editableContent.value[field_name] = e.target.result;
          blurAndUpdate(field_name, newFileName, type || "image", file); 
        }
      };
  
      reader.readAsDataURL(file);
    });
  }  

  const deselectField = (event) => {
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

  return { selectedField, hoveredField, activeEditorType, isSidebarOpen, closeSidebar, selectField, blurAndUpdate, handleImageUpload };
}

/* =========================
   Component library
   Export at the very end
========================= */
export const componentLibrary = {
  header: HeroSection,
  about_section: AboutSection,
  service_section: ServiceSection,
  footer: FooterSection,
};
