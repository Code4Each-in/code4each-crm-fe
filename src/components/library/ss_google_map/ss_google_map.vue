<template>
    <div class="google-container">
        <div class="grid">
            <!-- Google Map - Left Side -->
            <div class="map-container">
                <div class="map-settings" @click.stop="openAddressPopup">
                    <i class="fa fa-cog" aria-hidden="true"></i>
                </div>
                <iframe
                :src="`https://www.google.com/maps?q=${encodeURIComponent(editableContent.address)}&output=embed`"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Location Map">
                </iframe>
                <div class="map-overlay"></div>
            </div>

            <!-- Text Content - Right Side -->
            <div class="content-container">
                <div>
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'googlemap-text1' }"
                        @click.stop="selectField('googlemap-text1')"
                        @mouseover="hoveredField = 'googlemap-text1'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'googlemap-text1'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'googlemap-text1'"
                            v-model="editableContent['googlemap-text1']"
                            @blur="blurAndUpdate('googlemap-text1', null, null, null, componentId)"
                        />
                        <span v-else class="badge">{{ editableContent['googlemap-text1'] }}</span>
                    </div>
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'googlemap-text2' }"
                        @click.stop="selectField('googlemap-text2')"
                        @mouseover="hoveredField = 'googlemap-text2'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'googlemap-text2'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'googlemap-text2'"
                            v-model="editableContent['googlemap-text2']"
                            @blur="blurAndUpdate('googlemap-text2', null, null, null, componentId)"
                        />
                        <h1 v-else>{{ editableContent['googlemap-text2'] }}</h1>
                    </div>
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'googlemap-description1' }"
                        @click.stop="selectField('googlemap-description1')"
                        @mouseover="hoveredField = 'googlemap-description1'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'googlemap-description1'" class="edit-label">Text</span>
                        <input
                            v-if="selectedField === 'googlemap-description1'"
                            v-model="editableContent['googlemap-description1']"
                            @blur="blurAndUpdate('googlemap-description1', null, null, null, componentId)"
                        />
                        <p v-else class="subtitle">{{ editableContent['googlemap-description1'] }}</p>
                    </div>
                </div>

                <div class="contact-info">
                    <!-- Address -->
                    <div class="contact-item">
                        <div class="icon-wrapper icon-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        </div>
                        <div>
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'googlemap-text3' }"
                                @click.stop="selectField('googlemap-text3')"
                                @mouseover="hoveredField = 'googlemap-text3'"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'googlemap-text3'" class="edit-label">Text</span>
                                <input
                                    v-if="selectedField === 'googlemap-text3'"
                                    v-model="editableContent['googlemap-text3']"
                                    @blur="blurAndUpdate('googlemap-text3', null, null, null, componentId)"
                                />
                                <h3 v-else>{{ editableContent['googlemap-text3'] }}</h3>
                            </div>
                            <p>
                                {{ editableContent.address }}
                            </p>
                        </div>
                    </div>

                    <!-- Phone -->
                    <div class="contact-item">
                        <div class="icon-wrapper icon-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        </div>
                        <div>
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'googlemap-text4' }"
                                @click.stop="selectField('googlemap-text4')"
                                @mouseover="hoveredField = 'googlemap-text4'"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'googlemap-text4'" class="edit-label">Text</span>
                                <input
                                    v-if="selectedField === 'googlemap-text4'"
                                    v-model="editableContent['googlemap-text4']"
                                    @blur="blurAndUpdate('googlemap-text4', null, null, null, componentId)"
                                />
                                <h3 v-else>{{ editableContent['googlemap-text4'] }}</h3>
                            </div>
                            <span>{{ editableContent.phone }}</span>
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="contact-item">
                        <div class="icon-wrapper icon-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2"/>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                        </div>
                        <div>
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'googlemap-text5' }"
                                @click.stop="selectField('googlemap-text5')"
                                @mouseover="hoveredField = 'googlemap-text5'"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'googlemap-text5'" class="edit-label">Text</span>
                                <input
                                    v-if="selectedField === 'googlemap-text5'"
                                    v-model="editableContent['googlemap-text5']"
                                    @blur="blurAndUpdate('googlemap-text5', null, null, null, componentId)"
                                />
                                <h3 v-else>{{ editableContent['googlemap-text5'] }}</h3>
                            </div>
                            <span>{{ editableContent.email }}</span>
                        </div>
                    </div>

                    <!-- Hours -->
                    <div class="contact-item">
                        <div class="icon-wrapper icon-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        </div>
                        <div>
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'googlemap-text6' }"
                                @click.stop="selectField('googlemap-text6')"
                                @mouseover="hoveredField = 'googlemap-text6'"
                                @mouseleave="hoveredField = null"
                            >
                                <span v-if="hoveredField === 'googlemap-text6'" class="edit-label">Text</span>
                                <input
                                    v-if="selectedField === 'googlemap-text6'"
                                    v-model="editableContent['googlemap-text6']"
                                    @blur="blurAndUpdate('googlemap-text6', null, null, null, componentId)"
                                />
                                <h3 v-else>{{ editableContent['googlemap-text6'] }}</h3>
                            </div>
                            <!-- LINE 1 — googlemap-text7 -->
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'googlemap-text7' }"
                                @click.stop="selectField('googlemap-text7')"
                                @mouseover="hoveredField = 'googlemap-text7'"
                                @mouseleave="hoveredField = null"
                            >
                                <input
                                    v-if="selectedField === 'googlemap-text7'"
                                    v-model="editableContent['googlemap-text7']"
                                    @blur="blurAndUpdate('googlemap-text7', null, null, null, componentId)"
                                />

                                <p v-else>{{ editableContent['googlemap-text7'] }}</p>
                            </div>

                            <!-- LINE 2 — googlemap-text8 -->
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'googlemap-text8' }"
                                @click.stop="selectField('googlemap-text8')"
                                @mouseover="hoveredField = 'googlemap-text8'"
                                @mouseleave="hoveredField = null"
                            >
                                <input
                                    v-if="selectedField === 'googlemap-text8'"
                                    v-model="editableContent['googlemap-text8']"
                                    @blur="blurAndUpdate('googlemap-text8', null, null, null, componentId)"
                                />

                                <p v-else>{{ editableContent['googlemap-text8'] }}</p>
                            </div>

                            <!-- LINE 3 — googlemap-text9 -->
                            <div
                                class="ss_editable"
                                :class="{ selected: selectedField === 'googlemap-text9' }"
                                @click.stop="selectField('googlemap-text9')"
                                @mouseover="hoveredField = 'googlemap-text9'"
                                @mouseleave="hoveredField = null"
                            >
                                <input
                                    v-if="selectedField === 'googlemap-text9'"
                                    v-model="editableContent['googlemap-text9']"
                                    @blur="blurAndUpdate('googlemap-text9', null, null, null, componentId)"
                                />

                                <p v-else>{{ editableContent['googlemap-text9'] }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <span class="cta-button">
                        <div
                            class="ss_editable"
                            :class="{ selected: selectedField === 'googlemap-text10' }"
                            @click.stop="selectField('googlemap-text10')"
                            @mouseover="hoveredField = 'googlemap-text10'"
                            @mouseleave="hoveredField = null"
                        >
                            <input
                                v-if="selectedField === 'googlemap-text10'"
                                v-model="editableContent['googlemap-text10']"
                                @blur="blurAndUpdate('googlemap-text10', null, null, null, componentId)"
                            />

                            <p v-else>{{ editableContent['googlemap-text10'] }}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <!-- Address Settings Popup -->
    <div v-if="showAddressPopup" class="popup-overlay" @click="showAddressPopup = false">
        <div class="popup-box" @click.stop>
            <h3>Map Setting</h3>

            <label>Address</label>
            <input v-model="popupAddress.address" />

            <label>City</label>
            <input v-model="popupAddress.city" />

            <label>State</label>
            <input v-model="popupAddress.state" />

            <label>Country</label>
            <input v-model="popupAddress.country" />

            <label>Pin Code</label>
            <input v-model="popupAddress.pincode" />

            <div class="popup-btn-row">
                <button class="popup-cancel-btn" @click="showAddressPopup = false">
                    Cancel
                </button>

                <button class="popup-save-btn" @click="updateAddressChanges">
                    Save Changes
                </button>
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
        :activeComponentId="activeComponentId"
        @close="closeSidebar"
        @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file, componentId)"
        @image-upload="(e, field) => handleImageUpload(e, field, 'google_map', componentId)"
    />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useEditable } from '../library';
import SidebarEditor from '../SidebarEditor.vue';
import WordpressService from "@/service/WordpressService";
import { useStore } from "@/stores/store";

const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            address: '123 Main St, Anytown, USA',
            phone: '(123) 456-7890',
            email: 'support@speedysites.com',
            'googlemap-text1': 'Get in Touch',
            'googlemap-text2': 'Visit Our Location',
            'googlemap-description1': 'We are here to assist you. Reach out to us through any of the following ways.',
            'googlemap-text3': 'Our Address',
            'googlemap-text4': 'Call Us',
            'googlemap-text5': 'Email Us',
            'googlemap-text6': 'Business Hours',
            'googlemap-text7': 'Mon-Fri: 9am - 6pm',
            'googlemap-text8': 'Sat: 10am - 4pm',
            'googlemap-text9': 'Sun: Closed',
            'googlemap-text10': 'Get Directions',
        }),
    },
});

const emit = defineEmits(['field-updated']);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_GOOGLE_MAP_90';
const showAddressPopup = ref(false);
const dashboardData = ref([]);
const siteSettingsDetail = ref(null);
const store = useStore();

const popupAddress = ref({
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: ""
});

watch(() => props.data, (newVal) => {
    editableContent.value = { ...newVal };
}, { immediate: true, deep: true });

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

function openAddressPopup() {
  // Load data from API (dashboardData) into popup fields
  const agency = dashboardData.value.agency_website_info?.[0];
  console.log("Agency Data:", agency);

  popupAddress.value.address = agency?.address ?? "";
  popupAddress.value.city = agency?.city ?? "";
  popupAddress.value.state = agency?.state ?? "";
  popupAddress.value.country = agency?.country ?? "";
  popupAddress.value.pincode = agency?.pin ?? "";

  showAddressPopup.value = true;
}

const fetchDashboardData = async () => {
  try {
    const res = await WordpressService.fetchDashboardData();

    if (res.status === 200 && res.data.success) {
      dashboardData.value = res.data;

      const agency = res.data.agency_website_info?.[0];

      if (agency) {
        popupAddress.value.address = agency.address ?? "";
        popupAddress.value.city = agency.city ?? "";
        popupAddress.value.state = agency.state ?? "";
        popupAddress.value.country = agency.country ?? "";
        popupAddress.value.pincode = agency.pin ?? "";
      }
    }
  } catch (error) {
    console.error("Dashboard fetch error:", error);
  }
};

const updateAddressChanges= async () => {
  try {
    const formData = new FormData();
    formData.append("address", popupAddress.value.address || "");
    formData.append("city", popupAddress.value.city || "");
    formData.append("state", popupAddress.value.state || "");
    formData.append("country", popupAddress.value.country || "");
    formData.append("pincode", popupAddress.value.pincode || "");
    formData.append("website_domain", siteSettingsDetail.value?.staging_domain || "");
    formData.append("agency_id", dashboardData.value.agency_website_info?.[0]?.id || "");

    const res = await WordpressService.UpdateMapAddress.updateAddressChanges(formData);

    if (res.status === 200) {
        await fetchDashboardData();
        const fullAddress = `${popupAddress.value.address}, ${popupAddress.value.city}, ${popupAddress.value.state}, ${popupAddress.value.country}, ${popupAddress.value.pincode}`;
        editableContent.value.address = fullAddress;

        showAddressPopup.value = false;

        console.log("Address updated successfully", res.data);
    }
  } catch (error) {
    console.error("Error updating address:", error);
  }
}

const getSiteDetails = async () => {
  if (!store.websiteId) return;
  try {
    const res = await WordpressService.WebsiteSettings.getSiteDetail({ website_id: store.websiteId });
    if (res.status === 200 && res.data.success) {
      siteSettingsDetail.value = res.data.settings_detail;
    }
  } catch (error) {
    console.error("Error fetching site details:", error);
  }
};

onMounted(async () => {
    await fetchDashboardData();
    await getSiteDetails();
});
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

    .google-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 4rem 1rem;
    }

    .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: center;
    }

    @media (min-width: 1024px) {
    .google-container {
        padding: 6rem 1rem;
    }
    
    .grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 3rem;
    }
    }

    /* Map Container */
    .map-container {
    order: 2;
    position: relative;
    border-radius: 1rem;
    /* overflow: hidden; */
    box-shadow: 0 8px 30px -8px hsl(25 25% 15% / 0.15);
    height: 400px;
    animation: fadeIn 0.7s ease-out, slideInLeft 0.7s ease-out;
    }

    @media (min-width: 1024px) {
    .map-container {
        order: 1;
        height: 600px;
    }
    }

    .map-container iframe {
    width: 100%;
    height: 100%;
    border: 0;
    }

    .map-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(to top, hsl(30 40% 98% / 0.05), transparent);
    }

    /* Content Container */
    .content-container {
    order: 1;
    animation: fadeIn 0.7s ease-out, slideInRight 0.7s ease-out;
    }

    @media (min-width: 1024px) {
    .content-container {
        order: 2;
    }
    }

    .badge {
    display: inline-block;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: hsl(180 60% 45%);
    background-color: hsl(180 50% 92%);
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    margin-bottom: 1rem;
    }

    h1 {
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    }

    @media (min-width: 1024px) {
    h1 {
        font-size: 3rem;
    }
    }

    @media (min-width: 1280px) {
    h1 {
        font-size: 3.75rem;
    }
    }

    .subtitle {
    font-size: 1.125rem;
    color: hsl(25 15% 45%);
    line-height: 1.8;
    margin-bottom: 2rem;
    }

    @media (min-width: 1024px) {
    .subtitle {
        font-size: 1.25rem;
    }
    }

    /* Contact Info */
    .contact-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-top: 1rem;
    margin-bottom: 1.5rem;
    }

    .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: all 0.3s ease;
    }

    .icon-wrapper {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    }

    .icon-primary {
    background-color: hsl(180 60% 45% / 0.1);
    }

    .icon-secondary {
    background-color: hsl(25 45% 55% / 0.1);
    }

    .contact-item:hover .icon-primary {
    background-color: hsl(180 60% 45% / 0.2);
    }

    .contact-item:hover .icon-secondary {
    background-color: hsl(25 45% 55% / 0.2);
    }

    .icon-wrapper svg {
    width: 1.25rem;
    height: 1.25rem;
    }

    .icon-primary svg {
    color: hsl(180 60% 45%);
    }

    .icon-secondary svg {
    color: hsl(25 45% 55%);
    }

    .contact-item h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    }

    .contact-item p,
    .contact-item a {
    color: hsl(25 15% 45%);
    text-decoration: none;
    transition: color 0.3s ease;
    }

    .contact-item a:hover {
    color: hsl(180 60% 45%);
    }

    /* CTA Button */
    .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: hsl(180 60% 45%);
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    }

    .cta-button:hover {
    box-shadow: 0 10px 40px -10px hsl(180 60% 45% / 0.5);
    transform: scale(1.05);
    }

    .cta-button svg {
    width: 1.25rem;
    height: 1.25rem;
    }

    /* Animations */
    @keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
    }

    @keyframes slideInLeft {
    from {
        transform: translateX(-30px);
    }
    to {
        transform: translateX(0);
    }
    }

    @keyframes slideInRight {
    from {
        transform: translateX(30px);
    }
    to {
        transform: translateX(0);
    }
    }
    p {
        margin-top: 0;
        margin-bottom: 0;
    }
    .map-container {
        position: relative; 
    }

    .map-settings {
        position: absolute;
        top: -19px;
        right: -19px;
        z-index: 50; 
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border: 2px solid #00adb5;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.25s ease;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    }

    .map-settings:hover {
        background: #00adb5;
        color: white;
        transform: scale(1.1);
    }

    .map-settings i {
        font-size: 18px;
    }
    .popup-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.55);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .popup-box {
        width: 400px;
        background: #fff;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        animation: popupFadeIn 0.3s ease;
    }

    .popup-box h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }

    .popup-box label {
        font-weight: 600;
        margin-top: 1rem;
        display: block;
    }

    .popup-box input {
        width: 100%;
        margin-top: .3rem;
        padding: .6rem;
        border: 1px solid #ccc;
        border-radius: 6px;
    }

    .popup-save-btn {
        width: 100%;
        /* margin-top: 1.5rem; */
        padding: .8rem;
        background: #00adb5;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: .25s;
    }

    .popup-save-btn:hover {
        background: #008a92;
    }

    @keyframes popupFadeIn {
        from {opacity: 0; transform: scale(.9);}
        to {opacity: 1; transform: scale(1);}
    }
    .popup-btn-row {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .popup-cancel-btn {
        flex: 1;
        padding: .8rem;
        background: #ccc;
        color: #333;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: .25s;
    }

    .popup-cancel-btn:hover {
        background: #b3b3b3;
    }

    .popup-save-btn {
        flex: 1;
    }

</style>