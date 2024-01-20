<template>
  <AppHeader class="header" />
  <main class="main">
    <slot>Layout content</slot>
  </main>
  <AppFooter />
  <ButtonToTop />
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ButtonToTop from '@/components/ButtonToTop.vue'
import { onMounted, onUnmounted } from 'vue'

function changeHeaderOnScroll() {
  const header = document.querySelector('.header')
  if (window.scrollY != 0) header?.classList.add('scrolled')
  else header?.classList.remove('scrolled')
}

onMounted(() => {
  document.addEventListener('scroll', changeHeaderOnScroll)
})

onUnmounted(() => {
  document.removeEventListener('scroll', changeHeaderOnScroll)
})
</script>

<style lang="scss" scope>
.main {
  flex-grow: 1;
}

.header {
  position: sticky;
  top: 0;
  transition: box-shadow 0.1s ease-in-out;
  z-index: 50;

  &.scrolled {
    box-shadow: 0 20px 20px -20px rgba($color: #000000, $alpha: 0.2);
  }
}
</style>
