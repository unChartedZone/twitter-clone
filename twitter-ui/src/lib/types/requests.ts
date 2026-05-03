import type { paths } from "api-schema";

export type CreateTweetBody =
  paths["/tweets"]["post"]["requestBody"]["content"]["application/json"];

export type CreateTweetPayload = CreateTweetBody["tweet"];

// Auth
export type LoginBody =
  paths["/login"]["post"]["requestBody"]["content"]["application/json"];
export type SignupBody =
  paths["/signup"]["post"]["requestBody"]["content"]["application/json"];
