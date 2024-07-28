<script setup lang="ts">
withDefaults(defineProps<{
  placeholder?: string
  label?: string
  name: string
  options: object[]
  nameProperty?: string
}>(), {
  placeholder: 'Выберете элемент',
  nameProperty: 'title'
})

const modelValue = defineModel<any>();

const isOpen: Ref<boolean> = ref(false);

const handlerSelect = (item: any): void => {
  if (item === modelValue.value) {
    modelValue.value = {}
  } else {
    modelValue.value = item
  }
  isOpen.value = false;
}
</script>

<template>
  <div class="ui-select">
    <div v-if="label" class="ui-select__label">
       {{  label }}
    </div>
    <div class="ui-select__container">
      <div class="ui-select__header" @click="isOpen = !isOpen">
        <div class="ui-select__trigger">
          <div v-if="modelValue[nameProperty]" class="ui-select__selected">
            {{ modelValue[nameProperty] }}
          </div>
          <div v-else class="ui-select__placeholder">
            {{ placeholder }}
          </div>
        </div>
        <div class="ui-select__icon" :class="{open: isOpen}">
          <ui-icon name="arrow-down" size="1.5" />
        </div>
      </div>

      <transition name="select">
        <div v-if="isOpen" class="ui-select__content">
          <ul class="ui-select__list">
            <li
                v-for="(item, key) in options" :key="key"
                @click="handlerSelect(item)"
                class="ui-select__item"
                :class="{active: modelValue === item}"
            >
              <NuxtLink v-if="item.path" :to="item.path">
                {{ item[nameProperty] }}
              </NuxtLink>
              <span v-else>
            {{ item[nameProperty] }}
          </span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-select {
  @include flex;
  flex-direction: column;

  &__label {
    margin-bottom: 1rem;
    @include text(1.6rem, 120%, 400, $black);
  }

  &__container {
    position: relative;
  }

  &__header {
    @include flex(center, space-between);
    height: 4rem;
    padding: 0 2rem;
    border: 0.1rem solid $border;
    border-radius: 0.4rem;
    @include text(1.6rem, 120%, 400);

    @include hover {
      cursor: pointer;
      border-color: $purple;
      color: $purple;

      &:deep(*) {
        fill: $purple;
      }
    }
  }

  &__content {
    z-index: 100;
    position: absolute;
    top: 4.5rem;
    border: 0.1rem solid $border;
    border-radius: 0.4rem;
    width: 100%;
    background: $white;
    box-shadow: 0 0.5rem 1rem 0.2rem rgba(34, 60, 80, 0.2);
  }

  &__list {
    @include flex;
    flex-direction: column;
  }
  &__icon {
    transition: 0.3s ease;

    &.open {
      rotate: 180deg;
    }
  }

  &__item {
    padding: 1rem 2rem;
    border-bottom: 0.1rem solid $border;
    &:last-child {
      border-bottom: none;
    }

    @include text(1.6rem, 120%, 400);



    &:not(.active) {
      @include hover {
        cursor: pointer;
        opacity: 0.6;
      }
    }

    &.active {
      color: $purple
    }
  }
}

.select-enter-active,
.select-leave-active {
  transition: all 0.3s;
}
.select-enter-from,
.select-leave-to {
  opacity: 0;
}
</style>