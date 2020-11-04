<template>
  <transition name="modal">
    <div v-if="show"
         class="fixed z-50 inset-0 overflow-hidden"
         :class="`transition duration-${speed}`">

      <div class="fixed inset-0 transition-opacity"
           :class="`duration-${speed}`">
        <div class="absolute inset-0 bg-black opacity-75"
             @click="close"></div>
      </div>

      <div class="h-full bg-content relative transition t-transform overflow-y-auto max-w-screen-sm w-full mx-auto"
           :class="`duration-${speed}`">
        <slot name="header">
          <TopBar :title="title" no-back>
            <template #left>
              <button class="p-1 text-header-tint rounded-full focus:outline-none"
                      @click="close">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </template>
          </TopBar>

          <div class="border-t"></div>
        </slot>

        <slot />

        <slot name="footer">
          <div style="padding-bottom: var(--safe-area-inset-bottom)" />
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
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
  methods: {
    open() {
      document.body.classList.add('overflow-hidden')
      this.show = true
    },
    close() {
      document.body.classList.remove('overflow-hidden')
      this.show = false
    }
  }
}
</script>

<style>
.modal-enter-from .transition-opacity, .modal-leave-to .transition-opacity {
  opacity: 0;
}
.modal-enter-from .t-transform, .modal-leave-to .t-transform {
   transform: translateY(100%);
 }
</style>
