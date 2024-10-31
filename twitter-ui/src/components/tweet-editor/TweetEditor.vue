<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useProfileStore } from "@/stores/profile";
import AvatarCircle from "../AvatarCircle.vue";
import { postTweet } from "@/api/endpoints";

const authStore = useAuthStore();
const profileStore = useProfileStore();
const toggleTweetModal = ref<boolean>(false);
const tweetText = ref<string>("");
const loading = ref<boolean>(false); // TODO: Should define some loading state instead of boolean for failure scenario

async function publishTweet() {
  if (tweetText.value.length < 1) {
    return;
  }

  loading.value = true;
  try {
    const tweet = await postTweet({ text: tweetText.value });
    profileStore.addTweetToProfile(tweet);
  } catch (err) {
    // TODO: show some error message
  } finally {
    loading.value = false;
    toggleTweetModal.value = false;
    tweetText.value = "";
  }
}
</script>

<template>
  <Button block @click="toggleTweetModal = true">Tweet</Button>
  <Modal v-model="toggleTweetModal">
    <Card class="tweet-editor">
      <template v-slot:header>
        <Button icon="cross" :size="1" @click="toggleTweetModal = false" />
        <Button text :size="1">Drafts</Button>
      </template>
      <div class="tweet-editor__body">
        <AvatarCircle :src="authStore.user?.profileImage" />
        <textarea
          v-model="tweetText"
          class="tweet-editor__textarea"
          placeholder="What is happening?!"
        />
      </div>
      <template v-slot:footer>
        <div class="tweet-editor__footer">
          <Button icon="picture" color="primary" :size="1" />
          <Button :size="1" @click="publishTweet" :loading="loading">
            Tweet
          </Button>
        </div>
      </template>
    </Card>
  </Modal>
</template>

<style scoped lang="scss">
.tweet-editor {
  &__body {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin: 1rem 0.75rem;
  }

  &__textarea {
    flex: 1;
    border: none;
    font-size: 1.15rem;
    font-family: $fonts;
    outline: none;
    resize: none;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    margin: 0.25rem 0;
  }
}
</style>
