<template>
  <section class="section about-bg" id="service">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <!-- About Wrapper -->
          <div class="about-wrapper">
            <!-- Left Side -->
            <div class="content-left-side about-left-side bg-name-success">
              <!-- Main Heading -->
              <div
                class="editable heading-section"
                :class="{ selected: selectedField === 'service-text1' }"
                @click.stop="selectField('service-text1')"
                @mouseover="hoveredField = 'service-text1'"
                @mouseleave="hoveredField = null"
              >
                <span v-if="hoveredField === 'service-text1'" class="edit-label">Text</span>
                <input
                  v-if="selectedField === 'service-text1'"
                  v-model="editableContent['service-text1']"
                  @blur="blurAndUpdate('service-text1', editableContent['service-text1'])"
                />
                <h2 v-else class="service-heading">{{ editableContent['service-text1'] }}</h2>
              </div>

              <!-- Description -->
              <div
                class="editable description-section"
                :class="{ selected: selectedField === 'service-description1' }"
                @click.stop="selectField('service-description1')"
                @mouseover="hoveredField = 'service-description1'"
                @mouseleave="hoveredField = null"
              >
                <span v-if="hoveredField === 'service-description1'" class="edit-label">Text</span>
                <textarea
                  v-if="selectedField === 'service-description1'"
                  v-model="editableContent['service-description1']"
                  @blur="blurAndUpdate('service-description1', editableContent['service-description1'])"
                />
                <p v-else class="service-description">{{ editableContent['service-description1']}}</p>
              </div>
            </div>

            <!-- Right Side - Services -->
            <div class="about-right-side bg-name-primary">
              <div
                v-for="(service, i) in editableContent.services"
                :key="i"
                class="single-about"
              >
                <div class="icon-title">
                  <!-- Icon / Image -->
                  <div
                    class="icon editable"
                    :class="{ selected: selectedField === 'service-image' + (i + 1) }"
                    @click.stop="selectField('service-image' + (i + 1), 'image', 'service_section')"
                    @mouseover="hoveredField = 'service-image' + (i + 1)"
                    @mouseleave="hoveredField = null"
                  >
                    <span v-if="hoveredField === 'service-image' + (i + 1)" class="edit-label">Image</span>
                    <img
                      :src="service['service-image' + (i + 1)] || ''"
                      alt="Service Image"
                      class="service-image"
                    />
                  </div>

                  <!-- Service Title -->
                  <div
                    class="editable"
                    :class="{ selected: selectedField === 'service-title-' + i }"
                    @click.stop="selectField('service-title-' + i)"
                    @mouseover="hoveredField = 'service-title-' + i"
                    @mouseleave="hoveredField = null"
                  >
                    <span v-if="hoveredField === 'service-title-' + i" class="edit-label">Text</span>
                    <input
                      v-if="selectedField === 'service-title-' + i"
                      v-model="editableContent.services[i]['service-text' + (i + 2)]"
                      @blur="blurAndUpdate('service-text' + (i + 2), editableContent.services[i]['service-text' + (i + 2)])"
                    />
                    <h4 class="title" v-else>{{ service['service-text' + (i + 2)] }}</h4>
                  </div>
                </div>

                <!-- Service Description -->
                <div
                  class="editable"
                  :class="{ selected: selectedField === 'service-description-' + i }"
                  @click.stop="selectField('service-description-' + i)"
                  @mouseover="hoveredField = 'service-description-' + i"
                  @mouseleave="hoveredField = null"
                >
                  <span v-if="hoveredField === 'service-description-' + i" class="edit-label">Text</span>
                  <textarea
                    v-if="selectedField === 'service-description-' + i"
                    v-model="editableContent.services[i]['service-description' + (i + 2)]"
                    @blur="blurAndUpdate('service-description' + (i + 2), editableContent.services[i]['service-description' + (i + 2)])"
                  />
                  <p v-else>{{ service['service-description' + (i + 2)] }}</p>
                </div>
              </div>
            </div>
            <!-- End Right Side -->
          </div>
        </div>
      </div>
    </div>
    <SidebarEditor
      :isOpen="isSidebarOpen"
      :type="activeEditorType"
      :editableContent="editableContent"
      :activeSectionType="activeSectionType"
      :activeField="selectedField"
      @close="closeSidebar"
      @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file)"
      @image-upload="(e, field) => handleImageUpload(e, field, 'about_section')"
    />
  </section>
</template>

<script setup>
import { ref, watch } from "vue";
import { useEditable } from "../library";
import SidebarEditor from "../SidebarEditor.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      "service-text1": "Neonal Medical Care - 35 Years of Trusted Experience",
      "service-description1": "Providing compassionate and comprehensive healthcare services with cutting-edge technology and expert medical professionals.",
      services: [
        { "service-image1": "/images/1.jpg", "service-text2": "Service 1", "service-description2": "Description 1" },
        { "service-image2": "/images/2.jpg", "service-text3": "Service 2", "service-description3": "Description 2" },
      ],
    }),
  },
});

const emit = defineEmits(["field-updated"]);
const editableContent = ref({ ...props.data });

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
} = useEditable(emit, editableContent);

</script>


<style scoped>
 /* Editable highlights */
 .editable {
    cursor: pointer;
    padding: 4px;
    position: relative;
    border: 2px dashed transparent;
    transition: border-color 0.2s ease;
  }
  
  .editable:hover {
    border-color: #00adb5;
  }
  
  .editable.selected {
    border-color: #00adb5;
  }

  .editable.service-heading:hover,
  .editable.service-heading.selected {
    border-color: #fff;
  }
  
  .edit-label {
    position: absolute;
    top: -15px;
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
  .service-heading {
    color: #fff;
    margin-bottom: 20px;
  }
  .editable.description-section.selected, 
  .editable.description-section:hover {
      border-color: #fff;
  }

  .editable.heading-section.selected, 
  .editable.heading-section:hover {
      border-color: #fff;
      margin-bottom: 10px;
  }
.about-bg {
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    padding: 50px 0px 0px;
}
.about-wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    position: relative;
    padding: 0px 0px 50px;
}

.about-wrapper .about-left-side {
    width: 50%;
    padding: 50px;
    height: 545px;
}

.bg-name-success {
    background-color: #00ADB5;
}
.content-left-side .title {
    color: #F9FAFB;
    font-size: 24px;
    line-height: 43px;
    font-weight: 700;
}

/* .content-left-side span {
    position: relative;
    margin: 20px 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
} */

.content-left-side span::before {
    position: absolute;
    content: "";
    width: 80px;
    height: 1px;
    background: #00adb5;
    left: 0;
}
.content-left-side p {
    font-size: 14px;
    /* line-height: 38px; */
    color: #F9FAFB;
}
.about-wrapper .about-right-side {
    /* max-width: 570px; */
    width: 100%;
    padding: 40px 70px;
    position: absolute;
    right: 0;
    width: 50%;
    height: 545px;
}
.bg-name-primary {
    background-color: #222831;
}

.about-wrapper .about-right-side .single-about .icon-title {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 13px;
}
.about-wrapper .about-right-side .single-about .icon-title .icon {
    border: 2px solid #00adb5;
    border-radius: 100%;
    height: 80px;
    width: 80px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}

.about-wrapper .about-right-side .single-about .icon-title .title {
    margin: 0 0 0 30px;
    font-size: 26px;
    line-height: 2;
    font-weight: 700;
    color: #F9FAFB;
}
.about-wrapper .about-right-side .single-about p {
    font-size: 14px;
    line-height: 1.9;
    color: #F9FAFB;
    /* font-family: "Roboto", sans-serif; */
}

.about-wrapper .about-right-side .single-about {
    border-bottom: 1px solid #222831;
    margin-bottom: 20px;
    padding-bottom: 0px;
}

@media only screen and (max-width: 992px){
    .about-wrapper {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: block;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        position: relative;
        padding: 0px 0px 00px;
    }
    .about-wrapper .about-left-side {
        width: 100%;
        padding: 25px 50px 19px 60px;
        height: 350px;
    }
       .about-bg {
        background-image: url(../images/about-bg.jpg);
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        padding: 30px 0px 0;
        height: 110vh;
        margin-bottom: 0px;
    }
    .content-left-side .title {
        color: #F9FAFB;
        font-size: 24px;
        line-height: 35px;
        font-weight: 700;
    }
    .content-left-side p {
    font-size: 18px;
    /* line-height: 29px; */
    color: #F9FAFB;
}
    .about-wrapper .about-right-side {
        /* max-width: 570px; */
        width: 100%;
        padding: 24px 30px;
        position: absolute;
        right: 0;
        /* width: 50%; */
        /* margin-bottom: 160px; */
    }
}
@media only screen and (max-width: 992px){
    .about-wrapper .about-left-side {
        width: 100%;
        padding: 50px 30px 22px 30px;
        height: 280px;
    }
}
img.service-image {
    width: 65%;
    margin: 10px;
}

/*service   css  end */
</style>
  