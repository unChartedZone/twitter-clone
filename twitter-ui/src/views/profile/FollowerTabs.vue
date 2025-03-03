<script setup lang="ts">
import type { User } from "@/models/User";
import TabHeader from "@/components/common/tab/TabHeader.vue";
import TabRow from "@/components/common/tab/TabRow.vue";

interface FollowerTabProps {
  currentUser?: User;
}

defineProps<FollowerTabProps>();
</script>

<template>
  <section class="follower-tabs">
    <TabRow>
      <TabHeader :to="`/${currentUser?.username}/followers`">
        Followers
      </TabHeader>
      <TabHeader :to="`/${currentUser?.username}/following`">
        Following
      </TabHeader>
    </TabRow>
  </section>
</template>
