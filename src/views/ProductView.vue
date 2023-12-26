<template>
  <section class="section-product">
    <div class="product">
      <div class="container container--product-padding">
        <h1 v-if="product === undefined">Product not found</h1>
        <div class="product__container" v-else>
          <ProductPicture
            class="product-picture"
            :title="product.name"
            :product-id="product.id"
            :for-product-info="true"
          />
          <div class="product-info">
            <div class="container container--product-info-padding">
              <div class="product-info-heading">
                <h1 class="product-info-heading__name">{{ product.name }}</h1>
                <span class="product-info-heading__price">
                  {{ `£${product.price}` }}
                </span>
              </div>
              <div class="product-info-description">
                <span class="product-info-description__title"
                  >Product description</span
                >
                <p
                  class="product-info-description__info"
                  :title="product.description"
                >
                  {{ product.description }}
                </p>
              </div>
              <div class="product-info-dimensions">
                <span class="product-info-dimensions__title">Dimensions</span>
                <ul class="product-info-dimensions__list">
                  <li class="product-info-dimensions__item">
                    <span class="product-info-dimensions__item-title"
                      >Height</span
                    >
                    <span class="product-info-dimensions__item-value">
                      {{
                        `${product.dimensions.height} ${product.dimensions.unit}`
                      }}
                    </span>
                  </li>
                  <li class="product-info-dimensions__separator"></li>
                  <li class="product-info-dimensions__item">
                    <span class="product-info-dimensions__item-title"
                      >Width</span
                    >
                    <span class="product-info-dimensions__item-value">{{
                      `${product.dimensions.width} ${product.dimensions.unit}`
                    }}</span>
                  </li>
                  <li class="product-info-dimensions__separator"></li>
                  <li class="product-info-dimensions__item">
                    <span class="product-info-dimensions__item-title"
                      >Depth</span
                    >
                    <span class="product-info-dimensions__item-value">{{
                      `${product.dimensions.depth} ${product.dimensions.unit}`
                    }}</span>
                  </li>
                </ul>
              </div>
              <div class="product-info-controls">
                <div class="product-info-controls-amount">
                  <span class="product-info-controls-amount__title"
                    >Amount</span
                  >
                  <AppStepper
                    style-type="white"
                    :is-wide-on-mobile="true"
                    :max="product.inStock"
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
  </section>
  <section class="section-products">
    <AppProducts :title="appProductsTitle" />
  </section>
  <section class="section-features">
    <AppFeatures />
  </section>
  <section class="section-join">
    <AppJoin />
  </section>
</template>

<script setup>
import ProductPicture from '../components/ProductPicture.vue'
import AppStepper from '../components/UI/AppStepper.vue'
import ButtonLink from '../components/UI/ButtonLink.vue'
import AppProducts from '../components/AppProducts.vue'
import AppFeatures from '../components/AppFeatures.vue'
import AppJoin from '../components/AppJoin.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/avion-api.js'

const appProductsTitle = 'You might also like'
const route = useRoute()

const id = ref(+route.params.id)
const product = ref(getProduct(id.value))

function getProduct(id) {
  api.getProductById(id).then((data) => {
    product.value = data
  })
}

watch(
  () => route.params.id,
  (newVal) => {
    id.value = +newVal
    product.value = getProduct(id.value)
  }
)
</script>

<style lang="scss" scoped>
.section-products {
  margin-top: 50px;

  @media screen and (min-width: $md) {
    margin-top: 80px;
  }
}

.section-features {
  margin-top: 85px;

  @media screen and (min-width: $lg) {
    margin-top: 115px;
  }
}

.section-join {
  margin-top: 50px;

  @media screen and (min-width: $md) {
    margin-top: 80px;
  }
}

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
    max-width: $sm;
    margin: 0 auto;

    @media screen and (min-width: $md) {
      max-height: 750px;
      flex: 1 1 50%;
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
        display: block;
        margin-top: 12px;
        margin-bottom: 15px;
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
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;

        @media screen and (min-width: $md) {
          margin-top: 14px;
          font-size: $body-font-size-md;
        }
      }
    }

    &-dimensions {
      margin-top: 28px;

      @media screen and (min-width: $md) {
        margin-top: 20px;
      }

      @media screen and (min-width: $lg) {
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
        justify-content: space-around;
        margin-top: 16px;
        font-size: $body-font-size-sm;

        @media screen and (min-width: $md) {
          justify-content: space-between;
          max-width: 325px;
          margin-top: 24px;
        }
      }

      &__item-value {
        display: block;
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
