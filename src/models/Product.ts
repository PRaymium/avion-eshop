export default interface IProduct extends Record<string, any> {
  id: number
  name: string
  price: number
  description: string
  dimensions: {
    unit: string
    height: number
    width: number
    depth: number
  }
  inStock: number
  type: string
  designer: string
}
