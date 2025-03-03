<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchFollowing } from "@/api/endpoints";
import { useUserProfile } from "@/hooks/useUserProfile";
import PageHeader from "@/components/PageHeader.vue";
import UnfollowButton from "@/components/profile/UnfollowButton.vue";
import FollowerTabs from "./FollowerTabs.vue";
import FollowsList from "@/components/profile/FollowsList.vue";
import type { User } from "@/models/User";

const route = useRoute();
const { currentUser } = useUserProfile(route.params.username[0]);
const following = ref<User[]>([]);

onMounted(async () => {
  following.value = await fetchFollowing(route.params.username[0]);
});

/**
 * Remove user from list of following
 * @param userId
 */
function removeUser(userId: string) {
  const userIndex = following.value?.findIndex((u) => u.id == userId);
  if (!!userIndex) {
    following.value?.splice(userIndex, 1);
  }
}
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
        <UnfollowButton :userId="followee.id" @onUnfollow="removeUser" />
      </template>
    </FollowsList>
  </div>
</template>
