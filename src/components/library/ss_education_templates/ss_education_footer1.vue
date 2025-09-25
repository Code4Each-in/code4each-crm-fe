<template>
    <!-- Footer Section -->
    <div class="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.1s">
      <div class="container py-5">
        <div class="row g-5">
  
          <!-- Column 1: Logo + Description -->
          <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="footer-item">
  
              <!-- Logo -->
              <div
                class="navbar-brand m-b-20 editable"
                @click.stop="selectField('logo', 'logo')"
                @mouseover="hoveredField = 'logo'"
                @mouseleave="hoveredField = null"
                :class="{ selected: selectedField === 'logo' }"
              >
                <span v-if="hoveredField === 'logo'" class="edit-label">Logo</span>
                <img :src="editableContent.logo" alt="Logo" class="logo" />
              </div>
  
              <!-- Description -->
              <div
                class="editable"
                :class="{ selected: selectedField === 'footer-description1' }"
                @click.stop="selectField('footer-description1')"
                @mouseover="hoveredField = 'footer-description1'"
                @mouseleave="hoveredField = null"
              >
                <span v-if="hoveredField === 'footer-description1'" class="edit-label">Text</span>
                <textarea
                  v-if="selectedField === 'footer-description1'"
                  v-model="editableContent['footer-description1']"
                  @blur="blurAndUpdate('footer-description1')"
                />
                <p v-else class="mt-4">{{ editableContent['footer-description1'] }}</p>
              </div>
  
            </div>
          </div>
  
          <!-- Column 2: Contact + Social Links -->
          <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="footer-item">
  
              <!-- Heading -->
              <div
                class="editable"
                :class="{ selected: selectedField === 'footer-text1' }"
                @click.stop="selectField('footer-text1')"
                @mouseover="hoveredField = 'footer-text1'"
                @mouseleave="hoveredField = null"
              >
                <span v-if="hoveredField === 'footer-text1'" class="edit-label">Heading</span>
                <input
                  v-if="selectedField === 'footer-text1'"
                  v-model="editableContent['footer-text1']"
                  @blur="blurAndUpdate('footer-text1')"
                />
                <h4
                  v-else
                  class="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius"
                >
                  {{ editableContent['footer-text1'] }}
                </h4>
              </div>
  
              <!-- Contact Info -->
              <div class="d-flex flex-column align-items-start">
                <span class="text-body mb-1"><i class="fa fa-map-marker text-primary me-2"></i>{{ editableContent.address }}</span>
                <span class="text-body mb-1"><i class="fa fa-phone text-primary me-2"></i>{{ editableContent.phone }}</span>
                <span class="text-body mb-3"><i class="fa fa-envelope text-primary me-2"></i>{{ editableContent.email }}</span>
              </div>
  
              <!-- Social Links -->
              <ul
                class="footer-icon d-flex editable"
                :class="{ selected: selectedField === 'socialLinks' }"
                @click.stop="selectField('socialLinks', 'social')"
                @mouseover="hoveredField = 'socialLinks'"
                @mouseleave="hoveredField = null"
              >
                <span v-if="hoveredField === 'socialLinks'" class="edit-label">Social Links</span>
                <li v-for="(link, i) in editableContent.socialLinks" :key="i">
                  <span class="btn btn-primary btn-sm-square me-3 rounded-circle text-white">
                    <i :class="link.icon" aria-hidden="true"></i>
                  </span>
                </li>
              </ul>
  
            </div>
          </div>
  
          <!-- Column 3: Quick Links + Images -->
          <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="footer-item">
  
              <!-- Heading -->
              <div
                class="editable"
                :class="{ selected: selectedField === 'footer-text2' }"
                @click.stop="selectField('footer-text2')"
                @mouseover="hoveredField = 'footer-text2'"
                @mouseleave="hoveredField = null"
              >
                <span v-if="hoveredField === 'footer-text2'" class="edit-label">Heading</span>
                <input
                  v-if="selectedField === 'footer-text2'"
                  v-model="editableContent['footer-text2']"
                  @blur="blurAndUpdate('footer-text2')"
                />
                <h4
                  v-else
                  class="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius"
                >
                  {{ editableContent['footer-text2'] }}
                </h4>
              </div>
  
              <!-- Footer Images -->
              <div class="row g-2">
                <div
                  class="col-4 editable"
                  v-for="i in 6"
                  :key="i"
                  :class="{ selected: selectedField === 'footer-image' + i }"
                  @click.stop="selectField('footer-image' + i, 'image', 'footer')"
                  @mouseover="hoveredField = 'footer-image' + i"
                  @mouseleave="hoveredField = null"
                >
                  <span v-if="hoveredField === 'footer-image' + i" class="edit-label">Image</span>
                  <div class="footer-galary-img rounded-circle border border-primary">
                    <img
                      :src="editableContent['footer-image' + i] || '/images/default-service.png'"
                      class="img-fluid rounded-circle p-2"
                      alt="Footer Image"
                    />
                  </div>
                </div>
              </div>
  
            </div>
          </div>
  
        </div>
      </div>
    </div>
  
    <!-- Copyright -->
    <div class="container-fluid copyright bg-dark py-4">
      <div class="container">
        <div class="row">
          <div class="col-md-6 text-center text-md-start mb-3 mb-md-0 mt-3">
            <span class="text-light">© {{ new Date().getFullYear() }}
              <strong class="text-color-success">{{ editableContent.copyright }}</strong>
            </span>
          </div>
          <div class="col-md-6 my-auto text-center text-md-end text-white mt-3">
            <div class="site-by">
              <p>Site By <i class="icofont-heart-alt text-color-success"></i> 
                <span class="text-color-success">SpeedySites.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Sidebar Editor -->
    <SidebarEditor
      :isOpen="isSidebarOpen"
      :type="activeEditorType"
      :editableContent="editableContent"
      :activeSectionType="activeSectionType"
      :activeField="selectedField"
      @close="closeSidebar"
      @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file)"
      @image-upload="(e, field) => handleImageUpload(e, field, 'footer')"
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
        logo: "/images/logo.png",
        "footer-description1": "Default footer description goes here.",
        "footer-text1": "Contact",
        phone: "+91 99999 99999",
        address: "123 Street, City, State, Country",
        email: "default@gmail.com",
        socialLinks: [],
        "footer-text2": "Quick Links",
        copyright : "agency_name",
        "footer-image1": "/images/service-image1",
        "footer-image2": "/images/service-image2",
        "footer-image3": "/images/service-image3",
        "footer-image4": "/images/service-image4",
        "footer-image5": "/images/service-image5",
        "footer-image6": "/images/service-image6",
      }),
    },
  });
  
  const emit = defineEmits(["update"]);
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

  watch(selectedField, (newField, oldField) => {
  console.log("Selected field changed:", oldField, "→", newField);
  // Here you can trigger any additional actions when a field is selected
});
  </script>
  
  <style scoped>
  /* Editable styling */
  .editable {
    cursor: pointer;
    padding: 4px;
    position: relative;
    border: 2px dashed transparent;
    transition: border-color 0.2s ease;
  }
  .editable:hover,
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
  }
  
  /* Footer styling */
  .footer {
    background: linear-gradient(rgba(255, 255, 255, .8), rgba(255, 255, 255, 1)), url(../images/background.webp);
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .footer .footer-galary-img img {
    width: 100%;
    border-style: dotted; 
    border-color: #FF4880;
    transition: 0.5s;
  }
  .footer .footer-galary-img img:hover {
    transform: scale(1.2);
  }
  .footer-item a.text-body:hover {
    color: #00b4d8 !important;
  }
  .footer-icon {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .footer-item .logo {
    max-height: 80px;
  }
  .bg-dark {
    background-color: #393d72 !important;
  }
  .btn-primary {
    color: #000;
    background-color: #ff4880;
    border-color: #ff4880;
  }
  .text-primary {
    color: #ff4880 !important;
  }
  .border-primary {
    border-color: #ff4880 !important;
  }
  .title-border-radius {
    border-radius: 10% 30%;
  }
  .rounded-circle {
    border-radius: 50% !important;
  }
  .eidtor-site img {
    margin-bottom: 0px;
  }
  </style>
  