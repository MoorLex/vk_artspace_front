export default class Processor {
  hits = []
  params = {}
  entries = 0
  processing = false
  timestamp = undefined
  pagination = {
    current_page: 1,
    last_page: undefined
  }

  constructor(params = {}) {

    this.mapping = params.mapping
    delete params.mapping

    if (params.fetch) {
      this.fetch = params.fetch
      delete params.fetch
    }

    this.params = params
  }

  get length() {
    return this.hits.length
  }

  get empty() {
    return this.entries > 0 && this.length === 0
  }

  get total() {
    return this.pagination.total || 0
  }

  get page() {
    return this.pagination.current_page || 0
  }

  get hasNextPage() {
    return this.page < this.pagination.last_page
  }

  get allRecordsLoaded() {
    return this.entries > 0 && this.length >= this.total
  }

  fetch() {}

  push(raw) {
    if (!this.update(raw)) {
      let hit = { ...raw }

      if (this.mapping instanceof Function) {
        hit = this.mapping(hit)
      }

      this.hits = [ hit, ...this.hits ]
    }
  }

  update(raw) {
    const item = this.hits.find(({ id }) => id === raw.id)

    if (item) {
      item.raw = raw
    }

    return item
  }

  remove(hit) {
    const item = this.hits.findIndex(({ id }) => id === hit.id)

    if (item >= 0) {
      this.hits.splice(item, 1)
    }

    return item >= 0
  }

  reset() {
    this.hits = []
    this.entries = 0
    this.processing = false
    this.timestamp = undefined
    this.pagination = {
      current_page: 1,
      last_page: undefined
    }
  }

  async getData(force) {
    this.processing = true

    if (force) {
      this.pagination = {
        current_page: 1,
        last_page: undefined
      }
    }

    if (!this.timestamp || force) {
      this.timestamp = Date.now()
    }

    const { data, meta } = await this.fetch(this.pagination.current_page, {
      timestamp: this.timestamp,
      ...this.params
    })
    let hits = data || []

    this.pagination = meta

    if (this.mapping instanceof Function && data) {
      hits = data.map(item => this.mapping(item))
    }

    if (force) {
      this.hits = hits
    } else {
      this.hits = [...this.hits, ...hits]
    }

    this.entries += 1
    this.processing = false
  }

  async next() {
    this.pagination.current_page += 1
    await this.getData()
    this.entries += 1
  }
}
