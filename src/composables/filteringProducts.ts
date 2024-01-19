import type IProduct from '@/models/Product.ts'
import { FilterTypes, type Filter } from '@/models/Filter.ts'

export function useFilteringProducts(products: IProduct[], filters: Filter[]) {
  let data = products

  filters.forEach((filter) => {
    switch (filter.type) {
      case FilterTypes.checkboxList: {
        const selectedNames = filter.value
          .filter((item) => filter.checkedIds.has(item.id))
          .map(({ name }) => name)

        if (selectedNames.length) {
          data = data.filter((product) =>
            selectedNames.some((name) => name === product[filter.name])
          )
        }

        break
      }

      case FilterTypes.range: {
        const minValue = filter.value.minValue ?? filter.value.min
        const maxValue = filter.value.maxValue ?? filter.value.max

        if (minValue && maxValue) {
          data = data.filter(
            (product) =>
              product[filter.name] >= minValue &&
              product[filter.name] <= maxValue
          )
        }

        break
      }

      default: {
        throw new Error('Filter type not defined!')
      }
    }
  })

  return data
}
