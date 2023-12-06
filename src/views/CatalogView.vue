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
          <div class="catalog-filters">Фильтры</div>
          <div class="catalog-items">
            <div class="catalog-items__top">Сортировка</div>
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
import { breakpoints } from '../breakpoints'
import ButtonLink from '../components/UI/ButtonLink.vue'

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

    @media screen and (min-width: $xs) {
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
  }

  $column-gap: 16px;

  &-items {
    @media screen and (min-width: $md) {
      width: 75%;
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
