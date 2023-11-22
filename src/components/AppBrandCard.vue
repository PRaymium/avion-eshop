<template>
  <div class="brand-card">
    <component :is="iconComponent" class="brand-card__icon"></component>
    <h4 class="brand-card__heading">{{ title }}</h4>
    <p class="brand-card__desciption">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  iconComponent: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.brand-card {
  padding: 36px 24px;
  box-sizing: border-box;
  background-color: $light-gray;

  @media screen and (min-width: $lg) {
    padding: 48px;
  }

  &__heading {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  &__desciption {
    margin-bottom: 0;
  }
}
</style>
