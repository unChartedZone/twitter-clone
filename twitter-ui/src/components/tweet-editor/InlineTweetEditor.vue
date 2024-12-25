<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useTweetEditor } from "@/hooks/useTweetEditor";
import AvatarCircle from "../AvatarCircle.vue";
import Textarea from "@/components/common/Textarea.vue";
import TweetEditorActions from "./TweetEditorActions.vue";

const authStore = useAuthStore();
const { tweetText, publishTweet } = useTweetEditor();
</script>

<template>
  <div class="inline-tweet-editor">
    <AvatarCircle :src="authStore.user?.profileImage" />
    <div class="temp">
      <Textarea
        borderless
        placeholder="What is happening?!"
        v-model="tweetText"
      />
      <TweetEditorActions @publishTweet="publishTweet" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.inline-tweet-editor {
  padding: 0.75rem 0.75rem 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.temp {
  flex: 1;
}
</style>
