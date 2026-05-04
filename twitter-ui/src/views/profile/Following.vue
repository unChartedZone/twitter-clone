<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import UnfollowButton from "@/components/profile/UnfollowButton.vue";
import FollowerTabs from "./FollowerTabs.vue";
import FollowsList from "@/components/profile/FollowsList.vue";
import useFollowing from "@/lib/hooks/useFollowing";
import useProfile from "@/lib/hooks/useProfile";

const props = defineProps<{ username: string }>();
const { user, isLoading } = useProfile(() => props.username);

const { following } = useFollowing(props.username);
</script>

<template>
  <div>
    <PageHeader
      :title="user?.name ?? ''"
      :subtitle="`${user?.totalTweets} tweets`"
      :loading="isLoading"
    />
    <FollowerTabs :currentUser="user" />
    <PageLoader />
    <FollowsList :followees="following">
      <template v-slot:list-actions="{ followee }">
        <UnfollowButton :userId="followee.id" />
      </template>
    </FollowsList>
  </div>
</template>
