<template>
  <div class="products">
    <div class="container">
      <h2 v-if="title" class="products-heading">
        What makes our brand different
      </h2>
      <ul class="products-list">
        <li class="products-item" v-for="product of products" :key="product.id">
          <AppProductsCard
            :title="product.title"
            :price="product.price"
            :img-path="product.img"
            :link="product.link"
          ></AppProductsCard>
        </li>
      </ul>
      <a
        href="#"
        class="btn btn_secondary btn_medium btn_w100-link products-link"
        >View collection</a
      >
    </div>
  </div>
</template>

<script setup>
import AppProductsCard from './AppProductsCard.vue'

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
    img: 'src/assets/img/products/product-1.jpg',
    link: '',
    price: 155
  },
  {
    id: 2,
    title: 'The Lucy Lamp',
    img: 'src/assets/img/products/product-2.jpg',
    link: '',
    price: 399
  },
  {
    id: 3,
    title: 'The Silky Vase',
    img: 'src/assets/img/products/product-3.jpg',
    link: '',
    price: 125
  },
  {
    id: 4,
    title: 'The Dandy chair',
    img: 'src/assets/img/products/product-4.jpg',
    link: '',
    price: 250
  }
]
</script>

<style lang="scss" scoped>
.products {
  padding: 25px 0;

  &-heading {
    margin-bottom: 36px;
    font-size: 20px;
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px 16px;
  }

  &-link {
    margin-top: 40px;
  }
}
</style>
