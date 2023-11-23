<template>
  <div class="stepper">
    <button
      class="stepper-item stepper-btn"
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
      class="stepper-item stepper-btn"
      aria-label="increase count"
      @click="changeCount('increase')"
      :disabled="!isEnabledIncrease"
    >
      +
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  start: {
    type: Number,
    default: 1,
    validator(value) {
      return value >= 1
    }
  },

  min: {
    type: Number,
    default: 1,
    validator(value) {
      return value >= 1
    }
  },

  max: {
    type: Number,
    default: 10,
    validator(value) {
      return value >= 1
    }
  },

  step: {
    type: Number,
    default: 1,
    validator(value) {
      return value >= 1
    }
  }
})

const emit = defineEmits({
  change: null
})

const count = ref(props.start)

const isEnabledDecrease = computed(() => {
  return count.value != props.min
})

const isEnabledIncrease = computed(() => {
  return count.value != props.max
})

function changeCount(action) {
  if (action === 'increase') count.value++
  else if (action === 'decrease') count.value--
  emit('change', count)
}
</script>

<style lang="scss">
.stepper {
  display: inline-flex;
  box-sizing: border-box;
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
    color: $border-dark;
    transition: 0.1s ease-in-out;

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
}
</style>
