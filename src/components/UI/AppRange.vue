<template>
  <div class="input-range">
    <input
      class="input-range__input"
      type="number"
      v-model="result.min"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :placeholder="props.min"
      aria-label="Minimum value"
      :name="props.names[0]"
      @change="changeHandler('min')"
    />
    <div class="input-range__separator"></div>
    <input
      class="input-range__input"
      type="number"
      v-model="result.max"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :placeholder="props.max"
      aria-label="Maximum value"
      :name="props.names[1]"
      @change="changeHandler('max')"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const props = defineProps({
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  minStart: {
    type: Number,
    default: undefined
  },
  maxStart: {
    type: Number,
    default: undefined
  },
  step: {
    type: Number,
    default: 1
  },
  names: {
    type: Array,
    default: () => ['min', 'max']
  }
})

const emit = defineEmits({
  change: null
})

const result = reactive({
  min: props.minStart,
  max: props.maxStart
})

function changeHandler(type) {
  if (result[type]) {
    if (type === 'min') {
      if (result.min > result.max) result.min = result.max
      if (result.min < props.min) result.min = props.min
      if (result.min > props.max) result.min = props.max
    } else if (type === 'max') {
      if (result.max < result.min) result.max = result.min
      if (result.max > props.max) result.max = props.max
      if (result.max < props.min) result.max = props.min
    }
  }

  const res = {
    min: result.min ? result.min : props.min,
    max: result.max ? result.max : props.max
  }
  emit('change', res)
}
</script>

<style lang="scss" scoped>
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.input-range {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 2%;

  &__input {
    box-sizing: border-box;
    min-width: 4em;
    width: 100%;
    max-width: 45%;
    height: 2.5em;
    padding-left: 5%;
    padding-right: 5%;
    border: 1px solid rgba($primary, $alpha: 0.5);
    border-radius: 0.5em;
    font-size: $body-font-size-md;
    color: $dark-primary;
    transition: 0.1s ease-in-out;

    &:hover {
      border: 1px solid $primary;
    }

    &:focus {
      outline: none;
      border: 1px solid $primary;
      box-shadow: 0 0 0 0.2em rgba($primary, $alpha: 0.25);

      &::placeholder {
        color: transparent;
      }
    }
  }

  &__separator {
    height: 1px;
    flex-grow: 1;
    border-radius: 10px;
    background-color: $border-dark;
  }
}
</style>
