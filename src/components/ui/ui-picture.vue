<script setup lang="ts">
defineProps<{
  src?: string
  name?: string
}>();

const isErrorImage: Ref<boolean> = ref(false);

const setErrorImage = (): void => {
  isErrorImage.value = true
};
</script>

<template>
  <picture class="ui-picture">
    <img
        v-if="!isErrorImage && src"
        class="ui-picture__picture"
        :src="src"
        :title="name"
        :alt="name"
        @error="setErrorImage">
    <ui-icon
        v-else
        class="ui-picture__picture"
        size="100"
        unit="%"
        name="no-picture"/>
  </picture>
</template>

<style lang="scss" scoped>
.ui-picture {
  flex-shrink: 0;

  &__picture {
    object-position: center;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
