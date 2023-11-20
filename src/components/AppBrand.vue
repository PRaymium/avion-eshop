<template>
  <div class="brand">
    <div class="container">
      <h3 class="brand-heading">What makes our brand different</h3>
      <ul class="brand-list">
        <li class="brand-item" v-for="card of cards" :key="card.id">
          <AppBrandCard
            :title="card.title"
            :description="card.desciption"
            :icon-path="card.icon"
          ></AppBrandCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import AppBrandCard from './AppBrandCard.vue'

const cards = [
  {
    id: 1,
    title: 'Next day as standard',
    desciption: 'Order before 3pm and get your order the next day as standard',
    icon: 'icons/Delivery.svg'
  },
  {
    id: 2,
    title: 'Made by true artisans',
    desciption:
      'Handmade crafted goods made with real passion and craftmanship',
    icon: 'icons/Checkmark.svg'
  },
  {
    id: 3,
    title: 'Unbeatable prices',
    desciption:
      'For our materials and quality you won’t find better prices anywhere',
    icon: 'icons/Purchase.svg'
  },
  {
    id: 4,
    title: 'Recycled packaging',
    desciption:
      'We use 100% recycled to ensure our footprint is more manageable',
    icon: 'icons/Sprout.svg'
  }
]
</script>

<style lang="scss" scoped>
.brand {
  &-heading {
    margin-bottom: 36px;
    font-size: 20px;

    @media screen and (min-width: $lg) {
      text-align: center;
    }
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 25px;

    @media screen and (min-width: $lg) {
      flex-direction: row;
    }
  }
}
</style>
