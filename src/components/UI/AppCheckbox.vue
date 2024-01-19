<template>
  <div class="custom-checkbox">
    <input
      type="checkbox"
      class="custom-checkbox__input"
      :id="controlId"
      :name="props.name"
      :disabled="props.isDisabled"
      v-model="isCheckedRef"
      @change="emit('change', isCheckedRef)"
    />
    <label class="custom-checkbox__label" :for="controlId">{{
      props.label
    }}</label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { uuid } from 'vue3-uuid'

interface Props {
  label: string
  name: string
  isDisabled?: boolean
  isChecked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  isChecked: false
})

const emit = defineEmits<{
  change: [checkedState: boolean]
}>()

const controlId = ref(uuid.v4())

const isCheckedRef = ref(props.isChecked)

watch(
  () => props.isChecked,
  () => {
    isCheckedRef.value = props.isChecked
  }
)
</script>

<style lang="scss" scoped>
.custom-checkbox {
  &__input {
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:checked + label::before {
      border-color: $primary;
      background-color: $primary;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='%23fff' d='M6.5 12L2 7.49997L2.707 6.79297L6.5 10.5855L13.293 3.79297L14 4.49997L6.5 12Z'/%3e%3c/svg%3e");
    }

    /* hover */
    &:not(:disabled):not(:checked) + label:hover::before {
      border-color: $primary;
    }
    /* active */
    &:not(:disabled):active + label::before {
      background-color: $primary;
    }
    /* focus */
    &:focus + label::before {
      box-shadow: 0 0 0 0.2em rgba($primary, $alpha: 0.25);
    }
    /* focus, non checked */
    &:focus:not(:checked) + label::before {
      border-color: $primary;
    }
    /* disabled */
    &:disabled + label::before {
      background-color: lightgray;
    }
  }

  &__label {
    display: inline-flex;
    align-items: center;
    user-select: none;

    &::before {
      content: '';
      display: inline-block;
      width: 1em;
      height: 1em;
      flex-shrink: 0;
      flex-grow: 0;
      box-sizing: border-box;
      border: 1px solid rgba($primary, $alpha: 0.5);
      border-radius: 0.15em;
      margin-right: 0.75em;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      transition: 0.1s ease-in-out;
    }
  }
}
</style>
