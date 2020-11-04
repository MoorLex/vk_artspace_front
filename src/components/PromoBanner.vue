<template>
  <div class="border-t border-b p-3">
    <div class="flex justify-between items-center">
      <span class="text-sm text-secondary">
        Реклама {{ data.ageRestrictions }}
      </span>
      <IconButton color="secondary"
                  size="6"
                  circle
                  @click="$emit('close')">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </IconButton>
    </div>
    <a :href="data.trackingLink"
       target="_blank"
       class="block">
      <div class="mt-3 flex items-center">
        <div class="w-12 flex-shrink-0">
          <Ratio :src="data.iconLink"
                 class="rounded"/>
        </div>
        <div class="flex-1 px-3 truncate">
          <p class="text-sm font-medium leading-4 truncate">
            {{ data.title }}
          </p>
          <span class="text-sm text-secondary leading-4 truncate">
          {{ data.domain }}
        </span>
        </div>
        <div class="flex-shrink-0">
          <Button color="primary"
                  size="sm">
            {{ data.ctaText }}
          </Button>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import Ratio from '../components/Ratio.vue'
import IconButton from '../components/IconButton.vue'
import Button from '../components/Button.vue'

export default {
  name: 'PromoBanner',
  props: {
    data: {
      type: Object,
      required: true
    },
    closeButton: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Ratio,
    Button,
    IconButton
  },
}
</script>


