<template>
  <div class="products">
    <div class="container">
      <h2 v-if="props.title" class="products-heading">
        {{ props.title }}
      </h2>
      <ul class="products-list">
        <template v-if="!isLoaded">
          <li
            class="products-item"
            v-for="product of ids.length"
            :key="product"
          >
            <ProductCard title-tag="h3" :is-loaded="false" />
          </li>
        </template>
        <template v-else>
          <li
            class="products-item"
            v-for="product of products"
            :key="product.id"
          >
            <ProductCard
              :id="product.id"
              :title="product.name"
              :price="product.price"
              title-tag="h3"
              :is-loaded="isLoaded"
            />
          </li>
        </template>
      </ul>
      <ButtonLink
        type="link"
        :link="{ name: 'catalog' }"
        style-type="secondary"
        :is-wide-on-mobile="true"
        class="products-link"
        >View collection</ButtonLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import ButtonLink from '@/components/UI/ButtonLink.vue'
import { ref } from 'vue'
import api from '@/api/avion-api.js'

import type IProduct from '@/models/Product'

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: ''
})

const products = ref<IProduct[]>([])

const isLoaded = ref(false)

const ids = [1, 2, 3, 4]

// ids.forEach((id) => {
//   products.value.push({ id: id, name: 'Title', price: 100 })
// })

api.getProductById(ids).then((data) => {
  if (data) {
    products.value = data
    isLoaded.value = true
  }
})
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
