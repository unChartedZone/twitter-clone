import { ref, computed } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { client } from "@/lib/api/client";
import type { CreateTweetPayload } from "@/lib/types/requests";
import { useAuthStore } from "@/stores/auth";

export function useTweetEditor() {
  const queryClient = useQueryClient();
  const authStore = useAuthStore();
  const tweetText = ref<string>("");
  const tweetMedia = ref<{ file: File; description?: string }[]>([]);

  function addMediaItems(files: File[]) {
    tweetMedia.value = files.map((f) => ({ file: f }));
  }

  function removeMediaItem(index: number) {
    tweetMedia.value.splice(index, 1);
  }

  const createTweetMutation = useMutation({
    mutationFn: async (tweet: CreateTweetPayload) => {
      const { data, error } = await client.POST("/tweets", { body: { tweet } });

      if (error) {
        throw error;
      }

      return data?.tweet;
    },
  });

  const createTweetAttachment = useMutation({
    mutationFn: async ({
      tweetId,
      ...payload
    }: {
      tweetId: string;
      file: File;
      description?: string;
    }) => {
      const res = await client.POST("/attachments", {
        body: {
          tweetId,
          image: payload.file as unknown as string,
          description: payload.description,
        },
        bodySerializer: (body) => {
          const formData = new FormData();
          formData.append("tweetId", body.tweetId ?? "");
          formData.append("image", body.image ?? "");
          body.description && formData.append("description", body.description);
          return formData;
        },
      });
      return res.data?.tweet;
    },
  });

  const isPublishing = computed(
    () =>
      Boolean(createTweetMutation.isPending.value) ||
      Boolean(createTweetAttachment.isPending.value),
  );

  async function publishTweet() {
    const hasText = !!tweetText.value;
    const hasMedia = tweetMedia.value.length > 0;

    if (!hasText && !hasMedia) {
      return;
    }

    try {
      const tweet = await createTweetMutation.mutateAsync({
        text: tweetText.value,
      });

      if (hasMedia) {
        await createTweetAttachment.mutateAsync({
          tweetId: tweet?.id ?? "",
          file: tweetMedia.value[0].file,
          description: tweetMedia.value[0].description,
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["default-tweets", authStore.user?.username],
      });
    } catch (err) {
    } finally {
      tweetText.value = "";
      tweetMedia.value = [];
    }
  }
  return {
    tweetText,
    tweetMedia,
    addMediaItems,
    removeMediaItem,
    publishTweet,
    isPublishing,
  };
}
