<template>
  <div class="products">
    <div class="container">
      <h2 v-if="title" class="products-heading">
        {{ title }}
      </h2>
      <ul class="products-list">
        <li class="products-item" v-for="product of products" :key="product.id">
          <AppProductsCard
            :id="product.id"
            :title="product.title"
            :price="product.price"
            :link="product.link"
          ></AppProductsCard>
        </li>
      </ul>
      <ButtonLink
        type="link"
        style-type="secondary"
        :is-wide-on-mobile="true"
        class="products-link"
        >View collection</ButtonLink
      >
    </div>
  </div>
</template>

<script setup>
import AppProductsCard from './AppProductsCard.vue'
import ButtonLink from './UI/ButtonLink.vue'

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const products = [
  {
    id: 1,
    title: 'Rustic Vase Set',
    link: '',
    price: 155
  },
  {
    id: 2,
    title: 'The Lucy Lamp',
    link: '',
    price: 399
  },
  {
    id: 3,
    title: 'The Silky Vase',
    link: '',
    price: 125
  },
  {
    id: 4,
    title: 'The Dandy chair',
    link: '',
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
