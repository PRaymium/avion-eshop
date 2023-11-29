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
                  class="product-info-controls-amount__stepper"
                ></AppStepper>
              </div>
              <ButtonLink :is-wide="true" class="product-info-controls-add"
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
}

.product {
  background: $light-gray;

  &-info {
    padding: 30px 0;

    &-heading {
      border-bottom: 1px solid $border-gray;

      &__name {
        margin-bottom: 0;
      }
    }

    &-description {
      margin-top: 28px;

      &__info {
        font-size: $body-font-size-sm;
      }
    }

    &-dimensions {
      margin-top: 28px;

      &__title {
        display: block;
        padding-bottom: 12px;
        border-bottom: 1px solid $border-gray;
      }

      &__list {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        font-size: $body-font-size-sm;
      }

      &__item-value {
        margin-top: 15px;
        margin-bottom: 0;
      }

      &__separator {
        width: 1px;
        margin: 6px 0;
        background-color: $border-gray;
      }
    }

    &-controls {
      margin-top: 32px;

      &-amount {
        display: flex;
        flex-direction: column;

        &__stepper {
          margin-top: 12px;
        }
      }

      &-add {
        margin-top: 16px;
      }
    }
  }
}
</style>
