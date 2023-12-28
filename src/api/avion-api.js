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
  async getProductById(id) {
    try {
      const response = await fetch('/api/products.json')
      const data = await response.json()
      const item = data.find((item) => item.id === id)
      return item
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
}

export default new AvionApi()
