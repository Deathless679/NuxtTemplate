<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  size?: number | string
  width?: number | string
  height?: number | string
  unit?: string
}>(), {
  unit: 'rem'
});

const isIcon: any = ref('');
const widthIcon: string = ref(`${props.size || props.width}${props.unit}`);
const heightIcon: string = ref(`${props.size || props.height}${props.unit}`);


const getIcon = async () => {
  try {
    const iconsImport = import.meta.glob('assets/icons/**/**.svg', {
      query: '?raw',
      import: 'default',
      eager: false,
    });
    const iconPath: string | undefined = Object.keys(iconsImport).find((el) => {
      return el.includes(`${props.name}.svg`);
    });

    if (!iconPath) {
      return new Error()
    }

    isIcon.value = await iconsImport[iconPath]();

  } catch (e) {
    return e
  }
}

await getIcon();
watchEffect(getIcon);

</script>

<template>
  <div class="ui-icon" v-html="isIcon"/>
</template>

<style lang="scss" scoped>
.ui-icon {
  flex-shrink: 0;
  width: v-bind(widthIcon);
  height: v-bind(heightIcon);
}
</style>