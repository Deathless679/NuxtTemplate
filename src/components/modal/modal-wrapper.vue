<script setup lang="ts">
withDefaults(defineProps<{
  position: 'l-top' | 'm-top' | 'r-top' | 'center'
    | 'l-bottom' | 'm-bottom' | 'r-bottom'
  title?: string
  variant: 'default' | 'other'
}>(), {
  position: 'center',
  variant: 'default',
  title: 'My Modal Title',
});
</script>

<template>
  <div class="modal">
    <div class="modal__wrapper">
      <div class="modal__head">
        <template v-if="!$slots.head">
          <div class="modal__head-title">
            {{ title }}
          </div>
          <ui-button variants="icon" class="modal__close">
            Close
          </ui-button>
        </template>
        <template v-else>
          <slot name="head"/>
        </template>
      </div>
      <div class="modal__body">
        <slot name="default"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>