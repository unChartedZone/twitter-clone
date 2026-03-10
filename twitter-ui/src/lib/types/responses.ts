import type { paths } from "api-schema";

// Auth
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

// Users
export type UserResponse =
  paths["/users/{username}"]["get"]["responses"]["200"]["content"]["application/json"];
export type UsersResponse =
  paths["/users/summary"]["get"]["responses"]["200"]["content"]["application/json"];
export type ExploreUsersResponse =
  paths["/users/explore"]["get"]["responses"]["200"]["content"]["application/json"];

// Home
export type HomeFeedResponse =
  paths["/tweets/feed"]["get"]["responses"]["200"]["content"]["application/json"];

// Tweet Details
export type TweetDetailsResponse =
  paths["/tweets/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

// Bookmarks
export type BookmarksResponse =
  paths["/bookmarks"]["get"]["responses"]["200"]["content"]["application/json"];
export type BookmarkTweetResponse =
  paths["/bookmarks/{tweetId}"]["post"]["responses"]["201"]["content"]["application/json"];
export type UnbookmarkTweetResponse =
  paths["/bookmarks/{tweetId}"]["delete"]["responses"]["200"]["content"]["application/json"];

// Comments
export type CommentsResponse =
  paths["/comments"]["get"]["responses"]["200"]["content"]["application/json"];
export type CreateCommentResponse =
  paths["/comments"]["post"]["responses"]["201"]["content"]["application/json"];

// Notifications
export type NotificationResponse =
  paths["/notifications"]["get"]["responses"]["200"]["content"]["application/json"];

// Chat
export type ChatThreadsResponse =
  paths["/threads"]["get"]["responses"]["200"]["content"]["application/json"];
export type CreateChatThreadResponse =
  paths["/threads"]["post"]["responses"]["201"]["content"]["application/json"];
export type ChatMessagesResponse =
  paths["/messages"]["get"]["responses"]["200"]["content"]["application/json"];
