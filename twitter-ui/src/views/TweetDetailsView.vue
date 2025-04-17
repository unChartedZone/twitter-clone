<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as tweetApi from "@/api/endpoints/tweets";
import * as commentApi from "@/api/endpoints/comments";
import type Tweet from "@/models/Tweet";
import type CommentType from "@/models/Comment";
import AvatarCircle from "@/components/AvatarCircle.vue";
import Button from "@/components/common/Button.vue";
import Icon from "@/components/icons/Icon.vue";
import Image from "@/components/common/Image.vue";
import Modal from "@/components/common/Modal.vue";
import PageHeader from "@/components/PageHeader.vue";
import PageLoader from "@/components/PageLoader.vue";
import Comment from "@/components/comment/Comment.vue";
import InlineReplyEditor from "@/components/reply-editor/InlineReplyEditor.vue";
import ReplyEditor from "@/components/reply-editor/ReplyEditor.vue";
import TweetActionRow from "@/components/tweet/TweetActionRow.vue";
import dayjs from "dayjs";
import { useQuery } from "@/hooks/useQuery";

const props = defineProps<{ tweetId: string; username: string }>();
const comments = ref<CommentType[]>([]);
const toggleReplyEditor = ref<boolean>(false);

const { result: tweet, loading } = useQuery<Tweet | undefined>(
  () => tweetApi.fetchSingleTweet(props.tweetId),
  { initialValue: undefined }
);

onMounted(async () => {
  comments.value = await commentApi.fetchComents(props.tweetId);
});

function addCommentToThread(comment: CommentType) {
  comments.value.push(comment);
}

// Handle event comment was created, we want to close the editor and add the new
// comment to the comment list.
function closeReplyEditor(comment: CommentType) {
  addCommentToThread(comment);
  toggleReplyEditor.value = false;
}
</script>

<template>
  <main>
    <PageHeader title="Tweet" />
    <PageLoader v-if="loading && !tweet" />
    <article v-else class="tweet">
      <header class="tweet__header">
        <UserCard v-if="!!tweet?.user" :user="tweet?.user" />
        <Button variant="icon-ghost" size="icon">
          <Icon variant="ellipsis" />
        </Button>
      </header>
      <!-- Content section of tweet -->
      <section class="mt-4">
        <div>
          <p>{{ tweet?.text }}</p>
        </div>
        <div class="tweet__images">
          <Image
            v-for="media in tweet?.medium"
            :key="media.id"
            :src="media.url"
          />
        </div>
      </section>
      <section class="tweet__created-date">
        <div>
          <p>{{ dayjs(tweet?.createdAt).format("MMM D, YYYY") }}</p>
        </div>
      </section>
      <TweetActionRow
        v-if="!!tweet"
        :tweet="tweet"
        size="icon"
        @replyTriggered="toggleReplyEditor = true"
      />
      <InlineReplyEditor
        v-if="!!tweet"
        :tweetId="tweet.id"
        @onCommentCreated="addCommentToThread"
      />
      <!-- Comment section -->
      <section>
        <ul>
          <li v-for="comment in comments" :key="comment.id">
            <Comment :comment="comment" />
          </li>
        </ul>
      </section>
    </article>
  </main>
  <Modal v-model="toggleReplyEditor">
    <ReplyEditor
      v-if="!!tweet"
      :tweetId="tweet.id"
      @onCommentCreated="closeReplyEditor"
    />
  </Modal>
</template>

<style scoped lang="scss">
.tweet {
  padding: 0 1rem;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__name {
    p {
      color: $gray-300;
    }
  }

  // TODO: support showing multiple images in a grid pattern
  &__images {
    display: grid;
    border: 1px solid rgba(207, 217, 222, 1);
    border-radius: 1rem;
    width: 100%;
    overflow: hidden;
    margin: 0.5rem 0;

    &:empty {
      border: none;
      margin: 0;
    }
  }

  &__created-date {
    color: $gray-300;
    font-size: 0.9rem;
    margin: 1rem 0;
    padding-bottom: 1rem;

    border-bottom: 1px solid $gray;
  }

  &__actions {
    border-bottom: 1px solid $gray;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;
  }

  &__action {
    display: flex;
    align-items: center;
  }
}
</style>
