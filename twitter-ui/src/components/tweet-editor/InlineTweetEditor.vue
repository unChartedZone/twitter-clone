<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useTweetEditor } from "@/hooks/useTweetEditor";
import AvatarCircle from "../AvatarCircle.vue";
import Textarea from "@/components/common/Textarea.vue";
import TweetEditorActions from "./TweetEditorActions.vue";
import TweetMediaGrid from "./TweetMediaGrid.vue";

const authStore = useAuthStore();
const {
  tweetText,
  tweetMedia,
  addMediaItems,
  removeMediaItem,
  publishTweet,
  isPublishing,
} = useTweetEditor();
</script>

<template>
  <div class="inline-tweet-editor">
    <AvatarCircle :src="authStore.user?.profileImage" />
    <div class="content">
      <Textarea
        borderless
        placeholder="What is happening?!"
        v-model="tweetText"
      />
      <TweetMediaGrid
        :mediaItems="tweetMedia"
        @onRemoveMediaItem="(index) => removeMediaItem(index)"
      />
      <TweetEditorActions
        :isPublishing="isPublishing"
        @publishTweet="publishTweet"
        @mediaAdded="(files) => addMediaItems(files)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.inline-tweet-editor {
  padding: 0.75rem 0.75rem 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.content {
  flex: 1;
}

.media-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}
</style>
