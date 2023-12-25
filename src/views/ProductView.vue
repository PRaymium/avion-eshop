<template>
  <section class="section-product">
    <ProductInfo :product-id="id" />
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
import ProductInfo from '../components/ProductInfo.vue'
import AppProducts from '../components/AppProducts.vue'
import AppFeatures from '../components/AppFeatures.vue'
import AppJoin from '../components/AppJoin.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const appProductsTitle = 'You might also like'
const route = useRoute()

const id = ref(+route.params.id)
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
</style>
