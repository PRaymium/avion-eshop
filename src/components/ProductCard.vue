<template>
  <router-link
    :to="{ name: 'product', params: { id: props.id } }"
    class="product-card"
  >
    <ProductPicture :title="props.title" :product-id="props.id" />
    <component :is="titleTag" class="product-card__heading">{{
      props.title
    }}</component>
    <span class="product-card__price">£{{ props.price }}</span>
  </router-link>
</template>

<script setup>
import ProductPicture from '@/components/ProductPicture.vue'

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
  },

  titleTag: {
    type: String,
    default: 'h2',
    validator(value) {
      return ['h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
    }
  }
})
</script>

<style lang="scss" scoped>
.product-card {
  display: block;
  color: $dark-primary;
  transition: 0.1s ease-in-out;

  &:focus {
    outline: 2px solid $primary;
  }

  @media screen and (min-width: $md) {
    &:hover,
    &:focus {
      outline: none;
      transform: scaleY(104%) translateY(2%);
    }
  }

  &__heading {
    font-size: $h4-font-size;
    margin-top: 24px;
    margin-bottom: 0;
  }

  &__price {
    display: inline-block;
    margin-top: 8px;
  }
}
</style>
