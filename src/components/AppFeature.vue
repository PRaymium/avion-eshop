<template>
  <div class="feature">
    <div class="container feature-container">
      <div class="feature-info">
        <h2 class="feature-heading">It started with a small idea</h2>
        <p class="p-small">
          A global brand with local beginnings, our story begain in a small
          studio in South London in early 2014
        </p>
        <a href="#" class="btn btn_opaque btn_medium btn_w100-link feature-btn"
          >View collection</a
        >
      </div>
      <img src="img/feature.jpg" alt="modern interior" class="feature-img" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.feature {
  padding: 32px 0;

  &-container {
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

  &-btn {
    margin-top: 56px;
  }
}
</style>
