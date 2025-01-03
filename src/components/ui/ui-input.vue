<script setup lang="ts">
withDefaults(defineProps<{
  name: string
  type?: string
  label?: string
  placeholder?: string
  maxlength?: number | string
  minlength?: number | string
}>(), {
  type: 'text'
})
const modelValue = defineModel<string | number>();
</script>

<template>
  <label class="ui-input">
    <span v-if="label" class="ui-input__label">{{ label }}</span>
    <input
        v-model="modelValue"
        class="ui-input__input"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        :maxlength="maxlength"
        :minlength="minlength"
    >
  </label>
</template>

<style lang="scss" scoped>
.ui-input {
  @include flex;
  flex-direction: column;
  gap: 0.5rem;
  &__label {
    @include text(1.4rem, 120%, 500, $black);
  }
  &__input {
    padding: 1rem 1.5rem;
    border: 0.1rem solid $light-gray;
    border-radius: 0.4rem;
    transition: all 0.3s ease;
    @include text(1.4rem, 120%, 500, $black);
    &::placeholder {
      color: $light-gray;
    }
    &:focus {
      border-color: $purple
    }
  }

}
</style>