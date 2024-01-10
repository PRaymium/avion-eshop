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
                  <ProductPicture
                    class="cart-items__item-picture"
                    :title="item.name"
                    :product-id="item.id"
                    :only-xs="true"
                  />
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
                    <div class="cart-items__item-controls">
                      <ButtonLink
                        class="cart-items__item-remove-btn cart-items__item-remove-btn--mobile"
                        size="small"
                        style-type="secondary"
                        aria-label="Remove from cart"
                        @click="removeHandler(item.id)"
                      >
                        <IconBase :width="24" :height="24" icon-name="trashcan"
                          ><IconTrashcan
                        /></IconBase>
                      </ButtonLink>
                      <AppStepper
                        class="cart-items__item-stepper"
                        :start="cart.items[item.id]"
                        :max="item.inStock"
                        @change="
                          (value) => stepperHandler(value.value, item.id)
                        "
                      />
                    </div>
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
                  <ButtonLink
                    class="cart-items__item-remove-btn"
                    size="small"
                    style-type="secondary"
                    aria-label="Remove from cart"
                    @click="removeHandler(item.id)"
                  >
                    <IconBase :width="24" :height="24" icon-name="trashcan"
                      ><IconTrashcan
                    /></IconBase>
                  </ButtonLink>
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
import IconBase from '@/components/icons/IconBase.vue'
import IconTrashcan from '@/components/icons/IconTrashcan.vue'

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

function removeHandler(id) {
  cart.remove(id)
  products.value = products.value.filter((item) => item.id != id)
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

      @media screen and (min-width: $md) {
        column-gap: 30px;
      }

      &-column {
        &-product {
          display: flex;
          column-gap: 20px;
          width: 100%;

          @media screen and (min-width: $xs) {
            width: auto;
          }
        }

        &-amount {
          display: none;

          @media screen and (min-width: $md) {
            display: flex;
            flex-direction: column;
            row-gap: 20px;
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

      &-picture {
        width: 150px;
        flex-shrink: 0;
      }

      &-info {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        @media screen and (min-width: $xs) {
          flex-grow: 0;
        }

        @media screen and (min-width: $md) {
          justify-content: center;
        }
      }

      &-title {
        margin-bottom: 8px;
        font-size: $h4-font-size;

        @media screen and (min-width: $md) {
          margin: 0;
        }
      }

      &-description {
        display: none;
        font-size: $body-font-size-sm;

        @media screen and (min-width: $xs) {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 8px 0;
        }
      }

      &-controls {
        display: flex;
        flex-direction: column;
        margin-top: auto;
        gap: 10px;

        @media screen and (min-width: $xs) {
          flex-direction: row;
        }

        @media screen and (min-width: $md) {
          display: none;
        }
      }

      &-stepper {
        width: 100%;
      }

      &-remove-btn {
        width: 100%;

        &--mobile {
          width: auto;
          padding: 8px;
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
