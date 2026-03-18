<template>
    <footer class="royal-gradient" id="contact">
        <div class="footer-map">
            <iframe
                :src="`https://www.google.com/maps?q=${encodeURIComponent(editableContent.address)}&output=embed`"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Location Map">
            </iframe>
            <div class="footer-map-overlay"></div>
        </div>
        <div class="footer-content">
            <div class="footer-grid">
                <!-- Brand -->
                <div>
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
                    <div class="gold-divider" style="width: 3rem; margin-bottom: 1rem;"></div>
                    <p
                        class="footer-brand-desc ss_editable"
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
                    </p>
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

                <!-- Quick Links -->
                <div class="footer-quick-links">
                    <h4
                        class="footer-heading ss_editable"
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
                        <span v-else>{{ editableContent['footer-text1'] }}</span>
                    </h4>
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
                            <span class="footer-link">{{ item }}</span>
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
            
                <!-- Contact -->
                <div class="footer-contacts">
                    <h4
                        class="footer-heading ss_editable"
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
                        <span v-else>{{ editableContent['footer-text2'] }}</span>
                    </h4>
                    <div class="footer-contact-item">
                        <i class="fa fa-map-marker" style="width:18px;height:18px;"></i>
                        <span>
                            <i class="bi bi-geo-alt"></i> {{ editableContent.address }}
                        </span>
                    </div>
                    <div class="footer-contact-item">
                        <i class="fa fa-phone" style="width:18px;height:18px;"></i>
                        <span>{{ editableContent.phone }}</span>
                    </div>
                    <div class="footer-contact-item">
                        <i class="fa fa-envelope" style="width:18px;height:18px;"></i>
                        <span>{{ editableContent.email }}</span>
                    </div>
                </div>
    
                <!-- Hours -->
                <div>
                    <h4
                        class="footer-heading ss_editable"
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
                    </h4>
                    <div class="footer-hours-item">
                        <i class="fa fa-clock-o" style="width:16px;height:16px;margin-top: 7px; "></i>
                        <div>
                            <p
                                class="footer-hours-day ss_editable"
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
                            </p>
                            <p
                                class="footer-hours-time ss_editable"
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
                                <span v-else>{{ editableContent['footer-text5'] }}</span>
                            </p>
                        </div>
                    </div>
                
                    <div class="footer-hours-item">
                        <i class="fa fa-clock-o" style="width:16px;height:16px;margin-top: 7px; "></i>
                        <div>
                            <p
                                class="footer-hours-day ss_editable"
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
                                <span v-else>{{ editableContent['footer-text6'] }}</span>
                            </p>
                            <p
                                class="footer-hours-time ss_editable"
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
                            </p>
                        </div>
                    </div>
                    <div class="footer-hours-item">
                        <i class="fa fa-clock-o" style="width:16px;height:16px;margin-top: 7px; "></i>
                        <div>
                            <p
                                class="footer-hours-day ss_editable"
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
                            </p>
                            <p
                                class="footer-hours-time ss_editable"
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
                                <span v-else>{{ editableContent['footer-text9'] }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="gold-divider" style="width: 100%; margin: 3rem 0 1.5rem;"></div>
                <p class="footer-bottom-text">© {{ new Date().getFullYear() }} {{ editableContent.copyright }} All rights reserved. Site By <span>SpeedySites</span>
                </p>
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
import { ref, watch, onMounted } from "vue";
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
const componentId = 'COMP_SS_MARKETING_FOOTER1_104';
  
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

h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; }

a { text-decoration: none; color: inherit; }
ul { list-style: none; }
img { display: block; max-width: 100%; }

/* ============ UTILITY CLASSES ============ */
.gold-text {
  background: linear-gradient(135deg, hsl(40, 60%, 50%), hsl(40, 70%, 65%), hsl(40, 60%, 50%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gold-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, hsl(40, 60%, 50%), transparent);
}

.royal-gradient {
  background: linear-gradient(135deg, hsl(220, 45%, 22%) 0%, hsl(220, 45%, 30%) 50%, hsl(220, 45%, 22%) 100%);
}

.royal-overlay {
  background: linear-gradient(180deg, hsl(269deg 45% 12% / 69%) 0%, hsl(220deg 45% 12% / 52%) 50%, hsla(220, 45%, 12%, 0.8) 100%);
}

.section-padding {
  padding: 5rem 1.5rem;
}

/* ============ ANIMATIONS ============ */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-float { animation: float 6s ease-in-out infinite; }

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-left {
  animation: slideLeft 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-right {
  animation: slideRight 0.8s ease-out forwards;
  opacity: 0;
}

.hidden-before-animate { opacity: 0; }

/* ============ FOOTER ============ */
.footer-map {
  width: 100%;
  height: 400px;
  position: relative;
}

.footer-map iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.footer-map-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, transparent 60%, hsla(220, 45%, 22%, 0.6));
}

.footer-content {
  padding: 4rem 1.5rem;
}

.footer-grid {
  max-width: 80rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

.footer-brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: hsl(40, 30%, 95%);
  margin-bottom: 0.5rem;
}

.footer-brand-desc {
  font-family: 'Raleway', sans-serif;
  font-size: 0.875rem;
  color: hsla(40, 30%, 95%, 0.6);
  line-height: 1.7;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-link {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid hsla(40, 60%, 50%, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsla(40, 60%, 50%, 0.6);
  transition: all 0.3s;
}

.social-link:hover {
  background: hsl(40, 60%, 50%);
  color: hsl(220, 45%, 22%);
}

.footer-heading {
  font-family: 'Playfair Display', serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: hsl(40, 60%, 50%);
  margin-bottom: 1rem;
}

.footer-link {
  display: block;
  font-family: 'Raleway', sans-serif;
  font-size: 0.875rem;
  color: hsla(40, 30%, 95%, 0.6);
  padding: 0.375rem 0;
  transition: color 0.3s;
}

.footer-link:hover { color: hsl(40, 60%, 50%); }

.footer-contact-item {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: hsla(40, 30%, 95%, 0.6);
}

.footer-contact-item i, .footer-contact-item svg {
  color: hsl(40, 60%, 50%);
  flex-shrink: 0;
  margin-top: 2px;
  width: 18px;
  height: 18px;
}

.footer-contact-item p {
  font-family: 'Raleway', sans-serif;
  font-size: 0.875rem;
  color: hsla(40, 30%, 95%, 0.6);
}

.footer-hours-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.footer-hours-item i, .footer-hours-item svg {
  color: hsl(40, 60%, 50%);
  flex-shrink: 0;
  margin-top: 2px;
  width: 16px;
  height: 16px;
}

.footer-hours-day {
  font-family: 'Raleway', sans-serif;
  font-size: 0.875rem;
  color: hsla(40, 30%, 95%, 0.8);
  font-weight: 500;
}

.footer-hours-time {
  font-family: 'Raleway', sans-serif;
  font-size: 0.75rem;
  color: hsla(40, 30%, 95%, 0.5);
}

.footer-bottom {
  max-width: 80rem;
  margin: 0 auto;
  display: block !important;
}

.footer-bottom-text {
  text-align: center;
  font-family: 'Raleway', sans-serif;
  font-size: 0.75rem;
  color: hsla(40, 30%, 95%, 0.4);
  letter-spacing: 0.1em;
}

/* ============ RESPONSIVE ============ */
@media (min-width: 768px) {
  .section-padding { padding: 5rem 3rem; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}

@media (min-width: 1024px) {
  .section-padding { padding: 7rem 6rem; }
  .footer-grid { grid-template-columns: 1fr 1fr 1fr 1fr; }
}

.footer-quick-links a {
    color: hsla(40, 30%, 95%, 0.8);
}

.footer-quick-links a:hover {
    color: hsl(40, 60%, 50%);
}

.footer-contacts a {
    color: hsla(40, 30%, 95%, 0.8);
}

.footer-contacts a:hover {
    color: hsl(40, 60%, 50%);
}

.footer-bottom a {
    color: hsl(40, 60%, 50%);
}
</style>