<template>
  <div class="hero">
    <div class="container hero__container">
      <div class="hero-info">
        <h2 class="hero-info__heading">It started with a small idea</h2>
        <p class="hero-info__description">
          A global brand with local beginnings, our story begain in a small
          studio in South London in early 2014
        </p>
        <ButtonLink
          class="hero-info__btn"
          type="link"
          :link="{ name: 'catalog' }"
          style-type="opaque"
          :is-wide-on-mobile="true"
          >View collection</ButtonLink
        >
      </div>
      <picture class="hero-picture">
        <source
          :media="`(max-width: ${breakpoints.xs}px)`"
          srcset="/img/hero2/hero2-390w.jpg"
        />
        <img
          src="/img/hero2/hero2-640w.jpg"
          alt="modern interior"
          class="hero-picture__img"
        />
      </picture>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonLink from '@/components/UI/ButtonLink.vue'
import { breakpoints } from '@/breakpoints'
</script>

<style lang="scss" scoped>
.hero {
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

    &__heading {
      margin-bottom: 12px;
    }

    &__description {
      font-size: $body-font-size-sm;

      @media screen and (min-width: $md) {
        margin-top: 0;
      }

      @media screen and (min-width: $lg) {
        font-size: $body-font-size-lg;
      }
    }

    &__btn {
      margin-top: 56px;

      @media screen and (min-width: $md) {
        margin-top: auto;
        align-self: flex-start;
      }
    }
  }

  &-picture {
    @media screen and (min-width: $md) {
      flex: 1 1 50%;
    }

    &__img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
