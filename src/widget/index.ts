import {
  AmoWidgetInterace,
  AmoWidgetSource,
  AmoWidgetAccessRules,
  AmoWidgetProductTabs
} from './widget.interface'
import { isUuid } from 'uuidv4'
import { AmoLogger, AmoLoggerLevel } from '../logger'
import {
  AmoConstantUser,
  AmoGlobalObject,
  AmoConstantManager,
  AmoDevAccount,
  AmoDevAccountUser,
  AmoDevAccountProduct,
  AmoDevProduct
} from '@amodev/interfaces'
import { AmoWidgetRoute } from '../helpers/route'
import { AmoWidgetApi } from '../helpers/api'

export class AmoWidget implements AmoWidgetInterace {
  readonly version = '1.1'
  readonly logger: AmoLogger

  readonly window: Window & typeof globalThis & { AMOCRM: any } = window as any
  readonly AMOCRM: AmoGlobalObject = this.window.AMOCRM

  readonly product?: AmoDevProduct
  readonly account?: AmoDevAccount
  readonly accountUser?: AmoDevAccountUser
  readonly accountProduct?: AmoDevAccountProduct

  readonly api: AmoWidgetApi = new AmoWidgetApi(this)
  readonly route: AmoWidgetRoute = new AmoWidgetRoute(this)

  constructor(
    readonly uuid: string,
    readonly source: AmoWidgetSource = AmoWidgetSource.HUB,
    readonly debug: boolean = false
  ) {
    if (!isUuid(uuid)) {
      throw new Error(`Incorrect UUID`)
    }

    this.logger = new AmoLogger(debug ? AmoLoggerLevel.ALL : AmoLoggerLevel.ERRORS)
  }

  // Инициализация продукта
  async initialize() {
    this.logger.info(`Продукт ${this.uuid} подключен`)
  }

  // Отключение продукта
  async destroy() {
    this.logger.info(`Продукт ${this.uuid} отключен`)
  }

  // Галки доступы
  accessRules(): AmoWidgetAccessRules | null {
    return null
  }

  // Табы в настройках
  productTabs(): AmoWidgetProductTabs | null {
    return null
  }

  // Проверка базовых прав
  can(scope: string, def: boolean = false): boolean {
    try {
      if (this.accountProduct) {
        const accessSettings: any = this.accountProduct.access || null

        if (accessSettings) {
          const user: AmoConstantUser = this.AMOCRM.constant('user')
          const managers: { [key: string]: AmoConstantManager } = this.AMOCRM.constant('user')

          const userId = +user.id
          const groupId = managers[userId] && managers[userId].group.replace('group_', '')

          const userAccess = accessSettings[`user_${userId}_${scope}`] || def
          const groupAccess = accessSettings[`group_${groupId}_${scope}`] || def

          return userAccess || groupAccess
        }
      }
    } catch (e) {
      this.logger.error(`Ошибка при проверке прав: `, e.message)
      this.logger.trace(e)
    }

    return def
  }

  // Установка параметров
  SET(opts: keyof AmoWidget): void {
    for (const key of Object.keys(opts) as Array<keyof typeof opts>) {
      Object.assign(this, { [key]: opts[key] })
    }
  }
}
