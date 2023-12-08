<template>
  <AppHeader />
  <main class="main">
    <div class="catalog">
      <div class="catalog-header">
        <div class="container">
          <h1 class="catalog-header__title">All products</h1>
        </div>
      </div>
      <div class="catalog-main">
        <div class="container catalog-main__container">
          <div class="catalog-filters">
            <ul
              class="catalog-filters-list"
              v-for="list of filters"
              :key="list.id"
            >
              <li class="catalog-filters-list__title">
                {{ list.title }}
              </li>
              <li
                class="catalog-filters-list__item"
                v-for="listItem of list.items"
                :key="listItem.id"
              >
                <AppCheckbox
                  :label="listItem.name"
                  :name="listItem.name"
                  @change="filterChangeHandler($event, list.id, listItem.id)"
                />
              </li>
            </ul>
          </div>
          <div class="catalog-items">
            <div class="catalog-items__top">
              <div class="catalog-sorting">
                <span class="catalog-sorting__title">Sorting by:</span>
                <AppSelect
                  class="catalog-sorting__select"
                  :options="itemsArrayForSorting"
                  :default-id="selectedSortId"
                  @input="sortInputHandler"
                />
              </div>
            </div>
            <ul class="catalog-items__list">
              <li class="catalog-item">
                <!-- <router-link :to="item.link" class="catalog-item__img-link">
                  <picture class="catalog-item__picture">
                    <source
                      :media="`(min-width: ${breakpoints.sm}px)`"
                      :srcset="`${IMG_PATH}/product-${item.id}-300w.jpg`"
                    />
                    <img
                      class="catalog-item__img"
                      :src="`${IMG_PATH}/product-${item.id}-160w.jpg`"
                      :alt="item.title"
                    />
                  </picture>
                </router-link> -->
                <router-link to="#" class="catalog-item__img-link">
                  <picture class="catalog-item__picture">
                    <source
                      :media="`(min-width: ${breakpoints.sm}px)`"
                      :srcset="`${IMG_PATH}/product-${1}-300w.jpg`"
                    />
                    <img
                      class="catalog-item__img"
                      :src="`${IMG_PATH}/product-${1}-160w.jpg`"
                      alt="test"
                    />
                  </picture>
                </router-link>
                <router-link to="#" class="catalog-item__title-link">
                  <h2 class="catalog-item__title">Rustic Vase Set</h2>
                </router-link>
                <span class="catalog-item__price">£155</span>
              </li>
              <li class="catalog-item">
                <router-link to="#" class="catalog-item__img-link">
                  <picture class="catalog-item__picture">
                    <source
                      :media="`(min-width: ${breakpoints.sm}px)`"
                      :srcset="`${IMG_PATH}/product-${1}-300w.jpg`"
                    />
                    <img
                      class="catalog-item__img"
                      :src="`${IMG_PATH}/product-${1}-160w.jpg`"
                      alt="test"
                    />
                  </picture>
                </router-link>
                <router-link to="#" class="catalog-item__title-link">
                  <h2 class="catalog-item__title">Rustic Vase Set</h2>
                </router-link>
                <span class="catalog-item__price">£155</span>
              </li>
              <li class="catalog-item">
                <router-link to="#" class="catalog-item__img-link">
                  <picture class="catalog-item__picture">
                    <source
                      :media="`(min-width: ${breakpoints.sm}px)`"
                      :srcset="`${IMG_PATH}/product-${1}-300w.jpg`"
                    />
                    <img
                      class="catalog-item__img"
                      :src="`${IMG_PATH}/product-${1}-160w.jpg`"
                      alt="test"
                    />
                  </picture>
                </router-link>
                <router-link to="#" class="catalog-item__title-link">
                  <h2 class="catalog-item__title">Rustic Vase Set</h2>
                </router-link>
                <span class="catalog-item__price">£155</span>
              </li>
              <li class="catalog-item">
                <router-link to="#" class="catalog-item__img-link">
                  <picture class="catalog-item__picture">
                    <source
                      :media="`(min-width: ${breakpoints.sm}px)`"
                      :srcset="`${IMG_PATH}/product-${1}-300w.jpg`"
                    />
                    <img
                      class="catalog-item__img"
                      :src="`${IMG_PATH}/product-${1}-160w.jpg`"
                      alt="test"
                    />
                  </picture>
                </router-link>
                <router-link to="#" class="catalog-item__title-link">
                  <h2 class="catalog-item__title">Rustic Vase Set</h2>
                </router-link>
                <span class="catalog-item__price">£155</span>
              </li>
              <li class="catalog-item">
                <router-link to="#" class="catalog-item__img-link">
                  <picture class="catalog-item__picture">
                    <source
                      :media="`(min-width: ${breakpoints.sm}px)`"
                      :srcset="`${IMG_PATH}/product-${1}-300w.jpg`"
                    />
                    <img
                      class="catalog-item__img"
                      :src="`${IMG_PATH}/product-${1}-160w.jpg`"
                      alt="test"
                    />
                  </picture>
                </router-link>
                <router-link to="#" class="catalog-item__title-link">
                  <h2 class="catalog-item__title">Rustic Vase Set</h2>
                </router-link>
                <span class="catalog-item__price">£155</span>
              </li>
              <li class="catalog-item">
                <router-link to="#" class="catalog-item__img-link">
                  <picture class="catalog-item__picture">
                    <source
                      :media="`(min-width: ${breakpoints.sm}px)`"
                      :srcset="`${IMG_PATH}/product-${1}-300w.jpg`"
                    />
                    <img
                      class="catalog-item__img"
                      :src="`${IMG_PATH}/product-${1}-160w.jpg`"
                      alt="test"
                    />
                  </picture>
                </router-link>
                <router-link to="#" class="catalog-item__title-link">
                  <h2 class="catalog-item__title">Rustic Vase Set</h2>
                </router-link>
                <span class="catalog-item__price">£155</span>
              </li>
              <li class="catalog-item">
                <router-link to="#" class="catalog-item__img-link">
                  <picture class="catalog-item__picture">
                    <source
                      :media="`(min-width: ${breakpoints.sm}px)`"
                      :srcset="`${IMG_PATH}/product-${1}-300w.jpg`"
                    />
                    <img
                      class="catalog-item__img"
                      :src="`${IMG_PATH}/product-${1}-160w.jpg`"
                      alt="test"
                    />
                  </picture>
                </router-link>
                <router-link to="#" class="catalog-item__title-link">
                  <h2 class="catalog-item__title">Rustic Vase Set</h2>
                </router-link>
                <span class="catalog-item__price">£155</span>
              </li>
              <li class="catalog-item">
                <router-link to="#" class="catalog-item__img-link">
                  <picture class="catalog-item__picture">
                    <source
                      :media="`(min-width: ${breakpoints.sm}px)`"
                      :srcset="`${IMG_PATH}/product-${1}-300w.jpg`"
                    />
                    <img
                      class="catalog-item__img"
                      :src="`${IMG_PATH}/product-${1}-160w.jpg`"
                      alt="test"
                    />
                  </picture>
                </router-link>
                <router-link to="#" class="catalog-item__title-link">
                  <h2 class="catalog-item__title">Rustic Vase Set</h2>
                </router-link>
                <span class="catalog-item__price">£155</span>
              </li>
              <li class="catalog-item">
                <router-link to="#" class="catalog-item__img-link">
                  <picture class="catalog-item__picture">
                    <source
                      :media="`(min-width: ${breakpoints.sm}px)`"
                      :srcset="`${IMG_PATH}/product-${1}-300w.jpg`"
                    />
                    <img
                      class="catalog-item__img"
                      :src="`${IMG_PATH}/product-${1}-160w.jpg`"
                      alt="test"
                    />
                  </picture>
                </router-link>
                <router-link to="#" class="catalog-item__title-link">
                  <h2 class="catalog-item__title">Rustic Vase Set</h2>
                </router-link>
                <span class="catalog-item__price">£155</span>
              </li>
            </ul>
            <div class="catalog-items__more">
              <ButtonLink
                class="catalog-items__more-btn"
                type="button"
                style-type="secondary"
                :is-wide-on-mobile="true"
                >Load more</ButtonLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <AppFooter />
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import ButtonLink from '../components/UI/ButtonLink.vue'
import AppCheckbox from '../components/UI/AppCheckbox.vue'
import { breakpoints } from '../breakpoints'
import AppSelect from '../components/UI/AppSelect.vue'
import { ref, computed, onMounted } from 'vue'

const IMG_PATH = 'img/products'
// const products = [
//   {
//     id: 1,
//     title: 'Rustic Vase Set',
//     link: '',
//     price: 155
//   },
//   {
//     id: 2,
//     title: 'The Lucy Lamp',
//     link: '',
//     price: 399
//   },
//   {
//     id: 3,
//     title: 'The Silky Vase',
//     link: '',
//     price: 125
//   },
//   {
//     id: 4,
//     title: 'The Dandy chair',
//     link: '',
//     price: 250
//   }
// ]

const filters = ref([
  {
    id: 1,
    title: 'Product type',
    items: [
      {
        id: 1,
        name: 'Furniture'
      },
      {
        id: 2,
        name: 'Homeware'
      },
      {
        id: 3,
        name: 'Sofas'
      },
      {
        id: 4,
        name: 'Light fittings'
      },
      {
        id: 5,
        name: 'Accessories'
      }
    ]
  },
  {
    id: 2,
    title: 'Price',
    items: [
      {
        id: 1,
        name: '0 - 100'
      },
      {
        id: 2,
        name: '101 - 250'
      },
      {
        id: 3,
        name: '250 +'
      }
    ]
  },
  {
    id: 3,
    title: 'Designer',
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

const selectedFilters = ref([])

const sorting = ref([
  {
    id: 1,
    name: 'Name (A-Z)',
    value: 'name',
    type: 'asc'
  },
  {
    id: 2,
    name: 'Name (Z-A)',
    value: 'name',
    type: 'desc'
  },
  {
    id: 3,
    name: 'Price (Low to High)',
    value: 'price',
    type: 'asc'
  },
  {
    id: 4,
    name: 'Price (High to Low)',
    value: 'price',
    type: 'desc'
  },
  {
    id: 5,
    name: 'Added date (to Older)',
    value: 'added date',
    type: 'asc'
  },
  {
    id: 6,
    name: 'Added date (to Newest)',
    value: 'added date',
    type: 'desc'
  }
])

const selectedSortId = ref(1)

const itemsArrayForSorting = computed(() => {
  return sorting.value.map(({ id, name }) => ({
    id,
    name
  }))
})

function filterChangeHandler(state, listId, itemId) {
  console.log(state, listId, itemId)
  const filterList = selectedFilters.value.find((list) => list.id === listId)
  if (state) filterList.selectedItemsIds.push(itemId)
  else {
    const itemIdx = filterList.selectedItemsIds.indexOf(itemId)
    filterList.selectedItemsIds.splice(itemIdx, 1)
  }
}

function sortInputHandler(id) {
  selectedSortId.value = id
}

onMounted(() => {
  filters.value.forEach(({ id }) =>
    selectedFilters.value.push({ id, selectedItemsIds: [] })
  )
})
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

  &-filters {
    display: none;

    @media screen and (min-width: $md) {
      display: block;
      width: 25%;
    }

    &-list {
      font-size: 16px;
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
  }

  &-sorting {
    display: flex;
    align-items: center;
    column-gap: 16px;

    &__title {
      font-size: $body-font-size-sm;
    }
  }

  $column-gap: 16px;

  &-items {
    @media screen and (min-width: $md) {
      width: 75%;
    }

    &__top {
      display: flex;
      justify-content: flex-end;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      column-count: 2;
      justify-content: space-between;
      gap: 20px $column-gap;
      margin-top: 50px;

      @media screen and (min-width: $md) {
        margin-top: 30px;
      }
    }

    &__more {
      margin-top: 40px;
      text-align: center;

      @media screen and (min-width: $md) {
        margin-top: 32px;
      }
    }
  }

  &-item {
    flex-grow: 1;
    max-width: calc((100% - $column-gap) / 2);

    @media screen and (min-width: $sm) {
      max-width: calc((100% - $column-gap * 2) / 3);
    }

    @media screen and (min-width: $md) {
      max-width: calc((100% - $column-gap * 2) / 3);
    }

    &__picture {
      width: 100%;
    }

    &__img {
      width: 100%;
    }

    &__title {
      margin-top: 24px;
      margin-bottom: 0;
      font-size: $h4-font-size;
    }

    &__price {
      margin-top: 8px;
    }
  }
}
</style>
