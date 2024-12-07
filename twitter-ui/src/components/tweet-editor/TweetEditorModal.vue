<script setup lang="ts">
import { ref } from "vue";
import TweetEditor from "./TweetEditor.vue";
import NewButton from "../ui/Button.vue";
import Icon from "../icons/Icon.vue";

const toggleTweetModal = ref<boolean>(false);
</script>

<template>
  <div class="button-container">
    <Button block @click="toggleTweetModal = true">Tweet</Button>
    <NewButton variant="icon" @click="toggleTweetModal = true">
      <Icon variant="feather" />
    </NewButton>
  </div>
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
.button-container button:nth-of-type(1) {
  @include respond(xl) {
    display: none;
  }
}

.button-container button:nth-of-type(2) {
  display: none;

  @include respond(xl) {
    display: initial;
  }
}

.tweet-editor {
  &__card :deep(textarea) {
    min-height: 5rem;
  }
}
</style>
