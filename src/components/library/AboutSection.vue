<template>
    <section class="about-section section-margin" id="about">
      <div class="custom-large-container container">
        <!-- Title -->
        <div class="row m-b-n30">
          <div
            class="col-12 aos-init aos-animate"
            data-aos="fade-up"
            data-aos-duration="1100"
          >
            <div class="service-long-title text-center hidden animate__animated animate__delay-1s">
              <h2 class="title animate__animated animate__delay-1s animate__fadeInUp">
                <span
                  class="editable"
                  :class="{ selected: selectedField === 'text1' }"
                  @click="selectField('text1')"
                  @mouseover="hoveredField = 'text1'"
                  @mouseleave="hoveredField = null"
                >
                  <span v-if="hoveredField === 'text1'" class="edit-label">Text</span>
                  <input
                    v-if="selectedField === 'text1'"
                    v-model="editableContent.text1"
                    @blur="blurAndUpdate"
                  />
                  <span v-else style="color:#f7a582">{{ editableContent.text1 }}</span>
                </span>
    
                <span
                    class="editable"
                    :class="{ selected: selectedField === 'text2' }"
                    @click="selectField('text2')"
                    @mouseover="hoveredField = 'text2'"
                    @mouseleave="hoveredField = null"
                    >
                    <span v-if="hoveredField === 'text2'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'text2'"
                        v-model="editableContent.text2"
                        @blur="blurAndUpdate"
                    />
                    <span v-else>{{ editableContent.text2 }}</span>
                    </span>
                    <br />
                    <span
                    class="editable"
                    :class="{ selected: selectedField === 'text3' }"
                    @click="selectField('text3')"
                    @mouseover="hoveredField = 'text3'"
                    @mouseleave="hoveredField = null"
                    >
                    <span v-if="hoveredField === 'text3'" class="edit-label">Text</span>
                    <input
                        v-if="selectedField === 'text3'"
                        v-model="editableContent.text3"
                        @blur="blurAndUpdate"
                    />
                    <span v-else>{{ editableContent.text3 }}</span>
                </span>

                <span
                  class="editable text-style word-wave"
                  :class="{ selected: selectedField === 'text4' }"
                  @click="selectField('text4')"
                  @mouseover="hoveredField = 'text4'"
                  @mouseleave="hoveredField = null"
                >
                  <span v-if="hoveredField === 'text4'" class="edit-label">Text</span>
                  <input
                    v-if="selectedField === 'text4'"
                    v-model="editableContent.text4"
                    @blur="blurAndUpdate"
                  />
                  <span v-else>{{ editableContent.text4 }}</span>
                </span>
              </h2>
            </div>
          </div>
        </div>
    
        <!-- Services Grid -->
        <div class="services-wrapper">
          <div
            v-for="(service, i) in editableContent.services"
            :key="i"
            class="single-service aos-init aos-animate"
            :data-aos-duration="1100 + i * 100"
          >
            <div
              class="single-service-thumb editable"
              :class="{ selected: selectedField === 'service-img-' + i }"
              @click="selectField('service-img-' + i)"
              @mouseover="hoveredField = 'service-img-' + i"
              @mouseleave="hoveredField = null"
            >
              <span v-if="hoveredField === 'service-img-' + i" class="edit-label">Image</span>
              <input
                v-if="selectedField === 'service-img-' + i"
                type="file"
                @change="(e) => handleServiceImageUpload(e, i)"
                @blur="selectedField = null"
              />
              <img v-else :src="service.img" :alt="service.title" />
            </div>
    
            <div
              class="single-service-title editable"
              :class="{ selected: selectedField === 'service-title-' + i }"
              @click="selectField('service-title-' + i)"
              @mouseover="hoveredField = 'service-title-' + i"
              @mouseleave="hoveredField = null"
            >
              <span v-if="hoveredField === 'service-title-' + i" class="edit-label">Text</span>
              <input
                v-if="selectedField === 'service-title-' + i"
                v-model="editableContent.services[i].title"
                @blur="blurAndUpdate"
              />
              <h2 v-else class="title">{{ service.title }}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    </template>
    
    <script setup>
    import { ref, watch } from "vue";
    
    const props = defineProps({
      data: {
        type: Object,
        default: () => ({
          text1: "About Highlight",
          text2: "Our",
          text3: "Best Services",
          text4: "for You",
          services: [
            {
              img: "/components/sections/ss_health_sections/health_abouts/health_about1/images/doctor.png",
              title: "Best Doctors",
            },
            {
              img: "/components/sections/ss_health_sections/health_abouts/health_about1/images/affordable.png",
              title: "Affordable Care",
            },
            {
              img: "/components/sections/ss_health_sections/health_abouts/health_about1/images/insurance.png",
              title: "Insurance Partners",
            },
            {
              img: "/components/sections/ss_health_sections/health_abouts/health_about1/images/support.png",
              title: "24/7 Support",
            },
            {
              img: "/components/sections/ss_health_sections/health_abouts/health_about1/images/alarm.png",
              title: "Emergency Service",
            },
            {
              img: "/components/sections/ss_health_sections/health_abouts/health_about1/images/telemedicine.png",
              title: "Online Consultancy",
            },
          ],
        }),
      },
    });
    
    const emit = defineEmits(["update"]);
    const editableContent = ref({ ...props.data });
    
    watch(
      () => props.data,
      (newVal) => {
        editableContent.value = { ...newVal };
      },
      { immediate: true, deep: true }
    );
    
    const selectedField = ref(null);
    const hoveredField = ref(null);
    
    function selectField(field) {
      selectedField.value = field;
    }
    function blurAndUpdate() {
      emit("update", editableContent.value);
      selectedField.value = null;
    }
    function handleServiceImageUpload(event, index) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          editableContent.value.services[index].img = e.target.result;
          emit("update", editableContent.value);
          selectedField.value = null;
        };
        reader.readAsDataURL(file);
      }
    }
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
    .edit-label {
      position: absolute;
      top: -10px;
      left: 5px;
      background-color: #00adb5;
      color: white;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 3px;
      z-index: 2;
      pointer-events: none;
    }
    
    /* Default inputs (services, etc.) */
    input,
    textarea {
      width: 100%;
      font-size: inherit;
      font-family: inherit;
      padding: 8px;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
    
    /* Heading inputs: inline size */
    .service-long-title input {
      display: inline-block;
      width: auto;       /* shrink to content */
      min-width: 50px;   /* fallback */
      font-size: inherit;
      font-family: inherit;
      padding: 4px 6px;
    }
    
    /* Section styling */
    .m-b-30 {
      margin-bottom: 30px;
    }
    .section, .section-fluid {
      float: left;
      width: 100%;
    }
    .service-long-title .title {
      text-align: center;
      width: 100%;
      margin: 0 auto 60px;
      font-size: 35px;
      line-height: 1.5;
      color: #00ADB5;
      font-weight: 800;
    }
    .service-long-title .title .text-style {
      color: #00ADB5;
    }
    
    /* Grid wrapper */
    .services-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 20px;
    }
    
    /* Service cards */
    .services-wrapper .single-service {
        flex: 1 1 calc(33.333% - 20px);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background-color: #00ADB5;
        padding: 21px 18px;
        transition: all 0.3s ease;
    }
    
    /* Service icon */
    .single-service .single-service-thumb {
        height: 73px;
        width: 73px;
        border-radius: 100%;
        background-color: #F9FAFB;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #F9FAFB;
        transition: all 0.3s ease;
        position: relative;
    }
    .single-service .single-service-thumb img {
      width: 75%;
    }
    
    /* Hover effect */
    .single-service:hover {
      background-color: #222831;
      color: #00adb5;
    }
    .single-service:hover .single-service-thumb {
      background-color: #222831;
      border-color: #00ADB5;
      color: #00ADB5;
    }
    
    /* Title */
    .single-service .single-service-title .title {
      font-size: 18px;
      font-weight: 800;
      color: #F9FAFB;
      margin: 0 0 0 20px;
      transition: all 0.3s ease;
    }
    .single-service:hover .single-service-title .title {
      color: #00adb5;
    }
    
    /* Large container */
    @media only screen and (min-width: 1600px) {
      .custom-large-container {
        max-width: 1560px;
        width: 100%;
        margin: 0 auto;
      }
    }
    </style>
    
    