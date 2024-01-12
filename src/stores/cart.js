import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  /** @type {Map<number, number>} */
  const _countMap = ref(new Map())

  // _countMap.value.set(7, 2)
  // _countMap.value.set(8, 4)

  const localStorageKey = 'cart'

  if (localStorage.getItem(localStorageKey)) {
    _countMap.value = new Map(
      Object.entries(JSON.parse(localStorage.getItem(localStorageKey))).map(
        ([key, value]) => [+key, value]
      )
    )
  }

  /**
   * @returns {number}
   */
  const size = computed(() => _countMap.value.size)

  /**
   * @returns {[k: string]: number}
   */
  const items = computed(() => Object.fromEntries(_countMap.value))

  /**
   *
   * @param {number} id
   * @param {number} count
   */
  function set(id, count) {
    _countMap.value.set(id, count)
  }

  /**
   *
   * @param {number} id
   */
  function remove(id) {
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
