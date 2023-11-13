<script setup>
import AppHeader from '../components/AppHeader.vue'
import HomeHero from '../components/HomeHero.vue'
import HomeBrand from '../components/HomeBrand.vue'
</script>

<template>
  <AppHeader />
  <main class="main">
    <section class="section-hero">
      <HomeHero />
    </section>
    <section class="section-brand">
      <HomeBrand />
    </section>
  </main>
</template>

<style lang="scss" scoped></style>
