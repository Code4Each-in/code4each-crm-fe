<template>
    <footer class="custom-footer-section" id="footer">
      <!-- Footer Top -->
      <div class="footer-top bg-name-primary section-padding">
        <div class="footer-shape-left layer-shape"></div>
        <div class="footer-shape-right layer-shape"></div>
        <div class="container">
          <div class="row m-b-n40">
            <!-- Column 1: Logo + Description + Button -->
            <div class="col-12 col-md-6 col-lg-3 col-xl-4 m-b-40">
              <div class="single-footer-widget">
                <!-- Logo -->
                <div
                  class="footer-logo m-b-20 editable"
                  @click.stop="selectField('logo', 'logo')"
                  @mouseover="hoveredField = 'logo'"
                  @mouseleave="hoveredField = null"
                  :class="{ selected: selectedField === 'logo' }"
                >
                  <span v-if="hoveredField === 'logo'" class="edit-label">Logo</span>
                  <img :src="editableContent.logo" alt="Footer Logo" class="footer-logo-img" />
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
                    @blur="blurAndUpdate('footer-description1', null, null, null, componentId)"
                  />
                  <p v-else class="footer-desc desc-content m-b-35">{{ editableContent['footer-description1'] }}</p>
                </div>
  
                <!-- Button -->
                <div
                  class="appoinment-button editable"
                  :class="{ selected: selectedField === 'footer-button1' }"
                  @mouseover="hoveredField = 'footer-button1'"
                  @mouseleave="hoveredField = null"
                  v-if="editableContent['footer-button1']"
                >
                  <span v-if="hoveredField === 'footer-button1'" class="edit-label">Button</span>

                  <!-- Button that opens the sidebar -->
                  <button
                    class="btn btn-outline-success btn-hover-success"
                    @click.stop="selectField('footer-button1', 'button', 'footer', componentId)"
                  >
                    {{ editableContent['footer-button1'] }} 
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Column 2: Contact -->
            <div class="col-sm-6 col-md-6 col-lg-2 col-xl-2 m-b-40">
              <div class="single-footer-widget footer-menu">
                <!-- Contact Heading -->
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
                    @blur="blurAndUpdate('footer-text1', null, null, null, componentId)"
                  />
                  <h4 v-else class="widget-title footer-title">{{ editableContent['footer-text1'] }}</h4>
                </div>
                <ul class="footer-list p-detail">
                  <li><span href="#">{{ editableContent.phone }}</span></li>
                  <li><span>{{ editableContent.address }}</span></li>
                </ul>
              </div>
            </div>
  
            <!-- Column 3: Menu -->
            <div class="col-sm-6 col-md-6 col-lg-2 col-xl-2 m-b-40" v-if="editableContent.menu && editableContent.menu.length">
              <div class="single-footer-widget footer-menu">
                <!-- Menu Heading -->
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
                    @blur="blurAndUpdate('footer-text2', null, null, null, componentId)"
                  />
                  <h4 v-else class="widget-title footer-title">{{ editableContent['footer-text2'] }}</h4>
                </div>
                <ul
                  class="footer-list editable"
                  :class="{ selected: selectedField === 'menu' }"
                  @click.stop="selectField('menu', 'menus')"
                  @mouseover="hoveredField = 'menu'"
                  @mouseleave="hoveredField = null"
                >
                  <span v-if="hoveredField === 'menu'" class="edit-label">Menus</span>
                  <li
                    v-for="(item, i) in editableContent.menu"
                    :key="i"
                  >
                    <span class="footer-menus">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
  
            <!-- Column 4: Social -->
            <div class="col-sm-6 col-md-6 col-lg-3 col-xl-2 m-b-40" v-if="editableContent.socialLinks && editableContent.socialLinks.length">
              <div class="single-footer-widget single-footer-space-left">
                <!-- Social Heading -->
                <div
                  class="editable"
                  :class="{ selected: selectedField === 'footer-text3' }"
                  @click.stop="selectField('footer-text3')"
                  @mouseover="hoveredField = 'footer-text3'"
                  @mouseleave="hoveredField = null"
                >
                  <span v-if="hoveredField === 'footer-text3'" class="edit-label">Heading</span>
                  <input
                    v-if="selectedField === 'footer-text3'"
                    v-model="editableContent['footer-text3']"
                    @blur="blurAndUpdate('footer-text3', null, null, null, componentId)"
                  />
                  <h4 v-else class="widget-title footer-title">{{ editableContent['footer-text3'] }}</h4>
                </div>
  
                <!-- Social links container -->
                <ul
                  class="footer-social editable"
                  :class="{ selected: selectedField === 'socialLinks' }"
                  @click.stop="selectField('socialLinks', 'social')"
                  @mouseover="hoveredField = 'socialLinks'"
                  @mouseleave="hoveredField = null"
                >
                  <span v-if="hoveredField === 'socialLinks'" class="edit-label">
                    Social Links
                  </span>

                  <li v-for="(link, i) in editableContent.socialLinks" :key="i">
                    <a :href="link.url" target="_blank" rel="noopener">
                      <i :class="link.icon" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Footer Bottom -->
        <div class="footer-bottom bg-name-primary p-t-20 p-b-20">
          <div class="container">
            <div class="row">
              <div class="col-md-6 m-b-10">
                <div class="copyright-content">
                  <p class="mb-0">
                    © {{ new Date().getFullYear() }}
                    <strong class="text-color-success">{{ editableContent.copyright }}</strong>
                  </p>
                </div>
              </div>
              <div class="col-md-6 m-b-10 site-made-by">
                <div class="site-by">
                  <p>
                    site by <i class="icofont-heart-alt text-color-success"></i>
                    <span class="text-color-success">SpeedySites.</span>
                  </p>
                </div>
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
        :activeComponentId="activeComponentId"
        @close="closeSidebar"
        @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file, componentId)"
        @image-upload="handleImageUpload"
      />
    </footer>
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
        "footer-button1": "Book Now",
        phone: "+91 99999 99999",
        address: "123 Street, City, State, Country",
        "footer-text1": "Contact",
        "footer-text2": "Quick Links",
        "footer-text3": "Follow Us",
        menu: ["Home", "About", "Services", "Contact"],
        socialLinks: ["fa fa-facebook", "fa fa-instagram"],
        copyright : "agency_name"
      }),
    },
  });
  
  const emit = defineEmits(["update"]);
  const editableContent = ref({ ...props.data });
  const componentId = 'COMP_SS_HEALTH_FOOTER1_65';
  
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
    activeComponentId,
  } = useEditable(emit, editableContent);
  </script>  

<style scoped>
 /* Editable styling */
 .editable {
    cursor: pointer;
    padding: 4px !important;
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
    top: -15px;
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
ul.widget-list {
    margin: 0;
    padding: 0;
}
.single-footer-widget .table-list li {
    color: #00ADB5;
    font-size: 14px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.footer-top {
    position: relative;
    overflow: hidden;
}
.bg-name-primary {
    background-color:#222831;
}
.section-padding {
    padding-top: 35px;
}

.footer-top .layer-shape.footer-shape-left {
    top: 0;
}
.footer-top .layer-shape {
    -webkit-animation: movebounce 2s infinite alternate;
    animation: movebounce 2s infinite alternate;
    position: absolute;
}
.footer-top .layer-shape.footer-shape-left::before {
    /* top: 150px; */
    /* left: -100px; */
}
.single-footer-widget .table-list li span:hover {
    color: #00adb5;
}
.footer-top .layer-shape.footer-shape-left::before {
    content: "";
    position: absolute;
    border: 2px solid #00adb5;
    width: 139px;
    height: 94px;
    border-radius: 50%;
    -webkit-transform: rotate(-20deg);
    -ms-transform: rotate(-20deg);
    transform: rotate(-20deg);
    left: -80px;
    top: 90px;
}
.footer-top .layer-shape.footer-shape-left::after {
    content: "";
    position: absolute;
    border: 2px solid #00adb5;
    width: 139px;
    height: 100px;
    border-radius: 50%;
    -webkit-transform: rotate(-20deg);
    -ms-transform: rotate(-20deg);
    transform: rotate(-20deg);
    left: -80px;
    top: 145px;
}
.footer-top .layer-shape.footer-shape-right {
    bottom: 0;
    right: 0;
}

.footer-top .layer-shape {
    -webkit-animation: movebounce 2s infinite alternate;
    animation: movebounce 2s infinite alternate;
    position: absolute;
}
.footer-top .layer-shape.footer-shape-right::before {
    bottom: 150px;
    right: -100px;
}
.footer-top .layer-shape.footer-shape-right::before {
    content: "";
    position: absolute;
    border: 2px solid #00adb5;
    width: 190px;
    height: 90px;
    border-radius: 50%;
    -webkit-transform: rotate(-20deg);
    -ms-transform: rotate(-20deg);
    transform: rotate(-20deg);
    right: -80px;
    bottom: 100px;
}
.single-footer-widget .widget-list li a:hover {
    color:#00adb5;
}
.single-footer-widget .widget-list li a:hover i {
    font-size: 14px;
    padding-right: 5px;
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
}
.footer-logo span.text-dark{
    font-size: 24px; 
    color: #F9FAFB !important;  
}
a.text-color-success:hover {
    color: #F9FAFB !important;  
}
.footer-top .layer-shape.footer-shape-right::after {
    content: "";
    position: absolute;
    border: 2px solid #00adb5;
    width: 190px;
    height: 90px;
    border-radius: 50%;
    -webkit-transform: rotate(-20deg);
    -ms-transform: rotate(-20deg);
    transform: rotate(-20deg);
    right: -80px;
    bottom: 160px;
}
.m-b-20 {
    margin-bottom: 20px;
}
.single-footer-widget .desc-content {
    color: #F9FAFB;
    width: 280px;
    font-size: 18px;
    line-height: 2;
}

.m-b-35 {
    margin-bottom: 35px;
}

.btn.btn-outline-success.btn-hover-success {
    color:#393E46;
    background-color: #FFFFFF;
    border: 2px solid #FFFFFF;
    border-radius: 6px;
    padding: 12px 24px;
    font-size: 18px !important;
    font-weight: 500 !important;
}

.btn.btn-outline-success.btn-hover-success:hover {
    color:#FFFFFF;
    background-color: #393E46;
    border: 2px solid #FFFFFF;
}

.btn-hover-success i {
    font-size: 14px;
    vertical-align: middle;
    line-height: 14px;
    margin-left: 20px;
}
.single-footer-widget .table-list li span {
    max-width: 120px;
    width: 100%;
    color: #F9FAFB;
}
.single-footer-widget .table-list li .table-list-middle {
    width: 80px;
}

.single-footer-widget .widget-title {
    font-size: 18px;
    color:#F9FAFB;
    margin-bottom: 25px;
    font-weight: 500;
    /* font-family: "Roboto", sans-serif; */
}
.single-footer-widget .widget-list li {
    margin-bottom: 20px;
    list-style: none;
}
span.text-color-success{
    color: #00adb5;
}
.single-footer-widget .widget-list li a {
    color: #F9FAFB;
    font-size: 14px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    text-decoration: none;
}
.single-footer-widget .widget-list li a i {
    font-size: 0px;
    padding-right: 0px;
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
}

.footer-bottom {
    border-top: 1px solid #222831;
}

.p-b-20 {
    padding-bottom: 20px;
}
.p-t-20 {
    padding-top: 20px;
}

/* .bg-name-primary {
    background-color:var(--c4e-primaryColor-1);
} */

.copyright-content {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
}

.copyright-content p {
    color:#F9FAFB;
    font-size: 15px;
    margin-bottom: 0;
}
.text-color-success {
    color: #00adb5;
    text-decoration: none;
}
.footer-menu ul {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    list-style: none;
    gap: 10px;
    padding: 0;
    flex-direction: column;
}
.footer-menu ul li {
    position: relative;
    margin-right: 10px;
    padding-right: 20px;
}
.footer-menu ul li a {
    color:#F9FAFB;
    text-decoration: none;
}
span.name-tag {
    color: #222831;
}
.footer_logo .logo {
    max-width: 25% !important;
    height: auto !important;
}
.list-footer a:hover {
    color: #00adb5;
}
.list-footer a {
    color: #FFFFFF;
}
.list-footer {
    display: flex;
    flex-direction: row;
    gap: 15px;
    font-size: 20px;
}
.site-by p {
    color: #fff;
}
.site-made-by {
    display: flex;
    justify-content: end;
}
.footer-social {
  display: flex; 
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-social li {
  display: inline-block;
}

.footer-social li i {
  color: #fff; 
  font-size: 18px;  
  transition: color 0.3s ease;
}
.single-footer-widget {
    margin-left: 39px;
}
.footer-logo img {
    max-width: 31%;
}
.footer-list.p-detail {
    color: #fff;
    width: 173px;
}
.footer-menus {
    color: #fff;
    display: flex;
    width: 100px;
}
</style>