<template>
  <div class="join">
    <div class="container">
      <div class="join__container">
        <h2 class="join__heading">Join the club and get the benefits</h2>
        <p class="join__description">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop up stores and more
        </p>
        <ul class="join-list">
          <li
            class="join-list-item"
            v-for="(benefit, idx) of benefits"
            :key="idx"
          >
            <span class="join-list-item__icon">
              <IconBase
                class="join-list-item__icon-svg"
                :width="16"
                :height="16"
                icon-name="checkmark"
                ><IconCheckmark
              /></IconBase>
            </span>
            <span class="join-list-item__text">
              {{ benefit }}
            </span>
          </li>
        </ul>
        <EmailSignUp class="join-form" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconBase from '@/components/icons/IconBase.vue'
import IconCheckmark from '@/components/icons/IconCheckmark.vue'
import EmailSignUp from '@/components/EmailSignUp.vue'

const benefits = ['Exclusive offers', 'Free events', 'Large discounts']
</script>

<style lang="scss" scoped>
.join {
  color: $white;
  background-image: url('/img/join/join-bg-390w.jpg');
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (min-width: $md) {
    background-image: url('/img/join/join-bg-768w.jpg');
  }

  @media screen and (min-width: $lg) {
    background-image: url('/img/join/join-bg-1280w.jpg');
  }

  &__container {
    padding: 24px 0 32px 0;

    @media screen and (min-width: $md) {
      margin: 0 auto;
      padding: 100px 0 85px 0;
      width: 65%;
      text-align: center;
    }
  }

  &__heading {
    margin-bottom: 12px;
  }

  &__description {
    font-size: $body-font-size-sm;

    @media screen and (min-width: $lg) {
      font-size: $body-font-size-lg;
    }
  }

  &-list {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    margin-top: 20px;

    @media screen and (min-width: $md) {
      flex-direction: row;
      justify-content: space-around;
      margin-top: 30px;
    }

    &-item {
      display: flex;
      gap: 8px;

      &__icon {
        display: flex;
        align-items: center;
      }
    }
  }

  &-form {
    margin-top: 28px;

    @media screen and (min-width: $md) {
      margin-top: 40px;
      margin-left: auto;
      margin-right: auto;
      width: 95%;
    }
  }
}
</style>
