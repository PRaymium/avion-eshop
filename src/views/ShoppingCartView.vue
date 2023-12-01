<template>
  <AppHeader />
  <main class="main">
    <div class="cart">
      <div class="container">
        <div class="cart__container">
          <h1 class="cart__heading">Your shopping cart</h1>
          <div class="cart-items">
            <div class="cart-items__titles cart-items--column-aligment">
              <span class="cart-items__row-title">Product </span>
              <span class="cart-items__row-title">Amount</span>
              <span class="cart-items__row-title">Total</span>
            </div>
            <ul class="cart-items__list">
              <li class="cart-item" v-for="item of cart" :key="item.id">
                <div class="cart-item__left">
                  <router-link :to="item.link" class="cart-item__img-link">
                    <picture class="cart-item__picture">
                      <img
                        class="cart-item__img"
                        :src="`${IMG_PATH}/product-${item.id}-160w.jpg`"
                        :alt="item.title"
                      />
                    </picture>
                  </router-link>
                </div>
                <div class="cart-item__right">
                  <div class="cart-item__info">
                    <h2 class="cart-item__title">{{ item.title }}</h2>
                    <p class="cart-item__description">{{ item.desciption }}</p>
                    <span class="cart-item__price">{{ '£' + item.price }}</span>
                  </div>
                  <AppStepper
                    class="cart-item__stepper"
                    :start="item.count"
                    @change="(value) => (item.count = value)"
                  />
                  <span class="cart-item__total">{{
                    '£' + item.price * item.count
                  }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="cart-pricing-info">
            <span class="cart-pricing-info__note"
              >Taxes and shipping are calculated at checkout</span
            >
            <div class="cart-pricing-info__total">
              <span class="cart-pricing-info__total-title">Subtotal</span>
              <span class="cart-pricing-info__total-value">{{
                '£' + totalCartPrice
              }}</span>
            </div>
          </div>
          <ButtonLink
            class="cart-link"
            type="link"
            link="/"
            :is-wide-on-mobile="true"
            >Go to checkout
          </ButtonLink>
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
import { reactive, computed } from 'vue'
import ButtonLink from '../components/UI/ButtonLink.vue'

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
.cart {
  //background-color: $light-gray;

  &__container {
    margin: 35px 0 50px 0;
    //background-color: $white;
  }

  &__heading {
    @media screen and (min-width: $md) {
      margin-bottom: 48px;
    }
  }

  &-items {
    &__titles {
      display: none;
    }

    &__list {
      display: flex;
      flex-direction: column;
      row-gap: 35px;
      padding-bottom: 35px;
      border-bottom: 1px solid $border-gray;
    }
  }

  &-item {
    display: flex;
    column-gap: 20px;
    //height: 160px;

    @media screen and (min-width: $md) {
      column-gap: 25px;
    }

    &__left {
      //width: 130px;
    }

    &__right {
      display: flex;
      flex-direction: column;
      column-gap: 5px;
    }

    &__img-link {
      display: block;
      width: 130px;
    }

    &__img {
      width: 100%;
      height: 100%;
    }

    &__title {
      margin: 0;
      font-size: 16px;

      @media screen and (min-width: $md) {
        font-size: 20px;
      }
    }

    &__description {
      margin: 8px 0;
      font-size: $body-font-size-sm;
    }

    &__price {
      font-size: $body-font-size-md;

      @media screen and (min-width: $md) {
        font-size: $body-font-size-lg;
      }
    }

    &__stepper {
      margin-top: auto;
    }

    &__total {
      display: none;
    }
  }

  &-pricing-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    row-gap: 10px;
    margin-top: 20px;
    color: $primary;

    &__note {
      font-size: $body-font-size-sm;
    }

    &__total {
      display: flex;
      column-gap: 16px;
      align-items: center;
      font-family: $font-clash-display;
      order: -1;

      &-title {
        font-size: 20px;
        color: $primary;
      }

      &-value {
        font-size: 24px;
      }
    }
  }

  &-link {
    margin-top: 35px;
  }
}
</style>
