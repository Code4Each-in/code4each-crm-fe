<template>
    <footer class="footer section gray-bg">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mr-auto col-sm-6">
                    <div class="widget mb-5 mb-lg-0">
                        <div class="logo ">
                            <div
                                class="ss_editable"
                                @click.stop="selectField('logo', 'logo')"
                                @mouseover="hoveredField = 'logo'"
                                @mouseleave="hoveredField = null"
                                :class="{ selected: selectedField === 'logo' }"
                                >
                                <span v-if="hoveredField === 'logo'" class="edit-label">Logo</span>
                                <img :src="editableContent.logo" alt="Footer Logo" class="footer_logo" />
                            </div>
                        </div>
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'footer-description1' }"
                            @click.stop="selectField('footer-description1')"
                            @mouseover="hoveredField = 'footer-description1'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'footer-description1'" class="edit-label">Text</span>
                            <textarea
                            v-if="selectedField === 'footer-description1'"
                            v-model="editableContent['footer-description1']"
                            @blur="blurAndUpdate('footer-description1', editableContent['footer-description1'], null, null, componentId)"
                            />
                            <p v-else>{{ editableContent['footer-description1'] }}</p>
                        </div>
                        <ul
                            class="list-inline footer-socials ss_editable"
                            :class="{ selected: selectedField === 'socialLinks' }"
                            @click.stop="selectField('socialLinks', 'social')"
                            @mouseover="hoveredField = 'socialLinks'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'socialLinks'" class="edit-label">
                                Social Links
                            </span>
                            <!-- Show existing social links -->
                            <template v-if="editableContent.socialLinks && editableContent.socialLinks.length">
                                <li v-for="(link, i) in editableContent.socialLinks" :key="i" class="list-inline-item">
                                <span>
                                    <i :class="link.icon" aria-hidden="true"></i>
                                </span>
                                </li>
                            </template>

                            <!-- Show “Add Social Links” placeholder when empty -->
                            <template v-else>
                                <li class="list-inline-item text-muted">
                                <i class="fa fa-plus me-1" style="color: #fff;"></i>
                                Add Social Links
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="widget mb-5 mb-lg-0">
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'footer-text1' }"
                            @click.stop="selectField('footer-text1')"
                            @mouseover="hoveredField = 'footer-text1'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'footer-text1'" class="edit-label">Text</span>
                            <textarea
                            v-if="selectedField === 'footer-text1'"
                            v-model="editableContent['footer-text1']"
                            @blur="blurAndUpdate('footer-text1', editableContent['footer-text1'], null, null, componentId)"
                            />
                            <h4 v-else class="text-capitalize mb-3">{{ editableContent['footer-text1'] }}</h4>
                        </div>
                        <div class="divider mb-4"></div>
                        <ul
                            class="list-unstyled footer-menu lh-35 ss_editable"
                            :class="{ selected: selectedField === 'menu' }"
                            @click.stop="selectField('menu', 'menus')"
                            @mouseover="hoveredField = 'menu'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'menu'" class="edit-label">Menus</span>
                            <!-- Show existing menus -->
                            <template v-if="editableContent.menu && editableContent.menu.length">
                                <li v-for="(item, i) in editableContent.menu" :key="i">
                                <span class="footer-menus">{{ item }}</span>
                                </li>
                            </template>
                            <template v-else>
                                <li class="text-muted">
                                <i class="fa fa-plus me-1" style="color: #fff;"></i>
                                Add Menus
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="widget widget-contact mb-5 mb-lg-0">
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'footer-text2' }"
                            @click.stop="selectField('footer-text2')"
                            @mouseover="hoveredField = 'footer-text2'"
                            @mouseleave="hoveredField = null"
                        >
                            <span v-if="hoveredField === 'footer-text2'" class="edit-label">Text</span>
                            <textarea
                            v-if="selectedField === 'footer-text2'"
                            v-model="editableContent['footer-text2']"
                            @blur="blurAndUpdate('footer-text2', editableContent['footer-text2'], null, null, componentId)"
                            />
                            <h4 v-else class="text-capitalize mb-3">{{ editableContent['footer-text2'] }}</h4>
                        </div>
                        <div class="divider mb-4"></div>
                        <div class="footer-contact-block mb-4">
                            <div class="icon d-flex align-items-center">
                                <div
                                    class="ss_editable"
                                    :class="{ selected: selectedField === 'footer-text3' }"
                                    @click.stop="selectField('footer-text3')"
                                    @mouseover="hoveredField = 'footer-text3'"
                                    @mouseleave="hoveredField = null"
                                >
                                    <span v-if="hoveredField === 'footer-text3'" class="edit-label">Text</span>
                                    <textarea
                                    v-if="selectedField === 'footer-text3'"
                                    v-model="editableContent['footer-text3']"
                                    @blur="blurAndUpdate('footer-text3', editableContent['footer-text3'], null, null, componentId)"
                                    />
                                    <span v-else class="h6 mb-0">{{ editableContent['footer-text3'] }}</span>
                                </div>
                            </div>
                            <h4 class="mt-2"><span style="color: #222;">{{ editableContent.email }}</span></h4>
                        </div>
                        <div class="footer-contact-block">
                            <div class="icon d-flex align-items-center">
                                <div
                                    class="ss_editable"
                                    :class="{ selected: selectedField === 'footer-text4' }"
                                    @click.stop="selectField('footer-text4')"
                                    @mouseover="hoveredField = 'footer-text4'"
                                    @mouseleave="hoveredField = null"
                                >
                                    <span v-if="hoveredField === 'footer-text4'" class="edit-label">Text</span>
                                    <textarea
                                    v-if="selectedField === 'footer-text4'"
                                    v-model="editableContent['footer-text4']"
                                    @blur="blurAndUpdate('footer-text4', editableContent['footer-text4'], null, null, componentId)"
                                    />
                                    <span v-else class="h6 mb-0">{{ editableContent['footer-text4'] }}</span>
                                </div>
                            </div>
                            <h4 class="mt-2"><span style="color: #222;">{{ editableContent.phone }}</span></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-btm py-4 mt-5">
                <div class="row align-items-center justify-content-between">
                    <div class="col-lg-6">
                        <div class="copyright">
                            © {{ new Date().getFullYear() }}
                            <span class="text-color">{{ editableContent.copyright }}</span> by <span>SpeedySites</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
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
        "footer-text4": "Follow Us",
        menu: ["Home", "About", "Services", "Contact"],
        socialLinks: ["fa fa-facebook", "fa fa-instagram"],
        copyright : "agency_name"
      }),
    },
  });
  
  const emit = defineEmits(["update"]);
  const editableContent = ref({ ...props.data });
  const componentId = 'COMP_SS_HEALTH_FOOTER3_83';
  
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
  h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
  font-family: "Exo", sans-serif;
  font-weight: 700;
  /* color: #222; */
}

h1, .h1 {
  font-size: 2.5rem;
}

h2, .h2 {
  font-size: 44px;
}

h3, .h3 {
  font-size: 1.5rem;
}

h4, .h4 {
  font-size: 1.3rem;
  line-height: 30px;
}

h5, .h5 {
  font-size: 1.25rem;
}

h6, .h6 {
  font-size: 1rem;
}

p {
  line-height: 30px;
}

.navbar-toggle .icon-bar {
  background: #223a66;
}

input[type="email"], input[type="password"], input[type="text"], input[type="tel"] {
  box-shadow: none;
  height: 45px;
  outline: none;
  font-size: 14px;
}

input[type="email"]:focus, input[type="password"]:focus, input[type="text"]:focus, input[type="tel"]:focus {
  box-shadow: none;
  border: 1px solid #223a66;
}

.form-control {
  box-shadow: none;
  border-radius: 0;
}

.form-control:focus {
  box-shadow: none;
  border: 1px solid #223a66;
}

.py-7 {
  padding: 7rem 0px;
}

.btn {
  display: inline-block;
  font-size: 14px;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: .5px;
  padding: .75rem 2rem;
  font-family: "Exo", sans-serif;
  text-transform: uppercase;
  border-radius: 5px;
  border: 2px solid transparent;
  transition: all .35s ease;
}

.btn.btn-icon i {
  border-left: 1px solid rgba(255, 255, 255, 0.09);
  padding-left: 15px;
}

.btn:focus {
  outline: 0px;
  box-shadow: none;
}

.btn-main {
  background: #223a66;
  color: #fff;
  border-color: #223a66;
}

.btn-main:hover {
  background: #e12454;
  border-color: #e12454;
  color: #fff;
}

.btn-main-2 {
  background: #e12454;
  color: #fff;
  border-color: #e12454;
}

.btn-main-2:hover {
  background: #223a66;
  color: #fff;
  border-color: #223a66;
}

.btn-solid-border {
  border: 2px solid #223a66;
  background: transparent;
  color: #223a66;
}

.btn-solid-border:hover {
  border: 2px solid #223a66;
  color: #fff;
  background: #223a66;
}

.btn-solid-border:hover.btn-icon i {
  border-left: 1px solid rgba(255, 255, 255, 0.09);
}

.btn-solid-border.btn-icon i {
  border-left: 1px solid rgba(0, 0, 0, 0.09);
}

.btn-transparent {
  background: transparent;
  color: #222;
  border-color: #6F8BA4;
}

.btn-transparent:hover {
  background: #6F8BA4;
  color: #fff;
}

.btn-white {
  background: #fff;
  border-color: #fff;
  color: #222;
}

.btn-white:hover {
  background: #223a66;
  color: #fff;
  border-color: #223a66;
}

.btn-solid-white {
  border-color: #fff;
  color: #fff;
}

.btn-solid-white:hover {
  background: #fff;
  color: #222;
}

.btn-round {
  border-radius: 4px;
}

.btn-round-full {
  border-radius: 50px;
}

.btn.active:focus, .btn:active:focus, .btn:focus {
  outline: 0;
}

.bg-gray {
  background: #eff0f3;
}

.bg-primary {
  background: #223a66;
}

.bg-primary-dark {
  background: #152440;
}

.bg-primary-darker {
  background: #090f1a;
}

.bg-dark {
  background: #222;
}

.bg-gradient {
  background-image: linear-gradient(145deg, rgba(19, 177, 205, 0.95) 0%, rgba(152, 119, 234, 0.95) 100%);
  background-repeat: repeat-x;
}

.section {
  padding: 36px 52px;
}

.section-sm {
  padding: 70px 0;
}

.section-bottom {
  padding-bottom: 100px;
}

.subtitle {
  color: #223a66;
  font-size: 14px;
  letter-spacing: 1px;
}

.overlay:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  background: #223a66;
}

.overly-2 {
  position: relative;
}

.overly-2:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}

.text-sm {
  font-size: 14px;
}

.text-md {
  font-size: 2.25rem;
}

.text-lg {
  font-size: 3.75rem;
}

.no-spacing {
  letter-spacing: 0px;
}

/* Links */
a {
  color: #222;
  text-decoration: none;
  transition: all .35s ease;
}

a:focus, a:hover {
  color: #e12454;
  text-decoration: none;
}

a:focus {
  outline: none;
}

.content-title {
  font-size: 40px;
  line-height: 50px;
}

.page-title {
  padding: 120px 0px 70px 0px;
  position: relative;
}

.page-title .block h1 {
  color: #fff;
}

.page-title .block p {
  color: #fff;
}

.page-title .breadcumb-nav {
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.slick-slide:focus, .slick-slide a {
  outline: none;
}

@media (max-width: 480px) {
  h2, .h2 {
    font-size: 1.3rem;
    line-height: 36px;
  }
}

.title-color {
  color: #223a66;
}

.secondary-bg {
  background: #223a66;
}

.section-title {
  margin-bottom: 30px;
}

.section-title h2 {
  color: #223a66;
}

.text-lg {
  font-size: 50px;
}

.gray-bg {
  background: #f4f9fc;
}

@media (max-width: 480px) {
  .text-lg {
    font-size: 28px;
  }
}

@media (max-width: 400px) {
  .text-lg {
    font-size: 28px;
  }
}
.footer {
  padding-bottom: 10px;
}

.footer .copyright a {
  font-weight: 600;
}

.lh-35 {
  line-height: 35px;
}

.logo {
  font-weight: 600;
  letter-spacing: 1px;
}

.logo h3 {
  color: #223a66;
}

.logo span {
  color: #223a66;
}

.widget .divider {
  height: 3px;
}

.widget h4 {
  color: #223a66;
}

.widget .footer-menu a {
  color: #6F8BA4;
}

.widget .footer-menu a:hover {
  color: #e12454;
}

.footer-contact-block span {
  font-weight: 400;
  color: #6F8BA4;
}

.footer-contact-block i {
  font-size: 20px;
}

.footer-btm {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.footer-socials li span {
  width: 45px;
  height: 45px;
  background: #6F8BA4;
  color: #fff;
  display: inline-block;
  text-align: center;
  border-radius: 100%;
  padding-top: 12px;
}

.widget-contact h6 {
  font-weight: 500;
  margin-bottom: 18px;
}

.widget-contact h6 i {
  color: #e12454;
}

.subscribe {
  position: relative;
}

.subscribe .form-control {
  border-radius: 50px;
  height: 60px;
  padding-left: 25px;
  border-color: #eee;
}

.subscribe .btn {
  position: absolute;
  right: 6px;
  top: 6px;
}

.backtop {
  position: fixed;
  background: #e12454;
  z-index: 9999;
  display: inline-block;
  right: 55px;
  width: 60px;
  height: 60px;
  bottom: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  border-radius: 50px;
}

.backtop i {
  color: #fff;
  font-size: 20px;
}

.reveal {
  transition: all .3s;
  cursor: pointer;
  opacity: 1;
}
.divider {
  width: 40px;
  height: 5px;
  background: #e12454;
}
</style>