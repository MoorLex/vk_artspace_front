import { reactive } from 'vue'

export const state = reactive({
  title: '',
  description: '',
  private: false,
  tags: [],
  files: []
})

export default state
