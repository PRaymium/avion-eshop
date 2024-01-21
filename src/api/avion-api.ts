import { useFilteringProducts } from '@/composables/filteringProducts.ts'
import { useSortingProducts } from '@/composables/sortingProducts.ts'

import type IProduct from '@/models/Product'
import {
  FilterTypes,
  type IFilterApi,
  type Filter,
  type IFiltersApiInfo
} from '@/models/Filter'
import type { ISorting } from '@/models/Sorting'

class AvionApi {
  async getProducts() {
    try {
      const response = await fetch('/api/products.json')
      const data: IProduct[] = await response.json()
      return data
    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  async getPreparedProductsWithFiltersInfo(
    filtersArray: Filter[],
    selectedSortingItem: ISorting
  ) {
    try {
      const response = await fetch('/api/products.json')
      let data: IProduct[] = await response.json()

      // imitation of processing on the backend
      // filtersInfo

      const filtersInfo: IFiltersApiInfo = {}

      filtersArray.forEach((filter) => {
        if (filter.type === FilterTypes.range) {
          if (filter.value.min && filter.value.max) return
          else {
            const priceArray = data.map((product) => product.price)
            filtersInfo[filter.name] = {
              min: Math.min(...priceArray),
              max: Math.max(...priceArray)
            }
          }
        }
      })

      // data preparing
      data = useFilteringProducts(data, filtersArray)
      data = useSortingProducts(data, selectedSortingItem)
      return { filtersInfo, products: data }
    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  async getProductById(id: number | number[]) {
    try {
      const response = await fetch('/api/products.json')
      const data: IProduct[] = await response.json()

      let products: IProduct[] = []

      if (Array.isArray(id)) {
        products = data.filter((item) => id.includes(item.id))
      } else {
        const item = data.find((item) => item.id === id)
        if (item) products.push(item)
      }

      return products
    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  async getCatalogFilters() {
    try {
      const response = await fetch('/api/catalogFilters.json')
      const data: IFilterApi[] = await response.json()

      return data
    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  async getCatalogFilterByName(name: string) {
    try {
      const response = await fetch('/api/catalogFilters.json')
      const data: IFilterApi[] = await response.json()
      const filter = data.find((filter) => filter.name === name)

      return filter
    } catch (e) {
      console.log(e)
      return undefined
    }
  }
}

export default new AvionApi()
