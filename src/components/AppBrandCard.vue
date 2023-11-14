<template>
  <div class="brand-card">
    <img :src="iconPath" alt="Icon" class="brand-card__icon" />
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

  iconPath: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.brand-card {
  padding: 36px 24px;
  background-color: $light-gray;

  &__heading {
    margin-top: 12px;
    margin-bottom: 12px;
  }
}
</style>
