<template>
  <div class="hero">
    <div class="hero-content">
      <div class="hero-content__text">
        <div class="container hero-content__text-container">
          <h2 class="hero-content__heading">
            Luxury homeware for people who love timeless design quality
          </h2>
          <p class="hero-content__description">
            With our new collection, view over 400 bespoke pieces from homeware
            through to furniture today
          </p>
          <ButtonLink
            type="link"
            style-type="secondary"
            :is-wide="true"
            class="hero-content__link"
            >View collection</ButtonLink
          >
        </div>
      </div>
      <picture>
        <source
          :media="`(max-width: ${breakpoints.xs}px)`"
          srcset="img/hero/hero-390w.jpg"
        />
        <img class="hero-content__img" src="img/hero/hero-640w.jpg" alt="" />
      </picture>
    </div>
  </div>
</template>

<script setup>
import ButtonLink from './UI/ButtonLink.vue'
import { breakpoints } from '../breakpoints'
</script>

<style lang="scss" scoped>
.hero {
  padding: 0;

  @media screen and (min-width: $md) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 50vw;
    max-height: 700px;
    padding: 0 $container-padding-md;
    box-sizing: border-box;
    background-image: url(img/hero/hero-768w.jpg);
    background-repeat: no-repeat;
    background-size: cover;
  }

  @media screen and (min-width: $lg) {
    background-image: url(img/hero/hero-1024w.jpg);
  }

  @media screen and (min-width: $xl) {
    padding: 0 $container-padding-xl;
    background-image: url(img/hero/hero.jpg);
  }

  &-content {
    box-sizing: border-box;

    @media screen and (min-width: $md) {
      display: flex;
      flex-direction: column;
      width: 50%;
      min-height: 60%;
      max-height: 90%;
      padding: 20px 25px;
      background-color: $white;
    }

    @media screen and (min-width: $lg) {
      padding: 45px 55px;
    }

    &__text {
      flex-grow: 1;
      display: flex;

      &-container {
        @media screen and (min-width: $md) {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding: 0;
        }
      }
    }

    &__heading {
      margin-bottom: 12px;
      font-size: normal;
      line-height: normal;

      @media screen and (min-width: $lg) {
        margin-bottom: 20px;
      }
    }

    &__description {
      @media screen and (min-width: $lg) {
        margin-top: 0;
        font-size: $body-font-size-lg;
      }
    }

    &__link {
      margin-top: 32px;

      @media screen and (min-width: $md) {
        align-self: flex-start;
        width: auto;
        margin-top: auto;
      }
    }

    &__img {
      width: 100%;
      margin-top: 32px;

      @media screen and (min-width: $md) {
        display: none;
      }
    }
  }
}
</style>
