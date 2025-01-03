<script setup lang="ts">
export type value = boolean | string | object | number

const modelValue = defineModel<value>();

withDefaults(defineProps<{
  placeholder?: string,
  disabled?: boolean
  name: string
  val: value
}>(), {
  disabled: false,
});

</script>

<template>
  <label class="ui-radio">
    <span class="ui-radio__container">
      <input
          v-model="modelValue"
          class="ui-radio__input"
          type="radio"
          :name="name"
          :value="val"
          :disabled
      >
      <span class="ui-radio__content"/>
    </span>
    <span v-if="placeholder" class="ui-radio__placeholder">{{ placeholder }}</span>
  </label>
</template>

<style lang="scss" scoped>
.ui-radio {
  @include flex(center);
  gap: 0.5rem;

  &__input {
    display: none;
  }
  &__container {
    position: relative;
    @include flex;
  }

  &__content {
    @include flex(center, center);
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    border: 0.1rem solid $dark-gray;
    &:before {
      content: '';
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 100%;
      background: $purple;
      opacity: 0;
    }
  }

  &__input:checked + &__content {
    border-color: $purple;
    &:before {
      opacity: 1;
    }
  }

  &__input:not(:checked) + &__content {
    border-color: $dark-gray;
    &:before {
      opacity: 0;
    }
  }

  &__placeholder {
    @include text(1.4rem, 120%, 400, $black);
  }

}
</style>