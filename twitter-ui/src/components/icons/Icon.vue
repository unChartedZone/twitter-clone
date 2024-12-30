<script setup lang="ts">
import type { Component } from "vue";
import { type IconVariant } from "@/types/IconVariants";
import Balloon from "./Balloon.vue";
import Bell from "./Bell.vue";
import BellOutline from "./BellOutline.vue";
import Bird from "./Bird.vue";
import Bookmark from "./Bookmark.vue";
import BookmarkOutline from "./BookmarkOutline.vue";
import BrokenHeart from "./BrokenHeart.vue";
import Calendar from "./Calendar.vue";
import CameraOutline from "./CameraOutline.vue";
import Chain from "./Chain.vue";
import ChevronRight from "./ChevronRight.vue";
import Cross from "./Cross.vue";
import Download from "./Download.vue";
import Ellipsis from "./Ellipsis.vue";
import Feather from "./Feather.vue";
import Gear from "./Gear.vue";
import Gif from "./Gif.vue";
import Heart from "./Heart.vue";
import HeartOutline from "./HeartOutline.vue";
import Home from "./Home.vue";
import HomeOutline from "./HomeOutline.vue";
import Key from "./Key.vue";
import LeftArrow from "./LeftArrow.vue";
import List from "./List.vue";
import ListOutline from "./ListOutline.vue";
import Location from "./Location.vue";
import MagnifyingGlass from "./MagnifyingGlass.vue";
import MagnifyingGlassBold from "./MagnifyingGlassBold.vue";
import Message from "./Message.vue";
import More from "./More.vue";
import Person from "./Person.vue";
import PersonOutline from "./PersonOutline.vue";
import Picture from "./Picture.vue";
import Pound from "./Pound.vue";
import Profile from "./Profile.vue";
import ProfileFollow from "./ProfileFollow.vue";
import ProfileOutline from "./ProfileOutline.vue";
import Reply from "./Reply.vue";
import Retweet from "./Retweet.vue";
import Share from "./Share.vue";
import Smiley from "./Smiley.vue";

defineProps<{ variant: IconVariant }>();

const iconComponentMap = new Map<IconVariant, Component>();
iconComponentMap.set("balloon", Balloon);
iconComponentMap.set("bell", Bell);
iconComponentMap.set("bell-outline", BellOutline);
iconComponentMap.set("bird", Bird);
iconComponentMap.set("bookmark", Bookmark);
iconComponentMap.set("bookmark-outline", BookmarkOutline);
iconComponentMap.set("broken-heart", BrokenHeart);
iconComponentMap.set("calendar", Calendar);
iconComponentMap.set("camera-outline", CameraOutline);
iconComponentMap.set("chain", Chain);
iconComponentMap.set("chevron-right", ChevronRight);
iconComponentMap.set("cross", Cross);
iconComponentMap.set("download", Download);
iconComponentMap.set("feather", Feather);
iconComponentMap.set("gear", Gear);
iconComponentMap.set("gif", Gif);
iconComponentMap.set("ellipsis", Ellipsis);
iconComponentMap.set("heart", Heart);
iconComponentMap.set("heart-outline", HeartOutline);
iconComponentMap.set("home", Home);
iconComponentMap.set("home-outline", HomeOutline);
iconComponentMap.set("key", Key);
iconComponentMap.set("left-arrow", LeftArrow);
iconComponentMap.set("list", List);
iconComponentMap.set("list-outline", ListOutline);
iconComponentMap.set("location", Location);
iconComponentMap.set("magnifying-glass", MagnifyingGlass);
iconComponentMap.set("magnifying-glass-bold", MagnifyingGlassBold);
iconComponentMap.set("message", Message);
iconComponentMap.set("more", More);
iconComponentMap.set("person", Person);
iconComponentMap.set("person-outline", PersonOutline);
iconComponentMap.set("picture", Picture);
iconComponentMap.set("profile", Profile);
iconComponentMap.set("profile-follow", ProfileFollow);
iconComponentMap.set("profile-outline", ProfileOutline);
iconComponentMap.set("pound", Pound);
iconComponentMap.set("reply", Reply);
iconComponentMap.set("retweet", Retweet);
iconComponentMap.set("share", Share);
iconComponentMap.set("smiley", Smiley);
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
