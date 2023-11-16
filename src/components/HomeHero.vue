<template>
  <div class="hero">
    <div class="hero-content">
      <div class="container">
        <h2 class="hero-heading">
          Luxury homeware for people who love timeless design quality
        </h2>
        <p class="p-medium">
          With our new collection, view over 400 bespoke pieces from homeware
          through to furniture today
        </p>
        <ButtonLink
          type="link"
          style-type="secondary"
          :is-wide="true"
          class="hero-link"
          >View collection</ButtonLink
        >
      </div>
    </div>
    <img src="img/hero-sm.jpg" alt="Modern interior" class="hero-img" />
  </div>
</template>

<script setup>
import ButtonLink from './UI/ButtonLink.vue'
</script>

<style lang="scss" scoped>
.hero {
  &-heading {
    margin-bottom: 12px;
    font-size: 24px;
    line-height: normal;
  }

  &-link {
    margin-top: 32px;
  }

  &-img {
    margin-top: 32px;
  }
}
</style>
