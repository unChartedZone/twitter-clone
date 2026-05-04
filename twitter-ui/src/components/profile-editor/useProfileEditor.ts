import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { client } from "@/lib/api/client";
import { useAuthStore } from "@/stores/auth";
import type { UserPatch } from "@/models/User";

export default function useProfileEditor() {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();

  const patchUserMutation = useMutation({
    mutationFn: async ({
      userId,
      userPatch,
      bannerImage,
      profileImage,
    }: {
      userId: string;
      userPatch: UserPatch;
      bannerImage?: File;
      profileImage?: File;
    }) => {
      const formData = new FormData();

      // Add images to form data if they exist
      !!bannerImage && formData.append("user[banner_image]", bannerImage);
      !!profileImage && formData.append("user[profile_image]", profileImage);

      // Add and text fields from user patch
      Object.keys(userPatch).forEach((key) => {
        const value = userPatch[key as keyof UserPatch];
        value && formData.append(`user[${key}]`, value);
      });

      // Dont make a request if no data was modified
      if (
        Array.from(formData.entries()).length == 0 &&
        !bannerImage &&
        !profileImage
      )
        return Promise.reject("Empty update user payload");

      const { data } = await client.PATCH("/users/{id}", {
        params: { path: { id: userId } },
        body: formData as unknown as { user: UserPatch },
      });

      if (!data) throw Error("Failed to update user");
      return data.user;
    },
    onSuccess: (updatedUser) => {
      // If name was updated we should update any tweets of the user to match new name
      queryClient.invalidateQueries({
        queryKey: ["default-tweets", updatedUser.username],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", updatedUser.username],
      });
      authStore.setUserAuthState(updatedUser);
    },
  });
  const saving = patchUserMutation.isPending;

  const handleUserUpdate = async (
    userPatch: UserPatch,
    profileImage?: File,
    bannerImage?: File,
  ) => {
    if (!authStore.user) return;

    patchUserMutation.mutateAsync({
      userId: authStore.user.id,
      userPatch,
      profileImage,
      bannerImage,
    });
  };

  return {
    saving,
    handleUserUpdate,
  };
}
