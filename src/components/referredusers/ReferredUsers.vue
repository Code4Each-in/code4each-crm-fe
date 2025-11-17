<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "@/stores/store";
import { useAuth } from "@/service/useAuth";
import { useRouter } from "vue-router";
import WordpressService from "@/service/WordpressService";
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import FlashMessage from "@/components/common/FlashMessage.vue";
import Loader from "@/components/common/Loader.vue";

// Stores & Router
const store = useStore();
const router = useRouter();
const { logout: doLogout } = useAuth();

// Sidebar state
const isSidebarToggled = ref(false);
const dashboardData = ref({});
const loading = ref(true);
const referralUsers = ref([]);
const error = ref(false);
const initialLoading = ref(true);

// -------------------------
// Sidebar toggle
// -------------------------
const navBarToggle = (value) => isSidebarToggled.value = value;

// -------------------------
// Logout
// -------------------------
const logout = async () => {
    await doLogout();
    router.push("/login");
};

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

// -------------------------
// Fetch Referral Users Data
// -------------------------
const fetchReferralUsersData = async () => {
    try {
        const response = await WordpressService.ReferredUsers.getReferralUsersData({
            user_id: dashboardData.value.user.id,
            referral_code: dashboardData.value.user.referral_code
        });
        if (response.status === 200 && response.data.success) {
            referralUsers.value = response.data.response.referred_users;
        }
    } catch (err) {
        console.error(err.message);
    }
};

// -------------------------
// Mounted
// -------------------------
onMounted(async () => {
    await fetchDashboardData();
    await fetchReferralUsersData();
    initialLoading.value = false; 
});
</script>
<template>
    <FlashMessage :visible="store.flashMeassge" v-if="store.flashMeassge" :class="flashClass" />
    <NavBar @logout="logout" @nav-bar-toggle="navBarToggle" :dashboardData="dashboardData?.user" />
    <SideBar :dashboardData="dashboardData" :toggled="isSidebarToggled" />

    <Loader v-if="initialLoading" />
    <!-- ------------------------- -->
    <!-- Referred Users Table -->
    <!-- ------------------------- -->
    <div v-if="!initialLoading" class="container referred-user">
        <h4 class="mb-3">Referred Users</h4>

        <table class="table table-striped table-bordered">
        <thead class="table-dark">
            <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Email Verified</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="referralUsers.length === 0">
            <td colspan="3" class="text-center">No referred users found.</td>
            </tr>
            <tr v-for="user in referralUsers" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone}}</td>
            <td>
                <span :class="user.email_verified_at ? 'verified' : 'not-verified'">
                    {{ user.email_verified_at ? 'Verified' : 'Not Verified' }}
                </span>
            </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>
<style scoped>
.referred-user {
  padding: 100px 80px;
  margin-left: 156px;
  background: #f4f7fc;
  min-height: 773px;
  border-radius: 16px;
}

.referred-user h4 {
  color: #1d2b64;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 25px;
  border-left: 5px solid #1d2b64;
  padding-left: 10px;
}

/* ----------------------- */
/* Table Styling */
/* ----------------------- */
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
}

.table thead {
  background-color: #1d2b64;
  color: #ffffff;
}

.table th {
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 14px 18px;
  border-bottom: 2px solid #163366;
}

.table tbody tr {
  background-color: #ffffff;
  transition: all 0.2s ease-in-out;
}

.table tbody tr:nth-child(even) {
  background-color: #f2f6ff;
}

.table tbody tr:hover {
  background-color: #eaf1ff;
}

.table td {
  padding: 12px 18px;
  color: #1d2b64;
  font-size: 15px;
  border-top: 1px solid #e1e8f0;
}

/* Status badges */
.table td span {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.table td span.verified {
  background-color: #e6f7ed;
  color: #1b7e3b;
}

.table td span.not-verified {
  background-color: #fdeff1;
  color: #d6336c;
}

/* ----------------------- */
/* Responsive */
/* ----------------------- */
@media (max-width: 992px) {
  .referred-user {
    padding: 40px 20px;
    margin-left: 0;
  }

  .table th,
  .table td {
    font-size: 14px;
    padding: 10px 8px;
  }
}
</style>

