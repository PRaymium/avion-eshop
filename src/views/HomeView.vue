<template>
  <section class="section-hero">
    <AppHero />
  </section>
  <section class="section-features">
    <AppFeatures />
  </section>
  <section class="section-products">
    <AppProducts />
  </section>
  <section class="section-hero2">
    <AppHero2 />
  </section>
  <section class="section-join">
    <AppJoin />
  </section>
</template>

<script setup>
import AppHero from '../components/AppHero.vue'
import AppFeatures from '../components/AppFeatures.vue'
import AppProducts from '../components/AppProducts.vue'
import AppHero2 from '../components/AppHero2.vue'
import AppJoin from '../components/AppJoin.vue'
</script>

<style lang="scss" scoped>
.section-hero {
  margin-top: 50px;

  @media screen and (min-width: $md) {
    margin-top: 0;
  }
}

.section-features {
  margin-top: 50px;

  @media screen and (min-width: $lg) {
    margin-top: 80px;
  }
}

.section-products {
  margin-top: 75px;

  @media screen and (min-width: $md) {
    margin-top: 110px;
  }
}

.section-hero2 {
  margin-top: 60px;

  @media screen and (min-width: $md) {
    margin-top: 100px;
  }
}

.section-join {
  margin-top: 30px;

  @media screen and (min-width: $md) {
    margin-top: 60px;
  }
}
</style>
