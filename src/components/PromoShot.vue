<template>
  <div v-if="show"
       class="bg-button-secondary rounded-lg p-3">
    <div class="flex mb-2 items-center">
      <span class="font-bold text-sm flex-1 truncate">Реклама {{ data.ageRestrictions }}</span>
      <IconButton color="secondary"
                  size="6"
                  rounded="full"
                  @click="hide">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </IconButton>
    </div>

    <a :href="data.trackingLink"
       @click="currentPixel = statsPixels.click || ''"
       target="_blank"
       class="block">
      <div class="relative">
        <img class="bg-button-secondary rounded-lg"
             :src="data.imageLink"
             alt="">
      </div>
      <div class="flex mt-2 items-center">
        <div class="flex-1 truncate">
          <p class="text-sm font-medium leading-5 truncate">
            {{ data.title }}
          </p>
          <div class="text-sm leading-4 truncate">
            {{ data.domain }}
          </div>
        </div>
        <Button color="primary"
                size="sm">
          {{ data.ctaText }}
        </Button>
      </div>
    </a>
    <img v-if="currentPixel"
         :src="currentPixel"
         class="absolute opacity-0 pointer-events-none top-0 left-0"
         alt="">
  </div>
</template>

<script>
import Ratio from '../components/Ratio.vue'
import Button from '../components/Button.vue'
import IconButton from '../components/IconButton.vue'

export default {
  name: 'Shot',
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
  data() {
    return {
      currentPixel: undefined,
      show: true
    }
  },
  created() {
    if (this.statsPixels.playbackStarted) {
      this.currentPixel = this.statsPixels.playbackStarted
    }
  },
  computed: {
    statsPixels() {
      return this.data.statistics
        ? this.data.statistics.reduce((acc, item) => ({ ...acc, [item.type]: item.url }), {})
        : {}
    }
  },
  methods: {
    hide() {
      this.show = false
      this.$emit('close')
    }
  }
}
</script>


