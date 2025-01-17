import { client } from "../client";

export default {
  async submitPasswordReset(email: string) {
    return (
      await client.post<{ message: string }>("/password/reset", { email })
    ).data;
  },
  validPasswordToken(token: string) {
    return client.get(`/password/reset/valid?token=${token}`);
  },
  updatePassword(payload: {
    token: string;
    password: string;
    passwordConfirmation: string;
  }) {
    return client.post("/password/update", { ...payload });
  },
};
