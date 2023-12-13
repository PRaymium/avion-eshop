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
          <div class="catalog-filters" v-if="mq.mdPlus">
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
                  :is-checked="item.isChecked"
                  @change="filterChangeHandler($event, item)"
                />
              </li>
            </ul>
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
                  @click="
                    filtersWithMeta.dropdownIsOpen =
                      !filtersWithMeta.dropdownIsOpen
                  "
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
                      @click="filter.isOpen = !filter.isOpen"
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
                          :is-checked="item.isChecked"
                          @change="filterChangeHandler($event, item)"
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
                  :default-id="selectedSortId"
                  :constant-header="!mq.mdPlus ? 'Sorting' : ''"
                  aria-label="Sorting"
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
import AppSelect from '../components/UI/AppSelect.vue'
import { ref, computed, inject } from 'vue'
import { breakpoints } from '../breakpoints'
import { uuid } from 'vue3-uuid'

const mq = inject('mq')

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

const filtersWithMeta = ref({
  dropdownIsOpen: false,
  controlId: uuid.v4(),
  filters: filters.value.map((filter) => {
    return {
      isOpen: false,
      controlId: uuid.v4(),
      id: filter.id,
      title: filter.title,
      items: filter.items.map((item) => {
        return { ...item, isChecked: false }
      })
    }
  })
})


function filterChangeHandler(state, item) {
  item.isChecked = state

  // const filter = selectedFilters.value.find(
  //   (list) => list.id === selectedListId
  // )
  // if (state) filter.selectedItemsIds.push(selectedItemId)
  // else {
  //   const itemIdx = filter.selectedItemsIds.indexOf(selectedItemId)
  //   filter.selectedItemsIds.splice(itemIdx, 1)
  // }
}

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

function sortInputHandler(id) {
  selectedSortId.value = id
}
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
    width: 25%;

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

  $column-gap: 16px;
  @media screen and (min-width: $md) {
    $column-gap: 20px;
  }

  &-items {
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

    &__list {
      display: flex;
      flex-wrap: wrap;
      column-count: 2;
      justify-content: space-between;
      column-gap: $column-gap;
      row-gap: 20px;
      margin-top: 40px;

      @media screen and (min-width: $md) {
        margin-top: 30px;
        row-gap: 35px;
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
