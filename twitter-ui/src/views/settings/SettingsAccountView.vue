<script setup lang="ts">
import SettingsLink from "@/components/settings/SettingsLink.vue";
import PageHeader from "@/components/PageHeader.vue";
import { useScreenSize } from "@/hooks/useScreenSize";

const { isSmallScreen } = useScreenSize();
</script>

<template>
  <PageHeader title="Your Account" :hideBackButton="!isSmallScreen" />
  <p class="py-4 px-2">
    See information about your account, download an archive of your data, or
    learn about your account deactivation options
  </p>
  <div>
    <SettingsLink
      title="Account information"
      subtitle="See your account information like your phone number and email address."
      to="/not-implemented"
      icon="profile-outline"
    />
    <SettingsLink
      title="Change your password"
      subtitle="Change your password at any time."
      to="/settings/password"
      icon="key"
    />
    <SettingsLink
      title="Download an archive of your data"
      subtitle="Get insights into the type of information stored for your account."
      to="/not-implemented"
      icon="download"
    />
    <SettingsLink
      title="Deactivate your account"
      subtitle="Find out how you can deactivate your account."
      to="/not-implemented"
      icon="broken-heart"
    />
  </div>
</template>
