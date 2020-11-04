<template>
  <div class="flex justify-center py-5"
       v-if="!processor.allRecordsLoaded"
       v-observe-visibility="onObserve">
    <Spinner size="6" />
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'

export default {
  name: 'ProcessorObserve',
  props: {
    processor: {
      type: Object,
      required: true
    }
  },
  components: {
    Spinner
  },
  methods: {
    onObserve(isVisible) {
      if (isVisible && this.processor.hasNextPage) {
        this.processor.next()
      }
    }
  }
}
</script>


