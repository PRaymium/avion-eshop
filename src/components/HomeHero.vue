<template>
  <div class="hero">
    <div class="hero__container">
      <div class="container hero__bg-container">
        <div class="hero-content">
          <div class="container hero-content__container">
            <h2 class="hero-content__heading">
              Luxury homeware for people who love timeless design quality
            </h2>
            <p class="p-medium">
              With our new collection, view over 400 bespoke pieces from
              homeware through to furniture today
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
      </div>
      <picture>
        <source
          :media="`(max-width: ${breakpoints.xs}px)`"
          srcset="img/hero-390w.jpg"
        />
        <img class="hero-img" src="img/hero-640w.jpg" alt="" />
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
  &__bg-container {
    padding: 0;

    @media screen and (min-width: $md) {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 50vw;
      padding: 0 $container-padding-md;
      box-sizing: border-box;
      background-image: url(img/hero-768w.jpg);
      background-repeat: no-repeat;
      background-size: cover;
    }

    @media screen and (min-width: $lg) {
      background-image: url(img/hero-1024w.jpg);
    }

    @media screen and (min-width: $xl) {
      background-image: url(img/hero.jpg);

      background-size: cover;
    }
  }

  &-content {
    @media screen and (min-width: $md) {
      width: 50%;
      height: 80%;
      background-color: $white;
    }

    @media screen and (min-width: $lg) {
      height: 60%;
    }

    &__container {
      box-sizing: border-box;

      @media screen and (min-width: $md) {
        display: flex;
        flex-direction: column;
        padding: 20px 25px;
        height: 100%;
      }

      @media screen and (min-width: $lg) {
        padding: 45px 55px;
      }
    }

    &__heading {
      margin-bottom: 12px;
      font-size: 24px;
      line-height: normal;
    }

    &__link {
      margin-top: 32px;

      @media screen and (min-width: $md) {
        align-self: flex-start;
        justify-self: flex-start;
        width: auto;
        margin-top: auto;
      }
    }
  }

  &-img {
    width: 100%;
    margin-top: 32px;

    @media screen and (min-width: $md) {
      display: none;
    }
  }
}
</style>
