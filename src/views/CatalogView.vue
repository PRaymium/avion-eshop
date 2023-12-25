<template>
  <div class="catalog">
    <div class="catalog-header">
      <div class="container">
        <h1 class="catalog-header__title">All products</h1>
      </div>
    </div>
    <div class="catalog-main">
      <div class="container catalog-main__container">
        <div class="catalog-aside" v-if="mq.mdPlus">
          <div class="catalog-filters">
            <ul
              class="catalog-filters-list"
              v-for="filter of filtersWithMeta.filters"
              :key="filter.id"
              aria-label="Filters"
            >
              <li class="catalog-filters-list__title">
                {{ filter.title }}
              </li>
              <li
                class="catalog-filters-list__item"
                v-for="item of filter.items"
                :key="item.id"
              >
                <AppCheckbox
                  :label="item.name"
                  :name="item.name"
                  :is-checked="isSelectedFilterChecking(filter.id, item.id)"
                  @change="filterChangeHandler($event, filter.id, item.id)"
                />
              </li>
            </ul>
          </div>
        </div>
        <div class="catalog-items">
          <div class="catalog-items__top">
            <div class="catalog-filters-dropdown" v-if="!mq.mdPlus">
              <ButtonLink
                :class="[
                  'catalog-filters-dropdown__btn',
                  { open: filtersWithMeta.dropdownIsOpen }
                ]"
                style-type="secondary"
                size="small"
                :icon-visible="true"
                :icon-is-active="filtersWithMeta.dropdownIsOpen"
                :aria-expanded="filtersWithMeta.dropdownIsOpen"
                :aria-controls="filtersWithMeta.controlId"
                @click="dropdownFiltersMenuStateHandler"
                >Filters</ButtonLink
              >
              <ul
                :class="[
                  'catalog-filters-dropdown__list',
                  'catalog-filters-dropdown__list--menu',
                  { hidden: !filtersWithMeta.dropdownIsOpen }
                ]"
                :id="filtersWithMeta.controlId"
              >
                <li
                  class="catalog-filters-dropdown__list-item"
                  v-for="filter of filtersWithMeta.filters"
                  :key="filter.id"
                >
                  <ButtonLink
                    :class="[
                      'catalog-filters-dropdown__btn',
                      'catalog-filters-dropdown__btn--item',
                      { open: filter.isOpen }
                    ]"
                    style-type="secondary"
                    size="small"
                    :icon-visible="true"
                    :icon-is-active="filter.isOpen"
                    :aria-expanded="filter.isOpen"
                    :aria-controls="filter.controlId"
                    @click="dropdownFiltersMenuItemStateHandler(filter)"
                    >{{ filter.title }}</ButtonLink
                  >
                  <ul
                    :class="[
                      'catalog-filters-dropdown__list',
                      { hidden: !filter.isOpen }
                    ]"
                    :id="filter.controlId"
                  >
                    <li
                      class="catalog-filters-dropdown__list-item"
                      v-for="item of filter.items"
                      :key="item.id"
                    >
                      <AppCheckbox
                        class="catalog-filters-dropdown__list-item-element"
                        :label="item.name"
                        :name="item.name"
                        :is-checked="
                          isSelectedFilterChecking(filter.id, item.id)
                        "
                        @change="
                          filterChangeHandler($event, filter.id, item.id)
                        "
                      />
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="catalog-sorting">
              <span class="catalog-sorting__title">Sorting by:</span>
              <AppSelect
                class="catalog-sorting__select"
                :options="itemsArrayForSorting"
                :selected-id="selectedSortId"
                :constant-header="!mq.mdPlus ? 'Sorting' : ''"
                aria-label="Sorting"
                @input="sortInputHandler"
              />
            </div>
          </div>
          <h2
            class="catalog-items__no-results"
            v-show="!preparedProducts.length"
          >
            No results
          </h2>
          <ul class="catalog-items-list">
            <li
              class="catalog-items-list__item"
              v-for="product of paginatedData"
              :key="product.id"
            >
              <router-link
                :to="{ name: 'product', params: { id: product.id } }"
                class="catalog-items-list__item-link"
              >
                <ProductPicture
                  class="catalog-items-list__item-picture"
                  :product-id="product.id"
                  :title="product.name"
                />
                <h2 class="catalog-items-list__item-title">
                  {{ product.name }}
                </h2>
                <span class="catalog-items-list__item-price"
                  >£{{ product.price }}</span
                >
              </router-link>
            </li>
          </ul>
          <div class="catalog-items__more" v-show="currentPage !== maxPages">
            <ButtonLink
              class="catalog-items__more-btn"
              type="button"
              style-type="secondary"
              :is-wide-on-mobile="true"
              @click="currentPage++"
              >Load more</ButtonLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonLink from '../components/UI/ButtonLink.vue'
import AppCheckbox from '../components/UI/AppCheckbox.vue'
import AppSelect from '../components/UI/AppSelect.vue'
import ProductPicture from '../components/ProductPicture.vue'
import { ref, computed, inject, watch } from 'vue'
import { uuid } from 'vue3-uuid'
import { useRouter, useRoute } from 'vue-router'
import api from '@/api/avion-api.js'

const PAGE_SIZE = 6

const mq = inject('mq')
const router = useRouter()
const route = useRoute()

const products = ref([])
const preparedProducts = ref([])

const currentPage = ref(1)

const filters = ref([
  {
    id: 1,
    title: 'Product type',
    value: 'type',
    items: [
      {
        id: 1,
        name: 'Furniture'
      },
      {
        id: 2,
        name: 'Light fittings'
      },
      {
        id: 3,
        name: 'Accessories'
      }
    ]
  },
  {
    id: 2,
    title: 'Designer',
    value: 'designer',
    items: [
      {
        id: 1,
        name: 'Robert Smith'
      },
      {
        id: 2,
        name: 'Liam Gallagher'
      },
      {
        id: 3,
        name: 'Biggie Smalls'
      },
      {
        id: 4,
        name: 'Thom Yorke'
      }
    ]
  }
])

const filtersWithMeta = ref({
  dropdownIsOpen: false,
  controlId: uuid.v4(),
  filters: filters.value.map((filter) => {
    return {
      isOpen: false,
      controlId: uuid.v4(),
      ...filter
    }
  })
})

// selecting filters - filterId: [itemsId]
const selectedFilters = ref({})

selectedFilters.value = selectedFiltersInit()

const sorting = ref([
  {
    id: 1,
    name: 'Name (A-Z)',
    value: 'name',
    reverse: false
  },
  {
    id: 2,
    name: 'Name (Z-A)',
    value: 'name',
    reverse: true
  },
  {
    id: 3,
    name: 'Price (Low to High)',
    value: 'price',
    reverse: false
  },
  {
    id: 4,
    name: 'Price (High to Low)',
    value: 'price',
    reverse: true
  }
])

// selecting sorting by id
const defaultSortId = 1
const selectedSortId = ref(selectedSortIdInit())

api.getProducts().then((data) => {
  products.value = data
  preparingProducts()
})

const selectedSortItem = computed(() => {
  return sorting.value.find((item) => item.id === selectedSortId.value)
})

const itemsArrayForSorting = computed(() => {
  return sorting.value.map(({ id, name }) => ({
    id,
    name
  }))
})

const maxPages = computed(() => {
  let res = Math.ceil(preparedProducts.value.length / PAGE_SIZE)
  return res != 0 ? res : 1
})

const paginatedData = computed(() => {
  const start = 0
  let end = 0
  if (currentPage.value < maxPages.value) {
    end = currentPage.value * PAGE_SIZE
  } else {
    end = preparedProducts.value.length
  }
  return preparedProducts.value.slice(start, end)
})

function selectedFiltersInit() {
  let data = selectedFilters.value
  filters.value.forEach((filter) => {
    data[filter.id] ??= []
  })

  data = selectedFiltersUrlParsing(data)

  return data
}

function selectedFiltersUrlParsing(selectedFiltersObj) {
  let filtersObj = selectedFiltersObj

  if (!route.query.filtersEdited) {
    writeSelectedFilterToUrl(-1, true, filtersObj)
  } else {
    Object.entries(route.query).forEach(([key, value]) => {
      if (key.includes('filter-')) {
        const filterId = +key.split('-')[1]
        filtersObj[filterId] = value.split('-').map((val) => +val)
      }
    })
  }

  return filtersObj
}

function isSelectedFilterChecking(filterId, itemId) {
  return selectedFilters.value[filterId].includes(itemId)
}

function dropdownFiltersMenuStateHandler() {
  filtersWithMeta.value.dropdownIsOpen = !filtersWithMeta.value.dropdownIsOpen
  if (filtersWithMeta.value.dropdownIsOpen === false) {
    filtersWithMeta.value.filters.forEach((filter) => (filter.isOpen = false))
  }
}

function dropdownFiltersMenuItemStateHandler(filter) {
  if (filter.isOpen === false) {
    filtersWithMeta.value.filters.forEach((filter) => (filter.isOpen = false))
  }
  filter.isOpen = !filter.isOpen
}

function filterChangeHandler(state, filterId, itemId) {
  if (state) {
    selectedFilters.value[filterId].push(itemId)
  } else {
    const itemIdx = selectedFilters.value[filterId].indexOf(itemId)
    selectedFilters.value[filterId].splice(itemIdx, 1)
  }
  writeSelectedFilterToUrl(filterId)
}

async function writeSelectedFilterToUrl(
  filterId,
  writeAll = false,
  selectedFiltersObj = selectedFilters.value
) {
  let filtersIdsToWrite = []
  if (!writeAll && filterId >= 0) {
    filtersIdsToWrite.push(filterId)
    await replaceWithQuery({ filtersEdited: true })
  } else if (writeAll) {
    filtersIdsToWrite = filters.value.map((filter) => filter.id)
  } else return

  let resultObj = {}
  filtersIdsToWrite.forEach((id) => {
    resultObj[`filter-${id}`] = selectedFiltersObj[id].length
      ? selectedFiltersObj[id].join('-')
      : undefined
  })

  replaceWithQuery(resultObj)
}

function filteringProducts(products) {
  let data = products
  Object.entries(selectedFilters.value).forEach(([key, value]) => {
    if (!value.length) return
    const filter = filters.value.find((filter) => filter.id == key)
    const filterItems = filter.items.filter((item) => value.includes(item.id))
    data = data.filter((product) =>
      filterItems.some((item) => item.name === product[filter.value])
    )
  })
  return data
}

function selectedSortIdInit() {
  if (route.query.orderId) {
    if (!sorting.value.some((item) => item.id === +route.query.orderId)) {
      return defaultSortId
    } else {
      return +route.query.orderId
    }
  } else return defaultSortId
}

function sortInputHandler(id) {
  selectedSortId.value = id
  if (id === defaultSortId) replaceWithQuery({ orderId: undefined })
  else replaceWithQuery({ orderId: id })
}

function sortingProducts(products) {
  let data = products
  data.sort((a, b) => {
    if (selectedSortItem.value.value === 'name') {
      if (a.name > b.name) return 1
      else if (a.name < b.name) return -1
      else return 0
    } else if (selectedSortItem.value.value === 'price')
      return a.price - b.price
  })

  if (selectedSortItem.value.reverse) data.reverse()

  return data
}

async function replaceWithQuery(query) {
  await router.replace({
    query: {
      ...route.query,
      ...query
    }
  })
}

function preparingProducts() {
  let data = products.value
  data = filteringProducts(data)
  data = sortingProducts(data)
  currentPage.value = 1
  preparedProducts.value = data
}

watch(
  () => [selectedSortItem.value, selectedFilters.value],
  () => {
    preparingProducts()
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.catalog {
  &-header {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 150px;
    background-image: url('img/catalog-view/header-390w.jpg');
    background-size: cover;
    background-repeat: no-repeat;

    @media screen and (min-width: $sm) {
      background-position: 50% 0%;
      background-image: url('img/catalog-view/header-768w.jpg');
    }

    @media screen and (min-width: $md) {
      background-image: url('img/catalog-view/header-1440w.jpg');
      justify-content: flex-start;
    }

    &__title {
      margin-bottom: 32px;
      font-size: $h1-font-size-lg;
      color: $white;

      @media screen and (min-width: $md) {
        margin-bottom: 36px;
      }
    }
  }

  &-main__container {
    display: flex;
    padding-top: 30px;
    padding-bottom: 30px;
    column-gap: 20px;

    @media screen and (min-width: $md) {
      padding-top: 35px;
      padding-bottom: 35px;
    }
  }

  &-aside {
    width: 25%;
  }

  &-filters {
    position: sticky;
    top: 35px;
    max-height: 100vh;
    overflow: auto;
    padding-left: 3px; //for checkbox focus outline

    &-list {
      font-size: $body-font-size-md;
      &:not(:last-child) {
        margin-bottom: 50px;
      }

      &__title {
        margin-bottom: 20px;
        font-family: $font-clash-display;
        line-height: 140%;
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

  &-sorting {
    display: flex;
    align-items: center;
    column-gap: 16px;
    width: 100%;

    @media screen and (min-width: $md) {
      width: auto;
    }

    &__title {
      display: none;
      font-size: $body-font-size-sm;

      @media screen and (min-width: $md) {
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
  @media screen and (min-width: $md) {
    $list-column-gap: 20px;
  }

  &-items {
    flex-grow: 1;

    @media screen and (min-width: $md) {
      width: 75%;
    }

    &__top {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      row-gap: 20px;

      @media screen and (min-width: $md) {
        flex-direction: row;
      }
    }

    &__more {
      margin-top: 40px;
      text-align: center;

      @media screen and (min-width: $md) {
        margin-top: 32px;
      }
    }

    &__no-results {
      text-align: center;
      margin-top: 30px;

      @media screen and (min-width: $md) {
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

      @media screen and (min-width: $md) {
        margin-top: 30px;
        row-gap: 35px;
      }

      &__item {
        max-width: calc((100% - $list-column-gap) / 2);
        flex-grow: 1;
        transition: 0.1s ease-in-out;

        @media screen and (min-width: $sm) {
          max-width: calc((100% - $list-column-gap * 2) / 3);
        }

        &-link {
          display: block;
          transition: 0.1s ease-in-out;

          &:focus {
            outline: 2px solid $primary;
          }

          @media screen and (min-width: $md) {
            &:hover,
            &:focus {
              outline: none;
              transform: scaleY(104%) translateY(2%);
            }
          }
        }

        &-title {
          margin-top: 24px;
          margin-bottom: 0;
          font-size: $h4-font-size;
        }

        &-price {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
