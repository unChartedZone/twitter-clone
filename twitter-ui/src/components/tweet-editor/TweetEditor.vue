<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import AvatarCircle from "../AvatarCircle.vue";
import TweetEditorActions from "./TweetEditorActions.vue";
import { useTweetEditor } from "@/hooks/useTweetEditor";

const authStore = useAuthStore();
const emit = defineEmits(["closeEditor"]);
const { tweetText, publishTweet } = useTweetEditor();

async function onPublishTweet() {
  await publishTweet();
  emit("closeEditor");
}
</script>

<template>
  <div class="tweet-editor">
    <div class="tweet-editor__body">
      <AvatarCircle :src="authStore.user?.profileImage" />
      <Textarea
        placeholder="What is happening?!"
        v-model="tweetText"
        borderless
      />
    </div>
    <TweetEditorActions @publishTweet="onPublishTweet" />
  </div>
</template>

<style scoped lang="scss">
.tweet-editor {
  &__body {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0.75rem;
  }
}
</style>
