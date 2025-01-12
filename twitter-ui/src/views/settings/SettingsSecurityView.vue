<script setup lang="ts">
import { useScreenSize } from "@/hooks/useScreenSize";
import PageHeader from "@/components/PageHeader.vue";
import SettingsLink from "@/components/settings/SettingsLink.vue";

const { isSmallScreen } = useScreenSize();
</script>

<template>
  <PageHeader
    title="Security and account access"
    :hideBackButton="!isSmallScreen"
  />
  <p class="py-4 px-2">
    Manage your account's security and keep track of your accoun't usage
    including apps that you have connected to your account.
  </p>
  <section>
    <SettingsLink
      title="Security"
      subtitle="Manage your acount's security"
      to="/not-implemented"
      icon="lock"
    />
    <SettingsLink
      title="Apps and sessions"
      subtitle="See information about when you logged into your account and the apps you connected to your account."
      to="/not-implemented"
      icon="copy"
    />
    <SettingsLink
      title="Connected accounts"
      subtitle="See information about when you logged into your account and the apps you connected to your account."
      to="/not-implemented"
      icon="profile"
    />
    <SettingsLink
      title="Delegate"
      subtitle="See information about when you logged into your account and the apps you connected to your account."
      to="/not-implemented"
      icon="transfer"
    />
  </section>
</template>
