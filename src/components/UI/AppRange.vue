<template>
  <div class="input-range">
    <input
      class="input-range__input"
      type="number"
      v-model="result.min"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :placeholder="props.min.toString()"
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
      :placeholder="props.max.toString()"
      aria-label="Maximum value"
      :name="props.names[1]"
      @change="changeHandler('max')"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, nextTick } from 'vue'

interface Props {
  min?: number
  max?: number
  minStart?: number
  maxStart?: number
  step?: number
  names?: [string, string]
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  names: () => ['min', 'max']
})

defineExpose({
  reset
})

export interface IRangeResult {
  min: number
  max: number
}

const emit = defineEmits<{
  change: [IRangeResult]
}>()

interface IResult {
  // [key: string]: number | undefined
  min: number | undefined
  max: number | undefined
}

const result = reactive<IResult>({
  min: props.minStart,
  max: props.maxStart
})

function changeHandler(type: 'min' | 'max') {
  if (type === 'min') {
    if (result.min) {
      if (
        result.min < props.min ||
        result.min > props.max ||
        (result.max && result.min > result.max)
      ) {
        result.min = props.min
      }
    }
  } else if (type === 'max') {
    if (result.max) {
      if (
        (result.min = props.min) ||
        result.max < props.min ||
        (result.min && result.max < result.min)
      ) {
        result.max = props.max
      }
    }
  }

  //   if (result.min < props.min) result.min = props.min
  //   else if (result.min > props.max) result.min = props.min
  //   else if (result.max && result.min > result.max) result.min = props.min
  // } else if (result.max) {
  //   if (result.max > props.max) result.max = props.max
  //   else if (result.max < props.min) result.max = props.max
  //   else if (result.min && result.max < result.min) result.max = props.max
  // }

  // if (result[type]) {
  //   if (type === 'min') {
  //     if (result!.min > result.max) result.min = result.max
  //     if (result!.min < props.min) result.min = props.min
  //     if (result.min > props.max) result.min = props.max
  //   } else {
  //     if (result.max < result.min) result.max = result.min
  //     if (result.max > props.max) result.max = props.max
  //     if (result.max < props.min) result.max = props.min
  //   }
  // }

  const res = {
    min: result.min ?? props.min,
    max: result.max ?? props.max
  }
  emit('change', res)
}

async function reset() {
  await nextTick()
  result.min = props.minStart
  result.max = props.maxStart
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
    padding-left: 1em;
    padding-right: 1em;
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
