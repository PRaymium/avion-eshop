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

<script setup lang="ts">
interface Props {
  iconName: string
  width?: number
  height?: number
  iconColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: 24,
  height: 24,
  iconColor: 'currentColor'
})
</script>
