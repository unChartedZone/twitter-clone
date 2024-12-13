<script setup lang="ts">
import type { Component } from "vue";
import { type IconVariant } from "@/types/IconVariants";
import Bell from "./Bell.vue";
import BellOutline from "./BellOutline.vue";
import Bird from "./Bird.vue";
import Bookmark from "./Bookmark.vue";
import BookmarkOutline from "./BookmarkOutline.vue";
import Cross from "./Cross.vue";
import Ellipsis from "./Ellipsis.vue";
import Feather from "./Feather.vue";
import Heart from "./Heart.vue";
import HeartOutline from "./HeartOutline.vue";
import Home from "./Home.vue";
import HomeOutline from "./HomeOutline.vue";
import MagnifyingGlass from "./MagnifyingGlass.vue";
import MagnifyingGlassBold from "./MagnifyingGlassBold.vue";
import Picture from "./Picture.vue";
import Profile from "./Profile.vue";
import ProfileOutline from "./ProfileOutline.vue";
import Reply from "./Reply.vue";
import Retweet from "./Retweet.vue";
import Share from "./Share.vue";

defineProps<{ variant: IconVariant }>();

const iconComponentMap = new Map<IconVariant, Component>();
iconComponentMap.set("bell", Bell);
iconComponentMap.set("bell-outline", BellOutline);
iconComponentMap.set("bird", Bird);
iconComponentMap.set("bookmark", Bookmark);
iconComponentMap.set("bookmark-outline", BookmarkOutline);
iconComponentMap.set("cross", Cross);
iconComponentMap.set("feather", Feather);
iconComponentMap.set("ellipsis", Ellipsis);
iconComponentMap.set("heart", Heart);
iconComponentMap.set("heart-outline", HeartOutline);
iconComponentMap.set("home", Home);
iconComponentMap.set("home-outline", HomeOutline);
iconComponentMap.set("magnifying-glass", MagnifyingGlass);
iconComponentMap.set("magnifying-glass-bold", MagnifyingGlassBold);
iconComponentMap.set("picture", Picture);
iconComponentMap.set("profile", Profile);
iconComponentMap.set("profile-outline", ProfileOutline);
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
  height: 100%;
}
</style>
