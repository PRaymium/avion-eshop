<template>
  <div class="feature">
    <div class="container">
      <div class="feature__container">
        <div class="feature-info">
          <h2 class="feature-heading">It started with a small idea</h2>
          <p class="feature-description">
            A global brand with local beginnings, our story begain in a small
            studio in South London in early 2014
          </p>
          <ButtonLink
            type="link"
            style-type="opaque"
            :is-wide="true"
            class="feature-btn"
            >View collection</ButtonLink
          >
        </div>
        <picture class="feature__picture">
          <source
            :media="`(max-width: ${breakpoints.xs}px)`"
            srcset="img/feature/feature-390w.jpg"
          />
          <img
            src="img/feature/feature-640w.jpg"
            alt="modern interior"
            class="feature-img"
          />
        </picture>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonLink from './UI/ButtonLink.vue'
import { breakpoints } from '../breakpoints'
</script>

<style lang="scss" scoped>
.feature {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media screen and (min-width: $md) {
      flex-direction: row;
      gap: 16px;
    }
  }

  &-info {
    padding: 36px 32px 30px 32px;
    box-sizing: border-box;
    color: $white;
    background-color: $dark-primary;

    @media screen and (min-width: $md) {
      display: flex;
      flex-direction: column;
      flex: 1 1 50%;
    }

    @media screen and (min-width: $lg) {
      padding: 64px 64px 54px 64px;
    }
  }

  &-heading {
    margin-bottom: 12px;
  }

  &-description {
    font-size: $body-font-size-sm;

    @media screen and (min-width: $md) {
      margin-top: 0;
    }

    @media screen and (min-width: $lg) {
      font-size: $body-font-size-lg;
    }
  }

  &-btn {
    margin-top: 56px;

    @media screen and (min-width: $md) {
      width: auto;
      margin-top: auto;
      align-self: flex-start;
    }
  }

  &__picture {
    @media screen and (min-width: $md) {
      flex: 1 1 50%;
    }
  }

  &-img {
    width: 100%;
    height: 100%;
  }
}
</style>
