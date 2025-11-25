<template>
  <div
    @click="
      $router.push({
        name: 'TweetDetails',
        params: {
          tweetId: tweet.id,
          username: tweet.user?.username,
        },
      })
    "
    class="tweet"
  >
    <div class="tweet__profile-pic">
      <AvatarCircle :src="tweet.user?.profileImage" />
    </div>
    <div class="tweet__body">
      <PostHeader
        v-if="tweet.user"
        :name="tweet.user?.name"
        :username="tweet.user.username"
        :createdAt="dayjs(tweet.createdAt).toDate()"
      />
      <div class="tweet__text">
        <p>{{ tweet.text }}</p>
      </div>
      <div
        class="tweet__media"
        v-if="!!tweet.attachments && tweet.attachments.length > 0"
      >
        <Image
          v-for="media in tweet.attachments"
          :key="media.id"
          :src="media.url"
          :alt="media.description"
        />
      </div>
      <TweetActionRow
        :tweet="tweet"
        size="icon-sm"
        @replyTriggered="toggleReplyEditor = true"
      />
    </div>
  </div>
  <Modal v-model="toggleReplyEditor">
    <ReplyEditor :tweetId="tweet.id" @closeEditor="toggleReplyEditor = false" />
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
import type Tweet from "@/models/Tweet";
import PostHeader from "./PostHeader.vue";
import TweetActionRow from "@/components/tweet/TweetActionRow.vue";
import AvatarCircle from "./AvatarCircle.vue";
import Image from "./common/Image.vue";
import Modal from "./common/Modal.vue";
import ReplyEditor from "./reply-editor/ReplyEditor.vue";

interface TweetProps {
  tweet: Tweet;
}

defineProps<TweetProps>();
const toggleReplyEditor = ref<boolean>(false);
</script>

<style scoped lang="scss">
.tweet {
  border-bottom: 1px solid $gray-100;
  display: grid;
  grid-template-columns: 10% 90%;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem 1rem 0;
  cursor: pointer;

  &:hover {
    background-color: $gray-100;
  }

  &__profile-pic {
    display: flex;
    justify-content: center;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__media {
    border: 1px solid rgba(207, 217, 222, 1);
    border-radius: 1rem;
    height: clamp(10rem, 20rem, 30rem);
    overflow: hidden;
  }
}
</style>
