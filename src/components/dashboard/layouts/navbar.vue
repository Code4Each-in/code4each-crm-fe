<script setup>
import { defineEmits, ref, defineProps, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store";

const router = useRouter();
const emits = defineEmits();
const isSidebarToggled = ref(true);
const showUserMenu = ref(false);
const store = useStore();
const userMenuWrapper = ref(null); // Parent wrapper ref

const toggleSidebar = () => {
  store.updateShrink();
};

const logout = () => {
  emits("logout");
};

const navigate = () => {
  router.push("/");
};

const props = defineProps({
  dashboardData: Object,
});

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (userMenuWrapper.value && !userMenuWrapper.value.contains(event.target)) {
    showUserMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg px-4 py-2 bg-white shadow">
      <a class="sidebar-toggler text-gray-500 me-4 me-lg-5 lead sidetoggle-s" @click="toggleSidebar">
        <i class="fa fa-align-left"></i>
      </a>
      <a class="navbar-brand fw-bold text-uppercase text-base" @click="navigate">
        <span class="d-none d-brand-partial">Bubbly </span>
        <span class="d-none d-sm-inline">
          <img src="/images/ss_logo.png" />
        </span>
      </a>

      <ul class="ms-auto d-flex align-items-center list-unstyled mb-0">
        <li class="nav-item">
          <div class="panel-header-title1"></div>
        </li>

        <!-- ✅ Wrap both toggle and dropdown in a parent div -->
        <li class="nav-item dropdown ms-auto" ref="userMenuWrapper">
          <a
            class="nav-link pe-0 d-flex align-items-center"
            id="userInfo"
            href="#"
            aria-haspopup="true"
            aria-expanded="false"
            @click.prevent="showUserMenu = !showUserMenu"
          >
            <div class="d-flex align-items-center bg-light rounded-pill px-3 py-2 shadow-sm">
              <span
                class="avatar text-white rounded-circle d-flex justify-content-center align-items-center me-2"
                style="width: 32px; height: 32px; background: #1d2b64;"
              >
                {{ dashboardData?.name.charAt(0).toUpperCase() }}
              </span>
              <span class="fw-semibold" style="color: #1d2b64; font-size: 20px; font-weight: 600;">
                {{ dashboardData?.name?.split(' ')[0] }}
              </span>
            </div>
          </a>

          <div
            class="dropdown-menu dropdown-menu-end dropdown-menu-animated"
            aria-labelledby="userInfo"
            :class="{ show: showUserMenu }"
          >
            <a class="dropdown-item" @click="logout">Logout</a>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.sidetoggle-s {
  cursor: pointer;
}
</style>
