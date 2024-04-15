<template>
  <Modal v-model="showProfileEditor" @on-close="closeProfileEditor">
    <template v-slot:activator="{ onClick }">
      <Button @click="onClick" outline>Edit profile</Button>
    </template>
    <Card v-if="editingMedia">
      <template v-slot:header>
        <div class="profile-editor__header">
          <Button @click="editingMedia = false" icon="left-arrow" />
          <h1>Edit media</h1>
        </div>
        <Button @click="uploadBannerImage">Apply</Button>
      </template>
      <img style="width: 100%" :src="selectedBannerImageUrl" alt="" />
    </Card>
    <!-- default card -->
    <Card v-else>
      <template v-slot:header>
        <div class="profile-editor__header">
          <Button @click="closeProfileEditor" icon="cross" />
          <h1>Edit Profile</h1>
        </div>
        <Button @click="saveProfile" outline>Save</Button>
      </template>
      <div class="profile-editor__media">
        <section class="profile-editor__banner-image">
          <img
            v-if="!!profileFormState.bannerImageUrl"
            :src="profileFormState.bannerImageUrl"
            alt=""
          />
          <input
            ref="fileInputRef"
            type="file"
            hidden
            accept=".png, .jpg, .jpeg"
            @change="handleBannerImageSelected"
          />
          <Button @click="fileInputRef?.click()" icon="camera-outline" tonal />
          <Button @click="clearBannerImage" icon="cross" tonal />
        </section>
        <section class="profile-editor__profile-image">
          <Button @click="fileInputRef?.click()" icon="camera-outline" tonal />
          <img :src="profileFormState.profileImageUrl" alt="" />
        </section>
      </div>
      <div class="profile-editor__form">
        <section class="space-y-4">
          <Textfield v-model="profileFormState.name" label="Name" />
          <Textarea label="Bio" />
          <Textfield label="Location" />
          <Textfield label="Website" />
        </section>
      </div>
    </Card>
  </Modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { updateBannerImage, updateUser } from "@/api/endpoints";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const showProfileEditor = ref<boolean>(false);
const editingMedia = ref<boolean>(false);
const fileInputRef = ref<HTMLInputElement | null>(null);
const selectedBannerImage = ref<Blob>();

const profileFormState = reactive({
  name: authStore.user?.name,
  bannerImageUrl: authStore.user?.bannerImage,
  profileImageUrl: authStore.user?.profileImage,
  location: "",
  website: "",
});

const selectedBannerImageUrl = computed(() => {
  return URL.createObjectURL(selectedBannerImage.value!);
});

async function saveProfile() {
  const user = await updateUser({
    id: authStore.user?.id,
    name: profileFormState.name,
    bannerImage: profileFormState.bannerImageUrl,
  });
  closeProfileEditor();
}

function handleBannerImageSelected(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = !target.files ? [] : Array.from(target.files);
  selectedBannerImage.value = files[0];
  editingMedia.value = true;
}

async function uploadBannerImage() {
  if (!selectedBannerImage.value) return;
  await updateBannerImage(selectedBannerImage.value);
}

function clearBannerImage() {
  profileFormState.bannerImageUrl = "";
}

function closeProfileEditor() {
  selectedBannerImage.value = undefined;
  editingMedia.value = false;
  showProfileEditor.value = false;
}
</script>

<style scoped lang="scss">
.profile-editor {
  &__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__media {
    position: relative;
  }

  &__profile-image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -40%;
    left: 1rem;
    width: 113px;
    height: 113px;
    border-radius: 50%;
    z-index: 10;
    border: 3px solid $white;
    overflow: hidden;

    button {
      z-index: 20;
    }

    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      z-index: 15;
    }
  }

  &__banner-image {
    position: relative;
    height: 10rem;
    width: 100%;
    background-color: $gray-200;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    button {
      z-index: 5;
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }
  }

  &__form {
    padding: 5rem 1rem 1rem;
  }
}
</style>
