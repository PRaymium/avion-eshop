<template>
  <div class="select">
    <ButtonLink
      :class="['select__selected', { open: isOpen }]"
      style-type="secondary"
      size="small"
      :icon-visible="true"
      :icon-is-active="isOpen"
      :aria-label="props.arLabel"
      :aria-expanded="isOpen"
      :aria-controls="controlId"
      @click="isOpen = !isOpen"
      >{{ selectedName }}</ButtonLink
    >
    <ul :class="['select__items', { hidden: !isOpen }]" :id="controlId">
      <li class="select__item" v-for="option of props.options" :key="option.id">
        <button
          :class="['select__item-btn', { selected: option.id === selectedId }]"
          @click="inputHandler($event.target as HTMLButtonElement, option)"
        >
          {{ option.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ButtonLink from '@/components/UI/ButtonLink.vue'
import { uuid } from 'vue3-uuid'
import { ref, watch } from 'vue'

type Option = {
  id: number
  name: string
}

interface Props {
  options: Option[]
  selectedId?: number
  constantHeader?: string
  arLabel: string
}

const props = withDefaults(defineProps<Props>(), {
  selectedId: undefined,
  constantHeader: ''
})

const emit = defineEmits<{
  input: [id: number]
}>()

const controlId = uuid.v4()

const selectedName = ref<string | null>()

const isOpen = ref(false)

function checkSelectedName() {
  return props.constantHeader
    ? props.constantHeader
    : props.selectedId
      ? props.options[props.selectedId - 1].name
      : props.options.length > 0
        ? props.options[0].name
        : null
}

selectedName.value = checkSelectedName()

function inputHandler(button: HTMLButtonElement, option: Option) {
  const oldSelectedItem = document.querySelector('.select__item-btn.selected')
  if (oldSelectedItem) oldSelectedItem.classList.remove('selected')
  button.classList.add('selected')

  if (!props.constantHeader) selectedName.value = option.name
  isOpen.value = false
  emit('input', option.id)
}

watch(
  () => props.constantHeader,
  () => {
    selectedName.value = checkSelectedName()
  }
)

watch(
  () => props.selectedId,
  () => {
    selectedName.value = checkSelectedName()
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
