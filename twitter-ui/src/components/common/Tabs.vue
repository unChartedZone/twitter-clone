<script setup lang="ts">
import { ref } from "vue";

interface Tab {
  title: string;
  component: any;
}

interface TabsProps {
  tabs: Tab[];
}

defineProps<TabsProps>();

const currentTab = ref(0);
</script>

<template>
  <div class="tabs">
    <ul class="tabs__headers">
      <TabHeader
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="currentTab = index"
      >
        {{ tab.title }}
      </TabHeader>
    </ul>
    <component :is="tabs[currentTab].component"></component>
  </div>

  <div class="tabs-details">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.tabs {
  &__headers {
    display: flex;
    justify-content: space-between;
  }
}
</style>
