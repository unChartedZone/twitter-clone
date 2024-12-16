<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import * as commentApi from "@/api/endpoints/comments";
import AvatarCircle from "../AvatarCircle.vue";
import Button from "../common/Button.vue";
import Textfield from "../common/Textfield.vue";
import type { LoadingState } from "@/types/LoadingState";

interface ReplyEditorProps {
  tweetId: string;
}

const props = defineProps<ReplyEditorProps>();
const emit = defineEmits(["onCommentCreated"]);

const loading = ref<LoadingState>();
const authStore = useAuthStore();
const commentText = ref<string>("");

async function postComment() {
  if (commentText.value === "") return;

  loading.value = "idle";

  const createdComment = await commentApi.createComment(props.tweetId, {
    content: commentText.value,
  });
  loading.value = "resolved";
  commentText.value = "";
  emit("onCommentCreated", createdComment);
}
</script>

<template>
  <section class="reply-editor">
    <AvatarCircle :src="authStore.user?.profileImage" />
    <div class="reply-editor__input">
      <Textfield
        v-model="commentText"
        variant="ghost"
        placeholder="Tweet your reply"
      />
    </div>
    <Button @click="postComment" :loading="loading === 'idle'">Post</Button>
  </section>
</template>

<style scoped lang="scss">
.reply-editor {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid $gray-100;

  &__input {
    flex: 1;
  }
}
</style>
