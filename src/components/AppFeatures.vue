<template>
  <div class="features">
    <div class="container">
      <h2 class="h3 features__heading">What makes our brand different</h2>
      <ul class="features-list">
        <li class="features-list__item" v-for="card of cards" :key="card.id">
          <div class="features-card">
            <IconBase
              class="features-card__icon"
              :width="24"
              :height="24"
              icon-name="test"
            >
              <component :is="card.icon" />
            </IconBase>
            <h3 class="h4 features-card__heading">{{ card.title }}</h3>
            <p class="features-card__desciption">{{ card.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import IconBase from '@/components/icons/IconBase.vue'
import IconDelivery from '@/components/icons/IconDelivery.vue'
import IconCheckmarkOutline from '@/components/icons/IconCheckmarkOutline.vue'
import IconPurchase from '@/components/icons/IconPurchase.vue'
import IconSprout from '@/components/icons/IconSprout.vue'

const cards = [
  {
    id: 1,
    title: 'Next day as standard',
    description: 'Order before 3pm and get your order the next day as standard',
    icon: IconDelivery
  },
  {
    id: 2,
    title: 'Made by true artisans',
    description:
      'Handmade crafted goods made with real passion and craftmanship',
    icon: IconCheckmarkOutline
  },
  {
    id: 3,
    title: 'Unbeatable prices',
    description:
      'For our materials and quality you won’t find better prices anywhere',
    icon: IconPurchase
  },
  {
    id: 4,
    title: 'Recycled packaging',
    description:
      'We use 100% recycled to ensure our footprint is more manageable',
    icon: IconSprout
  }
]
</script>

<style lang="scss" scoped>
.features {
  &__heading {
    margin-bottom: 36px;

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

  &-card {
    display: flex;
    flex-direction: column;
    height: 100%;
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
      margin-top: auto;
    }
  }
}
</style>
