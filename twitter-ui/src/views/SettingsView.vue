<script setup lang="ts">
import { RouterView } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import Textfield from "@/components/common/Textfield.vue";
import SettingsLink from "@/components/settings/SettingsLink.vue";
import useResponsiveView from "@/hooks/useResponsiveView";

const { isParentRoute } = useResponsiveView("account-settings");
</script>

<template>
  <main class="settings">
    <section
      class="settings__navbar"
      :class="{ 'mobile-hide': !isParentRoute }"
    >
      <PageHeader title="Settings" />
      <div class="px-4">
        <Textfield
          icon="magnifying-glass"
          placeholder="Search"
          variant="rounded"
        />
      </div>
      <div class="settings__tabs">
        <SettingsLink title="Account" to="/settings/account" />
        <SettingsLink
          title="Security and account access"
          to="/settings/security"
        />
        <SettingsLink title="Privacy and safety" to="/settings/privacy" />
        <SettingsLink title="Notifications" to="/settings/notifications" />
        <SettingsLink
          title="Accessibility, display, and languages"
          to="/settings/accessibility"
        />
      </div>
    </section>
    <section :class="{ 'mobile-hide': isParentRoute }">
      <RouterView />
    </section>
  </main>
</template>

<style scoped lang="scss">
.settings {
  display: grid;
  grid-template-columns: 1fr 1fr;

  @include respond(sm) {
    grid-template-columns: 1fr;
  }

  &__navbar {
    border-right: 1px solid $gray-100;
  }

  &__tabs {
    display: flex;
    flex-direction: column;
    margin: 1rem 0 0;
  }

  &__nav-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0.5rem;
    border-bottom: 1px solid $gray-100;

    &:first-of-type {
      border-top: 1px solid $gray-100;
    }

    svg {
      height: 1rem;
      fill: $gray-300;
    }
  }
}
</style>
