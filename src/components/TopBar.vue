<template>
  <div class="z-20 sticky top-0 bg-content flex-shrink-0"
       style="padding-top: var(--safe-area-inset-top)">
    <nav class="px-3 h-panelheader flex justify-center items-center">
      <div class="flex-1 flex items-center">
        <button v-if="!noBack && !isRoot && canGoBack"
                class="p-1 text-header-tint rounded-full focus:outline-none"
                @click="goBack">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <slot name="left" />
      </div>
      <span class="text-header font-black text-xl px-2 truncate flex items-center">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <div class="flex-1 flex justify-end items-center"
           style="min-width: 90px">
        <slot name="right" />
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    title: String,
    noBack: Boolean
  },
  methods: {
    goBack() {
      if (window.history.length > 2) {
        this.$router.back()
      } else if (this.root) {
        this.$router.push({ name: this.root + '/main' })
      }
    }
  },
  computed: {
    canGoBack() {
      return window.history.length > 2 || this.root
    },
    isRoot() {
      const parent = this.$route.matched[0]

      return parent.path === this.$route.path
    },
    root() {
      const parent = this.$route.matched[0]

      return !this.isRoot && parent.name
    }
  }
}
</script>


