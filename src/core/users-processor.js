import User from '../core/user'
import Processor from './processor'

export default class UsersProcessor extends Processor {
  constructor(params = {}) {
    super({
      ...params,
      fetch: params.fetch,
      mapping: (item) => new User(item)
    })
  }
}
