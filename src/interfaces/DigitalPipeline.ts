export interface DPCallbackOptions {
  el: HTMLElement
  config: any
  onChange: (opts: any) => void
}

export interface DPAction {
  title: string
  action: string
  color: string
  callback: (opts: DPCallbackOptions) => void
}
