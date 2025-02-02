<script setup>
import { modalsList } from '~/composibles/useModal.js';
</script>

<template>
  <teleport to="body">
    <template v-for="{ component, key } in modalsList" :key="key">
      <component :is="component" />
    </template>
  </teleport>
</template>

