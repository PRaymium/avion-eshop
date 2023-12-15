<template>
  <picture class="product-picture">
    <source
      :media="`(max-width: ${breakpoints.xs}px)`"
      :srcset="`${IMG_PATH}/product-${props.productId}-160w.jpg`"
    />
    <img
      class="product-picture__img"
      :src="`${IMG_PATH}/product-${props.productId}-300w.jpg`"
      :alt="props.title"
    />
  </picture>
</template>

<script setup>
import { breakpoints } from '../breakpoints'
const IMG_PATH = 'img/products'

const props = defineProps({
  productId: {
    type: Number,
    required: true
  },

  title: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.product-picture {
  display: block;
  width: 100%;
}
</style>
