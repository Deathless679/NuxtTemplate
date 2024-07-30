<script setup lang="ts">
const valueCheckbox = ref('1234');

const valueRadio = ref(2)

const options = ref([
  {
    title: 'item 1',
    id: 1
  },
  {
    title: 'item 2',
    id: 2
  },
  {
    title: 'item 3',
    id: 3
  }, {
    title: 'item 4',
    id: 4
  }
])

const isSelected = ref('');

</script>

<template>
  <div class="main">
    <modal-wrapper>
      <template #head>
        fsdfsdfsf
      </template>
    </modal-wrapper>
    <ui-select label="Select" name="select" v-model="isSelected" :options="options"/>

    <ui-accordion class="main__accordion" is-trigger-icon>
      <ui-accordion-item>
        Открыть
        <template #content>
          Контент
        </template>
      </ui-accordion-item>
      <ui-accordion-item>
        Открыть
        <template #content>
          Контент
        </template>
      </ui-accordion-item>
    </ui-accordion>

    <ui-button variants="purple" class="main__button">
      Кнопка
    </ui-button>

    <ui-picture class="main__picture"/>

    <ui-checkbox name="checkbox" val="1234" v-model="valueCheckbox"></ui-checkbox>

    <ui-input name="input" placeholder="Инпут" label="Инпут"/>

    <ui-radio v-model="valueRadio" :val="2" name="radio" placeholder="Radio"></ui-radio>

    <ui-radio v-model="valueRadio" :val="1" name="radio" placeholder="Radio"></ui-radio>
  </div>
</template>

<style lang="scss" scoped>
.main {
  @include flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem;

  &__accordion {
    @include flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 40rem;
  }

  &__button {
    max-width: 10rem;
  }

  &__picture {
    max-width: 5rem;
  }
}
</style>