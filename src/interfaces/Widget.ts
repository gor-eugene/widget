import { AxiosInstance } from 'axios'
import {
  Sources,
  AccountUserInterface,
  ProductInterface,
  AccountProductInterface,
  ProductTabs,
  AccessRules
} from '@amodev/interfaces'

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
  account: Account | null
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
  account?: Account
  accountUser?: AccountUserInterface
  product?: ProductInterface
  accountProduct?: AccountProductInterface
}
