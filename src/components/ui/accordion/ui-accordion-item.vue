<script setup lang="ts">
const { options, setActive, setCount  } = inject("accordion");

const index: Ref<number> = ref(0);

index.value = options.value.count + 1;
setCount(index.value);

const isActiveItem = computed<boolean>(() =>
   options.value.active.includes(index.value)
)
const handlerAccordion = () => {
  setActive(index.value)
}

</script>

<template>
  <div class="accordion-item">
    <div @click="handlerAccordion" class="accordion-item__header">
      <div class="accordion-item__trigger">
        <slot name="default"></slot>
      </div>
      <div
          v-if="options.isTriggerIcon"
          class="accordion-item__icon"
          :class="{open: isActiveItem}">
        <ui-icon size="1.5" name="arrow-down" />
      </div>
    </div>
    <transition name="accordion">
      <div v-if="isActiveItem" class="accordion-item__content">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>


<style lang="scss" scoped>
.accordion-item {
  position: relative;
  @include flex;
  flex-direction: column;
  gap: 0.3rem;
  height: auto;
  border: 0.1rem solid $border;
  border-radius: 0.4rem;

  &__header {
    @include flex(center, space-between);
    padding: 1rem 2rem;
    @include text(1.6rem, 120% ,400, $black);

    @include hover {
      cursor: pointer;
      color: $purple;

      &:deep(*) {
        fill: $purple;
      }
    }
  }

  &__icon {
    transition: 0.3s ease all;

    &.open {
      rotate: 180deg;
    }
  }

  &__content {
    border-top: 0.1rem solid $border;
    padding: 1rem 2rem;
    @include text(1.6rem, 120% ,400, $black)
  }
}


.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
}
</style>