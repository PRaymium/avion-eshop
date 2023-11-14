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
        <a href="#" class="btn btn_secondary btn_medium btn_w100-link hero-link"
          >View collection</a
        >
      </div>
    </div>
    <img
      src="@/assets/img/hero-sm.jpg"
      alt="Modern interior"
      class="hero-img"
    />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.hero {
  padding-top: 47px;

  &-heading {
    margin-bottom: 12px;
    font-size: 24px;
    line-height: normal;
  }

  &-link {
    margin-top: 32px;
  }

  &-img {
    padding-top: 32px;
  }
}
</style>
