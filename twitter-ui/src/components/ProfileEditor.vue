<template>
  <Modal v-model="showProfileEditor">
    <template v-slot:activator="{ onClick }">
      <Button @click="onClick" outline>Edit profile</Button>
    </template>
    <Card>
      <template v-slot:header>
        <div class="profile-editor__header">
          <Button @click="showProfileEditor = false" icon>
            <Icon name="cross" />
          </Button>
          <h1>Edit Profile</h1>
        </div>
        <Button>Save</Button>
      </template>
      <div class="profile-editor__form">
        <section class="profile-editor__banner">
          <input
            ref="fileInputRef"
            type="file"
            hidden
            accept=".png, .jpg, .jpeg"
            @change="handleBannerImageSelected"
          />
          <Button @click="fileInputRef?.click()" icon>
            <Icon name="home" />
          </Button>
          <Button @click="uploadBannerImage" icon>
            <Icon name="cross" />
          </Button>
        </section>
        <section>
          <Textfield name="name" />
        </section>
      </div>
    </Card>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { updateBannerImage } from "@/api/endpoints";

const showProfileEditor = ref<boolean>(false);
const fileInputRef = ref<HTMLInputElement | null>(null);
const selectedBannerImage = ref();

function handleBannerImageSelected(event: Event) {
  const target = event.target as HTMLInputElement;
  selectedBannerImage.value = !target.files ? [] : Array.from(target.files);
}

async function uploadBannerImage() {
  await updateBannerImage(selectedBannerImage.value[0]);
}
</script>

<style scoped lang="scss">
.profile-editor {
  &__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__banner {
    height: 10rem;
    width: 100%;
    background-color: $gray-200;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
