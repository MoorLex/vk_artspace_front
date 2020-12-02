<template>
  <transition name="modal">
    <div v-if="show"
         class="fixed z-50 inset-0 overflow-hidden flex flex-col justify-end"
         :class="`transition duration-${speed}`">

      <div class="fixed inset-0 transition-opacity"
           :class="`duration-${speed}`">
        <div class="absolute inset-0 bg-black opacity-75"
             @click="close"></div>
      </div>

      <div class="p-4 relative transition-transform max-w-md w-full mx-auto p-3"
           :class="`duration-${speed}`">

        <div class="bg-content rounded-lg shadow overflow-hidden">
          <slot />
        </div>

        <div style="padding-bottom: var(--safe-area-inset-bottom)"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { disableScroll, enableScroll } from '../utils/scroll'
import TopBar from '../components/TopBar.vue'

export default {
  name: 'ModalPage',
  props: {
    speed: {
      type: [String, Number],
      default: 300
    },
    items: {
      type: [Array],
      default: () => []
    },
    title: String,
    text: String
  },
  components: {
    TopBar
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
      disableScroll()
      this.show = true
    },
    close() {
      enableScroll()
      this.show = false
    }
  }
}
</script>

<style>
.modal-enter-from .transition-opacity, .modal-leave-to .transition-opacity {
  opacity: 0;
}
.modal-enter-from .transition-transform, .modal-leave-to .transition-transform {
   transform: translateY(100%);
 }
</style>
