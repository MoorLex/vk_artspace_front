<template>
  <transition name="alert">
    <div v-if="show"
         class="fixed z-50 inset-0 overflow-hidden flex flex-col justify-center"
         :class="`transition duration-${speed}`">

      <div class="fixed inset-0 transition-opacity"
           :class="`duration-${speed}`">
        <div class="absolute inset-0 bg-black opacity-75"
             @click="close(required)"></div>
      </div>

      <div class="p-4 relative transition t-transform"
           :class="`duration-${speed}`">

        <div class="bg-content rounded-lg shadow text-center max-w-md w-full mx-auto">
          <div class="px-3 pt-3">
            <h3 class="text-lg leading-6 font-medium mb-3">
              {{ title }}
            </h3>
            <p class="text-sm leading-5">
              {{ text }}
            </p>
          </div>

          <nav class="mt-5">
            <div v-for="(item, idx) in items.filter(({ hide }) => !hide)"
                 :key="idx"
                 @click="onClick(item)"
                 class="flex items-center border-t justify-center px-3 py-2 leading-10 text-gray-900 focus:outline-none">
              <span class="truncate">
                {{ item.label }}
              </span>
            </div>
            <div v-if="!required"
                 @click="cancel"
                 class="flex items-center border-t justify-center px-3 py-2 font-medium leading-10 text-gray-900 focus:outline-none">
              <span class="truncate">
                {{ cancelText }}
              </span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    speed: {
      type: [String, Number],
      default: 300
    },
    items: {
      type: [Array],
      default: () => []
    },
    required: Boolean,
    title: String,
    text: String,
    cancelText: {
      type: String,
      default: 'Отмена'
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    open() {
      this.show = true
    },
    cancel() {
      this.$emit('cancel')
      this.close()
    },
    close(disable) {
      if (!disable) {
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
.alert-enter-from .transition-opacity, .alert-leave-to .transition-opacity {
  opacity: 0;
}
.alert-enter-from .t-transform {
  opacity: 0;
  transform: scale(1.1);
}

.alert-leave-to .t-transform {
   opacity: 0;
   transform: scale(0.9);
 }
</style>
