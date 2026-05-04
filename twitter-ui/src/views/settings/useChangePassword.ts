import { client } from "@/lib/api/client";
import { useMutation } from "@tanstack/vue-query";

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function useChangePassword() {
  const changePasswordMutation = useMutation({
    mutationFn: async (passwordPayload: ChangePasswordPayload) => {
      const { data, error } = await client.PATCH("/password", {
        body: passwordPayload,
      });

      if (error || !data) throw error ?? Error("Failed to change password");
    },
  });
  const saving = changePasswordMutation.isPending;

  return { saving, changePasswordMutation };
}
