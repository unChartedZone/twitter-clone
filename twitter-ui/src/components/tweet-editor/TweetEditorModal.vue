<script setup lang="ts">
import { ref } from "vue";
import TweetEditor from "./TweetEditor.vue";

const toggleTweetModal = ref<boolean>(false);
</script>

<template>
  <Button block @click="toggleTweetModal = true">Tweet</Button>
  <Modal v-model="toggleTweetModal">
    <Card class="tweet-editor__card">
      <template v-slot:header>
        <Button icon="cross" :size="1" @click="toggleTweetModal = false" />
        <Button text :size="1">Drafts</Button>
      </template>
      <TweetEditor @closeEditor="toggleTweetModal = false" />
    </Card>
  </Modal>
</template>

<style scoped lang="scss">
.tweet-editor {
  &__card :deep(textarea) {
    min-height: 5rem;
  }
}
</style>
