
import { defineStore } from 'pinia';
import WordpressService from "@/service/WordpressService";

export const useStore = defineStore('myStore', {
  state: () => ({
    websiteId: false,
    websiteDomain: null,
    flashMeassge: false,
    menuShrink: false,
    flashMeassgeValue: 'Success',
  }),
  actions: {
    updateWebsiteId(newValue) {
      this.websiteId = newValue;
    },
    updateShrink() {
      this.menuShrink = !this.menuShrink;
    },
    updateFlashMeassge(newValue, message = 'Success') {
      this.flashMeassge = newValue;
      this.flashMeassgeValue = message;
    },
    async fetchInitialWebsiteId() {
      try {
        if (!this.websiteId) {
          const response = await WordpressService.fetchDashboardData();
          if (response.status === 200 && response.data.success) {
            if (response.data?.agency_website_info[0].website_id) {
              let websiteId = response.data?.agency_website_info[0].website_id
              this.updateWebsiteId(websiteId);
            }
          }
        }
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    },
    updateFeedbackModalStore(){
      
      this.showFeedbackModal = !this.showFeedbackModal;
    },
  },
  setup() {
    this.fetchInitialWebsiteId();
  },
  
});
