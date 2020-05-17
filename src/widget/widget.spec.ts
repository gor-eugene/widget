import { AmoWidget } from '.'
import { uuid } from 'uuidv4'
import { AmoWidgetSource } from './widget.interface'

class AmoWidgetSample extends AmoWidget {}

describe('base features', () => {
  // construction
  describe('construction', () => {
    // UUID
    describe('uuid', () => {
      test('init', () => {
        const productId = uuid()
        const widget = new AmoWidgetSample(productId)

        expect(widget.uuid).toEqual(productId)
      })

      test('should not construct with id <> UUID V4', () => {
        expect.assertions(1)

        try {
          new AmoWidgetSample('incorrect UUID')
        } catch (e) {
          expect(e.message).toBe('Incorrect UUID')
        }
      })
    })

    // source
    describe('source', () => {
      describe('init', () => {
        let productId = uuid()
        let widget: AmoWidgetSample

        test('hub', () => {
          widget = new AmoWidgetSample(productId, AmoWidgetSource.HUB)
          expect(widget.source).toEqual(AmoWidgetSource.HUB)
        })

        test('standalone', () => {
          widget = new AmoWidgetSample(productId, AmoWidgetSource.STANDALONE)
          expect(widget.source).toEqual(AmoWidgetSource.STANDALONE)
        })

        test('browser', () => {
          widget = new AmoWidgetSample(productId, AmoWidgetSource.BROWSER)
          expect(widget.source).toEqual(AmoWidgetSource.BROWSER)
        })
      })
    })

    // debug
    describe('debug', () => {
      let productId = uuid()
      let widget: AmoWidgetSample

      test('init', () => {
        widget = new AmoWidgetSample(productId, AmoWidgetSource.HUB, true)

        expect(widget.debug).toEqual(true)
      })
    })
  })
})
