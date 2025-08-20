<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store";
import { useAuth } from "@/service/useAuth";
import WordpressService from "@/service/WordpressService";

import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import FlashMessage from "@/components/common/FlashMessage.vue";

// Stores & Router
const store = useStore();
const router = useRouter();
const { logout: doLogout } = useAuth();

// Sidebar state
const isSidebarToggled = ref(false);
const dashboardData = ref({});
const loading = ref(true);
const error = ref(false);

// Forms list
const forms = ref([]);

// Builder state
const showBuilder = ref(false);
const builderLoading = ref(false);
const formName = ref("");
const formFields = ref([]);

// Fetch dashboard data
const fetchDashboardData = async () => {
    try {
        const response = await WordpressService.fetchDashboardData();
        if (response.status === 200 && response.data.success) {
            dashboardData.value = response.data;
            loading.value = false;
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            localStorage.removeItem("access_token");
            router.push("/login");
        } else {
            console.error(err.message);
            error.value = true;
            loading.value = false;
        }
    }
};

// Sidebar toggle
const navBarToggle = (value) => isSidebarToggled.value = value;

// Open builder (new or edit)
const openBuilder = (form = null) => {
    showBuilder.value = true;
    localStorage.setItem("builderOpen", "true");
    builderLoading.value = true;

    if (form) {
        formName.value = form.name;
        formFields.value = JSON.parse(form.schema_json).map(f => ({
            ...f,
            optionsString: f.options ? f.options.join(", ") : ""
        }));
    } else {
        formName.value = "";
        formFields.value = [];
    }
};

// Close builder
const closeBuilder = () => {
    showBuilder.value = false;
};

// Add a new field
const addField = (type) => {
    formFields.value.push({
        id: Date.now(),
        type,
        label: "",
        placeholder: "",
        options: type === "select" || type === "radio" || type === "checkbox" ? ["Option 1"] : [],
        optionsString: type === "select" || type === "radio" || type === "checkbox" ? "Option 1" : "",
        value: "",
        required: false,
        position: formFields.value.length + 1
    });
}
// Remove a field
const removeField = (id) => {
    formFields.value = formFields.value.filter(f => f.id !== id);
};

// Save form
const saveForm = () => {
    const schema = JSON.stringify(formFields.value);
    console.log("Form Name:", formName.value);
    console.log("Form Schema:", schema);

    alert("Form saved successfully!");
    // Here you can call your API to save formName and schema
};

// Logout
const logout = async () => {
    await doLogout();
    router.push("/login");
};

onMounted(async () => {
    await fetchDashboardData();

    // Dummy forms
    forms.value = [
        { id: 1, name: "Contact Form", status: "Active", schema_json: "[]" },
        { id: 2, name: "Survey Form", status: "Active", schema_json: "[]" },
    ];
    loading.value = false;
});
</script>

<template>
<div class="page">
    <FlashMessage :visible="store.flashMeassge" v-if="store.flashMeassge" />
    <NavBar @logout="logout" @nav-bar-toggle="navBarToggle" :dashboardData="dashboardData?.user" />
    <SideBar :dashboardData="dashboardData" :toggled="isSidebarToggled" />

    <div class="main-form-content">
        <!-- LIST VIEW -->
        <div v-if="!showBuilder">
            <div class="form-header">
                <h3>Forms</h3>
                <button class="btn btn-primary shadow-sm" @click="openBuilder()">
                    <i class="bi bi-plus-lg"></i> Add New Form
                </button>
            </div>

            <div v-if="loading" class="loader-wrapper">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div v-else>
                <div v-if="forms.length > 0" class="table-responsive card shadow-sm">
                    <table class="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Form Name</th>
                                <th>Status</th>
                                <th class="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(form, index) in forms" :key="form.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ form.name }}</td>
                                <td>{{ form.status }}</td>
                                <td class="text-center">
                                    <button class="btn btn-sm btn-outline-primary me-2" @click="openBuilder(form)">
                                        <i class="bi bi-pencil"></i> Edit
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger">
                                        <i class="bi bi-trash"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-else class="empty-state card shadow-sm text-center p-5">
                    <h5 class="mb-3">No Forms Found</h5>
                    <p class="text-muted mb-4">You haven’t created any forms yet. Click below to start!</p>
                    <button class="btn btn-primary" @click="openBuilder()">
                        <i class="bi bi-plus-circle"></i> Create Your First Form
                    </button>
                </div>
            </div>
        </div>

        <!-- BUILDER VIEW -->
        <div v-else>
            <div class="card shadow-sm">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Form Builder</h5>
                    <div>
                        <button class="btn btn-outline-secondary me-2" @click="closeBuilder">Back</button>
                        <button class="btn btn-primary" @click="saveForm">Save Form</button>
                    </div>
                </div>

                <div class="card-body p-3">
                    <input v-model="formName" class="form-control mb-3" placeholder="Form Name" />

                    <div v-for="field in formFields" :key="field.id" class="mb-3 border p-2 rounded">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <strong>{{ field.type.toUpperCase() }}</strong>
                            <div class="d-flex align-items-center gap-2">
                                <!-- Position Input with Label -->
                                <div class="d-flex align-items-center gap-1">
                                    <label class="mb-0"><strong>Position:</strong></label>
                                    <input type="number" v-model.number="field.position" class="form-control form-control-sm" style="width: 60px;" />
                                </div>

                                <!-- Required Checkbox -->
                                <label class="mb-0">
                                    <strong>Required</strong> <input type="checkbox" v-model="field.required" />
                                </label>

                                <!-- Remove Button -->
                                <button class="btn btn-sm btn-danger" @click="removeField(field.id)">Remove</button>
                            </div>
                        </div>
                        <input v-model="field.label" class="form-control mb-1" placeholder="Label" />
                        <input 
                            v-if="field.type === 'text' || field.type === 'email' || field.type === 'phone'" 
                            :type="field.type === 'phone' ? 'tel' : field.type" 
                            v-model="field.value" 
                            :placeholder="field.placeholder" 
                            class="form-control" 
                        />
                        <div v-if="field.type === 'select' || field.type === 'radio' || field.type === 'checkbox'">
                            <label>Options (comma separated)</label>
                            <input 
                                v-model="field.optionsString" 
                                @input="field.options = field.optionsString.split(',').map(o => o.trim())" 
                                class="form-control" 
                            />
                        </div>
                    </div>

                    <div class="mb-3">
                        <strong>Add Field:</strong>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('text')">Text</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('email')">Email</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('phone')">Phone</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('textarea')">Textarea</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('select')">Select</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('radio')">Radio</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('checkbox')">Checkbox</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.main-form-content {
    margin-left: 196px;
    margin-top: 80px;
    padding: 20px;
    background-color: #f9fafc;
    min-height: 100vh;
}

.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.table {
    border-radius: 8px;
    overflow: hidden;
}

.table thead {
    background-color: #f1f3f5;
}

.table th {
    font-weight: 600;
}

.table td {
    color: #444;
}

.empty-state {
    background: #fff;
    border-radius: 12px;
}

.empty-state h5 {
    font-weight: 600;
    color: #333;
}

.loader-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 240px;
}
</style>
