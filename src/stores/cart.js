import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  /** @type {Map<number, number>} */
  const _countMap = reactive(new Map())

  _countMap.set(1, 2)
  _countMap.set(3, 5)

  /**
   * @returns {number}
   */
  const size = computed(() => _countMap.size)

  /**
   * @returns {[k: string]: number}
   */
  const items = computed(() => Object.fromEntries(_countMap))

  /**
   *
   * @param {number} id
   * @param {number} count
   */
  function set(id, count) {
    _countMap.set(id, count)
  }

  /**
   *
   * @param {number} id
   */
  function remove(id) {
    _countMap.delete(id)
  }

  function clear() {
    _countMap.clear()
  }

  return { _countMap, size, items, set, remove, clear }
})
