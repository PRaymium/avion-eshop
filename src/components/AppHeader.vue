<template>
  <header class="header">
    <div class="container header-container">
      <div class="header-logo">
        <a href="#" class="header-logo__link">Avion</a>
      </div>
      <div class="header-right">
        <button class="header-btn header-search-toggle">
          <IconSearch />
        </button>
        <button class="header-btn header-menu-toggle">
          <IconBurgerMenu />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import IconBurgerMenu from '@/components/icons/IconBurgerMenu.vue'
</script>

<style lang="scss">
.header {
  padding: 20px 0;

  &-container {
    display: flex;
    justify-content: space-between;
  }

  &-logo {
    &__link {
      font-family: $font-clash-display;
      font-size: 24px;
    }
  }

  &-right {
    display: flex;
  }

  &-btn {
    &:not(:first-child) {
      margin-left: 20px;
    }
  }
}
</style>
