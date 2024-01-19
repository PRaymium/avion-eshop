<template>
  <div class="global-container">
    <component :is="layoutComponent">
      <RouterView />
    </component>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, shallowRef, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
const layoutComponent = shallowRef()
watch(
  () => route.meta.layout ?? 'Default',
  (layout) => {
    layoutComponent.value = defineAsyncComponent(
      () => import(`@/layouts/${layout}Layout.vue`)
    )
  },
  { immediate: true }
)
</script>

<style scoped></style>
