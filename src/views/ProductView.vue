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
                    class="product-info-controls-amount__stepper"
                    style-type="white"
                    :is-wide-on-mobile="true"
                    :start="countInCart ?? countWithoutCart"
                    :max="product.inStock"
                    @change="stepperHandler"
                  ></AppStepper>
                </div>
                <div class="product-info-controls-buttons">
                  <Transition name="show">
                    <ButtonLink
                      class="product-info-controls-buttons__delete"
                      v-if="countInCart"
                      size="small"
                      :is-wide-on-mobile="true"
                      style-type="secondary-border"
                      aria-label="Remove from cart"
                      @click="removeFromCart"
                    >
                      <IconTrashcan />
                    </ButtonLink>
                  </Transition>

                  <ButtonLink
                    class="product-info-controls-buttons__add"
                    :is-wide-on-mobile="true"
                    :aria-label="countInCart ? 'Go to cart' : 'Add to cart'"
                    @click="addToCart"
                    >{{ countInCart ? 'Go to cart' : 'Add to cart' }}
                  </ButtonLink>
                </div>
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
import ProductPicture from '@/components/ProductPicture.vue'
import AppStepper from '@/components/UI/AppStepper.vue'
import ButtonLink from '@/components/UI/ButtonLink.vue'
import AppProducts from '@/components/AppProducts.vue'
import AppFeatures from '@/components/AppFeatures.vue'
import AppJoin from '@/components/AppJoin.vue'
import IconTrashcan from '@/components/icons/IconTrashcan.vue'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import api from '@/api/avion-api.js'
import { useCartStore } from '@/stores/cart'

const appProductsTitle = 'You might also like'
const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const id = ref(+route.params.id)
const product = ref(getProduct(id.value))

const countWithoutCart = ref(1)
const countInCart = computed(() => cart.items[id.value])

function getProduct(id) {
  api.getProductById(id).then((data) => {
    product.value = data
  })
}

function stepperHandler(value) {
  countWithoutCart.value = value.value

  if (countInCart.value) {
    cart.set(id.value, value.value)
  }
}

function removeFromCart() {
  cart.remove(id.value)
  countWithoutCart.value = 1
}

function addToCart() {
  if (!countInCart.value) {
    cart.set(id.value, countWithoutCart.value)
  } else {
    router.push({ name: 'cart' })
  }
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
      display: flex;
      flex-direction: column;
      margin-top: 32px;
      gap: 16px 48px;

      @media screen and (min-width: $md) {
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 50px;
      }

      &-amount {
        display: flex;
        flex-direction: column;

        @media screen and (min-width: $md) {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          flex: 1 1 0;
          column-gap: 16px;
        }

        &__title {
          flex: 1 1 25%;
        }

        &__stepper {
          margin-top: 12px;

          @media screen and (min-width: $md) {
            flex: 1 1 75%;
            margin-top: 0;
          }
        }
      }

      &-buttons {
        display: flex;
        justify-content: space-between;
        column-gap: 16px;
        overflow: hidden;

        @media screen and (min-width: $md) {
          flex-grow: 1;
        }

        &__add {
          flex: 1 1 75%;
        }

        &__delete {
          flex: 1 1 25%;
        }
      }
    }
  }
}

.show-enter-active {
  transition: transform 0.2s ease;
}

.show-enter-from {
  transform: translateX(-100%);
}

.show-enter-to {
  transform: translateX(0);
}
</style>
