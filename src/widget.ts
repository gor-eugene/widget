import axios, { AxiosInstance } from 'axios'
import {
  Sources,
  AccountUserInterface,
  ProductInterface,
  AccountProductInterface
} from '@amodev/interfaces'
import { LogTypes, ConstructOptions, WidgetInterface } from './interfaces/Widget'
import { AccessRules } from './interfaces/AccessRules'
import { ProductTabs } from './interfaces/ProductTabs'

export class Widget implements WidgetInterface {
  uuid: string = ''
  widget: any = null
  source: Sources = Sources.HUB
  debug: boolean = false
  account: Account | null = null
  accountUser: AccountUserInterface | null = null
  product: ProductInterface | null = null
  accountProduct: AccountProductInterface | null = null

  $amodevHubTab: string = 'amodev_product_tab'
  $amodevBaseUrl: string = 'https://amodev.ru/api'
  $amodevApi: AxiosInstance | null = null

  // конструктор
  constructor(opts: ConstructOptions) {
    this.source = opts.source || Sources.HUB
    this.debug = opts.debug !== undefined ? opts.debug : false
    this.accountUser = opts.accountUser || null
    this.account = opts.account || null
    this.product = opts.product || null
    this.accountProduct = opts.accountProduct || null

    this.$amodevApi = axios.create({
      baseURL: this.$amodevBaseUrl
    })

    this.$amodevApi.interceptors.request.use(config => {
      config.headers['x-amo-token'] = this.accountUser && this.accountUser.token
      return config
    })
  }

  // метод инициализации
  initialize() {}

  // метод проверки доступа
  can(rule: string, def: boolean = false): boolean {
    try {
      if (this.accountUser && this.accountUser.isOwner) {
        return true
      }

      const accessSettings: any = (this.accountProduct && this.accountProduct.access) || null

      if (accessSettings) {
        const userId = +(window as any).AMOCRM.constant('user').id
        const groupId = +(window as any).AMOCRM.constant('managers')[userId].group.replace(
          'group_',
          ''
        )

        const userAccess = accessSettings[`user_${userId}_${rule}`] || def
        const groupAccess = accessSettings[`group_${groupId}_${rule}`] || def

        return userAccess || groupAccess
      }
    } catch (e) {
      if (this.debug) {
        this.log(LogTypes.DEFAULT, `Ошибка при проверке прав: `, e.message)
        this.log(LogTypes.TRACE, e)
      }
    }

    return def
  }

  // галки-доступы
  accessRules(): AccessRules | null {
    return null
  }

  // табы в настройках
  productTabs(): ProductTabs | null {
    return null
  }

  // логгер
  log(type: LogTypes = LogTypes.DEFAULT, ...data: any): void {
    if (this.debug) {
      console[type](
        this.product ? `[${this.product.uuid}] ${this.product.title}` : 'Неизвестный продукт',
        ...data
      )
    }
  }

  // сеттер
  SET(opts: ConstructOptions): void {
    for (const key of Object.keys(opts) as Array<keyof typeof opts>) {
      // todo: publish

      Object.assign(this, { [key]: opts[key] })
    }
  }

  // получает активную страницу
  getPage() {
    const h = (window as any).location.href

    if (/dashboard/.test(h)) {
      return { page: 'dashboard' }
    } else if (/leads\/pipeline/.test(h)) {
      const m = h.match(/\/leads\/pipeline\/([0-9]+)/)
      return { page: 'leads_list', section: 'pipeline', pipelineId: m && +m[1] }
    } else if (/leads\/list/.test(h)) {
      return { page: 'leads_list', section: 'list' }
    } else if (/leads\/list\/pipeline/.test(h)) {
      const m = h.match(/\/leads\/list\/pipeline\/([0-9]+)/)
      return { page: 'leads_list', section: 'list', pipelineId: m && +m[1] }
    } else if (/leads\/detail/.test(h)) {
      const m = h.match(/\/leads\/detail\/([0-9]+)/)
      return { page: 'leads_card', id: m && +m[1] }
    } else if (/leads\/add/.test(h)) {
      return { page: 'leads_card', id: null }
    } else if (/settings\/pipeline\/leads/.test(h)) {
      const m = h.match(/\/settings\/pipeline\/leads\/([0-9]+)/)
      return { page: 'digital_pipeline', pipelineId: m && +m[1] }
    } else if (/todo\/line/.test(h)) {
      return { page: 'tasks_list', format: 'line' }
    } else if (/todo\/list/.test(h)) {
      return { page: 'tasks_list', format: 'list' }
    } else if (/todo\/calendar/.test(h)) {
      const m = h.match(/\/todo\/calendar\/(week|month|day)/)
      return { page: 'tasks_list', section: 'calendar', period: m && m[1] }
    } else if (/contacts\/list\/companies/.test(h)) {
      return { page: 'list', section: 'companies' }
    } else if (/contacts\/list\/contacts/.test(h)) {
      return { page: 'list', section: 'contacts' }
    } else if (/contacts\/list/.test(h)) {
      return { page: 'list', section: 'all' }
    } else if (/contacts\/detail/.test(h)) {
      const m = h.match(/\/contacts\/detail\/([0-9]+)/)
      return { page: 'contact_card', id: m && +m[1] }
    } else if (/companies\/detail/.test(h)) {
      const m = h.match(/\/companies\/detail\/([0-9]+)/)
      return { page: 'company_card', id: m && +m[1] }
    } else if (/contacts\/add/.test(h)) {
      return { page: 'contact_card', id: null }
    } else if (/companies\/add/.test(h)) {
      return { page: 'comparny_card', id: null }
    } else if (/catalogs\/[0-9]+/.test(h)) {
      const m = h.match(/\/catalogs\/([0-9]+)/)
      return { page: 'list', section: 'catalogs', catalogId: m && +m[1] }
    } else if (/mail\/(inbox|sent|deleted)/.test(h)) {
      const m = h.match(/mail\/(inbox|sent|deleted)/)
      return { page: 'mailbox', section: m && m[1] }
    } else if (/stats\/(pipeline|consolidated|by_activities|calls)/.test(h)) {
      const m = h.match(/stats\/(pipeline|consolidated|by_activities|calls)/)
      return { page: 'analytics', section: m && m[1] }
    } else if (/events\/list/.test(h)) {
      return { page: 'analytics', section: 'events' }
    } else if (/settings\/(widgets|users|dev|communications)/.test(h)) {
      const m = h.match(/settings\/(widgets|users|dev|communications)/)
      return { page: 'settings', section: m && m[1] }
    } else if (/settings\//.test(h)) {
      return { page: 'settings', section: 'main' }
    }

    return { page: 'unknown' }
  }
}
