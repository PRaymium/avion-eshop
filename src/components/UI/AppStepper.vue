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

<script setup>
import { ref, computed, watch } from 'vue'
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
  },

  styleType: {
    type: String,
    default: 'gray',
    validator(value) {
      return ['gray', 'white'].includes(value)
    }
  },

  isWideOnMobile: {
    type: Boolean,
    default: false
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

watch(
  () => props.start,
  (newVal) => {
    count.value = newVal
  }
)

function changeCount(action) {
  if (action === 'increase') count.value++
  else if (action === 'decrease') count.value--
  emit('change', count)
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
