<template>
  <div class="select" tabindex="0">
    <ButtonLink
      :class="['select__selected', { open: isOpen }]"
      @click="isOpen = !isOpen"
      style-type="secondary"
      size="small"
      :icon-visible="true"
      :icon-is-active="isOpen"
      >{{ selected }}</ButtonLink
    >
    <div class="select__items" :class="{ hidden: !isOpen }">
      <div
        class="select__item"
        tabindex="0"
        v-for="option of props.options"
        :key="option.id"
        @click="inputHander(option)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonLink from './ButtonLink.vue'
import { ref } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  defaultId: {
    type: Number,
    required: false,
    default: null
  }
})

const emit = defineEmits({
  input: null
})

const selected = ref(
  props.defaultId
    ? props.options[props.defaultId - 1].name
    : props.options.length > 0
    ? props.options[0].name
    : null
)

const isOpen = ref(false)

function inputHander(option) {
  selected.value = option.name
  isOpen.value = false
  emit('input', option.id)
}
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  text-align: left;
  outline: none;

  &__selected {
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
    color: $dark-primary;
    padding: 12px 24px;
    cursor: pointer;
    user-select: none;

    &:hover,
    &:focus {
      outline: none;
      background-color: $border-gray;
    }
  }
}
</style>
