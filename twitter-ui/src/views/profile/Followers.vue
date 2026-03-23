<script setup lang="ts">
import { useRoute } from "vue-router";
import { useUserProfile } from "@/hooks/useUserProfile";
import PageHeader from "@/components/PageHeader.vue";
import FollowerTabs from "./FollowerTabs.vue";
import FollowButton from "@/components/profile/FollowButton.vue";
import FollowsList from "@/components/profile/FollowsList.vue";
import UnfollowButton from "@/components/profile/UnfollowButton.vue";
import useFollowers from "@/lib/hooks/useFollowers";
import PageLoader from "@/components/loaders/PageLoader.vue";

const route = useRoute();
const { currentUser } = useUserProfile(route.params.username[0]);
const { followers, isLoading } = useFollowers(route.params.username[0]);
</script>

<template>
  <div>
    <PageHeader
      :title="currentUser?.name ?? ''"
      :subtitle="`${currentUser?.totalTweets} tweets`"
    />
    <FollowerTabs :currentUser="currentUser" />
    <PageLoader v-if="isLoading" :size="50" />
    <FollowsList :followees="followers">
      <template v-slot:list-actions="{ followee }">
        <FollowButton v-if="!followee.isFollowing" :userId="followee.id" />
        <UnfollowButton v-else :userId="followee.id" />
      </template>
    </FollowsList>
  </div>
</template>
