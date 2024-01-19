<template>
  <div class="catalog">
    <div class="catalog-header">
      <div class="container">
        <h1 class="catalog-header__title">All products</h1>
      </div>
    </div>
    <div class="catalog-main">
      <div class="container catalog-main__container">
        <div class="catalog-aside" v-if="mq.lgPlus">
          <div class="catalog-filters">
            <CatalogFilters
              :filters="filters"
              :is-loaded="filtersIsLoaded"
              @change="filtersChangeHandler"
              @apply="applyFiltersHandler"
              @reset="resetFiltersHandler"
            />
          </div>
        </div>
        <div class="catalog-items">
          <div class="catalog-items__top">
            <div class="catalog-filters-dropdown" v-if="!mq.lgPlus">
              <CatalogFilters
                type="dropdown"
                :filters="filters"
                :is-loaded="filtersIsLoaded"
                @change="filtersChangeHandler"
                @apply="applyFiltersHandler"
                @reset="resetFiltersHandler"
              />
            </div>

            <div class="catalog-sorting">
              <span class="catalog-sorting__title">Sorting by:</span>
              <AppSelect
                class="catalog-sorting__select"
                :options="sortingItemsForSortingComponent"
                :selected-id="selectedSortId"
                :constant-header="!mq.lgPlus ? 'Sorting' : ''"
                ar-label="Sorting"
                @input="sortInputHandler"
              />
            </div>
          </div>
          <h2
            class="catalog-items__no-results"
            v-show="!preparedProducts.length && productsIsLoaded"
          >
            No results
          </h2>
          <ul class="catalog-items-list">
            <template v-if="!productsIsLoaded">
              <li
                class="catalog-items-list__item"
                v-for="idx in new Array(PAGE_SIZE)"
                :key="idx"
              >
                <ProductCard
                  class="catalog-items-list__item-card"
                  :id="0"
                  title="Title"
                  :price="100"
                  :is-loaded="productsIsLoaded"
                  title-tag="h2"
                />
              </li>
            </template>
            <template v-else>
              <li
                class="catalog-items-list__item"
                v-for="product of paginatedProducts"
                :key="product.id"
              >
                <ProductCard
                  class="catalog-items-list__item-card"
                  :id="product.id"
                  :title="product.name"
                  :price="product.price"
                  title-tag="h2"
                />
              </li>
            </template>
          </ul>
          <div class="catalog-items__more" v-show="currentPage !== maxPages">
            <ButtonLink
              class="catalog-items__more-btn"
              type="button"
              style-type="secondary"
              :is-wide-on-mobile="true"
              @click="loadMoreHandler"
              >Load more</ButtonLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CatalogFilters, {
  type FilterChange
} from '@/components/CatalogFilters.vue'
import ProductCard from '@/components/ProductCard.vue'
import ButtonLink from '@/components/UI/ButtonLink.vue'
import AppSelect from '@/components/UI/AppSelect.vue'
import { ref, computed, reactive, inject, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/avion-api.js'

import {
  FilterTypes,
  type Filter,
  type IFilterRangeValue
} from '@/models/Filter'
import type IProduct from '@/models/Product'
import { SortingName, type ISorting } from '@/models/Sorting'

const mq: any = inject('mq')

const router = useRouter()
const route = useRoute()

const filters = reactive<Filter[]>([
  {
    title: 'Price',
    name: 'price',
    type: FilterTypes.range,
    value: {
      min: undefined,
      max: undefined,
      minValue: undefined,
      maxValue: undefined
    }
  },
  {
    title: 'Product type',
    name: 'type',
    type: FilterTypes.checkboxList,
    value: [],
    checkedIds: new Set<number>()
  },
  {
    title: 'Designer',
    name: 'designer',
    type: FilterTypes.checkboxList,
    value: [],
    checkedIds: new Set<number>()
  }
])

const filtersIsLoaded = ref(false)

interface IDefaultFiltersState {
  [filterName: string]: Set<number> | IFilterRangeValue
}

const defaultFiltersStates: IDefaultFiltersState = {}

filtersInit().then(() => {
  defaultFiltersStatesInit()

  if (!route.query.filtersEdited) {
    parseUrlToFilters()
    filterStatesWriteToUrl(false)
  } else {
    filtersResetValues()
    parseUrlToFilters()
  }

  filtersIsLoaded.value = true
  preparingProducts()
})

async function filtersInit() {
  const data = await api.getCatalogFilters()

  if (!data) return

  data.forEach((dataFilter) => {
    const filter = filters.find((item) => item.name === dataFilter.name)

    if (!filter) return
    filter.value = dataFilter.value
  })
}

function parseUrlToFilters() {
  Object.entries(route.query).forEach(([key, value]) => {
    if (key.includes('filter-')) {
      const filterName = key.split('-')[1]
      const filter = filters.find((filter) => filter.name === filterName)
      if (!filter) return

      const valueString = value?.toString()
      if (!valueString) return

      switch (filter.type) {
        case FilterTypes.checkboxList: {
          valueString.split('-').forEach((val) => filter.checkedIds.add(+val))

          break
        }

        case FilterTypes.range: {
          const values = valueString.split('-')
          filter.value.minValue = +values[0]
          filter.value.maxValue = +values[1]

          break
        }

        default: {
          throw new Error('Filter type not defined!')
        }
      }
    }
  })
}

function defaultFiltersStatesInit() {
  filters.forEach((filter) => {
    switch (filter.type) {
      case FilterTypes.checkboxList: {
        defaultFiltersStates[filter.name] = new Set<number>([
          ...filter.checkedIds
        ])

        break
      }

      case FilterTypes.range: {
        defaultFiltersStates[filter.name] = { ...filter.value }

        break
      }

      default: {
        throw new Error('Filter type not defined!')
      }
    }
  })
}

function filtersInitFromDefaultFilters() {
  if (Object.keys(defaultFiltersStates).length === 0) return
  else {
    Object.entries(defaultFiltersStates).forEach(([key, value]) => {
      const filter = filters.find((filter) => filter.name === key)
      if (!filter) return

      switch (filter.type) {
        case FilterTypes.checkboxList: {
          filter.checkedIds = new Set<number>([
            ...(value as typeof filter.checkedIds)
          ])

          break
        }

        case FilterTypes.range: {
          const valueRange = { ...(value as typeof filter.value) }
          filter.value.minValue = valueRange.minValue
          filter.value.maxValue = valueRange.maxValue

          break
        }

        default: {
          throw new Error('Filter type not defined!')
        }
      }
    })
  }
}

function filterStatesWriteToUrl(isFiltersEdited = true) {
  const resultObj: Record<string, any> = {
    filtersEdited: isFiltersEdited || undefined
  }

  filters.forEach((filter) => {
    const filterUrlTemplate = `filter-${filter.name}`

    switch (filter.type) {
      case FilterTypes.checkboxList: {
        const checkedIdsArray = [...filter.checkedIds]

        if (checkedIdsArray.length > 0)
          resultObj[filterUrlTemplate] = checkedIdsArray.join('-')
        else resultObj[filterUrlTemplate] = undefined

        break
      }

      case FilterTypes.range: {
        if (filter.value.minValue && filter.value.maxValue) {
          resultObj[filterUrlTemplate] = [
            filter.value.minValue,
            filter.value.maxValue
          ].join('-')
        } else {
          resultObj[filterUrlTemplate] = undefined
        }

        break
      }

      default: {
        throw new Error('Filter type not defined!')
      }
    }
  })

  replaceWithQuery(resultObj)
}

function filtersRemoveFromUrl() {
  const removeNamesObj: Record<string, undefined> = {}

  Object.keys(route.query).forEach((key) => {
    if (key.includes('filter-')) {
      const filterName = key.split('-')[1]
      removeNamesObj[filterName] = undefined
    }
  })

  replaceWithQuery({ filtersEdited: undefined, ...removeNamesObj })
}

function filtersResetValues() {
  filters.forEach((filter) => {
    switch (filter.type) {
      case FilterTypes.checkboxList: {
        filter.checkedIds.clear()
        break
      }

      case FilterTypes.range: {
        filter.value.minValue = undefined
        filter.value.maxValue = undefined
        break
      }

      default: {
        throw new Error('Filter type not defined!')
      }
    }
  })
}

function applyFiltersHandler() {
  filterStatesWriteToUrl()
  preparingProducts()
}

function resetFiltersHandler() {
  filtersRemoveFromUrl()
  filtersResetValues()
  filtersInitFromDefaultFilters()
  filterStatesWriteToUrl(false)
  preparingProducts()
}

function filtersChangeHandler(value: FilterChange) {
  const filter = filters.find((filter) => filter.name === value.filterName)
  if (!filter) return

  switch (filter.type) {
    case FilterTypes.checkboxList: {
      if (value.res === true) filter.checkedIds.add(value.itemId)
      else if (value.res === false) filter.checkedIds.delete(value.itemId)

      break
    }

    case FilterTypes.range: {
      if (typeof value.res != 'boolean') {
        filter.value.minValue = value.res.minValue
        filter.value.maxValue = value.res.maxValue
      }

      break
    }
  }
}

const sorting = reactive<ISorting[]>([
  {
    id: 1,
    title: 'Name (A-Z)',
    name: SortingName.name,
    reverse: false
  },
  {
    id: 2,
    title: 'Name (Z-A)',
    name: SortingName.name,
    reverse: true
  },
  {
    id: 3,
    title: 'Price (Low to High)',
    name: SortingName.price,
    reverse: false
  },
  {
    id: 4,
    title: 'Price (High to Low)',
    name: SortingName.price,
    reverse: true
  }
])

// selecting sorting by id
const defaultSortId = 1
const selectedSortId = ref(selectedSortIdInit())

const selectedSortItem = computed<ISorting>(() => {
  return sorting.find((item) => item.id === selectedSortId.value) ?? sorting[0]
})

const sortingItemsForSortingComponent = computed(() => {
  return sorting.map(({ id, title }) => ({
    id,
    name: title
  }))
})

function selectedSortIdInit() {
  const orderId = +!route.query.orderId
  if (orderId) {
    if (!sorting.some((item) => item.id === orderId)) {
      return defaultSortId
    } else {
      return orderId
    }
  } else return defaultSortId
}

function sortInputHandler(id: number) {
  selectedSortId.value = id
  if (id === defaultSortId) replaceWithQuery({ orderId: undefined })
  else replaceWithQuery({ orderId: id })
  preparingProducts()
}

const preparedProducts = ref<IProduct[]>([])

const productsIsLoaded = ref(false)

async function preparingProducts() {
  const data = await api.getPreparedProductsWithFiltersInfo(
    filters,
    selectedSortItem.value
  )

  if (!data) return
  //  check filtersInfo
  if (Object.keys(data.filtersInfo).length != 0) {
    Object.keys(data.filtersInfo).forEach((filterName) => {
      const filter = filters.find((filter) => filter.name === filterName)
      if (!filter) return

      switch (filter.type) {
        case FilterTypes.range: {
          Object.keys(data.filtersInfo[filterName]).forEach(
            (filtersInfoItem) => {
              if (data.filtersInfo[filterName][filtersInfoItem]) {
                filter.value[filtersInfoItem] ??=
                  data.filtersInfo[filterName][filtersInfoItem]
              }
            }
          )

          break
        }

        default: {
          throw new Error('Filter type not defined!')
        }
      }
    })
  }

  preparedProducts.value = data.products
  productsIsLoaded.value = true

  currentPage.value = 1
}

function replaceWithQuery(query: {}) {
  router.replace({
    query: {
      ...route.query,
      ...query
    }
  })
}

const PAGE_SIZE = 6

const currentPage = ref(1)

const maxPages = computed(() => {
  let res = Math.ceil(preparedProducts.value.length / PAGE_SIZE)
  return res != 0 ? res : 1
})

const paginatedProducts = computed(() => {
  const start = 0
  let end = 0
  if (currentPage.value < maxPages.value) {
    end = currentPage.value * PAGE_SIZE
  } else {
    end = preparedProducts.value.length
  }
  return preparedProducts.value.slice(start, end)
})

async function loadMoreHandler() {
  currentPage.value++

  await nextTick()

  const elemIdx = (currentPage.value - 1) * PAGE_SIZE
  const firstOfNewItems = document.querySelectorAll(
    '.catalog-items-list__item-card'
  )[elemIdx] as HTMLLinkElement

  firstOfNewItems.focus()
}
</script>

<style lang="scss" scoped>
.catalog {
  &-header {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 150px;
    background-image: url('/img/catalog-view/header-390w.jpg');
    background-size: cover;
    background-repeat: no-repeat;

    @media screen and (min-width: $sm) {
      background-position: 50% 0%;
      background-image: url('/img/catalog-view/header-768w.jpg');
    }

    @media screen and (min-width: $md) {
      background-image: url('/img/catalog-view/header-1440w.jpg');
    }

    @media screen and (min-width: $lg) {
      justify-content: flex-start;
    }

    &__title {
      margin-bottom: 32px;
      font-size: $h1-font-size-lg;
      color: $white;

      @media screen and (min-width: $lg) {
        margin-bottom: 36px;
      }
    }
  }

  &-main__container {
    display: flex;
    padding-top: 30px;
    padding-bottom: 30px;
    column-gap: 30px;

    @media screen and (min-width: $lg) {
      padding-top: 35px;
      padding-bottom: 35px;
    }
  }

  &-aside {
    width: 25%;
  }

  &-filters {
    position: sticky;
    top: 15px;
  }

  &-sorting {
    display: flex;
    align-items: center;
    column-gap: 16px;
    width: 100%;

    @media screen and (min-width: $lg) {
      width: auto;
    }

    &__title {
      display: none;
      font-size: $body-font-size-sm;
      font-weight: 500;

      @media screen and (min-width: $lg) {
        display: inline;
        text-wrap: nowrap;
      }
    }

    &__select {
      background-color: gray;
      width: 100%;
    }
  }

  $list-column-gap: 16px;
  @media screen and (min-width: $lg) {
    $list-column-gap: 20px;
  }

  &-items {
    flex-grow: 1;

    @media screen and (min-width: $lg) {
      width: 75%;
    }

    &__top {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      row-gap: 20px;

      @media screen and (min-width: $lg) {
        flex-direction: row;
      }
    }

    &__more {
      margin-top: 40px;
      text-align: center;

      @media screen and (min-width: $lg) {
        margin-top: 32px;
      }
    }

    &__no-results {
      text-align: center;
      margin-top: 30px;

      @media screen and (min-width: $lg) {
        text-align: left;
        margin-top: 0;
      }
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
      column-gap: $list-column-gap;
      row-gap: 20px;
      margin-top: 40px;

      @media screen and (min-width: $lg) {
        margin-top: 30px;
        row-gap: 35px;
      }

      &__item {
        width: 100%;
        max-width: calc((100% - $list-column-gap) / 2);
        flex-grow: 1;
        transition: 0.1s ease-in-out;

        @media screen and (min-width: $sm) {
          max-width: calc((100% - $list-column-gap * 2) / 3);
        }
      }
    }
  }
}
</style>
