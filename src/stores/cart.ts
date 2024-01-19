import { defineStore } from 'pinia'
import { ref, computed, watch, type Ref } from 'vue'

type CountMap = Map<number, number>

export const useCartStore = defineStore('cart', () => {
  const _countMap: Ref<CountMap> = ref(new Map())

  const localStorageKey = 'cart'

  const localStorageString = localStorage.getItem(localStorageKey);
  if (typeof localStorageString === 'string') {
    _countMap.value = new Map(
      Object.entries<number>(JSON.parse(localStorageString)).map(
        ([key, value]) => [+key, value]
      )
    ) as CountMap
  }

  const size = computed(() => _countMap.value.size)

  const items = computed(() => Object.fromEntries(_countMap.value))

  function set(id: number, count: number) {
    _countMap.value.set(id, count)
  }

  function remove(id: number) {
    _countMap.value.delete(id)
  }

  function clear() {
    _countMap.value.clear()
  }

  watch(
    () => _countMap.value,
    () => {
      localStorage.setItem(localStorageKey, JSON.stringify(items.value))
    },
    {
      deep: true
    }
  )

  return { size, items, set, remove, clear }
})
