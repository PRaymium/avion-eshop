<template>
  <div class="products">
    <div class="container">
      <h2 v-if="props.title" class="products-heading">
        {{ props.title }}
      </h2>
      <ul class="products-list">
        <li class="products-item" v-for="product of products" :key="product.id">
          <ProductCard
            :id="product.id"
            :title="product.title"
            :price="product.price"
            title-tag="h3"
          />
        </li>
      </ul>
      <ButtonLink
        type="link"
        :link-obj="{ name: 'catalog' }"
        style-type="secondary"
        :is-wide-on-mobile="true"
        class="products-link"
        >View collection</ButtonLink
      >
    </div>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import ButtonLink from './UI/ButtonLink.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

const products = [
  {
    id: 1,
    title: 'Rustic Vase Set',
    price: 155
  },
  {
    id: 2,
    title: 'The Lucy Lamp',
    price: 399
  },
  {
    id: 3,
    title: 'The Silky Vase',
    price: 125
  },
  {
    id: 4,
    title: 'The Dandy chair',
    price: 250
  }
]
</script>

<style lang="scss" scoped>
.products {
  text-align: center;

  &-heading {
    text-align: left;
    margin-bottom: 20px;

    @media screen and (min-width: $lg) {
      margin-bottom: 35px;
    }
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px 16px;

    @media screen and (min-width: $md) {
      gap: 20px;
    }
  }

  &-item {
    text-align: left;
    flex-basis: calc(50% - 32px); //32px = &-list gap * 2
    flex-grow: 1;

    @media screen and (min-width: $md) {
      flex-basis: calc(25% - 40px); //40px &-list gap * 2
    }
  }

  &-link {
    margin-top: 40px;

    @media screen and (min-width: $md) {
      margin: 48px auto 0 auto;
    }
  }
}
</style>
