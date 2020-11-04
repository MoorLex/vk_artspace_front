import Shot from '../core/shot'
import Processor from './processor'

export default class ShotsProcessor extends Processor {
  constructor(params = {}) {
    super({
      ...params,
      fetch: params.fetch,
      mapping: (item) => new Shot(item)
    })
  }
}
