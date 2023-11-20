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
        <img src="img/feature.jpg" alt="modern interior" class="feature-img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonLink from './UI/ButtonLink.vue'
</script>

<style lang="scss" scoped>
.feature {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &-info {
    padding: 36px 32px 30px 32px;
    color: $white;
    background-color: $dark-primary;
  }

  &-heading {
    margin-bottom: 12px;
    font-size: 20px;
  }

  &-description {
    font-size: $body-font-sm;
  }

  &-btn {
    margin-top: 56px;
  }
}
</style>
