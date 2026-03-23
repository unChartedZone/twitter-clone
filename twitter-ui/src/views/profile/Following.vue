<script setup lang="ts">
import { useRoute } from "vue-router";
import { useUserProfile } from "@/hooks/useUserProfile";
import PageHeader from "@/components/PageHeader.vue";
import UnfollowButton from "@/components/profile/UnfollowButton.vue";
import FollowerTabs from "./FollowerTabs.vue";
import FollowsList from "@/components/profile/FollowsList.vue";
import useFollowing from "@/lib/hooks/useFollowing";

const route = useRoute();
const { currentUser } = useUserProfile(route.params.username[0]);

const { following } = useFollowing(route.params.username[0]);
</script>

<template>
  <div>
    <PageHeader
      :title="currentUser?.name"
      :subtitle="`${currentUser?.totalTweets} tweets`"
    />
    <FollowerTabs :currentUser="currentUser" />
    <FollowsList :followees="following">
      <template v-slot:list-actions="{ followee }">
        <UnfollowButton :userId="followee.id" />
      </template>
    </FollowsList>
  </div>
</template>
