<script setup lang="ts">
import { ref, reactive } from "vue";
import Button from "../common/Button.vue";
import { postUnfollowUser } from "@/api/endpoints";
import type { LoadingState } from "@/types/LoadingState";

interface UnfollowButtonProps {
  userId: string;
}

const props = defineProps<UnfollowButtonProps>();
const emits = defineEmits(["onUnfollow"]);

const buttonOptions = reactive({
  text: "Following",
  color: "",
});

const loading = ref<LoadingState>();

function onMouseOver() {
  buttonOptions.text = "Unfollow";
  buttonOptions.color = "danger";
}

function onMouseLeave() {
  buttonOptions.text = "Following";
  buttonOptions.color = "";
}

async function unfollowUser() {
  loading.value = "idle";
  await postUnfollowUser(props.userId);
  emits("onUnfollow", props.userId);
  loading.value = "resolved";
}
</script>

<template>
  <Button
    :size="1"
    :color="buttonOptions.color"
    :loading="loading == 'idle'"
    outline
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    @click="unfollowUser"
  >
    {{ buttonOptions.text }}
  </Button>
</template>
