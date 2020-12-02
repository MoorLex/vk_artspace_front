<template>
  <template v-if="errors.networkFlood">
    <NetworkFlood />
  </template>
  <template v-else-if="errors.networkError">
    <NetworkError />
  </template>
  <template v-else>
    <div class="w-full justify-center bg-content select-none">
      <div class="max-w-screen-sm mx-auto relative">
        <div v-if="loaded"
             class="w-full flex flex-col">
          <div class="flex-1 relative">
            <router-view />
          </div>
          <Epic />
        </div>
        <div v-else
             class="fixed z-50 inset-0 bg-content flex flex-col items-center justify-center">
          <Spinner size="10" />
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import errors from './store/errors'
import profile from './store/profile'
import Epic from './components/Epic.vue'
import Spinner from './components/Spinner.vue'
import NetworkError from './panels/NetworkError.vue'
import NetworkFlood from './panels/NetworkFlood.vue'

export default {
  name: 'App',
  components: {
    Epic,
    Spinner,
    NetworkError,
    NetworkFlood
  },
  data() {
    return {
      errors,
      loaded: false
    }
  },
  async mounted() {

    await profile.login()

    this.$nextTick(() => {
      this.loaded = true
    })
  }
}
</script>
