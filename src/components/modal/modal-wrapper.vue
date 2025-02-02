<script setup lang="ts">
defineProps<{
  title?: string,
  component?: HTMLElement | string,
  componentProps?: Record<string, string>
}>();
const emit = defineEmits(['close', 'submit']);

const handlerClose = () => emit('close');
const handlerSubmit = (response: unknown | undefined) => emit('submit', response);

const modal = ref(null);
</script>

<template>
  <teleport to="body">
    <div ref="modal" class="modal">
      <div class="modal__wrapper">
        <div class="modal__head">
          <button
            class="modal__close"
            @click="handlerClose"
          >
            close
          </button>
        </div>
        <div class="modal__body">
          <component
            :is="component"
            v-bind="componentProps"
            @close="handlerClose"
            @submit="handlerSubmit"
          />
        </div>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.modal {
  z-index: 4000;
  position: fixed;
  top: 0;
  left: 0;
  @include flex(center, center);
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.6);
  animation: 0.3s ease onset;
  @include tablet {
    min-height: 110vh;
    scrollbar-width: unset !important;
  }

  &__wrapper {
    border-radius: 3rem;
    padding: 2.6rem;
    background: $dark-gray;
    min-width: 49rem;
    @include tablet {
      padding: 1.8rem;
      width: 100%;
      height: 100%;
      min-width: 0;
      border-radius: 0;
      background: $black;
    }
  }

  &__head {
    @include flex(center, space-between);

    h2 {
      @include flex(center);
      font-family: $font-main;
      @include text(1.8rem, 120%, 500, $white);
    }
  }

  &__body {
  }

  &__close {
    @include flex(center);
    border: none;
    padding: 0;
    background: transparent;

    svg {
      width: 2.2rem;
      height: 2.2rem;
    }

    &--v2 {
      margin: -2.3rem;
      padding: 2.3rem;

      svg {
        margin-right: 0.8rem;
        width: 2.8rem;
        height: 2.8rem;
      }
    }

    @include hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  @keyframes onset {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
