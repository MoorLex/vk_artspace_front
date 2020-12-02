<template>
  <div class="bg-content">
    <slot name="header">
      <TopBar v-if="header"
              :no-back="noBack"
              :title="panelTitle">
        <template #left
                  v-if="platform.web && refresh">
          <button class="p-1 text-header-tint rounded-full focus:outline-none"
                  @click="$emit('refresh')">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          </button>
        </template>
      </TopBar>

      <div v-if="divider"
           class="border-t mx-3" />
    </slot>

    <div v-if="loading"
         class="fixed z-10 inset-0 flex justify-center items-center bg-content">
      <Spinner />
    </div>
    <slot v-else/>
  </div>
</template>

<script>
import platform from '../utils/platform'
import TopBar from '../components/TopBar.vue'
import Spinner from '../components/Spinner.vue'

export default {
  name: 'Panel',
  props: {
    refresh: {
      type: Boolean,
      default: false
    },
    header: {
      type: Boolean,
      default: true
    },
    divider: {
      type: Boolean,
      default: true
    },
    noBack: {
      type: Boolean,
      default: false
    },
    loading: Boolean,
    title: String
  },
  components: {
    TopBar,
    Spinner
  },
  data() {
    return {
      platform
    }
  },
  computed: {
    routeTitle() {
      return this.$route.meta.title || ''
    },
    panelTitle() {
      return this.title || this.routeTitle
    }
  }
}
</script>


