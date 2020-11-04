const Storage = {
  get (key, dValue = undefined) {
    const sv = window.localStorage.getItem(key)
    return sv ? JSON.parse(sv) : dValue
  },
  set (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  remove (key) {
    window.localStorage.removeItem(key)
  }
}

export default Storage
