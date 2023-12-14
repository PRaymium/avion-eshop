class AvionApi {
  async getProducts() {
    try {
      const response = await fetch('./api/products.json')
      const data = await response.json()
      return data
    } catch (e) {
      console.log(e)
    }
  }
}

export default new AvionApi()
