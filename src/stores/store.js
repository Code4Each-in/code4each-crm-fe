
import { defineStore } from 'pinia';
import WordpressService from "@/service/WordpressService";

export const useStore = defineStore('myStore', {
  state: () => ({
    websiteId: false,
    websiteDomain: null,
    flashMeassge: false,
    menuShrink: false,
    flashMeassgeValue: 'Success',
    flashMeassgeType: 'success',
    showFeedbackModal: false,
  }),
  actions: {
    updateWebsiteId(newValue) {
      this.websiteId = newValue;
    },
    updateShrink() {
      this.menuShrink = !this.menuShrink;
    },
    updateFlashMeassge(newValue, message = 'Success', type = 'success') {
      this.flashMeassge = newValue;
      this.flashMeassgeValue = message;
      this.flashMeassgeType = type;
    },
    async fetchInitialWebsiteId() {
      try {
        if (!this.websiteId) {
          const response = await WordpressService.fetchDashboardData();
          if (response.status === 200 && response.data.success) {
            const websiteList = response.data.agency_website_info;
            if (Array.isArray(websiteList) && websiteList.length > 0) {
              this.updateWebsiteId(websiteList[0].website_id);
            } 
          }
        }
      } catch (error) {
        console.error("An error occurred in fetchInitialWebsiteId:", error.message);
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
