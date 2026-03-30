<template>
    <footer class="footer" id="contact">
        <div class="container">
            <div class="footer-grid">
                <div>
                    <div
                        class="footer-details ss_editable"
                        @click.stop="selectField('logo', 'logo')"
                        @mouseover="hoveredField = 'logo'"
                        @mouseleave="hoveredField = null"
                        :class="{ selected: selectedField === 'logo' }"
                    >
                        <span v-if="hoveredField === 'logo'" class="edit-label">Logo</span>
                        <img :src="editableContent.logo" alt="Footer Logo" class="logo" />
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
                    <p v-else>{{ editableContent['footer-description1'] }}</p>
                    </div>
                    <p style="margin-top: 20px;"><i class="fa fa-map-marker" style="margin-right:4px; color:rgba(245, 240, 232, 0.8); margin-top: 8px;"></i>{{ editableContent.address }}</p>
                    <p><i class="fa fa-phone" aria-hidden="true" style="margin-right:4px; color:rgba(245, 240, 232, 0.8); margin-top: 8px;"></i>{{ editableContent.phone }}</p>
                    <p><i class="fa fa-envelope" aria-hidden="true" style="margin-right:4px; color:rgba(245, 240, 232, 0.8); margin-top: 8px;"></i>{{ editableContent.email }}</p>
                </div>
                <div>
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'footer-text1' }"
                        @click.stop="selectField('footer-text1')"
                        @mouseover="hoveredField = 'footer-text1'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'footer-text1'" class="edit-label">Heading</span>
                        <input
                            v-if="selectedField === 'footer-text1'"
                            v-model="editableContent['footer-text1']"
                            @blur="blurAndUpdate('footer-text1', null, 'footer', null, componentId)"
                        />
                        <h4 v-else>{{ editableContent['footer-text1'] }}</h4>
                    </div>
                    <ul
                        class="footer-links ss_editable"
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
                <div>
                    <div
                        class="ss_editable"
                        :class="{ selected: selectedField === 'footer-text2' }"
                        @click.stop="selectField('footer-text2')"
                        @mouseover="hoveredField = 'footer-text2'"
                        @mouseleave="hoveredField = null"
                    >
                        <span v-if="hoveredField === 'footer-text2'" class="edit-label">Heading</span>
                        <input
                            v-if="selectedField === 'footer-text2'"
                            v-model="editableContent['footer-text2']"
                            @blur="blurAndUpdate('footer-text2', null, 'footer', null, componentId)"
                        />
                        <h4 v-else>{{ editableContent['footer-text2'] }}</h4>
                    </div>
                    <div class="footer-map">
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
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2024 LuxuryEstate. All rights reserved.</p>
                <div class="social-links">
                <a href="#">f</a>
                <a href="#">in</a>
                <a href="#">ig</a>
                <a href="#">yt</a>
                </div>
            </div>
        </div>
    </footer>
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
import { ref, watch, onMounted } from "vue";
import { useEditable } from "../library";
import SidebarEditor from "../SidebarEditor.vue";
import WordpressService from "@/service/WordpressService";
import { useStore } from "@/stores/store";
  
const props = defineProps({
data: {
    type: Object,
    default: () => ({
    logo: "/images/logo.png",
    "footer-description1": "Default footer description goes here.",
    phone: "+91 99999 99999",
    address: "123 Street, City, State, Country",
    email: "",
    "footer-text1": "Contact",
    "footer-text2": "Quick Links",
    menu: ["Home", "About", "Services", "Contact"],
    socialLinks: ["fa fa-facebook", "fa fa-instagram"],
    copyright : "agency_name"
    }),
},
});
  
const emit = defineEmits(["update"]);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_OTHER_FOOTER_94';
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
.footer {
  background: #1a2744;
  color: #f5f0e8;
  padding: 60px 0 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 3fr 2fr 3fr 0.5fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer h4 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #d4a853;
}

.footer p {
  color: rgba(245, 240, 232, 0.8);
  margin-bottom: 5px;
}

.footer-details a {
    display: flex;
    color: rgba(245, 240, 232, 0.8) !important;
    line-height: 30px;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: rgba(245, 240, 232, 0.8);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #d4a853;
}

.footer-map {
  border-radius: 8px;
  /* overflow: hidden; */
  position: relative;
}

.footer-map iframe {
  width: 100%;
  height: 200px;
  border: none;
}

.footer-bottom {
  border-top: 1px solid rgba(245, 240, 232, 0.2);
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-links {
  display: flex;
  gap: 15px;
  list-style-type: none;
}

.social-links a {
  width: 40px;
  height: 40px;
  background: rgba(245, 240, 232, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5f0e8;
  text-decoration: none;
  transition: background 0.3s;
}

.social-links a:hover {
  background: #d4a853;
}

.footer-details .logo {
  max-height: 100px;
  width: 73%;
  margin-left: -21px;
  margin-top: -47px;
}
.map-settings {
    position: absolute;
    right: -18px;
    top: -18px;
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
    color: #000;
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