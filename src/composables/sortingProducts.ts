import type IProduct from '@/models/Product'
import { SortingName, type ISorting } from '@/models/Sorting'

export function useSortingProducts(
  products: IProduct[],
  selectedSortItem: ISorting
) {
  const data = products
  data.sort((a, b) => {
    switch (selectedSortItem.name) {
      case SortingName.name: {
        if (a.name > b.name) return 1
        else if (a.name < b.name) return -1
        else return 0
      }

      case SortingName.price: {
        return a.price - b.price
      }
    }
  })

  if (selectedSortItem.reverse) data.reverse()

  return data
}
