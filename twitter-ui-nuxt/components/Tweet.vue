<template>
  <div class="py-2">
    {{ text }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    text: {
      type: String,
      default: '',
    },
  },
});
</script>
