<script setup lang="ts">
const props = defineProps<{
  isTriggerIcon?: boolean
}>()

type options = {
  count: number,
  active: number[],
  isTriggerIcon?: boolean
}

const accordionOptions: Ref<options> = ref({
  count: 0,
  active: [],
  isTriggerIcon: props.isTriggerIcon
})

const setCount = (value: number): void => {
  accordionOptions.value.count = value
}

const setActive = (value: number): void => {
  if (accordionOptions.value.active[0] === value) {
    accordionOptions.value.active = []
  } else {
    accordionOptions.value.active[0] = value;
  }
}

provide("accordion", {
  options: accordionOptions,
  setCount,
  setActive
})

</script>

<template>
  <div class="ui-accordion">
    <slot/>
  </div>
</template>
