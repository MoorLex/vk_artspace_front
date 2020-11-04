export class Storage {
  _popup = null
  lastRoute

  get popup() {
    return this._popup ? this._popup() : null
  }

  popupOpen(popup) {
    this._popup = () => popup
  }

  popupClose() {
    this._popup = null
  }

  setLastRoute(route) {
    this.lastRoute = route
  }
}

export default new Storage()
