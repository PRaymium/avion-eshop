<template>
  <div class="features-card">
    <component :is="iconComponent" class="features-card__icon"></component>
    <h4 class="features-card__heading">{{ title }}</h4>
    <p class="features-card__desciption">{{ description }}</p>
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
.features-card {
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
