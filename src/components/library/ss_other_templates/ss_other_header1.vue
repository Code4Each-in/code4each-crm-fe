<template>
    <div class="top-bar">
        <div class="container">
            <span class="ss_editable"
                @click.stop="selectField('header-text1')"
                @mouseover="hoveredField='header-text1'"
                @mouseleave="hoveredField=null"
            >
                <span v-if="hoveredField==='header-text1'" class="edit-label">Text</span>
                <span v-if="selectedField==='header-text1'">
                    <input v-model="editableContent['header-text1']" @blur="blurAndUpdate('header-text1', null, 'header', null, componentId)"/>
                </span>
                <span v-else>{{ editableContent['header-text1'] }}</span>
            </span>
            <div>
                <span><i class="fa fa-phone" aria-hidden="true" style="margin-right: 4px; font-size: 11px;"></i>{{ editableContent.address }}</span>
                <span><i class="fa fa-envelope" aria-hidden="true" style="margin-right: 4px; font-size: 11px;"></i>{{ editableContent.email }}</span>
            </div>
        </div>

        <nav class="navbar">
            <div class="container">
                <div
                    class="logo ss_editable"
                    style="margin-left: 20px;"
                    @click.stop="selectField('logo', 'logo')"
                    @mouseover="hoveredField = 'logo'"
                    @mouseleave="hoveredField = null"
                    :class="{ selected: selectedField === 'logo' }"
                >
                    <span v-if="hoveredField === 'logo'" class="edit-label">Logo</span>
                    <img :src="editableContent.logo" alt="Logo" style="max-height: 40px;"/>
                </div>
                <ul 
                    class="nav-links ss_editable" id="navLinks"
                    :class="{ selected: selectedField === 'menu' }" 
                    @click.stop="selectField('menu', 'menus')" 
                    @mouseover="hoveredField='menu'" 
                    @mouseleave="hoveredField=null"
                    >
                    <span v-if="hoveredField==='menu'" class="edit-label">Menu</span>

                    <!-- If menu items exist -->
                    <template v-if="editableContent.menu && editableContent.menu.length > 0">
                        <li v-for="(item, index) in editableContent.menu" :key="index">
                        <span>{{ item }}</span>
                        </li>
                    </template>

                    <!-- If no menu items -->
                    <template v-else>
                        <li class="nav-item">
                        <span class="nav-link text-muted">
                            <i class="fa fa-plus me-1"></i>
                            Add Menus
                        </span>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>

        <section class="hero hero-placeholder" id="home">
            <div
                class="ss_editable slider-setting-wrapper"
                :class="{ selected: selectedField === 'header-slider' }"
                @click.stop="selectField('header-slider', 'slider', 'header', componentId)"
                @mouseover="hoveredField = 'header-slider'"
                @mouseleave="hoveredField = null"
            >
                <span v-if="hoveredField === 'header-slider'" class="edit-label">
                    Slider
                </span>

                <button class="slider-setting-btn">
                    Slider Settings
                </button>
            </div>
        </section>

    </div>
    <SidebarEditor
        :isOpen="isSidebarOpen"
        :type="activeEditorType"
        :editableContent="editableContent"
        :activeSectionType="activeSectionType"
        :activeField="selectedField"
        @close="closeSidebar"
        @update-field="(data) => blurAndUpdate(data.field_name, data.value, data.type, data.file, componentId)"
        @image-upload="(e, field) => handleImageUpload(e, field, 'header', componentId)"
    />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useEditable } from '../library';
import SidebarEditor from '../SidebarEditor.vue';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            logo: 'https://via.placeholder.com/150x50?text=Logo',
            address: '123 Main St, City, Country',
            email: '',
            'header-text1': 'Welcome to Our Website',
            menu: ['Home', 'About', 'Services', 'Contact'],
            "header-images": [],
        }),
    },
});

const emit = defineEmits(['field-updated']);
const editableContent = ref({ ...props.data });
const componentId = 'COMP_SS_OTHER_HEADER_91';

watch(() => props.data, (newVal) => {
    const data = { ...newVal };
    editableContent.value = data;
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
    activeComponentId,
} = useEditable(emit, editableContent);
</script>

<style scoped>
.ss_editable {
    cursor: pointer;
    padding: 4px;
    position: relative;
    border: 2px dashed transparent;
    transition: border-color 0.2s ease;
}

.ss_editable:hover {
    border-color: #00adb5 !important;
}

.ss_editable.selected {
    border-color: #00adb5 !important;
}

.edit-label {
    position: absolute;
    top: -10px;
    left: 5px;
    background-color: #00adb5 !important;
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
h1, h2, h3, h4, h5, h6 {
    font-family: 'Cormorant Garamond', serif;
}

/* Top Bar */
.top-bar {
    background: #1a2744;
    color: #f5f0e8;
    padding: 8px 0;
    font-size: 14px;
}

.top-bar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.top-bar a {
    color: #f5f0e8;
    text-decoration: none;
    margin-left: 20px;
    transition: color 0.3s;
}

.top-bar a:hover {
    color: #d4a853;
}

/* Navbar */
.navbar {
    background: white;
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 700;
    color: #1a2744;
    max-width: 35%;
    height: auto;
}

.logo span {
    color: #d4a853;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 30px;
}

.nav-links a {
    text-decoration: none;
    color: #1a2744;
    font-weight: 500;
    transition: color 0.3s;
    position: relative;
}

.nav-links a:hover {
    color: #d4a853;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #d4a853;
    transition: width 0.3s;
}

.nav-links a:hover::after {
    width: 100%;
}

.mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #1a2744;
}

/* Container */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Hero Slider */
.hero {
    position: relative;
    height: 85vh;
    overflow: hidden;
}

.slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transform: scale(1.05);
    transition: all 0.7s ease-in-out;
}

.slide.active {
    opacity: 1;
    transform: scale(1);
}

.slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hero-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(26, 39, 68, 0.4);
    border: none;
    color: #f5f0e8;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;
    z-index: 10;
}

.hero-nav:hover {
    background: rgba(26, 39, 68, 0.6);
}

.hero-nav.prev {
    left: 20px;
}

.hero-nav.next {
    right: 20px;
}

.hero-dots {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    z-index: 10;
}

.hero-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(245, 240, 232, 0.5);
    border: none;
    cursor: pointer;
    transition: all 0.3s;
}

.hero-dot.active {
    background: #d4a853;
    width: 32px;
    border-radius: 6px;
}
.btn {
    display: inline-block;
    padding: 12px 30px;
    border-radius: 4px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s;
    cursor: pointer;
    border: none;
}

/* .btn-primary {
    background: var(--accent);
    color: var(--primary);
}

.btn-primary:hover {
    background: var(--accent-light);
} */

/* Responsive */
@media (max-width: 992px) {
    .about-grid,
    .footer-grid {
    grid-template-columns: 1fr;
    }

    .services-grid,
    .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    }

    .about-image::before {
    display: none;
    }
}

@media (max-width: 768px) {
    .top-bar .container {
    flex-direction: column;
    gap: 10px;
    }

    .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    .nav-links.active {
    display: flex;
    }

    .mobile-menu-btn {
    display: block;
    }

    .services-grid,
    .gallery-grid {
    grid-template-columns: 1fr;
    }

    .hero {
    height: 60vh;
    }

    .section-title h2 {
    font-size: 32px;
    }

    .stats {
    grid-template-columns: 1fr;
    }

    .footer-bottom {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    }
}
.hero-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #00adb5;
}

.slider-setting-btn {
    padding: 14px 28px;
    font-size: 16px;
    font-weight: 600;
    background: #00adb5;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.slider-setting-btn:hover {
    background: #008e95;
}
</style>