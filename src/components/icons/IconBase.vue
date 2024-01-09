<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width"
    :height="props.height"
    :viewBox="`0 0 24 24`"
    :aria-label="`icon-${props.iconName}`"
    role="presentation"
    meet
  >
    <g :fill="props.iconColor">
      <slot />
    </g>
  </svg>
</template>

<script setup>
const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 24
  },
  height: {
    type: Number,
    default: 24
  },
  iconColor: {
    type: String,
    default: 'currentColor'
  }
})
</script>
