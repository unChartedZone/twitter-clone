<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { BaseUser } from "@/models/User";
import { fetchFollowers } from "@/api/endpoints";
import { useUserProfile } from "@/hooks/useUserProfile";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import FollowerTabs from "./FollowerTabs.vue";
import FollowButton from "@/components/profile/FollowButton.vue";
import FollowsList from "@/components/profile/FollowsList.vue";
import UnfollowButton from "@/components/profile/UnfollowButton.vue";

const route = useRoute();
const { loading, currentUser } = useUserProfile(route.params.username[0]);
const followers = ref<BaseUser[]>([]);

onMounted(async () => {
  followers.value = await fetchFollowers(route.params.username[0]);
});
</script>

<template>
  <div>
    <ProfileHeader
      :name="currentUser?.name"
      :totalTweets="currentUser?.totalTweets"
    />
    <FollowerTabs :currentUser="currentUser" />
    <FollowsList :followees="followers">
      <template v-slot:list-actions="{ followee }">
        <FollowButton v-if="!followee.isFollowing" :userId="followee.id" />
        <UnfollowButton v-else :userId="followee.id" />
      </template>
    </FollowsList>
  </div>
</template>
