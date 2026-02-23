import type { paths } from "api-schema";

export type LoginBody =
  paths["/login"]["post"]["requestBody"]["content"]["application/json"];
export type LoginResponse =
  paths["/login"]["post"]["responses"]["200"]["content"]["application/json"];
export type SignupBody =
  paths["/signup"]["post"]["requestBody"]["content"]["application/json"];
export type SignupResponse =
  paths["/signup"]["post"]["responses"]["201"]["content"]["application/json"];
export type RefreshResponse =
  paths["/refresh"]["post"]["responses"]["200"]["content"]["application/json"];

export type HomeFeedResponse =
  paths["/tweets/feed"]["get"]["responses"]["200"]["content"]["application/json"];

export type BookmarksResponse =
  paths["/bookmarks"]["get"]["responses"]["200"]["content"]["application/json"];
