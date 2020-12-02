<template>
  <transition name="topbar-menu">
    <div v-if="show"
         class="fixed z-10 inset-0 overflow-hidden flex flex-col"
         :class="`transition duration-${speed}`">

      <div class="fixed inset-0 transition-opacity"
           :class="`duration-${speed}`">
        <div class="absolute inset-0 bg-black opacity-25"
             @click="close(required)"></div>
      </div>

      <div class="relative transition-transform max-w-screen-sm w-full mx-auto"
           :class="`duration-${speed}`">

        <div style="padding-top: calc(var(--panelheader_height) + var(--safe-area-inset-top))"></div>

        <nav class="bg-content shadow overflow-hidden border-t">
          <div v-for="(item, idx) in items"
               :key="idx"
               v-show="!item.hide"
               @click="onClick(item)"
               class="flex px-3 py-2 leading-10 text-gray-900 rounded-md focus:outline-none cursor-pointer">
            <span class="truncate">
              {{ item.label }}
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
  name: 'TopBarMenu',
  props: {
    modelValue: Boolean,
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
  data() {
    return {
      show: false
    }
  },
  beforeUnmount() {
    enableScroll()
  },
  methods: {
    toggle() {
      if (this.show) {
        this.close()
      } else {
        this.open()
      }
    },
    open() {
      disableScroll()
      this.show = true
      this.$emit('update:modelValue', this.show)
    },
    close(disable) {
      if (!disable) {
        enableScroll()
        this.show = false
        this.$emit('update:modelValue', this.show)
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
.topbar-menu-enter-from .transition-opacity, .topbar-menu-leave-to .transition-opacity {
  opacity: 0;
}
.topbar-menu-enter-from .transition-transform, .topbar-menu-leave-to .transition-transform {
  transform: translateY(-100%);
}
</style>
