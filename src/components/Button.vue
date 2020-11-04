<template>
  <button type="button"
          class="inline-flex items-center font-bold relative text-sm leading-4 font-medium rounded-lg focus:outline-none"
          :class="[
              color && `text-button-${color} bg-button-${color}`,
              loading && 'pointer-events-none',
              size === 'sm' && 'px-3 h-8',
              size === 'md' && 'px-4 h-12'
          ]">
    <div :class="loading && 'opacity-0'">
      <slot />
    </div>
    <div v-if="loading"
         class="absolute inset-0 flex items-center justify-center">
      <Spinner size="6" />
    </div>
  </button>
</template>

<script>
import Spinner from '../components/Spinner.vue'

export default {
  name: 'Button',
  props: {
    color: String,
    loading: Boolean,
    size: {
      type: String,
      default: 'md'
    }
  },
  components: {
    Spinner
  }
}
</script>


