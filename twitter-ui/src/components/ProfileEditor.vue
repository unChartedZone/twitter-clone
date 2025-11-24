<template>
  <MediaEditor
    v-if="profileMediaState.showMediaEditor"
    :imageUrl="
      profileMediaState.mediaType == 'profile'
        ? profileImageSrc
        : bannerImageSrc
    "
    @onCancel="profileMediaState.showMediaEditor = false"
    @onApplyImage="profileMediaState.showMediaEditor = false"
  />
  <!-- default card -->
  <Card v-else>
    <CardHeader>
      <template #left>
        <Button variant="icon-ghost" size="icon" @click="closeProfileEditor">
          <Icon variant="cross" />
        </Button>
      </template>
      Edit Profile
      <template #right>
        <Button variant="outline" @click="saveProfile">Save</Button>
      </template>
    </CardHeader>
    <div class="profile-editor__media">
      <section class="profile-editor__banner-image">
        <img v-if="!!bannerImageSrc" :src="bannerImageSrc" alt="" />
        <FileInput
          v-model="profileMediaState.selectedBannerImage"
          accept=".png, .jpg, .jpeg"
        >
          <template v-slot="{ onClick }">
            <Button
              variant="icon-monochrome"
              size="icon"
              @click="onClick"
              tonal
            >
              <Icon variant="camera-outline" />
            </Button>
          </template>
        </FileInput>
        <Button
          variant="icon-monochrome"
          size="icon"
          @click="
            profileMediaState.bannerImage = undefined;
            profileMediaState.selectedBannerImage = undefined;
          "
        >
          <Icon variant="cross" />
        </Button>
      </section>
      <section class="profile-editor__profile-image">
        <FileInput
          v-model="profileMediaState.selectedProfileImage"
          accept=".png, .jpg, .jpeg"
        >
          <template v-slot="{ onClick }">
            <Button variant="icon-monochrome" size="icon" @click="onClick">
              <Icon variant="camera-outline" />
            </Button>
          </template>
        </FileInput>
        <img :src="profileImageSrc" alt="" />
      </section>
    </div>
    <div class="profile-editor__form">
      <section class="space-y-4">
        <Textfield label="Name" v-model="profileFormState.name" />
        <Textarea label="Bio" v-model="profileFormState.bio" />
        <Textfield label="Location" v-model="profileFormState.location" />
        <Textfield label="Website" v-model="profileFormState.website" />
        <DateSelector v-model="profileFormState.birthDate" />
      </section>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import Button from "./common/Button.vue";
import { Card, CardHeader } from "@/components/common/card";
import Icon from "./icons/Icon.vue";
import FileInput from "@/components/common/FileInput.vue";
import MediaEditor from "./profile-editor/MediaEditor.vue";
import DateSelector from "./DateSelector.vue";
import Textfield from "@/components/common/Textfield.vue";
import Textarea from "@/components/common/Textarea.vue";
import type { UserPatch } from "@/models/User";

const authStore = useAuthStore();

const emit = defineEmits(["onClose"]);

const profileMediaState = reactive<{
  bannerImage?: string;
  profileImage?: string;
  selectedBannerImage?: File;
  selectedProfileImage?: File;
  mediaType?: "banner" | "profile";
  showMediaEditor: boolean;
}>({
  bannerImage: authStore.user?.bannerImage,
  profileImage: authStore.user?.profileImage,
  showMediaEditor: false,
});

const profileFormState = reactive<UserPatch>({
  name: authStore.user?.name,
  bio: authStore.user?.bio,
  location: authStore.user?.location,
  website: authStore.user?.website,
  birthDate: authStore.user?.birthDate,
});

const profileImageSrc = computed(() => {
  return !!profileMediaState.selectedProfileImage
    ? URL.createObjectURL(profileMediaState.selectedProfileImage)
    : profileMediaState.profileImage;
});

const bannerImageSrc = computed(() => {
  return !!profileMediaState.selectedBannerImage
    ? URL.createObjectURL(profileMediaState.selectedBannerImage)
    : profileMediaState.bannerImage;
});

watch(
  () => [
    profileMediaState.selectedProfileImage,
    profileMediaState.selectedBannerImage,
  ],
  ([newProfileImage, newBannerImg], [oldProfileImage, oldBannerImg]) => {
    if (!!newProfileImage && newProfileImage != oldProfileImage) {
      profileMediaState.showMediaEditor = true;
      profileMediaState.mediaType = "profile";
    } else if (!!newBannerImg && newBannerImg != oldBannerImg) {
      profileMediaState.showMediaEditor = true;
      profileMediaState.mediaType = "banner";
    } else {
      profileMediaState.showMediaEditor = false;
    }
  },
);

async function saveProfile() {
  if (!authStore.user) return;

  const patch = Object.keys(profileFormState)
    .filter((key) => {
      // @ts-ignore
      return profileFormState[key] != authStore.user[key];
    })
    .reduce((acc: UserPatch, key) => {
      return {
        ...acc,
        // @ts-ignore
        [`${key}`]: profileFormState[key],
      };
    }, {});

  try {
    await authStore.updateUser(
      patch,
      profileMediaState.selectedBannerImage,
      profileMediaState.selectedProfileImage,
    );
  } catch (e) {
    console.log(e);
  }
  closeProfileEditor();
}

function closeProfileEditor() {
  emit("onClose");
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
