import { ref } from "vue";
import useComments from "@/lib/hooks/useComments";

function useReplyEditor(
  tweetId: string,
  emit?: (event: "closeEditor") => void,
) {
  const commentText = ref<string>("");
  const { createCommentMutation } = useComments();
  const { isPending } = createCommentMutation;

  async function postComment() {
    if (commentText.value === "") return;

    await createCommentMutation.mutateAsync({
      tweetId,
      commentContent: commentText.value,
    });
    commentText.value = "";

    // Close editor if reply editor is within a dialog
    if (emit) {
      emit("closeEditor");
    }
  }

  return {
    commentText,
    isPending,
    postComment,
  };
}

export default useReplyEditor;
