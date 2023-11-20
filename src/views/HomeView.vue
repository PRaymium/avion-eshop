<script setup>
import AppHeader from '../components/AppHeader.vue'
import HomeHero from '../components/HomeHero.vue'
import AppBrand from '../components/AppBrand.vue'
import AppProducts from '../components/AppProducts.vue'
import AppFeature from '../components/AppFeature.vue'
import AppJoin from '../components/AppJoin.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <main class="main">
    <section class="section-hero">
      <HomeHero />
    </section>
    <section class="section-brand">
      <AppBrand />
    </section>
    <section class="section-products">
      <AppProducts />
    </section>
    <section class="section-feature">
      <AppFeature />
    </section>
    <section class="section-join">
      <AppJoin />
    </section>
  </main>
  <AppFooter />
</template>

<style lang="scss" scoped>
.section-hero {
  margin-top: 50px;

  @media screen and (min-width: $md) {
    margin-top: 0;
  }
}

.section-brand {
  margin-top: 50px;
}

.section-products {
  margin-top: 75px;
}

.section-feature {
  margin-top: 60px;
}

.section-join {
  margin-top: 30px;
}
</style>
