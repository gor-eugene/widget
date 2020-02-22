import { Widget } from '../widget'

export enum ProductTabsStrategy {
  REPLACE = 'replace',
  ADD = 'add'
}

export interface ProductTabsItem {
  title: string
  alias: string
  active: (widget: Widget) => boolean
  callback: (tab: ProductTabsItem, widget: Widget) => void
}

export interface ProductTabs {
  strategy: ProductTabsStrategy
  tabs?: ProductTabsItem[]
}
