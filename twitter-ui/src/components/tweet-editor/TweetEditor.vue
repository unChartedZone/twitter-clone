<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import AvatarCircle from "../AvatarCircle.vue";
import Textarea from "@/components/common/Textarea.vue";
import TweetEditorActions from "./TweetEditorActions.vue";
import TweetMediaGrid from "./TweetMediaGrid.vue";
import { useTweetEditor } from "@/hooks/useTweetEditor";

const authStore = useAuthStore();
const emit = defineEmits(["closeEditor"]);
const {
  tweetText,
  tweetMedia,
  addMediaItems,
  removeMediaItem,
  publishTweet,
  isPublishing,
} = useTweetEditor();

async function onPublishTweet() {
  await publishTweet();
  emit("closeEditor");
}
</script>

<template>
  <div class="tweet-editor">
    <div class="tweet-editor__body">
      <AvatarCircle :src="authStore.user?.profileImage" />
      <div style="flex: 1">
        <Textarea
          placeholder="What is happening?!"
          v-model="tweetText"
          borderless
        />
        <TweetMediaGrid
          :mediaItems="tweetMedia"
          @onRemoveMediaItem="(index) => removeMediaItem(index)"
        />
      </div>
    </div>
    <TweetEditorActions
      :isPublishing="isPublishing"
      @publishTweet="onPublishTweet"
      @mediaAdded="(files) => addMediaItems(files)"
    />
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

.media-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
