<template>
    <footer id="contact">
        <div class="section-padding" style="padding-bottom: 3rem;">
            <div class="footer__cta-wrapper">
                <div class="footer__cta crimson-gradient fade-up">
                    <h2
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
                        <span v-else>{{ editableContent['footer-text1'] }}</span>
                    </h2>
                    <p
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
                        <span v-else>{{ editableContent['footer-text2'] }}</span>
                    </p>
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'footer-button1' }"
                        @mouseover="hoveredField = 'footer-button1'"
                        @mouseleave="hoveredField = null"
                        v-if="editableContent['footer-button1']"
                    >
                        <span v-if="hoveredField === 'footer-button1'" class="edit-label">Button</span>

                        <!-- Button that opens the sidebar -->
                        <button
                            class="btn-royal dark"
                            @click.stop="selectField('footer-button1', 'button', 'footer', componentId)"
                        >
                            {{ editableContent['footer-button1'] }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer__map-contact">
            <div class="footer__map fade-left">
                <iframe
                    :src="`https://www.google.com/maps?q=${encodeURIComponent(editableContent.address)}&output=embed`"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Location Map">
                </iframe>
            </div>

            <div class="footer__contact section-padding fade-right">
                <span
                    class="footer__contact-label ss_editable"
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
                </span>
                <h3>
                    <span
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
                        <span v-else class="footer-main1">{{ editableContent['footer-text4'] }}</span>
                    </span>
                    <em class="crimson-text">
                        <span
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
                            <span v-else>{{ editableContent['footer-text5'] }}</span>
                        </span>
                    </em>
                </h3>

                <div class="footer__info">
                    <div class="footer__info-item">
                        <div class="footer__info-icon glass-card">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        </div>
                        <span
                            class="footer__info-text ss_editable"
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
                        </span>
                    </div>
                    <div class="footer__info-item">
                        <div class="footer__info-icon glass-card">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </div>
                        <span
                            class="footer__info-text ss_editable"
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
                        </span>
                    </div>
                    <div class="footer__info-item">
                        <div class="footer__info-icon glass-card">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        </div>
                        <span
                            class="footer__info-text ss_editable"
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
                        </span>
                    </div>
                </div>
                <div
                    class="ss_editable"
                    :class="{ selected: selectedField === 'footer-button2' }"
                    @mouseover="hoveredField = 'footer-button2'"
                    @mouseleave="hoveredField = null"
                    v-if="editableContent['footer-button2']"
                >
                    <span v-if="hoveredField === 'footer-button2'" class="edit-label">Button</span>

                    <!-- Button that opens the sidebar -->
                    <button
                        class="btn-royal filled"
                        @click.stop="selectField('footer-button2', 'button', 'footer', componentId)"
                    >
                        {{ editableContent['footer-button2'] }}
                    </button>
                </div>
            </div>
        </div>

        <div class="footer__bottom">
            <div class="footer__bottom-logo">
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
            <p class="footer__bottom-copy">© {{ new Date().getFullYear() }} {{ editableContent.copyright }} All rights reserved. Site By <span>SpeedySites</span></p>
            <ul
                class="footer__bottom-links ss_editable"
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
        "footer-button1": "Contact Us",
        "footer-text3": "Call Now",
        "footer-text4": "Email Us",
        "footer-text5": "Quick Links",
        "footer-text6": "Contact Us",
        "footer-text7": "Mon - Fri: 9:00 AM - 6:00 PM",
        "footer-text8": "Sat - Sun: Closed",
        "footer-button2": "Contact Us",
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
const componentId = 'COMP_SS_MARKETING_FOOTER2_108';
  
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

h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', Georgia, serif; }

a { color: inherit; text-decoration: none; }

.section-padding { padding: 5rem 6rem; }
@media (max-width: 768px) { .section-padding { padding: 3rem 1.5rem; } }

.crimson-gradient { background: linear-gradient(135deg, #b42d5a, #d44a76); }

.crimson-text {
    /* background: linear-gradient(135deg, #b42d5a, #d44a76) !important; */
    /* -webkit-background-clip: text; */
    /* -webkit-text-fill-color: transparent; */
    background-clip: text;
    color: #b42d5a
}

.silver-text {
  background: linear-gradient(135deg, #b8b8b8, #d9d9d9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass-card {
  background: rgba(17, 10, 13, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(180, 45, 90, 0.15);
  border-radius: 1rem;
}

.btn-royal {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-royal.filled {
  background: linear-gradient(135deg, #b42d5a, #d44a76);
  color: #f2e8ec;
  box-shadow: 0 10px 25px -5px rgba(180, 45, 90, 0.3);
}
.btn-royal.filled:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 35px -5px rgba(180, 45, 90, 0.45);
}

.btn-royal.outline {
  background: transparent;
  color: #b42d5a;
  border: 2px solid #b42d5a;
}
.btn-royal.outline:hover {
  background: #b42d5a;
  color: #f2e8ec;
}

.btn-royal.dark {
  background: #110a0d;
  color: #ebe4e7;
}
.btn-royal.dark:hover { background: rgba(17, 10, 13, 0.9); }

.footer__cta-wrapper { max-width: 64rem; margin: 0 auto; }

.footer__cta {
  border-radius: 1.5rem;
  padding: 3rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
@media (max-width: 768px) { .footer__cta { padding: 2rem 1.5rem; } }

.footer__cta h2 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 700;
  color: #f2e8ec;
  margin-bottom: 1rem;
}
.footer__cta p { color: rgba(242, 232, 236, 0.8); margin-bottom: 2rem; max-width: 32rem; margin-left: auto; margin-right: auto; }

.footer__map-contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
@media (max-width: 1024px) { .footer__map-contact { grid-template-columns: 1fr; } }

.footer__map { height: 31rem; }
@media (max-width: 1024px) { .footer__map { height: 25rem; } }
.footer__map iframe { width: 100%; height: 100%; border: 0; filter: invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2); }

.footer__contact {
  background: #1f1418;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.footer__contact-label {
  color: #b42d5a;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.footer__contact h3 {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  margin-bottom: 2rem;
}
.footer__contact h3 em { font-style: italic; }

.footer__info { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2.5rem; }

.footer__info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.footer__info-icon {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer__info-icon svg { width: 1.25rem; height: 1.25rem; color: #b42d5a; }
.footer__info-text { color: #87707a; transition: color 0.3s; }
.footer__info-item:hover .footer__info-text { color: #ebe4e7; }

.footer__bottom {
  border-top: 1px solid #2a1c21;
  padding: 1.5rem 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
@media (max-width: 768px) { .footer__bottom { padding: 1.5rem; flex-direction: column; text-align: center; } }

.footer__bottom-logo { font-family: var(--font-display); font-size: 1.125rem; font-weight: 700; }
.footer__bottom-copy { font-size: 0.75rem; color: #87707a; letter-spacing: 0.05em; }
.footer__bottom-links { display: flex; gap: 1.5rem; font-size: 0.875rem; color: #87707a; list-style: none; }
.footer__bottom-links a:hover { color: #b42d5a; }

/* Arrow icon inline */
.arrow-icon { display: inline-block; width: 1rem; height: 1rem; vertical-align: middle; transition: transform 0.3s; }
.btn-royal:hover .arrow-icon { transform: translateX(4px); }

/* Animations */
.fade-up {
  opacity: 1;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-up.visible { opacity: 1; transform: translateY(0); }

.fade-left {
  opacity: 1;
  /* transform: translateX(-40px); */
  transition: opacity 0.9s ease, transform 0.9s ease;
}
.fade-left.visible { opacity: 1; transform: translateX(0); }

.fade-right {
  opacity: 1;
  /* transform: translateX(40px); */
  transition: opacity 0.9s ease, transform 0.9s ease;
}
.fade-right.visible { opacity: 1; transform: translateX(0); }

footer#contact {
    background: #110a0d;
}

span.footer-main1 {
    color: #fff;
}
</style>