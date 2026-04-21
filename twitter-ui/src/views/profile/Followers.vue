<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import FollowerTabs from "./FollowerTabs.vue";
import FollowButton from "@/components/profile/FollowButton.vue";
import FollowsList from "@/components/profile/FollowsList.vue";
import UnfollowButton from "@/components/profile/UnfollowButton.vue";
import useFollowers from "@/lib/hooks/useFollowers";
import PageLoader from "@/components/loaders/PageLoader.vue";
import useProfile from "@/lib/hooks/useProfile";

const props = defineProps<{ username: string }>();
const { user, isLoading: isLoadingUser } = useProfile(() => props.username);
const { followers, isLoading } = useFollowers(props.username);
</script>

<template>
  <div>
    <PageHeader
      :title="user?.name ?? ''"
      :subtitle="`${user?.totalTweets} tweets`"
    />
    <FollowerTabs :currentUser="user" />
    <PageLoader v-if="isLoading || isLoadingUser" :size="50" />
    <FollowsList :followees="followers">
      <template v-slot:list-actions="{ followee }">
        <FollowButton v-if="!followee.isFollowing" :userId="followee.id" />
        <UnfollowButton v-else :userId="followee.id" />
      </template>
    </FollowsList>
  </div>
</template>
