<script setup>
import AppHeader from '../components/AppHeader.vue'
import HomeHero from '../components/HomeHero.vue'
import AppBrand from '../components/AppBrand.vue'
import AppProducts from '../components/AppProducts.vue'
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
  </main>
</template>

<style lang="scss" scoped></style>
