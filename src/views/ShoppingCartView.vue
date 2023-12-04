<template>
  <AppHeader />
  <main class="main">
    <div class="cart">
      <div class="container container--paddings">
        <div class="cart__container">
          <h1 class="cart__heading">Your shopping cart</h1>
          <div class="cart-items">
            <div class="cart-items__titles">
              <div class="cart-items__main-column">
                <span class="cart-items__titles-item">Product </span>
              </div>
              <div class="cart-items__second-column">
                <span class="cart-items__titles-item">Amount </span>
              </div>
              <div
                class="cart-items__second-column cart-items__second-column--right-align"
              >
                <span class="cart-items__titles-item">Total </span>
              </div>
            </div>
            <ul class="cart-items__list">
              <li class="cart-items__item" v-for="item of cart" :key="item.id">
                <div
                  class="cart-items__item-column-product cart-items__main-column"
                >
                  <router-link
                    :to="item.link"
                    class="cart-items__item-img-link"
                  >
                    <picture class="cart-items__item-picture">
                      <img
                        class="cart-items__item-img"
                        :src="`${IMG_PATH}/product-${item.id}-160w.jpg`"
                        :alt="item.title"
                      />
                    </picture>
                  </router-link>
                  <div class="cart-items__item-info">
                    <h2 class="cart-items__item-title">{{ item.title }}</h2>
                    <p class="cart-items__item-description">
                      {{ item.desciption }}
                    </p>
                    <span class="cart-items__item-price">{{
                      '£' + item.price
                    }}</span>
                    <AppStepper
                      class="cart-items__item-stepper cart-items__item-stepper--mobile"
                      :start="item.count"
                      @change="(value) => (item.count = value)"
                    />
                  </div>
                </div>
                <div
                  class="cart-items__item-column-amount cart-items__second-column"
                >
                  <AppStepper
                    class="cart-items__item-stepper"
                    :start="item.count"
                    @change="(value) => (item.count = value)"
                  />
                </div>
                <div
                  class="cart-items__item-column-total cart-items__second-column cart-items__second-column--right-align"
                >
                  <span class="cart-items__item-total">{{
                    '£' + item.price * item.count
                  }}</span>
                </div>
              </li>
            </ul>
            <div class="cart-items__summary">
              <span class="cart-items__summary-note"
                >Taxes and shipping are calculated at checkout</span
              >
              <div class="cart-items__summary-total">
                <span class="cart-items__summary-total-title">Subtotal</span>
                <span class="cart-items__summary-total-value">{{
                  '£' + totalCartPrice
                }}</span>
              </div>
            </div>
            <div class="cart-items__checkout">
              <ButtonLink
                class="cart-items__checkout-link"
                type="link"
                link="/"
                :is-wide-on-mobile="true"
                >Go to checkout
              </ButtonLink>
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
import AppStepper from '../components/UI/AppStepper.vue'
import ButtonLink from '../components/UI/ButtonLink.vue'
import { reactive, computed } from 'vue'

const IMG_PATH = 'img/products'

const cart = reactive([
  {
    id: 3,
    title: 'Graystone vase',
    desciption: 'A timeless ceramic vase with a tri color grey glaze.',
    price: 85,
    link: '#',
    count: 2
  },
  {
    id: 4,
    title: 'The Dandy Chair',
    desciption: 'A timeless design, with premium materials features ... ',
    price: 250,
    link: '#',
    count: 1
  }
])

const totalCartPrice = computed(() => {
  return cart.reduce((acc, item) => acc + item.price * item.count, 0)
})
</script>

<style lang="scss" scoped>
.container--paddings {
  padding-top: 35px;
  padding-bottom: 50px;

  @media screen and (min-width: $md) {
    padding-top: 85px;
    padding-bottom: 85px;
  }
}

.cart {
  @media screen and (min-width: $md) {
    background-color: $light-gray;
  }

  &__container {
    @media screen and (min-width: $md) {
      padding: 20px 30px;
      background-color: $white;
    }

    @media screen and (min-width: $lg) {
      padding: 50px 60px;
      background-color: $white;
    }
  }

  &__heading {
    @media screen and (min-width: $md) {
      margin-bottom: 48px;
    }
  }

  &-items {
    &__main-column {
      @media screen and (min-width: $md) {
        flex: 1 0 60%;
      }
    }

    &__second-column {
      @media screen and (min-width: $md) {
        flex: 1 1 20%;
      }

      &--right-align {
        text-align: right;
      }
    }

    &__titles {
      display: none;
      margin-bottom: 15px;

      @media screen and (min-width: $md) {
        display: flex;
        column-gap: 20px;
      }
    }

    &__list {
      display: flex;
      flex-direction: column;
      row-gap: 35px;
      padding-top: 25px;
      padding-bottom: 35px;
      border-top: 1px solid $border-gray;
      border-bottom: 1px solid $border-gray;
    }

    &__item {
      display: flex;
      //height: 160px;

      @media screen and (min-width: $md) {
        column-gap: 20px;
      }

      &-column {
        &-product {
          display: flex;
          column-gap: 20px;
        }

        &-amount {
          display: none;

          @media screen and (min-width: $md) {
            display: block;
          }
        }

        &-total {
          display: none;

          @media screen and (min-width: $md) {
            display: block;
          }
        }
      }

      &-img-link {
        display: block;
        flex-shrink: 0;
        width: 130px;
      }

      &-img {
        width: 100%;
        height: 100%;
      }

      &-info {
        display: flex;
        flex-direction: column;

        @media screen and (min-width: $md) {
          justify-content: center;
        }
      }

      &-title {
        margin: 0;
        font-size: 16px;

        @media screen and (min-width: $md) {
          font-size: 20px;
        }
      }

      &-description {
        margin: 8px 0;
        font-size: $body-font-size-sm;
      }

      &-price {
        font-size: $body-font-size-md;

        @media screen and (min-width: $md) {
          font-size: $body-font-size-lg;
        }
      }

      &-stepper {
        margin-top: auto;
        align-self: flex-start;

        &--mobile {
          @media screen and (min-width: $md) {
            display: none;
          }
        }
      }
    }

    &__summary {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      row-gap: 10px;
      margin-top: 20px;
      color: $primary;

      @media screen and (min-width: $md) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      &-note {
        font-size: $body-font-size-sm;
      }

      &-total {
        display: flex;
        column-gap: 16px;
        align-items: center;
        font-family: $font-clash-display;
        order: -1;

        @media screen and (min-width: $md) {
          order: 0;
        }

        &-title {
          font-size: 20px;
          color: $primary;
        }

        &-value {
          font-size: 24px;
        }
      }
    }

    &__checkout {
      margin-top: 35px;

      @media screen and (min-width: $md) {
        display: flex;
        justify-content: flex-end;
        margin-top: 15px;
      }
    }
  }
}
</style>
