import { AxiosInstance } from 'axios'
import {
  Sources,
  AccountInterface,
  AccountUserInterface,
  ProductInterface,
  AccountProductInterface
} from '@amodev/interfaces'
import { ProductTabs } from './ProductTabs'
import { AccessRules } from './AccessRules'

export enum LogTypes {
  DEFAULT = 'log',
  ERROR = 'error',
  WARNING = 'warn',
  INFO = 'info',
  TRACE = 'trace'
}

export interface WidgetInterface {
  uuid: string
  widget: any
  source: Sources
  debug: boolean
  account: AccountInterface | null
  accountUser: AccountUserInterface | null
  product: ProductInterface | null
  accountProduct: AccountProductInterface | null

  $amodevHubTab: string
  $amodevBaseUrl: string
  $amodevApi: AxiosInstance | null

  can: (rule: string, def?: any) => boolean
  productTabs: () => ProductTabs | null
  accessRules: () => AccessRules | null

  initialize: () => void
}

export interface ConstructOptions {
  source?: Sources
  debug?: boolean
  account?: AccountInterface
  accountUser?: AccountUserInterface
  product?: ProductInterface
  accountProduct?: AccountProductInterface
}
