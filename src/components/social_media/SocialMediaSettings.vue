<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store";
import { useAuth } from "@/service/useAuth";
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import FlashMessage from "@/components/common/FlashMessage.vue";
import WordpressService from "@/service/WordpressService";

// Stores & Router
const store = useStore();
const router = useRouter();
const { logout: doLogout } = useAuth();

// Sidebar state
const isSidebarToggled = ref(false);
const dashboardData = ref({});
const loading = ref(true);
const error = ref(false);

const navBarToggle = (value) => isSidebarToggled.value = value;
const logout = async () => {
    await doLogout();
    router.push("/login");
};
const flashClass = computed(() => 
    store.flashMeassgeType === 'error' ? 'flash-error' : 'flash-success'
);

// -------------------------
// Fetch Dashboard Data
// -------------------------
const fetchDashboardData = async () => {
    try {
        const response = await WordpressService.fetchDashboardData();
        if (response.status === 200 && response.data.success) {
            dashboardData.value = response.data;
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            localStorage.removeItem("access_token");
            router.push("/login");
        } else {
            console.error(err.message);
            error.value = true;
        }
    } finally {
        loading.value = false;
    }
};

const platforms = [
    { name: "Instagram", key: "instagram", icon: "/public/images/instagram.png" },
    { name: "Facebook", key: "facebook", icon: "/public/images/facebook.png" },
    { name: "LinkedIn", key: "linkedin", icon: "/public/images/linkedin.png" },
    { name: "X", key: "x", icon: "/public/images/x.png" }
];

const connectPlatform = (platform) => {
    if (platform !== 'facebook') return;

    const baseUrl = import.meta.env.VITE_CRM_API_URL;
    if (!baseUrl) {
        console.error("VITE_CRM_API_URL is not defined!");
        return;
    }

    window.location.href = `${baseUrl}/auth/facebook/redirect`;
};

onMounted(async () => {
    loading.value = true;
    await fetchDashboardData();
    loading.value = false;
});
</script>
<template>
    <div class="page">
        <FlashMessage :visible="store.flashMeassge" v-if="store.flashMeassge" :class="flashClass" />
        <NavBar @logout="logout" @nav-bar-toggle="navBarToggle" :dashboardData="dashboardData?.user" />
        <SideBar :dashboardData="dashboardData" :toggled="isSidebarToggled" />
        <div class="social-media-section page-wrapper">
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
                        :class="platform.key"
                        @click="connectPlatform(platform.key)"
                    >
                        <img :src="platform.icon" :alt="platform.name" />
                        <span>Connect {{ platform.name }}</span>
                    </button>
                </div>
            </div>
        </div>
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
    display: grid;
    grid-template-columns: repeat(2, minmax(260px, 1fr));
    gap: 20px;
    margin-top: 30px;
}

.social-btn {
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

</style>