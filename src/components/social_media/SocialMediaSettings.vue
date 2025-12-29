<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store";
import { useAuth } from "@/service/useAuth";
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import FlashMessage from "@/components/common/FlashMessage.vue";
import WordpressService from "@/service/WordpressService";

/* ---------------- STORES ---------------- */
const store = useStore();
const router = useRouter();
const { logout: doLogout } = useAuth();

/* ---------------- STATE ---------------- */
const isSidebarToggled = ref(false);
const dashboardData = ref({});
const loading = ref(true);
const error = ref(false);
const showPostModal = ref(false);
const fileInput = ref(null);

const connectedPlatforms = ref({
    facebook: { connected: false },
    instagram: { connected: false },
    linkedin: { connected: false },
});

const platforms = [
    { name: "Facebook", key: "facebook", icon: "/images/facebook.png" },
    { name: "Instagram", key: "instagram", icon: "/images/instagram.png" },
    { name: "LinkedIn", key: "linkedin", icon: "/images/linkedin.png" },
];

const postForm = ref({
    media: null,
    caption: "",
    platforms: [],
    schedule: false, 
    scheduledDate: "",
    scheduledTime: "", 
});

/* ---------------- COMPUTED ---------------- */
const flashClass = computed(() =>
    store.flashMeassgeType === "error" ? "flash-error" : "flash-success"
);

const connectedPlatformList = computed(() =>
    platforms.filter(p => connectedPlatforms.value[p.key]?.connected)
);

const mediaPreview = computed(() => {
  if (!postForm.value.media) return null;
  return URL.createObjectURL(postForm.value.media);
});

const canSubmit = computed(() =>
  postForm.value.media && postForm.value.platforms.length > 0
);

/* ---------------- METHODS ---------------- */
const navBarToggle = (v) => (isSidebarToggled.value = v);

const logout = async () => {
    await doLogout();
    router.push("/login");
};

const openPostModal = () => {
    showPostModal.value = true;

    // Auto-select all connected platforms
    postForm.value.platforms = Object.keys(connectedPlatforms.value)
        .filter(key => connectedPlatforms.value[key]?.connected);
};

const closePostModal = () => {
    showPostModal.value = false;
    postForm.value = {
        media: null,
        caption: "",
        platforms: [],
        schedule: false,
        scheduledDate: "",
        scheduledTime: "",
    };
};

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Save the file object directly (image or video)
  postForm.value.media = file;
};

const togglePlatform = (key) => {
    const i = postForm.value.platforms.indexOf(key);
    i === -1
        ? postForm.value.platforms.push(key)
        : postForm.value.platforms.splice(i, 1);
};

/* ---------------- API ---------------- */
const fetchDashboardData = async () => {
    try {
        const res = await WordpressService.fetchDashboardData();
        if (res.data.success) dashboardData.value = res.data;
    } catch {
        router.push("/login");
    } finally {
        loading.value = false;
    }
};

const getConnectedPlatforms = async () => {
    const res = await WordpressService.PlatformIntegration.fetchConnectedPlatforms({
        user_id: dashboardData.value?.user?.id,
    });
    if (res.data.success) connectedPlatforms.value = res.data;
};

const handlePlatformSelect = (key) => {
    if (!connectedPlatforms.value[key]?.connected) {
        store.updateFlashMeassge(true, "This platform is not connected. Please connect it first.", 'error');
        return;
    }

    togglePlatform(key);
};

const submitPost = async () => {
    if (!canSubmit.value) return;
    try {
        const formData = new FormData();
        const user_id = dashboardData.value?.user?.id;
        const agency_id = dashboardData.value.user.agency_id;
        formData.append("user_id", user_id);
        formData.append("agency_id", agency_id);
        formData.append("media", postForm.value.media);
        formData.append("caption", postForm.value.caption);
        postForm.value.platforms.forEach((p, index) => {
            formData.append(`platforms[${index}]`, p);
        });
        if (postForm.value.schedule && postForm.value.scheduledDate && postForm.value.scheduledTime) {
            const scheduledAt = `${postForm.value.scheduledDate} ${postForm.value.scheduledTime}`;
            formData.append("scheduled_at", scheduledAt);
        } else {
            formData.append("scheduled_at", "");
        }
        const res = await WordpressService.PlatformIntegration.createPost(formData);
        if (res.data.success) {
            store.flashMeassge = "Post created successfully";
            store.flashMeassgeType = "success";
            closePostModal();
            await fetchDashboardData(); 
        }
    } catch (err) {
        store.flashMeassge = "Failed to create post";
        store.flashMeassgeType = "error";
        console.error(err);
    }
};

const connectPlatform = (platform) => {
    if (platform !== 'facebook') return;
    const baseUrl = import.meta.env.VITE_CRM_API_URL;
    const userId = dashboardData.value?.user?.id;
    if (!baseUrl) {
        console.error("VITE_CRM_API_URL is not defined!");
        return;
    }
    window.location.href = `${baseUrl}/auth/facebook/redirect?user_id=${userId}`;
};

onMounted(async () => {
    loading.value = true;
    await fetchDashboardData();
    await getConnectedPlatforms();
    loading.value = false;
});
</script>

<template>
    <div class="page">
        <FlashMessage :visible="store.flashMeassge" v-if="store.flashMeassge" :class="flashClass" />
        <NavBar @logout="logout" @nav-bar-toggle="navBarToggle" :dashboardData="dashboardData?.user" />
        <SideBar :dashboardData="dashboardData" :toggled="isSidebarToggled" />
        <div v-if="loading" class="loader-wrapper">
            <div class="three-body">
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
            </div>
        </div>
        <div v-else class="social-media-section page-wrapper">
            <div class="container">
                <div class="socialsection">
                    <h2>Social Media Connections</h2>
                    <p>Manage your connected platforms</p>
                </div>
                <div class="divider">
                    <span>Social platforms</span>
                </div>
                <div class="social-buttons">
                    <button
                        v-for="platform in platforms"
                        :key="platform.key"
                        class="social-btn"
                        :class="[
                            platform.key,
                            connectedPlatforms[platform.key].connected ? 'connected' : ''
                        ]"
                        :disabled="connectedPlatforms[platform.key].connected"
                        @click="connectPlatform(platform.key)"
                    >
                        <!-- Green Tick -->
                        <span
                            v-if="connectedPlatforms[platform.key].connected"
                            class="connected-badge"
                        >
                            ✓
                        </span>

                        <!-- PLATFORM ICON (always visible) -->
                        <img :src="platform.icon" :alt="platform.name" class="platform-icon" />

                        <!-- CONNECTED VIEW -->
                        <template v-if="connectedPlatforms[platform.key].connected">
                            <img
                                class="avatar"
                                :src="connectedPlatforms[platform.key].avatar"
                                alt="Avatar"
                            />
                            <div class="account-info">
                                <strong>{{ connectedPlatforms[platform.key].name }}</strong>    
                            </div>
                        </template>

                        <!-- NOT CONNECTED VIEW -->
                        <template v-else>
                            <span>Connect {{ platform.name }}</span>
                        </template>
                    </button>
                </div>
                <br />
                <div class="divider">
                    <span>Post Details</span>
                </div>
                <!-- POSTS SECTION -->
                <div class="posts-section">

                    <!-- Header -->
                    <div class="posts-header">
                        <button class="post-btn" @click="openPostModal">Add New Post</button>
                    </div>

                    <!-- Table -->
                    <div class="posts-table-wrapper">
                        <table class="posts-table">
                            <thead>
                                <tr>
                                    <th>Platform</th>
                                    <th>Post Content</th>
                                    <th>Status</th>
                                    <th>Posted On</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="!dashboardData?.posts?.length">
                                    <td colspan="4" class="empty-row">
                                        No posts available
                                    </td>
                                </tr>

                                <tr v-for="(post, index) in dashboardData.posts" :key="index">
                                    <td>
                                        <img :src="`/images/${post.platform}.png`" class="table-icon" />
                                        {{ post.platform }}
                                    </td>
                                    <td>{{ post.content }}</td>
                                    <td>
                                        <span :class="['status', post.status]">
                                            {{ post.status }}
                                        </span>
                                    </td>
                                    <td>{{ post.created_at }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
        <!-- POST MODAL -->
        <Teleport to="body">
        <div v-if="showPostModal" class="modal-overlay">
            <div class="post-modal">

                <div class="modal-header">
                    <h3>Create New Post</h3>
                    <button class="close-btn" @click="closePostModal">×</button>
                </div>

                <div class="modal-body">

                    <!-- Image -->
                    <label>Upload Image</label>
                    <input
                        ref="fileInput"
                        type="file"
                        hidden
                        accept="image/*,video/*"
                        @change="handleFileUpload"
                    />
                    <div class="image-placeholder" @click="fileInput.click()">
                        <template v-if="mediaPreview">
                            <img
                            v-if="postForm.media.type.startsWith('image/')"
                            :src="mediaPreview"
                            alt="Preview Image"
                            />
                            <video
                            v-else-if="postForm.media.type.startsWith('video/')"
                            :src="mediaPreview"
                            controls
                            style="max-height: 160px; max-width: 100%; border-radius: 6px;"
                            />
                        </template>
                        <span v-else>Click to upload image or video</span>
                    </div>

                    <!-- Caption -->
                    <label>Caption</label>
                    <textarea v-model="postForm.caption" rows="4" placeholder="Write your caption..." />

                    <!-- Platforms -->
                    <label>Select Platforms</label>
                    <div class="platform-cards">
                        <div
                            v-for="p in platforms"
                            :key="p.key"
                            class="platform-card"
                            :class="{
                                active: postForm.platforms.includes(p.key),
                                disabled: !connectedPlatforms[p.key]?.connected
                            }"
                            @click="handlePlatformSelect(p.key)"
                        >
                            <img :src="p.icon" />
                            {{ p.name }}
                        </div>
                    </div>
                    <!-- Schedule Checkbox -->
                    <div class="schedule-section">
                        <div class="checkbox-wrapper">
                            <input type="checkbox" id="schedule" v-model="postForm.schedule" />
                            <label for="schedule">Schedule Post</label>
                        </div>

                        <div v-if="postForm.schedule" class="schedule-datetime">
                            <div class="datetime-field">
                            <label for="scheduledDate">Date</label>
                            <input type="date" id="scheduledDate" v-model="postForm.scheduledDate" />
                            </div>

                            <div class="datetime-field">
                            <label for="scheduledTime">Time</label>
                            <input type="time" id="scheduledTime" v-model="postForm.scheduledTime" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn cancel" @click="closePostModal">Cancel</button>
                    <button class="btn post" :disabled="!canSubmit" @click="submitPost('post')">
                        Post Now
                    </button>
                </div>

            </div>
        </div>
    </Teleport>
    </div>
</template>

<style scoped>
.socialsection {
    margin-left: 14%;
}

.socialsection h2 {
    text-align: center;
    font-size: 25px;
    font-weight: 600;
}

.socialsection p {
    text-align: center;
    color: #6b7280;
    font-size: 1rem;
    text-transform: capitalize;
}

.page-wrapper {
    display: flex;
    padding: 30px;
    background: #ffffff;
    height: 90vh;
    box-sizing: border-box;
    font-family: sans-serif;
    margin-top: 77px;
    overflow-y: auto;
}

.divider {
    position: relative;
    margin: 1.5rem 0;
    text-align: center;
    margin-left: 14%;
}

.divider span {
    position: relative;
    background-color: #ffffff;
    padding: 0 1rem;
    font-size: 0.75rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    z-index: 2;
}

.divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e5e7eb;
    z-index: 1;
}

.social-buttons {
    margin-left: 14%;
    display: flex;
    gap: 40px;
    margin-top: 40px;
    justify-content: center;
    align-items: center;
}

.social-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: #ffffff;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.25s ease;
    min-width: 240px;
}

.social-btn img {
    width: 22px;
    height: 22px;
}

.social-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

/* Platform colors */
.instagram {
    border-left: 4px solid #e1306c;
}

.facebook {
    border-left: 4px solid #1877f2;
}

.linkedin {
    border-left: 4px solid #0a66c2;
}

.x {
    border-left: 4px solid #000000;
}

.social-btn.connected {
    background: #e6f7e6;
    cursor: not-allowed;
}

.social-btn.connected span {
    font-weight: 600;
}

.connected-badge {
    position: absolute;
    top: -7px;
    right: -7px;
    width: 20px;
    height: 20px;
    background: #4caf50;
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: bold;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #4caf50;
}

.account-info {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
}

.account-info strong {
    font-size: 14px;
    color: #1f2937;
}

.account-info small {
    font-size: 12px;
    color: #4caf50;
}

.platform-icon {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
}

/* POSTS SECTION */
.posts-section {
    margin-left: 14%;
}

/* Header */
.posts-header {
    margin-bottom: 16px;
    text-align: end;
}

.posts-header h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
}

/* Post Button */
.post-btn {
    background: #1d2b64;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    border: 2px solid #1d2b64;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease;
}

.post-btn:hover {
    background: #fff;
    color: #1d2b64;
}

/* Table */
.posts-table-wrapper {
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    overflow-x: auto;
}

.posts-table {
    width: 100%;
    border-collapse: collapse;
}

.posts-table th,
.posts-table td {
    padding: 12px 14px;
    text-align: left;
    font-size: 14px;
}

.posts-table th {
    background: #f9fafb;
    color: #6b7280;
    font-weight: 600;
}

.posts-table tr {
    border-bottom: 1px solid #e5e7eb;
}

.posts-table tr:last-child {
    border-bottom: none;
}

/* Empty row */
.empty-row {
    text-align: center;
    color: #9ca3af;
}

/* Platform Icon in Table */
.table-icon {
    width: 18px;
    height: 18px;
    margin-right: 6px;
    vertical-align: middle;
}

/* Status */
.status {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    text-transform: capitalize;
}

.status.published {
    background: #e6f7e6;
    color: #2e7d32;
}

.status.pending {
    background: #fff7e6;
    color: #b45309;
}

.status.failed {
    background: #fdecea;
    color: #c62828;
}

/* MODAL */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.post-modal {
    width: 500px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.modal-header {
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
    margin: 0;
    font-size: 18px;
}

.close-btn {
    font-size: 22px;
    background: none;
    border: none;
    cursor: pointer;
}

.modal-body {
    padding: 20px;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
}

textarea {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    resize: none;
    font-size: 14px;
    margin-bottom: 15px;
}

textarea:focus {
    outline: none;
    border-color: #1d2b64;
    box-shadow: 0 0 0 2px rgba(29,43,100,0.1);
}

.platform-checkboxes {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.checkbox-item {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 1px solid #e5e7eb;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
}

.checkbox-item img {
    width: 18px;
    height: 18px;
}

.muted {
    font-size: 13px;
    color: #9ca3af;
}

/* Footer */
.modal-footer {
    padding: 16px 20px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    border-top: 1px solid #e5e7eb;
}

.btn {
    padding: 8px 14px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
}

.btn.cancel {
    background: #f3f4f6;
    border: none;
}

.btn.schedule {
    background: #f59e0b;
    color: #fff;
    border: none;
}

.btn.post {
    background: #1d2b64;
    color: #fff;
    border: none;
}

.image-placeholder {
    height: 160px;
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #f9fafb;
    transition: border 0.2s;
    margin-bottom: 15px;
}

.image-placeholder:hover {
    border-color: #1d2b64;
}

.image-placeholder img {
    max-height: 100%;
    max-width: 100%;
    border-radius: 6px;
}

.platform-cards {
    display: flex;
    gap: 12px;
}

.platform-card {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    background: #fff;
}

.platform-card img {
    width: 20px;
}

.platform-card.active {
    border-color: #1d2b64;
    background: #eef2ff;
}

/* Scoped CSS */
.schedule-section {
  margin-top: 15px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
}

.checkbox-wrapper input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #1d2b64; /* matches your modal primary color */
  cursor: pointer;
}

.schedule-datetime {
  display: flex;
  gap: 12px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.datetime-field {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  flex: 1;
  min-width: 120px;
}

.datetime-field label {
  margin-bottom: 4px;
  font-weight: 500;
  color: #374151;
}

.datetime-field input[type="date"],
.datetime-field input[type="time"] {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
}

.datetime-field input[type="date"]:focus,
.datetime-field input[type="time"]:focus {
  border-color: #1d2b64;
  box-shadow: 0 0 0 2px rgba(29, 43, 100, 0.1);
}

.platform-card.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f9fafb;
}

.platform-card.disabled:hover {
    border-color: #e5e7eb;
    background: #f9fafb;
}

</style>