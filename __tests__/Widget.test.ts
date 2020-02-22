import { Widget } from '../dist/widget'
import { ConstructOptions, LogTypes } from '../dist/interfaces/Widget'
import { AccessRules } from '../dist/interfaces/AccessRules'
import { ProductTabs } from '../dist/interfaces/ProductTabs'

class ExtendedWidget extends Widget {
  // инициализация
  async initialize() {
    this.log(LogTypes.DEFAULT, `Initialize`, this)
  }

  accessRules(): AccessRules | null {
    return null
  }

  productTabs(): ProductTabs | null {
    return null
  }
}

test('Widget', () => {
  const opts: ConstructOptions = {}

  const widget = new ExtendedWidget(opts)

  expect(widget).toBeInstanceOf(Widget)
})
