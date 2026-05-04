import { client } from "@/lib/api/client";
import type { UserPatch } from "@/models/User";
import type { User } from "@/lib/types/models";

export async function changePassword(passwordPatch: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const { data, error } = await client.PATCH("/password", {
    body: passwordPatch,
  });

  if (error || !data) throw error ?? Error("Failed to change password");
}
