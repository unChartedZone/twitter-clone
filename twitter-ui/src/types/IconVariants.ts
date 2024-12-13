export const iconVariants = [
  "bird",
  "bookmark",
  "bookmark-outline",
  "ellipsis",
  "feather",
  "heart",
  "heart-outline",
  "home",
  "home-outline",
  "magnifying-glass",
  "magnifying-glass-bold",
  "reply",
  "retweet",
  "share",
] as const;

export type IconVariant = (typeof iconVariants)[number];
