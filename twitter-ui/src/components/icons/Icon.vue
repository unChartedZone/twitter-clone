<script setup lang="ts">
import type { Component } from "vue";
import Bird from "./Bird.vue";
import Bookmark from "./Bookmark.vue";
import BookmarkOutline from "./BookmarkOutline.vue";
import Ellipsis from "./Ellipsis.vue";
import Feather from "./Feather.vue";
import Heart from "./Heart.vue";
import HeartOutline from "./HeartOutline.vue";
import Home from "./Home.vue";
import HomeOutline from "./HomeOutline.vue";
import MagnifyingGlass from "./MagnifyingGlass.vue";
import MagnifyingGlassBold from "./MagnifyingGlassBold.vue";
import Reply from "./Reply.vue";
import Retweet from "./Retweet.vue";
import Share from "./Share.vue";

export type IconVariant =
  | "bird"
  | "bookmark"
  | "bookmark-outline"
  | "ellipsis"
  | "feather"
  | "heart"
  | "heart-outline"
  | "home"
  | "home-outline"
  | "magnifying-glass"
  | "magnifying-glass-bold"
  | "reply"
  | "retweet"
  | "share";

defineProps<{ variant: IconVariant }>();

const iconComponentMap = new Map<IconVariant, Component>();
iconComponentMap.set("bird", Bird);
iconComponentMap.set("bookmark", Bookmark);
iconComponentMap.set("bookmark-outline", BookmarkOutline);
iconComponentMap.set("feather", Feather);
iconComponentMap.set("ellipsis", Ellipsis);
iconComponentMap.set("heart", Heart);
iconComponentMap.set("heart-outline", HeartOutline);
iconComponentMap.set("home", Home);
iconComponentMap.set("home-outline", HomeOutline);
iconComponentMap.set("magnifying-glass", MagnifyingGlass);
iconComponentMap.set("magnifying-glass-bold", MagnifyingGlassBold);
iconComponentMap.set("reply", Reply);
iconComponentMap.set("retweet", Retweet);
iconComponentMap.set("share", Share);
</script>

<template>
  <component class="icon" :is="iconComponentMap.get(variant)" />
</template>

<style scoped lang="scss">
.icon {
  min-height: 1rem;
}
</style>
