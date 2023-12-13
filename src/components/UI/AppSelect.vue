<template>
  <div class="select">
    <ButtonLink
      :class="['select__selected', { open: isOpen }]"
      style-type="secondary"
      size="small"
      :icon-visible="true"
      :icon-is-active="isOpen"
      :aria-label="props.ariaLabel"
      :aria-expanded="isOpen"
      :aria-controls="controlId"
      @click="isOpen = !isOpen"
      >{{ selected }}</ButtonLink
    >
    <ul :class="['select__items', { hidden: !isOpen }]" :id="controlId">
      <li class="select__item" v-for="option of props.options" :key="option.id">
        <button
          :class="['select__item-btn', { selected: option.id === defaultId }]"
          @click="inputHandler($event.target, option)"
        >
          {{ option.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import ButtonLink from './ButtonLink.vue'
import { uuid } from 'vue3-uuid'
import { ref, watch } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  defaultId: {
    type: Number,
    required: false,
    default: null
  },
  constantHeader: {
    type: String,
    default: ''
  },
  ariaLabel: {
    type: String,
    required: true
  }
})

const emit = defineEmits({
  input: null
})

const controlId = uuid.v4()

const selected = ref()

const isOpen = ref(false)

function checkSelected() {
  return props.constantHeader
    ? props.constantHeader
    : props.defaultId
    ? props.options[props.defaultId - 1].name
    : props.options.length > 0
    ? props.options[0].name
    : null
}

selected.value = checkSelected()

function inputHandler(target, option) {
  const oldSelectedItem = document.querySelector('.select__item-btn.selected')
  if (oldSelectedItem) oldSelectedItem.classList.remove('selected')
  target.classList.add('selected')

  if (!props.constantHeader) selected.value = option.name
  isOpen.value = false
  emit('input', option.id)
}

watch(
  () => props.constantHeader,
  () => {
    selected.value = checkSelected()
  }
)
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  text-align: left;
  outline: none;

  &__selected {
    width: 100%;
    user-select: none;

    &.open {
      outline: 1px solid $primary;
    }
  }

  &__items {
    position: absolute;
    right: 0;
    min-width: 100%;
    max-width: $xs;
    z-index: 1;
    overflow: auto;
    outline: 1px solid $primary;
    background-color: $light-gray;

    &.hidden {
      display: none;
    }
  }

  &__item {
    &-btn {
      width: 100%;
      padding: 12px 24px;
      text-align: left;
      color: $dark-primary;
      user-select: none;

      &:hover,
      &:focus {
        outline: none;
        background-color: $border-gray;
      }

      &.selected {
        font-weight: bold;
      }
    }
  }
}
</style>
