export function useSortingProducts(products, selectedSortItem) {
  let data = products
  data.sort((a, b) => {
    if (selectedSortItem.name === 'name') {
      if (a.name > b.name) return 1
      else if (a.name < b.name) return -1
      else return 0
    } else if (selectedSortItem.name === 'price') return a.price - b.price
  })

  if (selectedSortItem.reverse) data.reverse()

  return data
}
