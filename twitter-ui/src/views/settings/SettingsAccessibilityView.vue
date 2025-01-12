<script setup lang="ts">
import { useScreenSize } from "@/hooks/useScreenSize";
import PageHeader from "@/components/PageHeader.vue";
import SettingsLink from "@/components/settings/SettingsLink.vue";

const { isSmallScreen } = useScreenSize();
</script>

<template>
  <PageHeader
    title="Accessibility, display, and languages"
    :hideBackButton="!isSmallScreen"
  />
  <p class="py-4 px-2">Manage how Twitter content is displayed to you.</p>
  <div>
    <SettingsLink
      title="Accessibility"
      subtitle="Manage aspects of your Twitter experience such as limiting color contrast and motion."
      to="/not-implemented"
      icon="eye-slash"
    />
    <SettingsLink
      title="Display"
      subtitle="Manage your font size, color, and background. These settings affect all the Twitter accounts on this browser."
      to="/not-implemented"
      icon="paint-brush"
    />
    <SettingsLink
      title="Languages"
      subtitle="Manage which langauges are used to personalize your Twitter experience."
      to="/not-implemented"
      icon="globe"
    />
    <SettingsLink
      title="Data usage"
      subtitle="Limit how Twitter uses some of your network data on this device."
      to="/not-implemented"
      icon="metrics"
    />
  </div>
</template>
