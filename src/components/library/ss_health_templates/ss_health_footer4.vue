<template>
    <footer class="footer" id="footer">
        <div class="footer-cta">
            <div class="container">
                <div class="cta-box">
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'footer-text1' }"
                        @click.stop="selectField('footer-text1')"
                        @mouseover="hoveredField = 'footer-text1'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'footer-text1'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'footer-text1'"
                            v-model="editableContent['footer-text1']"
                            @blur="blurAndUpdate('footer-text1', null, 'footer', null, componentId)"
                        />
                        <p v-else class="cta-title">{{ editableContent['footer-text1'] }}</p>
                    </div>
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'footer-text2' }"
                        @click.stop="selectField('footer-text2')"
                        @mouseover="hoveredField = 'footer-text2'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'footer-text2'" class="edit-label">Text</span>
                        <input
                        v-if="selectedField === 'footer-text2'"
                        v-model="editableContent['footer-text2']"
                        @blur="blurAndUpdate('footer-text2', null, 'footer', null, componentId)"
                        />
                        <p v-else class="cta-description">{{ editableContent['footer-text2'] }}</p>
                    </div>
                    <div class="cta-buttons">
                        <span class="btn btn-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'footer-text3' }"
                                @click.stop="selectField('footer-text3')"
                                @mouseover="hoveredField = 'footer-text3'"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'footer-text3'" class="edit-label">Text</span>
                                <input
                                v-if="selectedField === 'footer-text3'"
                                v-model="editableContent['footer-text3']"
                                @blur="blurAndUpdate('footer-text3', null, 'footer', null, componentId)"
                                />
                                <span v-else>{{ editableContent['footer-text3'] }}</span>
                            </div>
                        </span>
                        <span class="btn btn-outline-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'footer-text4' }"
                                @click.stop="selectField('footer-text4')"
                                @mouseover="hoveredField = 'footer-text4'"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'footer-text4'" class="edit-label">Text</span>
                                <input
                                v-if="selectedField === 'footer-text4'"
                                v-model="editableContent['footer-text4']"
                                @blur="blurAndUpdate('footer-text4', null, 'footer', null, componentId)"
                                />
                                <span v-else>{{ editableContent['footer-text4'] }}</span>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Main Footer -->
        <div class="footer-main">
            <div class="container footer-grid">
                <div class="footer-about">
                    <div class="footer-logo">
                        <div
                            class="ss_editable"
                            @click.stop="selectField('logo', 'logo')"
                            @mouseover="hoveredField = 'logo'"
                            @mouseleave="hoveredField = null"
                            :class="{ selected: selectedField === 'logo' }"
                            >
                            <span v-if="hoveredField === 'logo'" class="edit-label">Logo</span>
                            <img :src="editableContent.logo" alt="Footer Logo" class="logo" />
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
                        @blur="blurAndUpdate('footer-description1', null, 'footer', null, componentId)"
                        />
                        <span v-else>{{ editableContent['footer-description1'] }}</span>
                    </div>
                    <div class="social-links">
                        <ul
                            class="ss_editable"
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
                                <li v-for="(link, i) in editableContent.socialLinks" :key="i">
                                <span>
                                    <i :class="link.icon" aria-hidden="true" class="social-link"></i>
                                </span>
                                </li>
                            </template>

                            <!-- Show “Add Social Links” placeholder when empty -->
                            <template v-else>
                                <li class="text-muted">
                                <i class="fa fa-plus me-1" style="color: #fff;"></i>
                                Add Social Links
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            
                <div class="footer-links">
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'footer-text5' }"
                        @click.stop="selectField('footer-text5')"
                        @mouseover="hoveredField = 'footer-text5'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'footer-text5'" class="edit-label">Text</span>
                        <input
                        v-if="selectedField === 'footer-text5'"
                        v-model="editableContent['footer-text5']"
                        @blur="blurAndUpdate('footer-text5', null, 'footer', null, componentId)"
                        />
                        <h3 v-else class="footer-title">{{ editableContent['footer-text5'] }}</h3>
                    </div>
                    <ul
                        class="ss_editable"
                        :class="{ selected: selectedField === 'menu' }"
                        @click.stop="selectField('menu', 'menus')"
                        @mouseover="hoveredField = 'menu'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'menu'" class="edit-label">Menus</span>
                        <!-- Show existing menus -->
                        <template v-if="editableContent.menu && editableContent.menu.length">
                            <li v-for="(item, i) in editableContent.menu" :key="i">
                            <span>{{ item }}</span>
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
            
                <div class="footer-contact">
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'footer-text6' }"
                        @click.stop="selectField('footer-text6')"
                        @mouseover="hoveredField = 'footer-text6'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'footer-text6'" class="edit-label">Text</span>
                        <input
                        v-if="selectedField === 'footer-text6'"
                        v-model="editableContent['footer-text6']"
                        @blur="blurAndUpdate('footer-text6', null, 'footer', null, componentId)"
                        />
                        <h3 v-else class="footer-title">{{ editableContent['footer-text6'] }}</h3>
                    </div>
                    <ul>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span>{{ editableContent.address }}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            <span>{{ editableContent.phone }}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            <span>{{ editableContent.email }}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'footer-text7' }"
                                @click.stop="selectField('footer-text7')"
                                @mouseover="hoveredField = 'footer-text7'"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'footer-text7'" class="edit-label">Text</span>
                                <input
                                v-if="selectedField === 'footer-text7'"
                                v-model="editableContent['footer-text7']"
                                @blur="blurAndUpdate('footer-text7', null, 'footer', null, componentId)"
                                />
                                <span v-else>{{ editableContent['footer-text7'] }}</span>
                            </div>
                            <br />
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'footer-text8' }"
                                @click.stop="selectField('footer-text8')"
                                @mouseover="hoveredField = 'footer-text8'"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'footer-text8'" class="edit-label">Text</span>
                                <input
                                v-if="selectedField === 'footer-text8'"
                                v-model="editableContent['footer-text8']"
                                @blur="blurAndUpdate('footer-text8', null, 'footer', null, componentId)"
                                />
                                <span v-else>{{ editableContent['footer-text8'] }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            
                <div class="footer-map">
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'footer-text9' }"
                        @click.stop="selectField('footer-text9')"
                        @mouseover="hoveredField = 'footer-text9'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'footer-text9'" class="edit-label">Text</span>
                        <input
                        v-if="selectedField === 'footer-text9'"
                        v-model="editableContent['footer-text9']"
                        @blur="blurAndUpdate('footer-text9', null, 'footer', null, componentId)"
                        />
                        <h3 v-else class="footer-title">{{ editableContent['footer-text9'] }}</h3>
                    </div>
                    <div class="map-container">
                        <iframe
                        :src="`https://www.google.com/maps?q=${encodeURIComponent(editableContent.address)}&output=embed`"
                        allowfullscreen
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Location Map">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="container footer-bottom-content">
                <p>© {{ new Date().getFullYear() }} {{ editableContent.copyright }}. All rights reserved.</p>
                <div class="madeby">
                    Site By <span>SpeedySites</span>
                </div>
                <div class="footer-bottom-links">
                    <ul
                        class="ss_editable"
                        :class="{ selected: selectedField === 'menu' }"
                        @click.stop="selectField('menu', 'menus')"
                        @mouseover="hoveredField = 'menu'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'menu'" class="edit-label">Menus</span>
                        <!-- Show existing menus -->
                        <template v-if="editableContent.menu && editableContent.menu.length">
                            <li v-for="(item, i) in editableContent.menu" :key="i">
                            <span>{{ item }}</span>
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
        </div>
    </footer>
    <SidebarEditor
        :isOpen="isSidebarOpen"
        :type="activeEditorType"
        :editableContent="editableContent"
        :activeSectionType="activeSectionType"
        :activeField="selectedField"
        @close="closeSidebar"
        @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file, componentId)"
        @image-upload="(e, field) => handleImageUpload(e, field, 'footer', componentId)"
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
        "footer-text1": "Contact",
        "footer-text2": "Get in touch with us for any health-related inquiries or appointments.",
        "footer-text3": "Call Now",
        "footer-text4": "Email Us",
        "footer-text5": "Quick Links",
        "footer-text6": "Contact Us",
        "footer-text7": "Mon - Fri: 9:00 AM - 6:00 PM",
        "footer-text8": "Sat - Sun: Closed",
        "footer-text9": "Our Location",
        menu: ["Home", "About Us", "Services", "Blog", "Contact"],
        "footer-description1": "Default footer description goes here.",
        phone: "+91 99999 99999",
        address: "123 Street, City, State, Country",
        email: "default@gmail.com",
        socialLinks: [],
        copyright : "agency_name",
    }),
  },
});
  
const emit = defineEmits(["update"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_HEALTH_FOOTER4_99';
  
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
.ss_editable {
    cursor: pointer;
    padding: 4px;
    position: relative;
    border: 2px dashed transparent;
    transition: border-color 0.2s ease;
}

.ss_editable:hover {
    border-color: #00adb5 !important;
}

.ss_editable.selected {
    border-color: #00adb5 !important;
}

.edit-label {
    position: absolute;
    top: -10px;
    left: 5px;
    background-color: #00adb5 !important;
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

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

/* ===== Utilities ===== */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}

.hidden {
  display: none !important;
}

/* ===== Buttons ===== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background-color: hsl(174, 62%, 40%);
  color: hsl(0, 0%, 100%);
  box-shadow: 0 4px 20px hsla(200, 25%, 15%, 0.08);
}

.btn-primary:hover {
  background-color: hsl(174, 62%, 35%);
  box-shadow: 0 8px 30px hsla(174, 62%, 40%, 0.15);
}

.btn-hero {
  background-color: hsl(174, 62%, 40%);
  color: hsl(0, 0%, 100%);
  padding: 1rem 2rem;
  font-size: 1rem;
  box-shadow: 0 10px 30px hsla(174, 62%, 40%, 0.3);
}

.btn-hero:hover {
  background-color: hsl(174, 62%, 35%);
  transform: scale(1.05);
  box-shadow: 0 15px 40px hsla(174, 62%, 40%, 0.4);
}

.btn-hero-outline {
  background-color: transparent;
  color: hsl(0, 0%, 100%);
  padding: 1rem 2rem;
  font-size: 1rem;
  border: 2px solid hsla(0, 0%, 100%, 0.5);
}

.btn-hero-outline:hover {
  background-color: hsl(0, 0%, 100%);
  color: hsl(200, 25%, 15%);
}

.btn-white {
  background-color: hsl(0, 0%, 100%);
  color: hsl(174, 62%, 40%);
  padding: 1rem 2rem;
  font-size: 1rem;
}

.btn-white:hover {
  background-color: hsla(0, 0%, 100%, 0.9);
}

.btn-outline-white {
  background-color: transparent;
  color: hsl(0, 0%, 100%);
  padding: 1rem 2rem;
  font-size: 1rem;
  border: 2px solid hsl(0, 0%, 100%);
}

.btn-outline-white:hover {
  background-color: hsl(0, 0%, 100%);
  color: hsl(174, 62%, 40%);
}

/* ===== Animations ===== */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.fade-in-left {
  opacity: 0;
  animation: fadeInLeft 0.6s ease forwards;
}

.fade-in-right {
  opacity: 0;
  animation: fadeInRight 0.6s ease forwards;
}

.fade-in.visible,
.fade-in-left.visible,
.fade-in-right.visible {
  animation-play-state: running;
}

.footer {
  background-color: hsl(200, 25%, 15%);
  color: hsl(0, 0%, 100%);
}

.footer-cta {
  background: linear-gradient(135deg, hsla(174, 62%, 40%, 0.1) 0%, hsl(180, 30%, 96%) 100%);
  padding: 4rem 0;
}

.cta-box {
  background-color: hsl(174, 62%, 40%);
  padding: 3rem 2rem;
  border-radius: 1rem;
  text-align: center;
}

@media (min-width: 768px) {
  .cta-box {
    padding: 4rem 3rem;
  }
}

.cta-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: hsl(0, 0%, 100%);
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .cta-title {
    font-size: 2.5rem;
  }
}

.cta-description {
  color: hsla(0, 0%, 100%, 0.9);
  font-size: 1.125rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

@media (min-width: 640px) {
  .cta-buttons {
    flex-direction: row;
  }
}

.footer-main {
  padding: 4rem 0;
}

.footer-grid {
  display: grid;
  gap: 3rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
  }
}

/*.footer-logo {*/
/*  display: flex;*/
/*  align-items: center;*/
/*  gap: 0.5rem;*/
/*  margin-bottom: 1rem;*/
/*  font-family: 'Playfair Display', Georgia, serif;*/
/*  font-size: 1.25rem;*/
/*  font-weight: 600;*/
/*}*/

.footer-description {
  color: hsla(0, 0%, 100%, 0.7);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background-color: hsla(0, 0%, 100%, 0.1);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.social-link:hover {
  background-color: hsl(174, 62%, 40%);
}

.footer-title {
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
}

.footer-links ul li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: hsla(0, 0%, 100%, 0.7);
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: hsl(174, 62%, 40%);
}

.footer-contact ul li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: hsla(0, 0%, 100%, 0.7);
}

.footer-contact svg {
  color: hsl(174, 62%, 40%);
  flex-shrink: 0;
  margin-top: 2px;
}

.map-container {
  border-radius: 0.75rem;
  overflow: hidden;
  height: 180px;
}

.footer-bottom {
  border-top: 1px solid hsla(0, 0%, 100%, 0.1);
  padding: 1.5rem 0;
}

.footer-bottom-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .footer-bottom-content {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.footer-bottom p {
  color: hsla(0, 0%, 100%, 0.6);
  font-size: 0.875rem;
}

.footer-bottom-links {
  display: flex;
  gap: 1.5rem;
}

.footer-bottom-links a {
  color: hsla(0, 0%, 100%, 0.6);
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-bottom-links a:hover {
  color: hsl(174, 62%, 40%);
}

.footer-logo img {
    max-height: 100px;
    width: 45%;
    margin-left: -21px;
    margin-top: -22px;
}

.social-links ul {
    padding: 0px !important;
}

.madeby {
    font-size: 0.875rem;
    margin-top: -18px;
    color: inherit;
}

.footer-contact ul {
    padding: 0px !important;
}

.footer-links ul {
    padding: 0px !important;
}
</style>