<script setup lang="ts">
import { RouterLink } from "vue-router";
import dayjs from "dayjs";
import Button from "./common/Button.vue";
import Icon from "./icons/Icon.vue";

interface PostHeaderProps {
  name: string;
  username: string;
  createdAt: string | Date;
}

defineProps<PostHeaderProps>();
</script>

<template>
  <div class="post-header">
    <div class="post-header__text">
      <RouterLink class="link" :to="`/${username}`">
        <strong class="name">{{ name }}</strong>
        <span class="username">@{{ username }}</span>
      </RouterLink>
      <span>&middot;</span>
      <span class="created-timestamp">
        {{ dayjs(createdAt).format("MMM D, YYYY") }}
      </span>
    </div>
    <Button variant="icon-ghost" size="icon">
      <Icon variant="ellipsis" />
    </Button>
  </div>
</template>

<style scoped lang="scss">
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__text {
    display: flex;
    align-items: start;
    gap: 0.5rem;
  }
}

.link {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  min-width: 0;

  strong:hover {
    text-decoration: underline;
  }
}

.username,
.created-timestamp {
  color: $gray-300;
}

.username {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.created-timestamp {
  flex-shrink: 0;
}
</style>
