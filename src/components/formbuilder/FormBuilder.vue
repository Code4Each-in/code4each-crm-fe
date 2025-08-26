<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store";
import { useAuth } from "@/service/useAuth";
import WordpressService from "@/service/WordpressService";
import { useForm } from "vee-validate";
const { handleSubmit } = useForm();

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
const deletingFormId = ref(null);

// Forms list
const forms = ref([]);
const formFields = ref([]);
const formName = ref("");
const showBuilder = ref(false);
const siteSettingsDeatil = ref([]);
const formId = ref(null);
const formsFetched = ref(false);

// Submissions Modal
const submissions = ref({ headers: [], rows: [] });
let bsModal = null;
const submissionsModalTitle = ref("Form Submissions");
const showSubmissions = ref(false);

// Flash class
const flashClass = computed(() => 
    store.flashMeassgeType === 'error' ? 'flash-error' : 'flash-success'
);
const sortedFields = computed(() => [...formFields.value].sort((a, b) => a.position - b.position));

// -------------------------
// Fetch Dashboard Data
// -------------------------
const fetchDashboardData = async () => {
    try {
        const response = await WordpressService.fetchDashboardData();
        if (response.status === 200 && response.data.success) {
            dashboardData.value = response.data;
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            localStorage.removeItem("access_token");
            router.push("/login");
        } else {
            console.error(err.message);
            error.value = true;
        }
    } finally {
        loading.value = false;
    }
};

// -------------------------
// Sidebar toggle
// -------------------------
const navBarToggle = (value) => isSidebarToggled.value = value;

// -------------------------
// Open Builder (New or Edit)
// -------------------------
const openBuilder = (form = null) => {
    showBuilder.value = true;
    localStorage.setItem("builderOpen", "true");
    loading.value = true;

    if (form) {
        formId.value = form.id || null;
        formName.value = form.name || "";
        formFields.value = (form.fields || []).map((f, index) => ({
            id: f.id || Date.now() + index,
            type: f.form_field_type || f.type || "", 
            label: f.form_field_name || f.label || "",
            placeholder: f.form_field_placeholder || f.placeholder || "",
            required: f.form_field_required === "1" || f.required === true,
            position: parseInt(f.form_field_position) || index + 1,
            options: f.form_field_options ? JSON.parse(f.form_field_options) : (f.options || []),
            optionsString: f.form_field_options
                ? JSON.parse(f.form_field_options).join(", ")
                : (f.options ? f.options.join(", ") : "")
        }));
    } else {
        formId.value = null;
        formName.value = "";
        formFields.value = [];
    }
    loading.value = false;
};

// -------------------------
// Close Builder
// -------------------------
const closeBuilder = () => showBuilder.value = false;

// -------------------------
// Add Field
// -------------------------
const addField = (type) => {
    const newField = {
        id: Date.now(),
        type,
        label: "",
        placeholder: "",
        options: ["select", "radio", "checkbox"].includes(type) ? ["Option 1"] : [],
        optionsString: ["select", "radio", "checkbox"].includes(type) ? "Option 1" : "",
        value: "",
        required: false,
        position: formFields.value.length + 1
    };
    formFields.value.push(newField);
};

// -------------------------
// Remove Field
// -------------------------
const removeField = (id) => {
    formFields.value = formFields.value
        .filter(f => f.id !== id)
        .map((f, index) => ({ ...f, position: index + 1 }));
};

// -------------------------
// Fetch Forms
// -------------------------
const fetchForms = async () => {
    formsFetched.value = false;
    try {
        const response = await WordpressService.FormBuilder.fetchForms({
            website_domain: siteSettingsDeatil.value.website_domain,
        });

        if (response.status === 200 && response.data.success) {
             forms.value = await Promise.all(response.data.response.map(async (f) => {
                // Fetch submission count
                const submissionsResponse = await WordpressService.FormBuilder.getFormSubmissions({
                    form_id: f.id,
                    website_domain: siteSettingsDeatil.value.website_domain,
                });
                const rows = submissionsResponse?.data?.rows || [];
                const submissionCount = rows.length;

                return {
                    id: f.id,
                    name: f.form_name,
                    status: f.status === "active" ? "Active" : "Inactive",
                    fields: f.fields || [],
                    submissionCount,
                };
            }));
        } else {
            forms.value = [];
        }
    } catch (error) {
        console.error(error);
    } finally {
        formsFetched.value = true; 
    }
};

// -------------------------
// Submit Form
// -------------------------
const submitCustomFields = handleSubmit(async () => {
  try {
    loading.value = true;
    
    if (!formName.value.trim()) {
      store.updateFlashMeassge(true, "Form name is required.", 'error');
      return;
    }

    if (formFields.value.length === 0) {
      store.updateFlashMeassge(true, "Please add at least one field.", 'error');
      return;
    }

    for (const field of formFields.value) {
      if (!field.label.trim()) {
        store.updateFlashMeassge(true, `Label is required for ${field.type} field.`, 'error');
        return;
      }
      if (
        (field.type === "select" || field.type === "radio" || field.type === "checkbox") &&
        (!field.options || field.options.length === 0 || field.options.every(o => !o.trim()))
      ) {
        store.updateFlashMeassge(true, `Options are required for ${field.type} field.`, 'error');
        return;
      }
    }

    const formData = {
        form_id: formId.value,
        name: formName.value,
        website_domain: siteSettingsDeatil.value.website_domain,
        fields: formFields.value.map(field => ({
        type: field.type,
        label: field.label,
        placeholder: field.placeholder || '',
        required: field.required || false,
        position: field.position || 0,
        options: field.options || [],
      }))
    };

    let response;
    if (formId.value) {
    response = await WordpressService.FormBuilder.updateCustomFields(formData);
    } else {
    response = await WordpressService.FormBuilder.submitCustomFields(formData);
    }

    if (response.status === 200 && response.data.success) {
      store.updateFlashMeassge(true, `Form "${formName.value}" saved successfully.`, 'success');
      closeBuilder();
      await fetchForms();
    } else {
      store.updateFlashMeassge(true, "Something went wrong while saving the form.", 'error');
    }
  } catch (error) {
    console.error("Error saving form:", error);
  } finally {
    loading.value = false;
  }
});


// -------------------------
// Logout
// -------------------------
const logout = async () => {
    await doLogout();
    router.push("/login");
};

// -------------------------
// Get Site Details
// -------------------------
const getSiteDeatils = async () => {
    if (!store.websiteId || typeof store.websiteId !== "number") return;
    try {
        const response = await WordpressService.WebsiteSettings.getSiteDetail({
            website_id: store.websiteId,
        });
        if (response.status === 200 && response.data.success) {
            siteSettingsDeatil.value = response.data.settings_detail;
        }
    } catch (error) {
        console.error(error);
    }
};

// -------------------------
// Toggle Form Status
// -------------------------
const toggleFormStatus = async (form) => {
    try {
        const newStatus = form.status === "Active" ? "Inactive" : "Active";
        const response = await WordpressService.FormBuilder.updateFormStatus({
            website_domain: siteSettingsDeatil.value.website_domain,
            form_id: form.id,
            status: newStatus.toLowerCase(),
        });

        if (response.status === 200 && response.data.success) {
            form.status = newStatus;
            store.updateFlashMeassge(true, `Form "${form.name}" has been ${newStatus.toLowerCase()} successfully.`, 'success');
        }
    } catch (error) {
        console.error(error);
    }
};

const confirmToggleStatus = (form) => {
    const action = form.status === "Active" ? "deactivate" : "activate";
    if (window.confirm(`Are you sure you want to ${action} this form?`)) {
        toggleFormStatus(form);
    }
};

// -------------------------
// Delete Form
// -------------------------
const deleteForm = async (form) => {
    if (!window.confirm(`Are you sure you want to delete the form "${form.name}"?`)) return;

    try {
        loading.value = true;
        deletingFormId.value = form.id;
        const response = await WordpressService.FormBuilder.deleteForm({
            website_domain: siteSettingsDeatil.value.website_domain,
            form_id: form.id,
        });

        if (response.status === 200 && response.data.success) {
            forms.value = forms.value.filter(f => f.id !== form.id);
            store.updateFlashMeassge(true, `Form "${form.name}" deleted successfully.`, 'success');
        } else {
            store.updateFlashMeassge(true, "Something went wrong while deleting the form.", 'error');
        }
    } catch (error) {
        console.error(error);
    } finally {
        deletingFormId.value = null;
        loading.value = false;
    }
};

// -------------------------
// GET FORM SUBMISSIONS DATA
// -------------------------
const getFormSubmissions = async (form) => {
    try {
        showSubmissions.value = true;
        loading.value = true;
        submissionsModalTitle.value = `${form.name} Submissions (${form.submissionCount})`;
        submissions.value = { headers: [], rows: [] };

        // Fetch submissions
        const response = await WordpressService.FormBuilder.getFormSubmissions({
            form_id: form.id,
            website_domain: siteSettingsDeatil.value.website_domain,
        });

        if (response.status === 200 && response.data.success) {
            submissions.value = response.data;
        } else {
            submissions.value = { headers: [], rows: [] };
        }
    } catch (error) {
        console.error("Error fetching form submissions:", error);
        submissions.value = { headers: [], rows: [] };
    } finally {
        loading.value = false;
    }
};

const backToForms = () => {
    showSubmissions.value = false;
    submissions.value = { headers: [], rows: [] };
};

function formatDate(dateString) {
  if (!dateString) return "";
  
  // Treat DB string as UTC
  const date = new Date(dateString + "Z"); // <-- add Z for UTC

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
}

// -------------------------
// Mounted
// -------------------------
onMounted(async () => {
    loading.value = true;
    await fetchDashboardData();
    await getSiteDeatils();
    if (siteSettingsDeatil.value.website_domain) {
        await fetchForms();
    }
    loading.value = false;
});
</script>

<template>
<div class="page">
    <FlashMessage :visible="store.flashMeassge" v-if="store.flashMeassge" :class="flashClass" />
    <NavBar @logout="logout" @nav-bar-toggle="navBarToggle" :dashboardData="dashboardData?.user" />
    <SideBar :dashboardData="dashboardData" :toggled="isSidebarToggled" />

    <div class="main-form-content">
        <!-- LIST VIEW -->
        <div v-if="!showBuilder && !showSubmissions">
            <div class="form-header">
                <h3>Forms</h3>
                <button class="btn btn-addnewform shadow-sm" @click="openBuilder()">
                    <i class="bi bi-plus-lg"></i> Add New Form
                </button>
            </div>

            <div v-if="!formsFetched" class="loader-wrapper">
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
                                <th>Form Submitted</th>
                                <th>Status</th>
                                <th class="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(form, index) in forms" :key="form.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ form.name }}</td>
                                <td>{{ form.submissionCount }}</td>
                                <td>
                                    <div class="d-flex flex-column align-items-center">
                                        <button
                                        class="btn btn-sm"
                                        :class="form.status === 'Active' ? 'btn-active-status' : 'btn-inactive-status'"
                                        @click="confirmToggleStatus(form)"
                                        >
                                        {{ form.status }}
                                        </button>
                                        <small class="text-muted mt-1">
                                        Click here to {{ form.status === 'Active' ? 'deactivate' : 'activate' }} the form
                                        </small>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-sm btn-outline-primary me-2" 
                                            @click="openBuilder(form)" 
                                            data-bs-toggle="tooltip" 
                                            data-bs-placement="top" 
                                            title="Edit">
                                    <i class="fa fa-pencil"></i>
                                    </button>

                                    <button class="btn btn-sm btn-outline-danger me-2" 
                                            @click="deleteForm(form)" 
                                            :disabled="deletingFormId === form.id || loading"
                                            data-bs-toggle="tooltip" 
                                            data-bs-placement="top" 
                                            :title="deletingFormId === form.id ? 'Deleting...' : 'Delete'">
                                    <span v-if="deletingFormId === form.id" class="spinner-border spinner-border-sm"></span>
                                    <i class="fa fa-trash"></i>
                                    </button>

                                    <button class="btn btn-sm btn-outline-info" 
                                            @click="getFormSubmissions(form)"
                                            data-bs-toggle="tooltip" 
                                            data-bs-placement="top" 
                                            title="View">
                                        <i class="fa fa-eye"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="formsFetched && forms.length === 0" class="empty-state card shadow-sm text-center p-5">
                    <h5 class="mb-3">No Forms Found</h5>
                    <p class="text-muted mb-4">You haven’t created any forms yet. Click below to start!</p>
                    <button class="btn btn-primary" @click="openBuilder()">
                        <i class="bi bi-plus-circle"></i> Create Your First Form
                    </button>
                </div>
            </div>
        </div>
         <!-- SUBMISSIONS VIEW -->
        <div v-else-if="showSubmissions">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h3>{{ submissionsModalTitle }}</h3>
                <button class="btn btn-outline-secondary" @click="backToForms">Back</button>
            </div>

            <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status"></div>
            </div>
            <div v-else-if="submissions.rows?.length">
                <div class="table-responsive card shadow-sm">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Submitted At</th>
                                <th v-for="header in submissions.headers" :key="header">{{ header }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in submissions.rows" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ formatDate(row.submitted_at) || '---' }}</td>
                                <td v-for="header in submissions.headers" :key="header">
                                    {{ row[header] || '---' }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else class="text-center p-3 card shadow-sm">
                No submissions found.
            </div>
        </div>

        <!-- BUILDER VIEW -->
        <div v-else>
            <div class="card shadow-sm">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Form Builder</h5>
                    <div>
                        <button class="btn btn-outline-secondary me-2" @click="closeBuilder">Back</button>
                        <button
                            type="submit"
                            class="btn btn-saveform"
                            @click="submitCustomFields"
                        >
                            Save Form
                        </button>
                    </div>
                </div>

                <div class="card-body p-3">
                    <input v-model="formName" class="form-control mb-3" placeholder="Form Name" />
                    <div class="mt-3 mb-3 form-fields">
                        <strong class="me-2">Add Field:</strong>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('text')">Text</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('email')">Email</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('phone')">Phone</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('textarea')">Textarea</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('select')">Select</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('radio')">Radio</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('checkbox')">Checkbox</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('date')">Date</button>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="addField('time')">Time</button>
                    </div>
                    <div v-for="field in sortedFields" :key="field.id" class="mb-3 border p-2 rounded">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <strong>{{ (field.type || '').toUpperCase() }}</strong>
                            <div class="d-flex align-items-center gap-2">
                                <div class="d-flex align-items-center gap-1">
                                    <label class="mb-0"><strong>Position:</strong></label>
                                    <input type="number" v-model.number="field.position" class="form-control form-control-sm" style="width: 60px;" />
                                </div>

                                <label class="mb-0">
                                    <strong>Required</strong> <input type="checkbox" v-model="field.required" />
                                </label>

                                <button class="btn btn-sm btn-danger" @click="removeField(field.id)">Remove</button>
                            </div>
                        </div>

                        <input v-model="field.label" class="form-control mb-1" placeholder="Label" />

                        <!-- Placeholder for text/email/phone/textarea -->
                        <input v-if="['text','email','phone','textarea'].includes(field.type)" v-model="field.placeholder" class="form-control mb-1" placeholder="Placeholder" />

                        <!-- Options for select/radio/checkbox -->
                        <div v-if="['select','radio','checkbox'].includes(field.type)" class="mt-2">
                            <label>Options (comma separated)</label>
                            <input v-model="field.optionsString" @input="field.options = field.optionsString.split(',').map(o => o.trim())" class="form-control" />
                        </div>
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

.modal-body {
    padding: 16px !important;
}
/* .table {
    border-radius: 8px;
    overflow: hidden;
    font-size: 14px;   
} */

.table th,
.table td {
    padding: 8px 12px;         
    vertical-align: middle; 
    text-align: center; 
}

.table thead {
    background-color: #f1f3f5;
}

.table th {
    font-weight: 600;
    text-align: center;
}

.table td:first-child,
.table th:first-child {
    text-align: left;   
}

.table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
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

.btn-addnewform {
    background: #1d2b64;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
}

.btn-addnewform:hover {
    background: #fff;
    color: #1d2b64;
    border: 2px solid #1d2b64;
}

.btn-saveform {
    background: #1d2b64;
    color: #fff;
}

.btn-saveform:hover {
    background: #fff;
    color: #1d2b64;
    border: 2px solid #1d2b64;
}

.btn-active-status,
.btn-inactive-status {
    min-width: 80px;
    padding: 4px 10px;   
    font-size: 13px;        
    border-radius: 6px;      
}

/* --- Active Button --- */
.btn-active-status {
    background-color: #008000;
    color: #fff;
    border: none;
}
.btn-active-status:hover {
    background-color: #fff;
    color: #008000;
    border: 2px solid #008000;
}

/* --- Inactive Button --- */
.btn-inactive-status {
    background-color: #dc3545;
    color: #fff;
    border: none;
}
.btn-inactive-status:hover {
    background-color: #fff;
    color: #dc3545;
    border: 2px solid #dc3545;
}

/* --- Note under buttons --- */
.status-note {
    font-size: 12px;
    color: #6c757d;
    margin-top: 4px;
}

.flash-success {
  background-color: #d4edda;
  color: #155724;
}

.flash-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 2px solid #721c24;
}

.modal-footer {
    justify-content: end !important;
}
</style>
