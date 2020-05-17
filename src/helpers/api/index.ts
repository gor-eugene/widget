import { AmoWidget } from '../../widget'
import Axios, { AxiosInstance } from 'axios'

export class AmoWidgetApi {
  readonly axios: AxiosInstance

  constructor(private readonly widget: AmoWidget) {
    const replacedBaseUrl = (process.env.AMODEV_BASE_URL as string) || null

    this.axios = Axios.create({
      baseURL: replacedBaseUrl || `https://amodev.ru/api`
    })

    this.axios.interceptors.request.use((config) => {
      config.headers['x-product-id'] = this.widget.uuid

      if (this.widget.accountUser) {
        config.headers['x-amo-token'] = this.widget.accountUser.token
      }

      return config
    })
  }
}
