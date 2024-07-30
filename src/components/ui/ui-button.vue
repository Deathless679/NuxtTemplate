<script setup lang="ts">
const props = withDefaults(defineProps<{
  disabled?: boolean
  variants?: 'orange' | 'default' | 'black' | 'purple' | 'icon'
  href?: string
}>(), {
  disabled: false,
  variants: 'default',
})

const isComponents = computed(() => {
  return props.href ? resolveComponent('NuxtLink') : 'button'
})
</script>

<template>
  <component :is="isComponents" class="ui-button" :class="`ui-button--${variants}`" :to="href" :disabled="disabled">
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
.ui-button {
  position: relative;
  overflow: hidden;
  @include flex(center, center);
  padding: 1rem 2rem;
  border-radius: 0.4rem;
  @include text(1.6rem, 120%, 500);

  @include hover {
    cursor: pointer;
    opacity: 0.8;
    &:before {
      width: 100%;
    }
  }

  &--default {
    border: 0.1rem solid black;
    color: $black;
  }

  &--black {
    background: $black;
    color: $white;
  }

  &--orange {
    background: $orange;
    color: $white;
  }

  &--purple {
    background: $purple;
    color: $white;
  }

  &--icon {
    padding: 0;
    border-radius: 0;
  }

  &:before {
    z-index: -1;
    position: absolute;
    content: '';
    width: 0;
    bottom: 0;
    height: 5%;
    transition: all 0.3s ease;
    background: rgb(0, 0, 0, 0.1);
  }
}
</style>