import { useMutation } from "@tanstack/vue-query";
import { client } from "../api/client";

export const validPasswordToken = async (token: string) => {
  const { response } = await client.GET("/password/reset/valid", {
    params: { query: { token } },
  });
  if (!response.ok) throw new Error("Invalid password reset token");
};

export default function useSettings() {
  const passwordResetMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await client.POST("/password/reset", { body: { email } });
      return res.data?.message;
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: async (payload: {
      token: string;
      password: string;
      passwordConfirmation: string;
    }) => {
      await client.POST("/password/update", {
        body: { ...payload },
      });
    },
  });

  return {
    passwordResetMutation,
    updatePasswordMutation,
  };
}
