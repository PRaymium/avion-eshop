export function useFilteringProducts(products, filters) {
  let data = products

  filters.forEach((filter) => {
    switch (filter.type) {
      case 'checkboxList': {
        const selectedNames = filter.items
          .filter((item) => item.isChecked)
          .map(({ name }) => name)

        if (selectedNames.length) {
          data = data.filter((product) =>
            selectedNames.some((name) => name === product[filter.name])
          )
        }
        break
      }

      case 'range': {
        const minValue = filter.params.minValue ?? filter.params.min
        const maxValue = filter.params.maxValue ?? filter.params.max

        if (!minValue && !maxValue) break

        data = data.filter(
          (product) =>
            product[filter.name] >= minValue && product[filter.name] <= maxValue
        )
        break
      }

      default: {
        throw new Error('Filter type not defined!')
      }
    }
  })

  return data
}
