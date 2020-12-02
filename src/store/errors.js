import { reactive } from 'vue'

const errors = {
  networkError: false,
  networkFlood: false,
}

export const state = reactive(errors)

export default state
