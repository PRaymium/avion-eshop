<template>
  <div class="product">
    <div class="container container--product-padding">
      <div class="product__container">
        <picture class="product-picture">
          <source
            :media="`(max-width: ${breakpoints.xs}px)`"
            srcset="img/product-view/product-390w.jpg"
          />
          <img
            class="product-picture__img"
            srcset="img/product-view/product-640w.jpg"
            alt="Product"
          />
        </picture>
        <div class="product-info">
          <div class="container container--product-info-padding">
            <div class="product-info-heading">
              <h1 class="product-info-heading__name">The Dandy Chair</h1>
              <p class="product-info-heading__price">£250</p>
            </div>
            <div class="product-info-description">
              <span class="product-info-description__title"
                >Product description</span
              >
              <p class="product-info-description__info">
                A timeless design, with premium materials features as one of our
                most popular and iconic pieces. The dandy chair is perfect for
                any stylish living space with beech legs and lambskin leather
                upholstery.
              </p>
            </div>
            <div class="product-info-dimensions">
              <span class="product-info-dimensions__title">Dimensions</span>
              <ul class="product-info-dimensions__list">
                <li class="product-info-dimensions__item">
                  <span class="product-info-dimensions__item-title"
                    >Height</span
                  >
                  <p class="product-info-dimensions__item-value">110cm</p>
                </li>
                <li class="product-info-dimensions__separator"></li>
                <li class="product-info-dimensions__item">
                  <span class="product-info-dimensions__item-title">Width</span>
                  <p class="product-info-dimensions__item-value">75cm</p>
                </li>
                <li class="product-info-dimensions__separator"></li>
                <li class="product-info-dimensions__item">
                  <span class="product-info-dimensions__item-title">Depth</span>
                  <p class="product-info-dimensions__item-value">50cm</p>
                </li>
              </ul>
            </div>
            <div class="product-info-controls">
              <div class="product-info-controls-amount">
                <span class="product-info-controls-amount__title">Amount</span>
                <AppStepper
                  style-type="white"
                  :is-wide-on-mobile="true"
                  class="product-info-controls-amount__stepper"
                ></AppStepper>
              </div>
              <ButtonLink
                :is-wide-on-mobile="true"
                class="product-info-controls-add"
                >Add to cart
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppStepper from './UI/AppStepper.vue'
import ButtonLink from './UI/ButtonLink.vue'
import { breakpoints } from '../breakpoints'
</script>

<style lang="scss" scoped>
.container {
  &--product-padding {
    @media screen and (max-width: ($md - 1)) {
      padding: 0;
    }
  }

  &--product-info-padding {
    @media screen and (min-width: $md) {
      padding: 0;
    }
  }
}

.product {
  background: $light-gray;

  &__container {
    @media screen and (min-width: $md) {
      display: flex;
      align-items: center;
      padding: 30px 0;
      column-gap: 30px;
    }

    @media screen and (min-width: $lg) {
      padding: 50px 0;
      column-gap: 65px;
    }
  }

  &-picture {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: $xs;
    height: 100vw;
    min-height: $xs;
    overflow: hidden;
    flex: 1 1 50%;

    @media screen and (min-width: $md) {
      width: auto;
      min-width: auto;
      height: auto;
      max-height: 660px;
    }

    &__img {
      width: 100%;
    }
  }

  &-info {
    padding: 30px 0;
    flex: 1 1 50%;

    &-heading {
      border-bottom: 1px solid $border-gray;

      &__name {
        margin-bottom: 0;
      }

      &__price {
        font-size: 20px;

        @media screen and (min-width: $md) {
          margin-bottom: 25px;
        }

        @media screen and (min-width: $lg) {
          flex: 0 0 auto;
          font-size: 24px;
        }
      }
    }

    &-description {
      margin-top: 28px;

      @media screen and (min-width: $md) {
        margin-top: 24px;
      }

      &__info {
        font-size: $body-font-size-sm;

        @media screen and (min-width: $md) {
          margin-top: 14px;
          font-size: $body-font-size-md;
        }
      }
    }

    &-dimensions {
      margin-top: 28px;

      @media screen and (min-width: $md) {
        margin-top: 36px;
      }

      &__title {
        display: block;
        padding-bottom: 12px;
        border-bottom: 1px solid $border-gray;

        @media screen and (min-width: $md) {
          border-bottom: none;
          padding-bottom: 0;
        }
      }

      &__list {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        font-size: $body-font-size-sm;

        @media screen and (min-width: $md) {
          margin-top: 24px;
        }
      }

      &__item-value {
        margin-top: 15px;
        margin-bottom: 0;

        @media screen and (min-width: $md) {
          font-size: $body-font-size-md;
        }
      }

      &__separator {
        width: 1px;
        margin: 6px 0;
        background-color: $border-gray;
      }
    }

    &-controls {
      margin-top: 32px;

      @media screen and (min-width: $md) {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
        flex-wrap: wrap;
        row-gap: 16px;
      }

      &-amount {
        display: flex;
        flex-direction: column;

        @media screen and (min-width: $md) {
          flex-direction: row;
          align-items: center;
          column-gap: 20px;
          flex: 1 1 40%;
        }

        @media screen and (min-width: $lg) {
          flex: 0 0 auto;
        }

        &__stepper {
          margin-top: 12px;

          @media screen and (min-width: $md) {
            margin-top: 0;
          }
        }
      }

      &-add {
        margin-top: 16px;

        @media screen and (min-width: $md) {
          margin-top: 0;
          flex: 1 1 60%;
        }

        @media screen and (min-width: $lg) {
          flex: 0 0 auto;
        }
      }
    }
  }
}
</style>
