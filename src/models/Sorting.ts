export enum SortingName {
  name = 'name',
  price = 'price'
}

export interface ISorting {
  id: number
  title: string
  name: SortingName
  reverse: boolean
}
