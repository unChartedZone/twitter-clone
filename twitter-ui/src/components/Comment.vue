<script setup lang="ts">
import type Comment from "@/models/Comment";
import AvatarCircle from "./AvatarCircle.vue";

interface CommentProps {
  comment: Comment;
}

defineProps<CommentProps>();
</script>

<template>
  <div class="comment">
    <div class="comment__header">
      <AvatarCircle :src="comment.user.profileImageUrl" />
      <div>
        <h3>{{ comment.user.name }}</h3>
        <p>{{ comment.user.username }}</p>
      </div>
    </div>
    <div>
      <p>{{ comment.content }}</p>
    </div>
    <div class="comment__actions"></div>
  </div>
</template>

<style></style>
