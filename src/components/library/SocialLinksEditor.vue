<template>
    <div class="editor-sidebar__section">
      <label class="editor-sidebar__title">Social Links Items:</label>
        <div class="ifYqM">
            <div
                class="eidtor-sitefonts-1"
                aria-hidden="true"
                data-toggle="modal"
                data-target="#exampleModalRight-components"
            >
                <h2>Which social-link do you want to show o your site?</h2>
                <p class="text-center">
                Choose the social-link you want show on your site. You can choose
                it by adding link for social or you can remove it by empty the
                link.
                </p>
                <div class="social-linksinputs">
                <div v-for="(link, index) in socialLinksData" :key="index">
                    <label :for="index" class="form-field social-links mb-2"
                    ><img :src="socialLinkIconPath[index]" />
                    {{ index.charAt(0).toUpperCase() + index.slice(1) }}</label
                    >
                    <input
                    type="text"
                    class="form-control input"
                    :placeholder="index.charAt(0).toUpperCase() + index.slice(1)"
                    @blur="saveLinkValue(index)"
                    v-model="socialLinksData[index]"
                    />
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, provide, inject, watch } from "vue";
import WordpressService from "@/service/WordpressService";
import { useStore } from "@/stores/store";

const activeComponentsDetail = ref([]);
const store = useStore();

const buttonStates = ref();
const loading = ref(true);
const siteSettingsDeatil = ref();
const selectedCategory = ref("");

const socialLinksData = ref({
  whatsApp: "",
  facebook: "",
  youTube: "",
  instagram: "",
  x: "",
});

const socialLinkIconPath = ref({
  whatsApp: "/images/social.png",
  facebook: "/images/facebook.png",
  youTube: "/images/youtube.png",
  instagram: "/images/instagram.png",
  x: "/images/x.png",
});

const getActiveComponentsData = async () => {
  try {
    const response = await WordpressService.Components.getActiveComponents({
      website_url: siteSettingsDeatil.value?.staging_domain,
    });

    if (response.status === 200 && response.data.success) {
      activeComponentsDetail.value = response.data.components_detail;
      let firstActiveComponent = activeComponentsDetail.value[0];
      activeComponentsDetail.value.forEach((image) => {
        activeComponentsDetail.dragging = false;
      });
      buttonStates.value = new Array(activeComponentsDetail.value.length).fill(
        false
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const saveSocialLinks = async (data) => {
  try {
    const response = await WordpressService.SocialLinks.postSocialLinks({
      website_url: siteSettingsDeatil.value?.staging_domain,
      social_links: data,
    });
    if (response.status === 200) {
      store.updateFlashMeassge(true, "Social Link Saved Sucessfully");
      await getsocialLinks();
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

onMounted(async () => {
  await getSiteDeatils();
  await getActiveComponentsData();
  await getsocialLinks();
  loading.value = false;
});

watch(
  () => store.websiteId,
  async (newWebsiteId, oldWebsiteId) => {
    await getSiteDeatils();
    await getActiveComponentsData();
    await getsocialLinks();
    loading.value = false;
  }
);

const getSiteDeatils = async () => {
  if (!store.websiteId || store.websiteId === false) {
    console.warn("websiteId is missing or invalid:", store.websiteId);
    return;
  }
  try {
    const response = await WordpressService.WebsiteSettings.getSiteDetail({
      website_id: store.websiteId,
    });
    if (response.status === 200 && response.data.success) {
      siteSettingsDeatil.value = response.data.settings_detail;
      const responseCatName = siteSettingsDeatil.value.agency_website_detail.website_category_name;
      if (responseCatName) {
        selectedCategory.value = responseCatName.trim();
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const getsocialLinks = async () => {
  try {
    const response = await WordpressService.SocialLinks.getSocialLinks({
      website_url: siteSettingsDeatil.value?.staging_domain,
    });
    if (response.status === 200 && response.data.success) {
      let socialLinks = response.data.social_links;

      if (Object.keys(socialLinks).length > 0) {
        socialLinksData.value = updateValues(socialLinks);
      }
    }
  } catch (error) {}
};

function updateValues(socialLinks) {
  const updatedData = Object.keys(socialLinksData.value).map((key) => {
    if (socialLinks.hasOwnProperty(key)) {
      return { [key]: socialLinks[key] };
    }
    return { [key]: socialLinksData[key] };
  });
  return Object.assign({}, ...updatedData);
}
const saveLinkValue = async (key) => {
  const linkValue = socialLinksData.value[key];
  await saveSocialLinks({
    [key]: linkValue,
  });
};
</script>

<style scoped>
label.form-field.social-links.mb-2 img {
    width: 5%;
    margin-top: 10px;
}
.ifYqM{
    overflow-y: unset;
}
</style>