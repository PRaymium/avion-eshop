<template>
  <picture class="product-picture loading">
    <template v-if="props.onlyXs">
      <img
        class="product-picture__img"
        :src="`${IMG_PATH}/product-${props.productId}-160w.jpg`"
        :alt="props.isLoaded ? props.title : undefined"
        :width="IMG_SIZES[160].width"
        :height="IMG_SIZES[160].height"
      />
    </template>
    <template v-else-if="props.forProductInfo">
      <source
        :media="`(max-width: ${breakpoints.xs}px)`"
        :srcset="`${IMG_PATH}/product-${props.productId}-300w.jpg`"
        :width="IMG_SIZES[300].width"
        :height="IMG_SIZES[300].height"
      />
      <img
        class="product-picture__img"
        :src="`${IMG_PATH}/product-${props.productId}-610w.jpg`"
        :alt="props.isLoaded ? props.title : undefined"
        :width="IMG_SIZES[610].width"
        :height="IMG_SIZES[610].height"
      />
    </template>
    <template v-else>
      <source
        :media="`(max-width: ${breakpoints.xs}px)`"
        :srcset="`${IMG_PATH}/product-${props.productId}-160w.jpg`"
        :width="IMG_SIZES[160].width"
        :height="IMG_SIZES[160].height"
      />
      <img
        class="product-picture__img"
        :src="`${IMG_PATH}/product-${props.productId}-300w.jpg`"
        :alt="props.isLoaded ? props.title : undefined"
        :width="IMG_SIZES[300].width"
        :height="IMG_SIZES[300].height"
      />
    </template>
  </picture>
</template>

<script setup lang="ts">
import { breakpoints } from '@/breakpoints'

interface Props {
  productId: number
  title?: string
  onlyXs?: boolean
  forProductInfo?: boolean
  isLoaded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  onlyXs: false,
  forProductInfo: false,
  isLoaded: true
})

const IMG_PATH = '/img/products'

const IMG_SIZES: Record<number, { width: number; height: number }> = {
  160: {
    width: 160,
    height: 200
  },
  300: {
    width: 300,
    height: 370
  },
  610: {
    width: 610,
    height: 750
  }
}
</script>

<style lang="scss" scoped>
.product-picture {
  width: 100%;

  &__img {
    width: 100%;
    height: auto;
    text-indent: -10000px;
  }
}
</style>
