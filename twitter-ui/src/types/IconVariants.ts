export const iconVariants = [
  "bell",
  "bell-outline",
  "bird",
  "bookmark",
  "bookmark-outline",
  "cross",
  "ellipsis",
  "feather",
  "heart",
  "heart-outline",
  "home",
  "home-outline",
  "magnifying-glass",
  "magnifying-glass-bold",
  "picture",
  "profile",
  "profile-outline",
  "reply",
  "retweet",
  "share",
] as const;

export type IconVariant = (typeof iconVariants)[number];
