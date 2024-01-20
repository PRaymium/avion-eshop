import { ref } from 'vue'

export function useHeaderHeight() {
  const header = document.querySelector('header')
  const height = ref<number>(header!.offsetHeight)

  return height
}
