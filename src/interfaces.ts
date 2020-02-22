import {
  AccountUserInterface,
  ProductInterface,
  AccountProductInterface,
  Sources
} from '@amodev/interfaces'

export enum LogTypes {
  DEFAULT = 'log',
  ERROR = 'error',
  WARNING = 'warn',
  INFO = 'info',
  TRACE = 'trace'
}

export interface ConstructOptions {
  source?: Sources
  debug?: boolean
  account?: Account
  accountUser?: AccountUserInterface
  product?: ProductInterface
  accountProduct?: AccountProductInterface
}
