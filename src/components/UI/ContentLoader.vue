<template>
  <div
    :class="['loading', { inline: blockType === 'inline' }]"
    v-if="!isLoaded"
  >
    {{ props.text }}
  </div>
  <slot v-else></slot>
</template>

<script setup>
const props = defineProps({
  isLoaded: {
    type: Boolean,
    required: true
  },

  text: {
    type: String,
    default: 'Loading...'
  },

  blockType: {
    type: String,
    default: 'block',
    validator(value) {
      return ['block', 'inline'].includes(value)
    }
  }
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
