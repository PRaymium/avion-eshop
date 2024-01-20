<template>
  <div
    :class="['filters', { 'filters--dropdown': props.type === 'dropdown' }]"
    aria-label="Filters"
  >
    <ButtonLink
      :class="[
        'filters-dropdown-toggler',
        { active: dropdownParams.dropdownIsOpen }
      ]"
      style-type="secondary"
      size="small"
      :icon-visible="true"
      :icon-is-active="dropdownParams.dropdownIsOpen"
      :aria-expanded="dropdownParams.dropdownIsOpen"
      :aria-controls="dropdownParams.controlId"
      v-if="props.type === 'dropdown'"
      @click="dropdownFiltersMenuStateHandler"
      >Filters</ButtonLink
    >
    <div
      :class="[
        'filters-content',
        { show: props.type === 'dropdown' && dropdownParams.dropdownIsOpen }
      ]"
      :id="dropdownParams.controlId"
      v-show="props.type === 'dropdown' ? dropdownParams.dropdownIsOpen : true"
    >
      <ul class="filters-list">
        <li
          class="filters-list__item"
          v-for="filter of props.filters"
          :key="filter.name"
        >
          <button
            class="filters-list__item-toggler"
            :aria-expanded="dropdownParams.filters[filter.name].isOpen"
            :aria-controls="dropdownParams.filters[filter.name].controlId"
            @click="dropdownFiltersMenuItemStateHandler(filter.name)"
          >
            <IconBase
              :class="[
                'filters-list__item-toggler-icon',
                { active: dropdownParams.filters[filter.name].isOpen }
              ]"
              :width="16"
              :height="16"
              icon-name="arrow"
              ><IconArrow
            /></IconBase>
            {{ filter.title }}
          </button>
          <ul
            class="filters-list__item-list"
            :id="dropdownParams.filters[filter.name].controlId"
            v-show="dropdownParams.filters[filter.name].isOpen"
          >
            <template v-if="filter.type === 'checkboxList'">
              <template v-if="!props.isLoaded">
                <li
                  class="filters-list__item-list-element"
                  v-for="idx in new Array(
                    loaderPlaceholderCountByType[filter.type]
                  )"
                  :key="idx"
                >
                  <ContentLoader :is-loaded="props.isLoaded"></ContentLoader>
                </li>
              </template>
              <template v-else>
                <li
                  class="filters-list__item-list-element"
                  v-for="item of filter.value"
                  :key="item.id"
                >
                  <AppCheckbox
                    :label="item.name"
                    :name="item.name"
                    :is-checked="filter.checkedIds.has(item.id)"
                    @change="
                      (state) =>
                        checkboxListChangeHandler(filter, item.id, state)
                    "
                  />
                </li>
              </template>
            </template>

            <template v-else-if="filter.type === 'range'">
              <template v-if="!props.isLoaded">
                <li
                  class="filters-list__item-list-element"
                  v-for="idx in new Array(
                    loaderPlaceholderCountByType[filter.type]
                  )"
                  :key="idx"
                >
                  <ContentLoader :is-loaded="props.isLoaded"></ContentLoader>
                </li>
              </template>
              <template v-else>
                <li class="filters-list__item-list-element">
                  <AppRange
                    :min="filter.value.min ?? 0"
                    :max="filter.value.max ?? 100"
                    :min-start="filter.value.minValue"
                    :max-start="filter.value.maxValue"
                    ref="rangeFiltersRefs"
                    @change="(resObj) => rangeChangeHandler(filter, resObj)"
                  />
                </li>
              </template>
            </template>
            <template v-else>Wrong filter type</template>
          </ul>
        </li>
      </ul>
      <div class="filters-controls">
        <ButtonLink
          class="filters-controls__btn filters-controls__btn--reset"
          size="small"
          style-type="secondary-border"
          @click="resetHandler"
          >Reset</ButtonLink
        >
        <ButtonLink
          class="filters-controls__btn filters-controls__btn--apply"
          size="small"
          @click="applyChanges"
          >Apply</ButtonLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppCheckbox from '@/components/UI/AppCheckbox.vue'
import AppRange from '@/components/UI/AppRange.vue'
import ButtonLink from '@/components/UI/ButtonLink.vue'
import IconBase from '@/components/icons/IconBase.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import ContentLoader from '@/components/UI/ContentLoader.vue'
import { ref, reactive } from 'vue'
import { uuid } from 'vue3-uuid'

import {
  FilterTypes,
  type Filter,
  type IFilterCheckboxList,
  type IFilterRange
} from '@/models/Filter'
import { type IRangeResult } from '@/components/UI/AppRange.vue'

interface Props {
  filters: Filter[]
  type?: 'list' | 'dropdown'
  isLoaded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'list',
  isLoaded: true
})

interface IFilterChangeObj {
  filterName: string
  type: FilterTypes
}

type FilterCheckboxListChangeRes = boolean

type FilterRangeChangeRes = {
  minValue: number
  maxValue: number
}

interface IFilterCheckboxListChange extends IFilterChangeObj {
  type: FilterTypes.checkboxList
  itemId: number
  res: FilterCheckboxListChangeRes
}

interface IFilterRangeChange extends IFilterChangeObj {
  type: FilterTypes.range
  res: FilterRangeChangeRes
}

export type FilterChange = IFilterCheckboxListChange | IFilterRangeChange

const emit = defineEmits<{
  change: [FilterChange]
  apply: []
  reset: []
}>()

const loaderPlaceholderCountByType: Record<FilterTypes, number> = {
  checkboxList: 3,
  range: 1
}

const dropdownParams = reactive({
  dropdownIsOpen: false,
  controlId: uuid.v4(),

  filters: props.filters.reduce((acc, filter) => {
    const filterName = filter.name
    return {
      ...acc,
      [filterName]: {
        isOpen: true,
        controlId: uuid.v4()
      }
    }
  }, {}) as Record<string, { isOpen: boolean; controlId: string }>
})

const rangeFiltersRefs = ref<InstanceType<typeof AppRange>[] | null>(null)

function applyChanges() {
  emit('apply')
  dropdownFiltersMenuStateHandler()
}

function resetHandler() {
  emit('reset')
  rangeFiltersRefs.value?.forEach((ref) => {
    ref.reset()
  })
  dropdownFiltersMenuStateHandler()
}

function checkboxListChangeHandler(
  filter: IFilterCheckboxList,
  itemId: number,
  value: boolean
) {
  emit('change', {
    filterName: filter.name,
    type: FilterTypes.checkboxList,
    itemId: itemId,
    res: value
  })
}

function rangeChangeHandler(filter: IFilterRange, value: IRangeResult) {
  emit('change', {
    filterName: filter.name,
    type: FilterTypes.range,
    res: { minValue: value.min, maxValue: value.max }
  })
}

function dropdownFiltersMenuStateHandler() {
  dropdownParams.dropdownIsOpen = !dropdownParams.dropdownIsOpen
}

function dropdownFiltersMenuItemStateHandler(filterName: string) {
  dropdownParams.filters[filterName].isOpen =
    !dropdownParams.filters[filterName].isOpen
}
</script>

<style lang="scss">
.filters {
  position: relative;
  max-height: 100vh;
  overflow-y: auto;
  padding: 3px; //for focus outlines and shadows

  &--dropdown {
    padding: 0;
    overflow: visible;
  }

  &-dropdown-toggler {
    width: 100%;

    &.active {
      outline: 1px solid $primary;
      background-color: $border-gray;
    }
  }

  &-content {
    &.show {
      position: absolute;
      left: 0;
      right: 0;
      max-height: 100vh;
      padding: 1em;
      z-index: 10;
      overflow-y: auto;

      background-color: $white;
      outline: 1px solid $primary;
    }
  }

  &-list {
    margin-bottom: 50px;
    font-size: $body-font-size-md;

    &__item {
      &:not(:last-child) {
        margin-bottom: 30px;
      }

      &-toggler {
        display: flex;
        column-gap: 0.3em;
        width: 100%;
        margin-bottom: 20px;
        padding: 0.5em 0;
        border-radius: 0.5em;
        font-family: $font-clash-display;
        font-weight: 500;
        transition: background-color 0.1s ease-in-out;

        &:hover,
        &:focus {
          outline: none;
          background-color: rgba($primary, $alpha: 0.1);
        }

        &-icon {
          // width: 16px;
          // height: 16px;

          &.active {
            transform: rotate(180deg);
          }
        }
      }

      &-list {
        &-element {
          &:not(:last-child) {
            margin-bottom: 12px;
          }
        }
      }
    }
  }

  &-controls {
    &__btn {
      width: 100%;

      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }

  &-dropdown {
    position: relative;

    &__btn {
      width: 100%;

      &.open {
        outline: 1px solid $primary;
        background-color: $border-gray;
      }

      &--item {
        outline: 1px solid $primary;
      }
    }

    &__list {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 1;
      outline: 1px solid $primary;
      background-color: $light-gray;

      &-item {
        position: relative;

        &-element {
          padding: 12px;
        }
      }

      &.hidden {
        display: none;
      }
    }
  }
}
</style>
