<template>
  <div class="join">
    <div class="join__container">
      <div class="container">
        <h2 class="join-heading">Join the club and get the benefits</h2>
        <p class="join-description">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop up stores and more
        </p>
        <ul class="join-list">
          <li class="join-item" v-for="(benefit, idx) of benefits" :key="idx">
            <span class="join-item__icon">
              <IconCheckmark class="join-item__icon-svg" />
            </span>
            <p class="join-item__text">
              {{ benefit }}
            </p>
          </li>
        </ul>
        <EmailSignUp class="join-form" />
      </div>
    </div>
  </div>
</template>

<script setup>
import IconCheckmark from './icons/IconCheckmark.vue'
import EmailSignUp from './UI/EmailSignUp.vue'

const benefits = ['Exclusive offers', 'Free events', 'Large discounts']
</script>

<style lang="scss" scoped>
.join {
  color: $white;
  background-image: url('img/join/join-bg-390w.jpg');
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (min-width: $md) {
    background-image: url('img/join/join-bg-768w.jpg');
  }

  @media screen and (min-width: $lg) {
    background-image: url('img/join/join-bg-1280w.jpg');
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

  &-heading {
    margin-bottom: 12px;
  }

  &-description {
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
  }

  &-item {
    display: flex;
    gap: 8px;

    &__icon {
      display: flex;
      align-items: center;
    }

    &__text {
      margin: 0;
      font-size: $body-font-size-md;
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
