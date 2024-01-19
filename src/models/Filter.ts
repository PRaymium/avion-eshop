export interface IFilterCheckboxListValue {
  id: number
  name: string
}

export interface IFilterRangeValue {
  [key: string]: number | undefined
  min?: number
  max?: number
  minValue?: number
  maxValue?: number
}

export type FilterValue = IFilterCheckboxListValue[] | IFilterRangeValue

export enum FilterTypes {
  checkboxList = 'checkboxList',
  range = 'range'
}

export interface IFilterApi {
  name: string
  value: FilterValue
}

interface IFilter extends IFilterApi {
  title: string
  type: FilterTypes
}

export interface IFilterCheckboxList extends IFilter {
  type: FilterTypes.checkboxList
  value: IFilterCheckboxListValue[]
  checkedIds: Set<number>
}

export interface IFilterRange extends IFilter {
  type: FilterTypes.range
  value: IFilterRangeValue
}

export type Filter = IFilterCheckboxList | IFilterRange

export interface IFiltersApiInfo {
  [key: string]: {
    [key: string]: number | undefined
    min: number
    max: number
    minValue?: number
    maxValue?: number
  }
}
