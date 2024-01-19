<template>
  <div
    :class="['loading', { inline: blockType === 'inline' }]"
    v-if="!isLoaded"
  >
    {{ props.text }}
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
interface Props {
  isLoaded?: boolean
  text?: string
  blockType?: 'block' | 'inline'
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Loading...',
  blockType: 'block',
  isLoaded: true
})
</script>

<style lang="scss" scoped>
.inline {
  display: inline-block;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
