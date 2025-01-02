<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import type Comment from "@/models/Comment";
import AvatarCircle from "../AvatarCircle.vue";
import Button from "../common/Button.vue";
import Card from "../common/Card.vue";
import CardBody from "../common/card/CardBody.vue";
import CardHeader from "../common/card/CardHeader.vue";
import CardFooter from "../common/card/CardFooter.vue";
import Icon from "../icons/Icon.vue";
import Textarea from "../common/Textarea.vue";
import useReplyEditor from "@/hooks/useReplyEditor";

const props = defineProps<{ tweetId: string }>();
const emit = defineEmits<{
  (event: "onCommentCreated", createdComment: Comment): void;
  (event: "closeEditor"): void;
}>();

const authStore = useAuthStore();
const { commentText, isLoading, postComment } = useReplyEditor(
  props.tweetId,
  emit
);
</script>

<template>
  <Card>
    <CardHeader>
      <template #left>
        <Button variant="icon-ghost" size="icon" @click="$emit('closeEditor')">
          <Icon variant="cross" />
        </Button>
      </template>
      <template #right>
        <Button variant="text">Drafts</Button>
      </template>
    </CardHeader>
    <CardBody>
      <div class="body">
        <AvatarCircle :src="authStore.user?.profileImage" />
        <Textarea
          v-model="commentText"
          placeholder="Post your reply"
          borderless
        />
      </div>
    </CardBody>
    <CardFooter>
      <template #left>
        <div class="flex">
          <Button variant="icon-ghost" size="icon">
            <Icon variant="picture" />
          </Button>
          <Button variant="icon-ghost" size="icon">
            <Icon variant="gif" />
          </Button>
          <Button variant="icon-ghost" size="icon">
            <Icon variant="smiley" />
          </Button>
        </div>
      </template>
      <template #right>
        <Button @click="postComment" :loading="isLoading">Post</Button>
      </template>
    </CardFooter>
  </Card>
</template>

<style scoped lang="scss">
.body {
  display: flex;
  align-items: start;
}
</style>
