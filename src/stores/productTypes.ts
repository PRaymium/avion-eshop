import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import api from '@/api/avion-api'

interface ITypes {
  id: number,
  name: string
}

export const useProductTypesStore = defineStore('productTypes', () => {
  const _types = reactive<ITypes[]>([])

  const items = computed(() => {
    return _types
  })

  api.getCatalogFilterByName('type').then((data) => {
    if (data && Array.isArray(data.value)) {
      data.value.forEach((item) => _types.push(item))
    }
  })

  return { items }
})
