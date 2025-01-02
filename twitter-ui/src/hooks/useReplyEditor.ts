import { ref, computed } from "vue";
import { type LoadingState } from "@/types/LoadingState";
import type Comment from "@/models/Comment";
import * as commentApi from "@/api/endpoints/comments";

function useReplyEditor(
  tweetId: string,
  emit?: (event: "onCommentCreated", comment: Comment) => void
) {
  const loading = ref<LoadingState>();
  const commentText = ref<string>("");

  const isLoading = computed(() => loading.value === "idle");

  async function postComment() {
    if (commentText.value === "") return;

    loading.value = "idle";

    const createdComment = await commentApi.createComment(tweetId, {
      content: commentText.value,
    });
    loading.value = "resolved";
    commentText.value = "";
    if (!!emit) {
      emit("onCommentCreated", createdComment);
    }
  }

  return {
    isLoading,
    commentText,
    postComment,
  };
}

export default useReplyEditor;
