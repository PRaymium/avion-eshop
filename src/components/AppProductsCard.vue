<template>
  <div class="products-card">
    <a :href="link" class="product-card__link">
      <img :src="imgPath" :alt="title" class="products-card__img" />
    </a>
    <a :href="link" class="product-card__link">
      <h4 class="products-card__heading">{{ title }}</h4>
    </a>
    <p class="products-card__price">£{{ price }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  imgPath: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.products-card {
  &__heading {
    margin-top: 24px;
    margin-bottom: 8px;
  }

  &__price {
    margin-top: 8px;
    margin-bottom: 0;
  }
}
</style>
