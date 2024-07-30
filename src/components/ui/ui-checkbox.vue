<script setup lang="ts">
type value =
    boolean | string | object | number
    | string[] | object[] | number[] | boolean[]

withDefaults(defineProps<{
  disabled?: boolean
  label?: string
  name: string
  val: value
}>(), {
  disabled: false
})

const modelValue = defineModel<value>();
</script>

<template>
  <label class="ui-checkbox">
    <span class="ui-checkbox__container">
      <input
          v-model="modelValue"
          class="ui-checkbox__input"
          type="checkbox"
          :value="val"
          :disabled="disabled"
      >
      <transition name="check">
         <span v-if="modelValue" class="ui-checkbox__icon">
        <ui-icon size="2" name="check" />
      </span>
      </transition>
    </span>
    <span v-if="label" class="ui-checkbox__label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.ui-checkbox {
  @include flex(center);
  gap: 0.5rem;
  @include hover {
    cursor: pointer;
    .ui-checkbox__icon {
      opacity: 0.4;
    }
  }
  &__label {
    @include text(1.4rem, 120%, 500, $black);
  }

  &__input {
    display: none;
  }

  &__container {
    position: relative;
    @include flex(center, center);
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.4rem;
    border: 0.1rem solid $border;
  }

  &__icon {
    width: 2rem;
    height: 2rem;
    transition: all 0.3s ease;
  }

}

.check-enter-active,
.check-leave-active {
  transition: opacity 0.3s ease;
}

.check-enter-from,
.check-leave-to {
  opacity: 0;
}
</style>