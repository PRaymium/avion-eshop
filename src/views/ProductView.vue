<script setup>
import AppHeader from '../components/AppHeader.vue'
import ProductInfo from '../components/ProductInfo.vue'
import AppProducts from '../components/AppProducts.vue'
import AppFeatures from '../components/AppFeatures.vue'
import AppJoin from '../components/AppJoin.vue'
import AppFooter from '../components/AppFooter.vue'

const appProductsTitle = 'You might also like'
</script>

<template>
  <AppHeader />
  <main class="main">
    <section class="section-product">
      <ProductInfo />
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
  </main>
  <AppFooter />
</template>

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