<script setup lang="ts">
import { useScreenSize } from "@/hooks/useScreenSize";
import PageHeader from "@/components/PageHeader.vue";
import SettingsLink from "@/components/settings/SettingsLink.vue";

const { isSmallScreen } = useScreenSize();
</script>

<template>
  <PageHeader title="Privacy and safety" :hideBackButton="!isSmallScreen" />
  <p class="py-4 px-2">Manage what information you see and share on Twitter.</p>
  <div>
    <SettingsLink
      title="Audience, media, and tagging"
      subtitle="Manage what information you allow other people on Twitter to see."
      to="/not-implemented"
      icon="people-group"
    />
    <SettingsLink
      title="Your posts"
      subtitle="Manage the information associated with your posts."
      to="/not-implemented"
      icon="pencil"
    />
    <SettingsLink
      title="Content you see"
      subtitle="Decide what you see on Twitter based on your preferences like Topics and interests."
      to="/not-implemented"
      icon="content"
    />
    <SettingsLink
      title="Mute and block"
      subtitle="Manage the accounts, words, and notifications that you've muted or blocked."
      to="/not-implemented"
      icon="speaker-muted"
    />
    <SettingsLink
      title="Direct Messages"
      subtitle="Manage who can message you directly."
      to="/not-implemented"
      icon="message-outline"
    />
    <SettingsLink
      title="Discoverability and contacts"
      subtitle="Control your discoverability settings and manage contacts you've imported."
      to="/not-implemented"
      icon="magnifying-glass-person"
    />
  </div>
</template>
