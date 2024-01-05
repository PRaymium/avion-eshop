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
              v-if="filtersIsLoaded"
              :filters="filters"
              :default-filters-state="defaultFiltersState"
              :filters-value-update="filtersValueUpdate"
              @change="filtersChangeHandler"
              @filters-updated="filtersValueUpdate = false"
            />
          </div>
        </div>
        <div class="catalog-items">
          <div class="catalog-items__top">
            <div class="catalog-filters-dropdown" v-if="!mq.lgPlus">
              <CatalogFilters
                v-if="filtersIsLoaded"
                :filters="filters"
                :default-filters-state="defaultFiltersState"
                :filters-value-update="filtersValueUpdate"
                @change="filtersChangeHandler"
                @filters-updated="filtersValueUpdate = false"
                type="dropdown"
              />
            </div>

            <div class="catalog-sorting">
              <span class="catalog-sorting__title">Sorting by:</span>
              <AppSelect
                class="catalog-sorting__select"
                :options="sortingItemsForSortingComponent"
                :selected-id="selectedSortId"
                :constant-header="!mq.lgPlus ? 'Sorting' : ''"
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
import CatalogFilters from '../components/CatalogFilters.vue'
import ProductCard from '../components/ProductCard.vue'
import ButtonLink from '../components/UI/ButtonLink.vue'
import AppSelect from '../components/UI/AppSelect.vue'
import { ref, computed, inject, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/avion-api.js'
import { useReplaceWithQuery } from '@/composables/asyncReplaceWithQuery.js'

const mq = inject('mq')

const router = useRouter()
const route = useRoute()

const filters = ref([
  {
    title: 'Price',
    name: 'price',
    type: 'range',
    params: {
      min: undefined,
      max: undefined,
      minValue: undefined,
      maxValue: undefined
    }
  },
  {
    title: 'Product type',
    name: 'type',
    type: 'checkboxList',
    items: []
  },
  {
    title: 'Designer',
    name: 'designer',
    type: 'checkboxList',
    items: []
  }
])

const filtersIsLoaded = ref(false)
const filtersValueUpdate = ref(false)

// setup filters:
// checkboxList - filterName: [itemsId],
// range - filterName: {min, max, minValue, maxValue}
const defaultFiltersState = {
  //price: { min: 150, max: 400 }
  //type: [1]
}

filtersInit()

async function filtersInit() {
  const data = await api.getCatalogFilters()

  data.forEach((dataFilter) => {
    const filter = filters.value.find((item) => item.name === dataFilter.name)

    switch (filter.type) {
      case 'checkboxList': {
        dataFilter.items.forEach((dataFilterItem) => {
          filter.items.push({ isChecked: false, ...dataFilterItem })
        })
        break
      }

      case 'range': {
        filter.params.min = dataFilter.params.min ?? undefined
        filter.params.max = dataFilter.params.max ?? undefined
        break
      }

      default: {
        throw new Error('Filter type not defined!')
      }
    }
  })

  filtersIsLoaded.value = true
}

function filtersChangeHandler(newFilters) {
  filters.value = newFilters
  preparingProducts()
}

const sorting = reactive([
  {
    id: 1,
    title: 'Name (A-Z)',
    name: 'name',
    reverse: false
  },
  {
    id: 2,
    title: 'Name (Z-A)',
    name: 'name',
    reverse: true
  },
  {
    id: 3,
    title: 'Price (Low to High)',
    name: 'price',
    reverse: false
  },
  {
    id: 4,
    title: 'Price (High to Low)',
    name: 'price',
    reverse: true
  }
])

// selecting sorting by id
const defaultSortId = 1
const selectedSortId = ref(selectedSortIdInit())

const selectedSortItem = computed(() => {
  return sorting.find((item) => item.id === selectedSortId.value)
})

const sortingItemsForSortingComponent = computed(() => {
  return sorting.map(({ id, title }) => ({
    id,
    name: title
  }))
})

function selectedSortIdInit() {
  if (route.query.orderId) {
    if (!sorting.some((item) => item.id === +route.query.orderId)) {
      return defaultSortId
    } else {
      return +route.query.orderId
    }
  } else return defaultSortId
}

function sortInputHandler(id) {
  selectedSortId.value = id
  // if (id === defaultSortId) useReplaceWithQuery({ orderId: undefined })
  if (id === defaultSortId) replaceWithQuery({ orderId: undefined })
  // else useReplaceWithQuery({ orderId: id })
  else replaceWithQuery({ orderId: id })
  preparingProducts()
}

//const products = ref([])
const preparedProducts = ref([])

// api.getProducts().then((data) => {
//   products.value = data
//   preparingProducts()
// })

async function preparingProducts() {
  let data = await api.getPreparedProductsWithFiltersInfo(
    filters.value,
    selectedSortItem.value
  )

  //  check filtersInfo
  if (Object.keys(data.filtersInfo).length != 0) {
    Object.keys(data.filtersInfo).forEach((filterName) => {
      const filter = filters.value.find((filter) => filter.name === filterName)
      switch (filter.type) {
        case 'range': {
          Object.keys(data.filtersInfo[filterName]).forEach(
            (filtersInfoItem) => {
              if (
                data.filtersInfo[filterName][filtersInfoItem] &&
                !filter.params[filtersInfoItem]
              ) {
                filter.params[filtersInfoItem] =
                  data.filtersInfo[filterName][filtersInfoItem]
                filtersValueUpdate.value = true
              }
            }
          )

          // filter.params.min ??= data.filtersInfo[filterName].min
          // filter.params.max ??= data.filtersInfo[filterName].max
          break
        }

        default: {
          throw new Error('Filter type not defined!')
        }
      }
    })
  }

  preparedProducts.value = data.products

  currentPage.value = 1
}

function replaceWithQuery(query) {
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
    top: 35px;
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
