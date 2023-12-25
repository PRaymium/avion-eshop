<template>
  <div class="product-card">
    <router-link
      :to="{ name: 'product', params: { id: props.id } }"
      class="product-card__link"
    >
      <ProductPicture :title="props.title" :product-id="props.id" />
      <h4 class="product-card__heading">{{ props.title }}</h4>
      <span class="product-card__price">£{{ props.price }}</span>
    </router-link>
  </div>
</template>

<script setup>
import ProductPicture from './ProductPicture.vue'

const props = defineProps({
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
  }
})
</script>

<style lang="scss" scoped>
.product-card {
  &__link {
    display: block;
    color: $dark-primary;
  }

  &__heading {
    margin-top: 24px;
    margin-bottom: 8px;
  }

  &__price {
    margin-top: 8px;
  }
}
</style>
