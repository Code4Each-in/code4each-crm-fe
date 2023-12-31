<script setup>
import NavBar from "./layouts/navbar.vue";
import SideBar from "./layouts/sidebar.vue";
import Content from "./layouts/content.vue";
import { useAuth } from "../../service/useAuth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { ref, defineProps, onMounted, provide, inject } from "vue";
import WordpressService from "@/service/WordpressService";
import { EventBus } from "@/EventBus";

const router = useRouter();
const { logout } = useAuth();
const isSidebarToggled = ref(false);
const navBarToggle = (value) => {
  isSidebarToggled.value = value;
};

const loading = ref(true);
const error = ref(false);
const errors = ref([]);
const dashboardData = ref([]);
const userData = ref([]);

const fetchDashboardData = async () => {
  try {
    const response = await WordpressService.fetchDashboardData();
    if (response.status === 200 && response.data.success) {
      loading.value = false;
      dashboardData.value = response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Authentication failed. Please log in.", error);
      error.value = true;
      loading.value = false;
      localStorage.removeItem("access_token");
      router.push("/login");
    } else {
      console.error("An error occurred:", error.message);
    }
  }
};

const resendLink = async () => {
  try {
    const response = await WordpressService.resendLink();
    Swal.fire(response.data.message);
  } catch (error) {
    console.log(error);
    console.error("Error Occur while resend link", error);
  }
};

onMounted(() => {
  fetchDashboardData();
  EventBus.on("fetchDashboardData", fetchDashboardData);
  EventBus.on("getGlobalColors", getGlobalColors);
});

const regenerateWebsite = async () => {
  try {
    loading.value = true;
    const response = await WordpressService.regenerateWebsite({
      agency_id: dashboardData.value.user.agency_id,
      website_url: dashboardData.value.agency_website_info[0].website_domain,
    });

    fetchDashboardData();
    EventBus.emit("reloadIframe");
  } catch (error) {
    console.log(error);
    console.error("Error Occur while regenerating website", error);
  }
  loading.value = false;
};

const getGlobalColors = async () => {
  let globalColors = [];
  try {
    const response = await WordpressService.getGlobalColors();
    console.log(response.data, "rrrrrrrrrrrrrrrrr");
    if (response.status === 200 && response.data.success) {
      globalColors = response.data;
    }
  } catch (error) {
    console.log(error);
    console.error("Error Occur while getting global colors", error);
  }
  return globalColors;
};
provide("dashBoardMethods", { regenerateWebsite, fetchDashboardData });
</script>

<template>
  <div class="page" id="dasboardPage">
    <div class="page-main">
      <div id="wrapper" :class="{ toggled: isSidebarToggled }">
        <SideBar></SideBar>
        <NavBar
          @logout="logout"
          @nav-bar-toggle="navBarToggle"
          :dashboardData="dashboardData?.user"
        ></NavBar>
        <Content
          :dashboardData="dashboardData"
          :loading="loading"
          :resendLink="resendLink"
        ></Content>
      </div>
    </div>
  </div>
</template>
<style>
@import "../../assets/dashboard.css";
</style>