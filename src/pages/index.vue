<script lang="ts" setup async>

import { getCommentsList123 } from '~/utils/test';

const { data, fetch } = useApi(getCommentsList123, null, {
  immediate: true,
}, 'GET');
</script>

<template>
  <div @click="fetch">
    {{ data }}
  </div>
</template>

<style lang="scss" scoped>

</style>