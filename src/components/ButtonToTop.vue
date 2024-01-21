<template>
  <Transition name="show">
    <button v-show="isVisible" class="button-to-top" @click="scrollToTop">
      <IconBase
        class="button-to-top__icon"
        :width="36"
        :height="36"
        icon-name="arrow"
        ><IconArrow
      /></IconBase>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import IconBase from '@/components//icons/IconBase.vue'
import IconArrow from '@/components//icons/IconArrow.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onScroll() {
  window.scrollY > 400 ? (isVisible.value = true) : (isVisible.value = false)
}

onMounted(() => {
  document.addEventListener('scroll', onScroll)
}),
  onUnmounted(() => {
    document.removeEventListener('scroll', onScroll)
  })
</script>

<style lang="scss" scope>
.button-to-top {
  overflow: hidden;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 35%;
  color: white;
  background-color: rgba($color: $primary, $alpha: 0.5);
  transition:
    background-color 0.1s ease-in-out,
    transform 0.1s ease-in-out;

  &:hover {
    background-color: rgba($color: $primary, $alpha: 1);
    transform: translateY(-0.5rem);
  }

  &__icon {
    transform: rotate(180deg);
  }
}

.show-enter-active,
.show-leave-active {
  transition: transform 0.3s ease-in-out;
}

.show-enter-from,
.show-leave-to {
  transform: translateY(150%);
}

.show-enter-to,
.show-leave-from {
  transform: translateY(0);
}
</style>
