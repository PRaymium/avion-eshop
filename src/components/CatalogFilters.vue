<template>
  <div class="filters" aria-label="Filters" v-if="props.type === 'list'">
    <ul class="filters-list" v-for="filter of filtersRef" :key="filter.name">
      <li class="filters-list__title">
        {{ filter.title }}
      </li>
      <template v-if="filter.type === 'checkboxList'">
        <li
          class="filters-list__item"
          v-for="item of filter.items"
          :key="item.id"
        >
          <AppCheckbox
            :label="item.name"
            :name="item.name"
            :is-checked="item.isChecked"
            @change="(state) => checkboxListChangeHandler(state, item)"
          />
        </li>
      </template>

      <template v-else-if="filter.type === 'range'">
        <li class="filters-list__item">
          <AppRange
            :min="filter.params.min"
            :max="filter.params.max"
            :min-start="filter.params.minValue"
            :max-start="filter.params.maxValue"
            :step="filter.params.step"
            @change="(resObj) => rangeChangeHandler(resObj, filter)"
          />
        </li>
      </template>
      <template v-else> Error </template>
    </ul>
    <ButtonLink
      class="filters__btn filters__btn--reset"
      size="small"
      style-type="secondary-border"
      @click="resetHandler"
      >Reset</ButtonLink
    >
    <ButtonLink
      class="filters__btn filters__btn--apply"
      size="small"
      @click="applyChanges"
      >Apply</ButtonLink
    >
  </div>
  <div
    class="filters-dropdown"
    aria-label="Filters"
    v-else-if="props.type === 'dropdown'"
  >
    <ButtonLink
      :class="[
        'filters-dropdown__btn',
        { open: dropdownParams.dropdownIsOpen }
      ]"
      style-type="secondary"
      size="small"
      :icon-visible="true"
      :icon-is-active="dropdownParams.dropdownIsOpen"
      :aria-expanded="dropdownParams.dropdownIsOpen"
      :aria-controls="dropdownParams.controlId"
      @click="dropdownFiltersMenuStateHandler"
      >Filters</ButtonLink
    >
    <ul
      :class="[
        'filters-dropdown__list',
        'filters-dropdown__list--menu',
        { hidden: !dropdownParams.dropdownIsOpen }
      ]"
      :id="dropdownParams.controlId"
    >
      <li
        class="filters-dropdown__list-item"
        v-for="filter of filtersRef"
        :key="filter.name"
      >
        <ButtonLink
          :class="[
            'filters-dropdown__btn',
            'filters-dropdown__btn--item',
            { open: dropdownParams.filters[filter.name].isOpen }
          ]"
          style-type="secondary"
          size="small"
          :icon-visible="true"
          :icon-is-active="dropdownParams.filters[filter.name].isOpen"
          :aria-expanded="dropdownParams.filters[filter.name].isOpen"
          :aria-controls="dropdownParams.filters[filter.name].controlId"
          @click="dropdownFiltersMenuItemStateHandler(filter)"
          >{{ filter.title }}</ButtonLink
        >
        <ul
          :class="[
            'filters-dropdown__list',
            { hidden: !dropdownParams.filters[filter.name].isOpen }
          ]"
          :id="dropdownParams.filters[filter.name].controlId"
        >
          <template v-if="filter.type === 'checkboxList'">
            <li
              class="filters-dropdown__list-item-element"
              v-for="item of filter.items"
              :key="item.id"
            >
              <AppCheckbox
                :label="item.name"
                :name="item.name"
                :is-checked="item.isChecked"
                @change="(state) => checkboxListChangeHandler(state, item)"
              />
            </li>
          </template>

          <template v-else-if="filter.type === 'range'">
            <li class="filters-dropdown__list-item-element">
              <AppRange
                :min="filter.params.min"
                :max="filter.params.max"
                :min-start="filter.params.minValue"
                :max-start="filter.params.maxValue"
                :step="filter.params.step"
                @change="(resObj) => rangeChangeHandler(resObj, filter)"
              />
            </li>
          </template>
          <template v-else> Error </template>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import AppCheckbox from '../components/UI/AppCheckbox.vue'
import AppRange from '../components/UI/AppRange.vue'
import ButtonLink from './UI/ButtonLink.vue'
import { ref, reactive, watch, onMounted } from 'vue'
import { uuid } from 'vue3-uuid'
import { useRoute, useRouter } from 'vue-router'
import { useReplaceWithQuery } from '@/composables/asyncReplaceWithQuery.js'

const props = defineProps({
  filters: {
    type: Array,
    required: true
  },

  filtersValueUpdate: {
    type: Boolean,
    default: false
  },

  defaultFiltersState: {
    type: Object,
    default: () => {}
  },

  type: {
    type: String,
    default: 'list',
    validator(value) {
      return ['list', 'dropdown'].includes(value)
    }
  }
})

const emit = defineEmits({
  change: null,
  filtersUpdated: null
})

const route = useRoute()
const router = useRouter()

const filtersRef = ref(props.filters)

const dropdownParams = reactive({
  dropdownIsOpen: false,
  controlId: uuid.v4(),
  filters: filtersRef.value.reduce(
    (obj, filter) =>
      (obj[filter.name] = {
        isOpen: false,
        controlId: uuid.v4()
      }),
    {}
  )
})

checkUrlFiltersEdited()

watch(
  () => props.filtersValueUpdate,
  (value) => {
    if (value) {
      filtersRef.value = props.filters
      emit('filtersUpdated')
    }
  }
)

function checkUrlFiltersEdited() {
  parseUrlToFilters()

  if (!route.query.filtersEdited) filtersInitFromDefaultFilters()
}

function parseUrlToFilters() {
  Object.entries(route.query).forEach(([key, value]) => {
    if (key.includes('filter-')) {
      const filterName = key.split('-')[1]
      const filter = filtersRef.value.find(
        (filter) => filter.name === filterName
      )

      switch (filter.type) {
        case 'checkboxList': {
          value.split('-').forEach((val) => {
            filter.items.find((item) => (item.id = +val)).isChecked = true
          })
          break
        }

        case 'range': {
          const values = value.split('-')
          filter.params.minValue = +values[0]
          filter.params.maxValue = +values[1]
          break
        }

        default: {
          throw new Error('Filter type not defined!')
        }
      }
    }
  })
}

function filtersInitFromDefaultFilters() {
  if (Object.keys(props.defaultFiltersState).length === 0) return
  else {
    Object.entries(props.defaultFiltersState).forEach(([key, values]) => {
      const filter = filtersRef.value.find((filter) => filter.name === key)

      switch (filter.type) {
        case 'checkboxList': {
          values.forEach((defaultFilterValue) => {
            filter.items.find(
              (item) => item.id === defaultFilterValue
            ).isChecked = true
          })
          break
        }

        case 'range': {
          Object.entries(values).forEach(([rangeKey, rangeValue]) => {
            filter.params[rangeKey] = rangeValue
          })
          break
        }

        default: {
          throw new Error('Filter type not defined!')
        }
      }
    })
  }
}

function filterStateWriteToUrl(isFiltersEdited = true) {
  let resultObj = {
    filtersEdited: isFiltersEdited ? isFiltersEdited : undefined
  }

  filtersRef.value.forEach((filter) => {
    switch (filter.type) {
      case 'checkboxList': {
        const checkedIds = filter.items
          .filter((item) => item.isChecked)
          .map(({ id }) => id)

        if (checkedIds.length != 0) {
          resultObj[`filter-${filter.name}`] = checkedIds.join('-')
        } else resultObj[`filter-${filter.name}`] = undefined

        break
      }

      case 'range': {
        if (filter.params.minValue && filter.params.maxValue) {
          resultObj[`filter-${filter.name}`] = [
            filter.params.minValue,
            filter.params.maxValue
          ].join('-')
        } else {
          resultObj[`filter-${filter.name}`] = undefined
        }

        break
      }

      default: {
        throw new Error('Filter type not defined!')
      }
    }
  })

  //useReplaceWithQuery(resultObj)
  replaceWithQuery(resultObj)
}

function filtersRemoveFromUrl() {
  const removeNamesObj = {}

  Object.keys(route.query).forEach((key) => {
    if (key.includes('filter-')) {
      const filterName = key.split('-')[1]
      removeNamesObj[filterName] = undefined
    }
  })

  replaceWithQuery({ filtersEdited: undefined, ...removeNamesObj })
}

function filtersResetValues() {
  filtersRef.value.forEach((filter) => {
    switch (filter.type) {
      case 'checkboxList': {
        filter.items.forEach((item) => (item.isChecked = false))
        break
      }

      case 'range': {
        filter.params.minValue = undefined
        filter.params.maxValue = undefined
        break
      }

      default: {
        throw new Error('Filter type not defined!')
      }
    }
  })
}

function applyChanges(event, isInit = false) {
  if (isInit) {
    filterStateWriteToUrl(false)
  } else {
    filterStateWriteToUrl()
  }

  emit('change', filtersRef.value)
}

function resetHandler() {
  filtersRemoveFromUrl()
  filtersResetValues()
  filtersInitFromDefaultFilters()
  applyChanges(null, true)
}

function checkboxListChangeHandler(state, item) {
  item.isChecked = state
}

function rangeChangeHandler(resObj, filter) {
  filter.params.minValue = resObj.min
  filter.params.maxValue = resObj.max
}

function dropdownFiltersMenuStateHandler() {
  dropdownParams.dropdownIsOpen = !dropdownParams.dropdownIsOpen
  // if (dropdownParams.dropdownIsOpen === false) {
  //   Object.keys(dropdownParams.filters).forEach((key) => {
  //     dropdownParams.filters[key].isOpen = false
  //   })
  // }
}

function dropdownFiltersMenuItemStateHandler(filter) {
  // if (dropdownParams.filters[filter].isOpen  === false) {
  //   filtersWithMeta.value.filters.forEach((filter) => (filter.isOpen = false))
  // }
  dropdownParams.filters[filter].isOpen = !dropdownParams.filters[filter].isOpen
}

function replaceWithQuery(query) {
  router.replace({
    query: {
      ...route.query,
      ...query
    }
  })
}

onMounted(() => {
  applyChanges(null, true)
})
</script>

<style lang="scss">
.filters {
  max-height: 100vh;
  overflow: auto;
  padding: 0 3px; //for focus outlines and shadows

  &__btn {
    width: 100%;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  &-list {
    font-size: $body-font-size-md;
    &:not(:last-child) {
      margin-bottom: 50px;
    }

    &__title {
      margin-bottom: 20px;
      font-family: $font-clash-display;
      line-height: 140%;
      font-weight: 500;
    }

    &__item {
      &:not(:last-child) {
        margin-bottom: 12px;
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
