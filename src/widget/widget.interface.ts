// Access rules
export enum AmoWidgetAccessRulesStrategy {
  REPLACE = 'replace',
  ADD = 'add'
}
export interface AmoWidgetAccessRulesItem {
  title: string
  alias: string
}
export interface AmoWidgetAccessRules {
  strategy: AmoWidgetAccessRulesStrategy
  rules?: AmoWidgetAccessRulesItem[]
}

// Product tabs
export enum AmoWidgetProductTabsStrategy {
  REPLACE = 'replace',
  ADD = 'add'
}
export interface AmoWidgetProductTabsItem {
  title: string
  alias: string
  active: (widget: AmoWidgetInterace) => boolean
  callback: (tab: AmoWidgetProductTabsItem, widget: AmoWidgetInterace) => void
}
export interface AmoWidgetProductTabs {
  strategy: AmoWidgetProductTabsStrategy
  tabs?: AmoWidgetProductTabsItem[]
}

// Digital Pipeline
export interface AmoWidgetDPCallbackOptions {
  el: HTMLElement
  config: any
  onChange: (opts: any) => void
}
export interface AmoWidgetDPAction {
  title: string
  action: string
  color: string
  callback: (opts: AmoWidgetDPCallbackOptions) => void
}

export interface AmoWidgetInterace {
  readonly version: string
  readonly uuid: string
  readonly source: AmoWidgetSource
  readonly debug: boolean

  initialize: () => Promise<void>
  destroy: () => Promise<void>

  can: (scope: string, def: boolean) => boolean
  SET: (opts: any) => void

  accessRules: () => AmoWidgetAccessRules | null
  productTabs: () => AmoWidgetProductTabs | null
}

export enum AmoWidgetSource {
  HUB = 'hub',
  STANDALONE = 'standalone',
  BROWSER = 'browser'
}

export interface AmoFrontendUserInterface {}
