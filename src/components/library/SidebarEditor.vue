<template>
  <div class="editor-sidebar" :class="{ 'editor-sidebar--open': isOpen }">
    <div class="editor-sidebar__header">
      <h4 class="type-heading">Edit {{ type }}</h4>
      <button @click="onClose" class="editor-sidebar__close">✖</button>
    </div>

    <div class="editor-sidebar__body">
      <!-- Logo Upload -->
      <div v-if="type === 'logo'" class="editor-sidebar__section">
        <h5 class="editor-sidebar__title">Note:</h5>
        <p class="editor-sidebar__note">
          If you change the logo it will be updated everywhere the logo appears.
        </p>

        <label class="editor-sidebar__upload-btn">
          Upload Logo
          <input
            type="file"
            @change="(e) => $emit('image-upload', e, 'logo')"
            hidden
          />
        </label>

        <img
          v-if="editableContent.logo"
          :src="editableContent.logo"
          class="editor-sidebar__preview"
        />
      </div>

       <!-- Multi Image Upload -->
      <div v-else-if="type === 'image'" class="editor-sidebar__section">
        <!-- Upload Button -->
        <label class="editor-sidebar__upload-btn">
          Upload Images
          <input
            type="file"
            multiple
            @change="(e) => $emit('image-upload', e, 'images')"
            hidden
          />
        </label>

        <!-- Preview Grid -->
        <div
          v-if="(editableContent.images && editableContent.images.length) || editableContent.image"
          class="editor-sidebar__image-grid"
        >
          <!-- Current Single Image (fallback) -->
          <div v-if="editableContent.image" class="editor-sidebar__image-item">
            <img :src="editableContent.image" class="editor-sidebar__preview" />
            <button class="editor-sidebar__remove" @click="removeSingleImage">
              ✖
            </button>
          </div>

          <!-- Multiple Images -->
          <div
            v-for="(img, index) in editableContent.images || []"
            :key="index"
            class="editor-sidebar__image-item"
          >
            <img :src="img" class="editor-sidebar__preview" />
            <button class="editor-sidebar__remove" @click="removeImage(index)">
              ✖
            </button>
          </div>
        </div>
      </div>

      <!-- Button Editor -->
      <div v-else-if="type === 'button'" class="editor-sidebar__section">
        <label>Button Text:</label>
        <input
          v-model="editableContent['header-button1']"
          @blur="updateField('header-button1')"
        />
      </div>

      <!-- Menu Editor -->
      <MenuEditor
        v-if="type === 'menus'"
        :site-settings="siteSettings"
        :menu="editableContent.menu"
        @update-field="updateMenu"
      />
    </div>
  </div>
</template>

<script setup>
import MenuEditor from "./MenuEditor.vue";
const props = defineProps({
  type: String,
  isOpen: Boolean,
  editableContent: Object,
});

const emit = defineEmits(["close", "update-field", "image-upload"]);

function onClose() {
  emit("close");
}

function updateField(field) {
  emit("update-field", {
    field_name: field,
    value: props.editableContent[field],
  });
}

function removeImage(index) {
  props.editableContent.images.splice(index, 1);
  emit("update-field", {
    field_name: "images",
    value: props.editableContent.images,
  });
}

/* remove fallback single image */
function removeSingleImage() {
  props.editableContent.image = null;
  emit("update-field", {
    field_name: "image",
    value: null,
  });
}
</script>

<style>
.editor-sidebar {
  position: fixed;
  top: 79px;
  right: -400px;
  width: 350px;
  height: calc(100% - 64px);
  background: #fff;
  border-left: 1px solid #ddd;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease-in-out;
  z-index: 998;
  padding: 1rem;
  overflow-y: auto;
}
.editor-sidebar--open {
  right: 0;
}
.editor-sidebar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.editor-sidebar__close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}
.editor-sidebar__body {
  margin-top: 1rem;
}
.editor-sidebar__section {
  margin-bottom: 1.5rem;
}
.editor-sidebar__title {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: #1d2b64;
}
.editor-sidebar__note {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}
.editor-sidebar__upload-btn {
  display: inline-block;
  padding: 0.6rem 1rem;
  background: #1d2b64;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
  margin-bottom: 10px;
}
.editor-sidebar__upload-btn:hover {
  background: #fff;
  color: #1d2b64;
  border: 1px solid #1d2b64;
}
.editor-sidebar__preview {
  max-width: 100%;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 4px;
  background: #fafafa;
}
.editor-sidebar__image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}
.editor-sidebar__image-item {
  position: relative;
  display: inline-block;
}
.editor-sidebar__remove {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  cursor: pointer;
}
.type-heading {
  color: #1d2b64;
  font-size: 28px;
  font-weight: 700;
}
.editor-sidebar__remove {
    position: absolute;
    top: -3%;
    right: -6px;
}
</style>
