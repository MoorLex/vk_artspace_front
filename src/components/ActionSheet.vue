<template>
  <transition name="action-sheet">
    <div v-if="show"
         class="fixed z-50 inset-0 overflow-hidden flex flex-col justify-end"
         :class="`transition duration-${speed}`">

      <div class="fixed inset-0 transition-opacity"
           :class="`duration-${speed}`">
        <div class="absolute inset-0 bg-black opacity-75"
             @click="close(required)"></div>
      </div>

      <div class="p-4 relative transition-transform max-w-md w-full mx-auto"
           :class="`duration-${speed}`">

        <nav class="bg-content rounded-lg shadow overflow-hidden">
          <div v-for="(item, idx) in items.filter(({ hide }) => !hide)"
               :key="idx"
               @click="onClick(item)"
               class="cursor-pointer flex items-center justify-center px-3 py-2 leading-10 text-gray-900 focus:outline-none"
               :class="idx > 0 && 'border-t'">
            <span class="truncate">
              {{ item.label }}
            </span>
          </div>
        </nav>

        <nav v-if="!required"
             class="bg-content rounded-lg shadow overflow-hidden mt-4">
          <div class="flex cursor-pointer items-center justify-center px-3 py-2 leading-10 font-medium text-gray-900 rounded-md focus:outline-none"
               @click="close()">
            <span class="truncate">
              Отмена
            </span>
          </div>
        </nav>

        <div style="padding-bottom: var(--safe-area-inset-bottom)"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { disableScroll, enableScroll } from '../utils/scroll'

export default {
  name: 'ActionSheet',
  props: {
    speed: {
      type: [String, Number],
      default: 300
    },
    items: {
      type: [Array],
      default: () => []
    },
    required: Boolean
  },
  watch: {
    $route(route) {
      if (this.show && route.hash !== '#action') {
        this.show = false
        enableScroll()
      }
    }
  },
  data() {
    return {
      show: false
    }
  },
  beforeUnmount() {
    enableScroll()
  },
  methods: {
    open() {
      if (!this.show) {
        disableScroll()
        this.show = true
        this.$router.push({ hash: '#action' })
      }
    },
    close(disable) {
      if (!disable && this.show) {
        enableScroll()
        this.$router.back()
        this.show = false
      }
    },
    onClick(item) {
      if (item.click) {
        item.click()
      }
      this.close()
    }
  }
}
</script>

<style>
.action-sheet-enter-from .transition-opacity, .action-sheet-leave-to .transition-opacity {
  opacity: 0;
}
.action-sheet-enter-from .transition-transform, .action-sheet-leave-to .transition-transform {
  transform: translateY(100%);
}
</style>
