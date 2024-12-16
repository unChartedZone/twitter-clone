<script setup lang="ts">
import type Comment from "@/models/Comment";
import AvatarCircle from "../AvatarCircle.vue";
import Button from "../common/Button.vue";
import Icon from "../icons/Icon.vue";
import TweetAction from "../tweet/TweetAction.vue";
import dayjs from "dayjs";

interface CommentProps {
  comment: Comment;
}

defineProps<CommentProps>();

const size = "icon-sm";
</script>

<template>
  <div class="comment">
    <section class="comment__profile-image">
      <AvatarCircle :src="comment.user.profileImageUrl" />
    </section>
    <section class="comment__content">
      <div class="comment__header">
        <div class="comment__user">
          <h3>{{ comment.user.name }}</h3>
          <p>@{{ comment.user.username }}</p>
          <span>&middot;</span>
          <span class="created-timestamp">
            {{ dayjs(comment.createdAt).format("MMM D, YYYY") }}
          </span>
        </div>
        <div>
          <Button variant="icon-ghost" size="icon">
            <Icon variant="ellipsis" />
          </Button>
        </div>
      </div>
      <div>
        <p>{{ comment.content }}</p>
      </div>
      <div class="comment__actions mt-4 flex justify-between items-center">
        <TweetAction icon="reply" text="0" :size="size" />
        <TweetAction icon="retweet" text="0" color="success" :size="size" />
        <TweetAction
          icon="heart-outline"
          text="0"
          color="danger"
          :size="size"
        />
        <TweetAction
          icon="bookmark-outline"
          text="0"
          color="primary"
          :size="size"
        />
        <TweetAction icon="share" :size="size" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.comment {
  display: flex;
  align-items: start;
  gap: 0.5rem;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid $gray-100;

  &__profile-image {
    padding: 0.5rem 0 0;
  }

  &__content {
    flex: 1;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 0.2rem;

    h3 {
      font-size: 1rem;
    }

    p {
      font-size: 0.9rem;
      color: $gray-300;
    }
  }
}
</style>
