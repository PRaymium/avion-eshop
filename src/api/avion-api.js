import { useFilteringProducts } from '@/composables/filteringProducts.js'
import { useSortingProducts } from '@/composables/sortingProducts.js'

class AvionApi {
  async getProducts() {
    try {
      const response = await fetch('/api/products.json')
      const data = await response.json()
      return data
    } catch (e) {
      console.log(e)
    }
  }

  async getPreparedProductsWithFiltersInfo(filtersArray, selectedSortingItem) {
    try {
      const response = await fetch('/api/products.json')
      let data = await response.json()

      // imitation of processing on the backend
      // filtersInfo
      const filtersInfo = {}
      filtersArray.forEach((filter) => {
        if (filter.type === 'range') {
          if (filter.params.min && filter.params.max) return
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
    }
  }

  async getProductById(id) {
    try {
      const response = await fetch('/api/products.json')
      const data = await response.json()

      const item = data.find((item) => item.id === id)
      return item

      // return new Promise(function (resolve) {
      //   setTimeout(() => {
      //     const item = data.find((item) => item.id === id)
      //     resolve(item)
      //   }, 500)
      // })
    } catch (e) {
      console.log(e)
      return {}
    }
  }

  async getProductsByIds(idsArray) {
    try {
      const response = await fetch('/api/products.json')
      const data = await response.json()
      const array = data.filter((item) => idsArray.includes(item.id))
      return array
    } catch (e) {
      console.log(e)
      return {}
    }
  }

  async getCatalogFilters() {
    try {
      const response = await fetch('/api/catalogFilters.json')
      const data = await response.json()
      return data
    } catch (e) {
      console.log(e)
      return {}
    }
  }

  async getCatalogFilterByName(name) {
    try {
      const response = await fetch('/api/catalogFilters.json')
      let data = await response.json()
      data = data.find((filter) => filter.name === name).items
      return data
    } catch (e) {
      console.log(e)
      return {}
    }
  }
}

export default new AvionApi()
