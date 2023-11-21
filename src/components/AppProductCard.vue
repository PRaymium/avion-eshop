<template>
  <div class="product-card">
    <router-link :to="link" class="product-card__link">
      <picture>
        <source
          :media="`(max-width: ${breakpoints.xs}px)`"
          :srcset="`${IMG_PATH}/product-${id}-160w.jpg`"
        />
        <img
          class="product-card__img"
          :src="`${IMG_PATH}/product-${id}-300w.jpg`"
          :alt="title"
        />
      </picture>
    </router-link>
    <router-link :to="link" class="product-card__link">
      <h4 class="product-card__heading">{{ title }}</h4>
    </router-link>
    <p class="product-card__price">£{{ price }}</p>
  </div>
</template>

<script setup>
import { breakpoints } from '../breakpoints'
const IMG_PATH = 'img/products'

defineProps({
  id: {
    type: Number,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  link: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.product-card {
  &__heading {
    margin-top: 24px;
    margin-bottom: 8px;
  }

  &__price {
    margin-top: 8px;
    margin-bottom: 0;
  }

  &__link {
    color: $dark-primary;
  }

  &__img {
    width: 100%;
  }
}
</style>
