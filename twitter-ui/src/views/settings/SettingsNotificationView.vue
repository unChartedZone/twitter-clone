<script setup lang="ts">
import { useScreenSize } from "@/hooks/useScreenSize";
import PageHeader from "@/components/PageHeader.vue";
import SettingsLink from "@/components/settings/SettingsLink.vue";

const { isSmallScreen } = useScreenSize();
</script>

<template>
  <PageHeader title="Notifications" :hideBackButton="!isSmallScreen" />
  <p class="py-4 px-2">
    Select the kinds of notifications you get about your activities, interests,
    and recommendations.
  </p>
  <div>
    <SettingsLink
      title="Filters"
      subtitle="Choose the notifications you'd like to see - and those you don't."
      to="/not-implemented"
      icon="filters"
    />
    <SettingsLink
      title="Preferences"
      subtitle="Select your preferences by notification type."
      to="/not-implemented"
      icon="mobile-signal"
    />
  </div>
</template>
