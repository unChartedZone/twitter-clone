<script setup lang="ts">
import { ref } from "vue";
import TweetEditor from "./TweetEditor.vue";
import Button from "../ui/Button.vue";
import Icon from "../icons/Icon.vue";

const toggleTweetModal = ref<boolean>(false);
</script>

<template>
  <div class="button-container">
    <div class="large">
      <Button block size="xl" @click="toggleTweetModal = true">Tweet</Button>
    </div>
    <div class="small">
      <Button variant="icon" @click="toggleTweetModal = true">
        <Icon variant="feather" />
      </Button>
    </div>
  </div>
  <Modal v-model="toggleTweetModal">
    <Card class="tweet-editor__card">
      <template v-slot:header>
        <div>
          <Button
            variant="icon-ghost"
            size="icon"
            @click="toggleTweetModal = false"
          >
            <Icon variant="cross" />
          </Button>
        </div>
        <Button variant="text">Drafts</Button>
      </template>
      <TweetEditor @closeEditor="toggleTweetModal = false" />
    </Card>
  </Modal>
</template>

<style scoped lang="scss">
.button-container .large {
  @include respond(xl) {
    display: none;
  }
}

.button-container .small {
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
