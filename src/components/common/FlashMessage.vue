<template>
  <div :class="['flash animate--drop-in-fade-out', flashClass]">
    <div class="flash__icon" :class="{'flash-error-icon': store.flashMeassgeType === 'error'}">
      <i
        v-if="store.flashMeassgeType === 'success'"
        class="fa fa-check-circle-o"
        aria-hidden="true"
      ></i>
      <i
        v-else-if="store.flashMeassgeType === 'error'"
        class="fa fa-times-circle-o"
        aria-hidden="true"
      ></i>
    </div>
    <p class="flash__body">{{ store.flashMeassgeValue }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, toRef } from "vue";
import { useStore } from "@/stores/store";

const isAnimating = ref(true);
const store = useStore();
const props = defineProps({
  visible: Boolean,
});

const handlePageClick = () => {
  setTimeout(() => {
    store.updateFlashMeassge(false);
  }, 5000);
};

onMounted(() => {
  // isAnimating.value = true;
  handlePageClick();
});

// watch(
//   () => props.visible,
//   (newValue, oldValue) => {
//     isAnimating.value = true;
//   }
// );
</script>

<style>
/* Your CSS styles here */
</style>
