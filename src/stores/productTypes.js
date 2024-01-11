import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import api from '@/api/avion-api'

export const useProductTypesStore = defineStore('productTypes', () => {
  /** @type {{id: number, name: string}[]} */
  const _types = reactive([])

  const items = computed(() => {
    return _types
  })

  api.getCatalogFilterByName('type').then((data) => {
    data.forEach((item) => _types.push(item))
  })

  return { items }
})
