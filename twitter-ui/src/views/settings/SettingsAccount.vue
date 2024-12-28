<script setup lang="ts">
import SettingsLink from "@/components/settings/SettingsLink.vue";
import PageHeader from "@/components/PageHeader.vue";
</script>

<template>
  <PageHeader title="Your Account" hideBackButton />
  <p class="p-4">
    See information about your account, download an archive of your data, or
    learn about your account deactivation options
  </p>
  <div>
    <SettingsLink
      title="Account information"
      subtitle="See your account information like your phone number and email address."
      to="/settings/password"
      icon="profile"
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
      to="/settings/password"
      icon="download"
    />
    <SettingsLink
      title="Deactivate your account"
      subtitle="FInd out how you can deactivate your account."
      to="/settings/password"
      icon="broken-heart"
    />
  </div>
</template>
