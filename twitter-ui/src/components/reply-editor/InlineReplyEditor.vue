<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import * as commentApi from "@/api/endpoints/comments";
import AvatarCircle from "../AvatarCircle.vue";
import Button from "../common/Button.vue";
import Textfield from "../common/Textfield.vue";
import type { LoadingState } from "@/types/LoadingState";
import type Comment from "@/models/Comment";
import useReplyEditor from "@/hooks/useReplyEditor";

interface ReplyEditorProps {
  tweetId: string;
}

const props = defineProps<ReplyEditorProps>();
const emit = defineEmits<{
  (event: "onCommentCreated", createdComment: Comment): void;
}>();
const authStore = useAuthStore();
const { commentText, postComment, isLoading } = useReplyEditor(
  props.tweetId,
  emit
);
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
    <Button @click="postComment" :loading="isLoading">Post</Button>
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
