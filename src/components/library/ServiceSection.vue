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
                <h2 v-else class="service-heading">{{ editableContent.text1 }}</h2>
              </div>

              <!-- Description -->
              <div
                class="editable description-section"
                :class="{ selected: selectedField === 'description1' }"
                @click="selectField('description1')"
                @mouseover="hoveredField = 'description1'"
                @mouseleave="hoveredField = null"
              >
                <span v-if="hoveredField === 'description1'" class="edit-label">Text</span>
                <textarea
                  v-if="selectedField === 'description1'"
                  v-model="editableContent.description1"
                  @blur="blurAndUpdate"
                />
                <p v-else class="service-description">{{ editableContent.description1 }}</p>
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
                  <!-- Icon -->
                  <div
                    class="icon editable"
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
                    <img v-else :src="service.img" alt="Service Icon" />
                  </div>

                  <!-- Title -->
                  <div
                    class="editable"
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
                    <h4 class="title" v-else>{{ service.title }}</h4>
                  </div>
                </div>

                <!-- Service Description -->
                <div
                  class="editable"
                  :class="{ selected: selectedField === 'service-description-' + i }"
                  @click="selectField('service-description-' + i)"
                  @mouseover="hoveredField = 'service-description-' + i"
                  @mouseleave="hoveredField = null"
                >
                  <span v-if="hoveredField === 'service-description-' + i" class="edit-label">Text</span>
                  <textarea
                    v-if="selectedField === 'service-description-' + i"
                    v-model="editableContent.services[i].description"
                    @blur="blurAndUpdate"
                  />
                  <p v-else>{{ service.description }}</p>
                </div>
              </div>
            </div>
            <!-- End Right Side -->
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
        text1: "Neonal Medical Care - 35 Years of Trusted Experience",
        description1: "Providing compassionate and comprehensive healthcare services with cutting-edge technology and expert medical professionals.",
        services: [
          {
            img: "/components/sections/ss_health_sections/health_services/health_service1/images/1.jpg",
            title: "Service 1",
            description: "Description 1",
          },
          {
            img: "/components/sections/ss_health_sections/health_services/health_service1/images/2.jpg",
            title: "Service 2",
            description: "Description 2",
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
    background-image: url('../images/about-bg.jpg');
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

/*service   css  end */
</style>
  