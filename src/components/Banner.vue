<template>
  <div class="border p-3 flex bg-tint">
    <div class="flex-1">
      <h4 class="leading-4 mb-2 font-medium">
        {{ title }}
      </h4>

      <p class="text-sm leading-4 text-secondary">
        {{ text }}
      </p>

      <slot />
    </div>
    <div v-if="mode === 'expand'"
         class="ml-3 my-auto flex-shrink-0">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    </div>
    <div v-if="mode === 'dismiss'"
         class="ml-3 flex-shrink-0">
      <IconButton color="secondary"
                  size="6"
                  rounded="full"
                  @click="$emit('close')">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </IconButton>
    </div>
  </div>
</template>

<script>
import IconButton from '../components/IconButton.vue'

export default {
  name: 'Banner',
  props: {
    title: String,
    text: String,
    mode: String
  },
  components: {
    IconButton
  }
}
</script>


