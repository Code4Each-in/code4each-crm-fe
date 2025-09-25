<template>
    <div class="container-fluid border-bottom bg-light wow fadeIn" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeIn;">
        <!-- Topbar -->
        <div class="container topbar bg-primary d-none d-lg-block py-2" style="border-radius: 0 40px">
            <div class="d-flex justify-content-between">
                <div class="top-info ps-2">
                    <small class="me-3">
                        <i class="fa fa-map-marker me-2 text-secondary"></i>
                        <span class="text-white">{{ editableContent.address }}</span>
                    </small>

                    <small class="me-3">
                        <i class="fa fa-envelope me-2 text-secondary"></i>
                        <span href="#" class="text-white">{{ editableContent.email }}</span>
                    </small>
                </div>
    
                <div class="top-link pe-2">
                    <ul
                    class="header-social editable"
                    :class="{ selected: selectedField === 'socialLinks' }"
                    @click.stop="selectField('socialLinks', 'social')"
                    @mouseover="hoveredField = 'socialLinks'"
                    @mouseleave="hoveredField = null"
                    >
                    <span v-if="hoveredField === 'socialLinks'" class="edit-label">
                        Social Links
                    </span>

                    <li v-for="(link, i) in editableContent.socialLinks" :key="i">
                        <span class="text-white">
                            <i :class="link.icon" aria-hidden="true"></i>
                        </span>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- Navbar -->
        <div class="container px-0">
            <nav class="navbar navbar-expand-xl py-3">
                <div
                  class="footer-logo m-b-20 editable"
                  style="margin-left: 20px;"
                  @click.stop="selectField('logo', 'logo')"
                  @mouseover="hoveredField = 'logo'"
                  @mouseleave="hoveredField = null"
                  :class="{ selected: selectedField === 'logo' }"
                >
                  <span v-if="hoveredField === 'logo'" class="edit-label">Logo</span>
                  <img :src="editableContent.logo" alt="Logo" style="max-height: 40px;"/>
                </div>
  
                <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars text-primary"></span>
                </button>
  
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mx-auto editable" 
                        :class="{ selected: selectedField === 'menu' }" 
                        @click.stop="selectField('menu', 'menus')" 
                        @mouseover="hoveredField='menu'" 
                        @mouseleave="hoveredField=null">
                        <span v-if="hoveredField==='menu'" class="edit-label">Menu</span>
                        <li v-for="(item, index) in editableContent.menu" :key="index" class="nav-item">
                            <span class="nav-link">{{ item }}</span>
                        </li>
                    </ul>
  
                    <div class="d-flex me-4">
                        <div id="phone-tada" class="d-flex align-items-center justify-content-center">
                            <span class="position-relative wow tada" data-wow-delay=".9s">
                                <i class="fa fa-phone text-primary fa-2x me-4"></i>
                                <div class="position-absolute" style="top: -7px; left: 20px;">
                                    <span><i class="fa fa-comment text-secondary"></i></span>
                                </div>
                            </span>
                        </div>
                        <div class="d-flex flex-column pe-3 border-primary">
                            <span class="text-primary">Have any questions?</span>
                            <span class="text-secondary">Call: {{ editableContent.phone }}</span>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
  
    <!-- Hero Section -->
    <div class="container-fluid py-5 hero-header wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5">
            <div class="row g-5">
                <div class="col-lg-7 col-md-12">
                    <div class="editable" 
                        :class="{ selected: selectedField === 'header-text1' }" 
                        @click.stop="selectField('header-text1')" 
                        @mouseover="hoveredField='header-text1'" 
                        @mouseleave="hoveredField=null">
                        <span v-if="hoveredField==='header-text1'" class="edit-label">Hero Heading</span>
                        <input v-if="selectedField==='header-text1'" v-model="editableContent['header-text1']" @blur="blurAndUpdate('header-text1')" />
                        <h1 v-else class="mb-3 text-primary">{{ editableContent['header-text1'] }}</h1>
                    </div>

                    <div class="editable" 
                        :class="{ selected: selectedField === 'header-description1' }" 
                        @click.stop="selectField('header-description1')" 
                        @mouseover="hoveredField='header-description1'" 
                        @mouseleave="hoveredField=null">
                        <span v-if="hoveredField==='header-description1'" class="edit-label">Hero Description</span>
                        <textarea v-if="selectedField==='header-description1'" v-model="editableContent['header-description1']" @blur="blurAndUpdate('header-description1')" />
                        <h1 v-else class="mb-5 display-1 text-white">{{ editableContent['header-description1'] }}</h1>
                    </div>

                    <div
                    class="editable"
                    :class="{ selected: selectedField === 'header-button1' }"
                    @mouseover="hoveredField = 'header-button1'"
                    @mouseleave="hoveredField = null"
                    v-if="editableContent['header-button1']"
                    >
                    <span v-if="hoveredField === 'header-button1'" class="edit-label">Button</span>

                    <!-- Button that opens the sidebar -->
                    <button
                        class="btn btn-primary px-4 py-3 px-md-5 me-4 btn-border-radius"
                        @click.stop="selectField('header-button1', 'button', 'header')"
                    >
                        {{ editableContent['header-button1'] }} 
                    </button>
                    </div>
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
        @image-upload="(e, field) => handleImageUpload(e, field, 'header')"
    />
</template>
  
<script setup>
    // import '../ss_education_templates/bootstrap.min.css';
    import { ref, watch } from 'vue';
    import { useEditable } from '../library';
    import SidebarEditor from '../SidebarEditor.vue';
    
    const props = defineProps({
        data: {
            type: Object,
            default: () => ({
            logo: '/images/logo.png',
            address: '123 Main St, City, State, Country',
            email: 'default@example.com',
            phone: '+1234567890',
            socialLinks: '',
            menu: ['Home', 'About', 'Services', 'Contact'],
            heroHeading: 'Your Hero Heading',
            heroDescription: 'Your Hero Description',
            heroButton: 'Click Here',
            heroButtonLink: '#',
            heroButtonTarget: '_self',
            }),
        },
    });
    
    const emit = defineEmits(['field-updated']);
    const editableContent = ref({ ...props.data });
    
    watch(() => props.data, (newVal) => {
        editableContent.value = { ...newVal };
    }, { immediate: true, deep: true });
    
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
/* Editable styling */
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
  
  input,
  textarea {
    width: 100%;
    font-size: inherit;
    font-family: inherit;
    padding: 8px;
    border: 1px solid #ccc;
  }
    /*** Spinner Start ***/
    #spinner {
        opacity: 0;
        visibility: hidden;
        transition: opacity .8s ease-out, visibility 0s linear .5s;
        z-index: 99999;
    }

    #spinner.show {
        transition: opacity .8s ease-out, visibility 0s linear .0s;
        visibility: visible;
        opacity: 1;
    }
    /*** Spinner End ***/


    /*** Common CSS Start ***/
    .back-to-top {
        position: fixed;
        right: 30px;
        bottom: 30px;
        display: flex;
        width: 45px;
        height: 45px;
        align-items: center;
        justify-content: center;
        transition: 0.5s;
        z-index: 99;
    }

    h1,
    h2,
    h3,
    .h1,
    .h2,
    .h3 {
        font-weight: 200;
        font-family: 'Montserrat', sans-serif;
    }

    h4,
    h5,
    h6,
    .h4,
    .h5,
    .h6 {
        font-weight: 600;
        font-family: 'Montserrat', sans-serif;
    }

    .display-1,
    .display-2,
    .display-3,
    .display-4,
    .display-5,
    .display-6 {
        font-weight: 700;
        font-family: 'Fredoka', sans-serif;
    }

    .display-4,
    .display-5,
    .display-6 {
        font-weight: 600;
    }

    .wow,
    .animated {
        animation-duration: 2s !important;
    }
    /*** Common CSS End ***/


    /*** Button Start ***/
    .btn {
        font-weight: 600;
        transition: .5s;
    }

    .btn-square {
        width: 32px;
        height: 32px;
    }

    .btn-sm-square {
        width: 34px;
        height: 34px;
    }

    .btn-md-square {
        width: 44px;
        height: 44px;
    }

    .btn-lg-square {
        width: 56px;
        height: 56px;
    }

    .btn-square,
    .btn-sm-square,
    .btn-md-square,
    .btn-lg-square {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: normal;
    }

    .btn.btn-primary {
        border: 0;
        color: #fff;
    }

    .btn.btn-primary:hover {
        background: #00b4d8;
        color: #FF4880;
    }

    .btn-border-radius {
        border-radius: 25% 10%;
    }

    .img-border-radius {
        border-radius: 50% 20% / 10% 40%;
    }

    .title-border-radius {
        border-radius: 10% 30%;
    }
    /*** Button End ***/


    /*** Topbar Start ***/
    .topbar .top-info {
        font-size: medium;
        font-weight: 400;
        font-family: 'Montserrat', sans-serif;
        letter-spacing: 1px;
        display: flex;
        align-items: center;
    }

    .top-link {
        list-style: none;
        padding: 0;
        margin: 0;
        gap: 6px;
    }

    .topbar .top-link {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* .topbar .top-link .fa {
        margin-right: 10px;
    } */

    /* .topbar .top-link .fa:hover {
        background: #00b4d8 !important;
    } */

    .topbar .top-link .fa:hover i {
        color: #1d70a2 !important;
    }
    /*** Topbar End ***/


    /*** Navbar Start ***/
    .navbar {
        border-bottom: 1px solid rgba(255, 255, 255, .1);
    }

    .navbar .navbar-nav .nav-link {
        padding: 10px 12px;
        font-size: 16px;
        font-weight: 600;
        transition: .5s;
    }

    .navbar .navbar-nav .nav-link:hover,
    .navbar .navbar-nav .nav-link.active,
    .fixed-top.bg-white .navbar .navbar-nav .nav-link:hover,
    .fixed-top.bg-white .navbar .navbar-nav .nav-link.active {
        color: #FF4880;
    }

    .navbar .dropdown-toggle::after {
        border: none;
        content: "\f107";
        font-family: "Font Awesome 5 Free";
        font-weight: 700;
        vertical-align: middle;
        margin-left: 8px;
    }

    @media (min-width: 1200px) {
        .navbar .nav-item .dropdown-menu {
            display: block;
            visibility: hidden;
            top: 100%;
            font-weight: 400;
            font-family: 'Fredoka', sans-serif;
            transform: rotateX(-75deg);
            transform-origin: 0% 0%;
            border: 0;
            transition: .5s;
            opacity: 0;
        }
    }

    .dropdown .dropdown-menu a:hover {
        background: #00b4d8;
        color: #FF4880;
    }

    .navbar .nav-item:hover .dropdown-menu {
        transform: rotateX(0deg);
        visibility: visible;
        background: #FFECF2 !important;
        border-radius: 10px !important;
        transition: .5s;
        opacity: 1;
    }

    #searchModal .modal-content {
        background: rgba(255, 255, 255, .8);
    }
    /*** Navbar End ***/


    /*** Hero Header ***/
    .hero-header,
    .page-header {
        background: linear-gradient(rgba(0, 0, 0, 1.0), rgba(0, 0, 0, 0.05)), url('../images/teacher_img1.webp');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .navbar .logo {
        max-height: 80px;
    }
    /*** Hero Header ***/
    .bg-light {
        background-color: #ffecf2 !important;
    }
    .bg-primary {
        background-color: #f26ca7 !important;
    }
    .text-secondary {
        color: #1d70a2 !important;
    }
    .text-white {
        color: #fff !important;
    }
    a {
        color: #ff4880;
        text-decoration: none;
    }
    .text-primary {
        color: #ff4880 !important;
    }
    .header-social {
        display: flex;
        gap: 17px;
        margin: 10px;
        list-style-type: none;
    }
    .header-social {
        color: #1d70a2;
    }

    .eidtor-site img:hover {
        box-shadow: none;
    }
    .btn-primary {
        color: #000;
        background-color: #ff4880;
        border-color: #ff4880;
    }
</style>