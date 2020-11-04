import { reactive } from 'vue'
import storage from '../utils/storage'

const config = {
  homeTab: 'main',
  grid: false,
  theme: 'client_light',
  ...storage.get('config', {})
}
const obj = {}

if (import.meta.env.VITE_ENV === 'dev') {
  config.theme = 'space_gray'
}

Object.keys(config).forEach((key) => {
  Object.defineProperty(obj, key, {
    get() { return config[key] },
    set(value) {
      config[key] = value
      storage.set('config', config)
    }
  });
})

export const state = reactive(obj)

export default state
