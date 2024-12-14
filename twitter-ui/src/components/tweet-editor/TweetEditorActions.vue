<script setup lang="ts">
import { ref } from "vue";
import Button from "../ui/Button.vue";
import Icon from "../icons/Icon.vue";

const emit = defineEmits<{ (event: "publishTweet"): Promise<void> }>();
const loading = ref<boolean>(false); // TODO: Should define some loading state instead of boolean for failure scenario

async function publishTweet() {
  loading.value = true;
  await emit("publishTweet");
  loading.value = false;
}
</script>

<template>
  <div class="actions">
    <Button variant="icon-ghost" size="icon">
      <Icon variant="picture" />
    </Button>
    <Button @click="publishTweet" :loading="loading">Tweet</Button>
  </div>
</template>

<style scoped lang="scss">
.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.5rem;
  padding: 0.5rem 0 0;
  border-top: 1px solid $gray;
}
</style>
