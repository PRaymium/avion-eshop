<template>
  <div class="cart">
    <div class="container container--paddings">
      <div class="cart__container">
        <template v-if="cart.size === 0">
          <h1 class="cart__empty-title">Your shopping cart is empty</h1>
          <ButtonLink
            class="cart__empty-title"
            :is-wide-on-mobile="true"
            type="link"
            link="catalog"
            >View collection</ButtonLink
          >
        </template>
        <template v-else>
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
              <li
                class="cart-items__item"
                v-for="item of products"
                :key="item.id"
              >
                <div
                  class="cart-items__item-column-product cart-items__main-column"
                >
                  <router-link
                    :to="{ name: 'product', params: { id: item.id } }"
                    class="cart-items__item-img-link"
                  >
                    <ProductPicture
                      class="cart-items__item-picture"
                      :title="item.name"
                      :product-id="item.id"
                      :only-xs="true"
                    />
                  </router-link>
                  <div class="cart-items__item-info">
                    <router-link
                      :to="{ name: 'product', params: { id: item.id } }"
                      class="cart-items__item-link"
                    >
                      <h2 class="h5 cart-items__item-title">
                        {{ item.name }}
                      </h2>
                    </router-link>

                    <p class="cart-items__item-description">
                      {{ item.description }}
                    </p>
                    <span class="cart-items__item-price">{{
                      '£' + item.price
                    }}</span>
                    <AppStepper
                      class="cart-items__item-stepper cart-items__item-stepper--mobile"
                      :start="cart.items[item.id]"
                      :max="item.inStock"
                      @change="(value) => stepperHandler(value.value, item.id)"
                    />
                  </div>
                </div>
                <div
                  class="cart-items__item-column-amount cart-items__second-column"
                >
                  <AppStepper
                    class="cart-items__item-stepper"
                    :start="cart.items[item.id]"
                    :max="item.inStock"
                    @change="(value) => stepperHandler(value.value, item.id)"
                  />
                </div>
                <div
                  class="cart-items__item-column-total cart-items__second-column cart-items__second-column--right-align"
                >
                  <span class="cart-items__item-total">{{
                    '£' + item.price * cart.items[item.id]
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
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppStepper from '@/components/UI/AppStepper.vue'
import ButtonLink from '@/components/UI/ButtonLink.vue'
import ProductPicture from '@/components/ProductPicture.vue'
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import api from '@/api/avion-api'

const cart = useCartStore()

const products = ref([])
getProducts()

const totalCartPrice = computed(() => {
  return products.value.reduce(
    (acc, item) => acc + item.price * cart.items[item.id],
    0
  )
})

function getProducts() {
  api
    .getProductsByIds(Object.keys(cart.items).map((key) => +key))
    .then((data) => {
      products.value = data
    })
}

function stepperHandler(value, id) {
  cart.set(id, value)
}
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
          font-size: $body-font-size-lg;

          @media screen and (min-width: $md) {
            display: block;
          }
        }
      }

      &-img-link {
        display: block;
        flex-shrink: 0;
        width: 140px;
      }

      &-picture {
        max-height: 180px;
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

        @media screen and (min-width: $md) {
          font-size: $h4-font-size;
        }
      }

      &-description {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin: 8px 0;
        font-size: $body-font-size-sm;
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
