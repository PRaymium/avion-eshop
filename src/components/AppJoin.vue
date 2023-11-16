<template>
  <div class="join">
    <div class="join__container">
      <div class="container">
        <h2 class="join-heading">Join the club and get the benefits</h2>
        <p class="p-small">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop up stores and more
        </p>
        <ul class="join-list">
          <li class="join-item" v-for="(benefit, idx) of benefits" :key="idx">
            <span class="join-item__icon">
              <IconCheckmark class="join-item__icon-svg" />
            </span>
            <p class="p-medium join-item__text">
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

  &__container {
    padding: 24px 0 32px 0;
    background: url('img/join-bg.jpg') 40% 70% no-repeat;
  }

  &-heading {
    margin-bottom: 12px;
    font-size: 24px;
  }

  &-list {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    margin-top: 20px;
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
    }
  }

  &-form {
    margin-top: 28px;
  }
}
</style>
