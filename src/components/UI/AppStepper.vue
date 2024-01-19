<template>
  <div
    :class="[
      'stepper',
      {
        'stepper--white': styleType === 'white',
        'stepper--wide': isWideOnMobile
      }
    ]"
  >
    <button
      :class="[
        'stepper-item',
        'stepper-btn',
        { 'stepper-btn--wide': isWideOnMobile }
      ]"
      aria-label="decrease count"
      @click="changeCount('decrease')"
      :disabled="!isEnabledDecrease"
    >
      -
    </button>
    <div class="stepper-item stepper-value">
      {{ count }}
    </div>
    <button
      :class="[
        'stepper-item',
        'stepper-btn',
        { 'stepper-btn--wide': isWideOnMobile }
      ]"
      aria-label="increase count"
      @click="changeCount('increase')"
      :disabled="!isEnabledIncrease"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

type StyleType = 'gray' | 'white'

interface Props {
  start?: number
  min?: number
  max?: number
  step?: number
  styleType?: StyleType
  isWideOnMobile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  start: 1,
  min: 1,
  max: 999,
  step: 1,
  styleType: 'gray',
  isWideOnMobile: false
})

const emit = defineEmits<{
  change: [count: number]
}>()

const count = ref(props.start)

const isEnabledDecrease = computed(() => {
  return count.value != props.min
})

const isEnabledIncrease = computed(() => {
  return count.value != props.max
})

watch(
  () => props.start,
  (newVal) => {
    count.value = newVal
  }
)

function changeCount(action: 'increase' | 'decrease') {
  if (action === 'increase') count.value++
  else if (action === 'decrease') count.value--
  emit('change', count.value)
}
</script>

<style lang="scss" scoped>
.stepper {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  background-color: $light-gray;

  &-item {
    padding: 12px 18px;
  }

  &-value {
    width: 50px;
    padding: 12px 0;
    text-align: center;
  }

  &-btn {
    height: 100%;
    color: $primary;
    transition: 0.1s ease-in-out;
    flex-grow: 1;

    &:focus,
    &:hover {
      outline: none;
      color: $light-gray;
      background-color: rgba($color: #000000, $alpha: 0.2);
    }

    &:active {
      background-color: rgba($color: #000000, $alpha: 0.4);
    }
  }

  &--white {
    background-color: $white;
  }

  &--wide {
    @media screen and (max-width: ($md - 1)) {
      width: 100%;
    }
  }
}
</style>
