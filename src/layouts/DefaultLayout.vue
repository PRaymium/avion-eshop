<template>
  <AppHeader />
  <main class="main">
    <slot>Layout content</slot>
  </main>
  <AppFooter />
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<style lang="scss">
.main {
  flex-grow: 1;
}
</style>
