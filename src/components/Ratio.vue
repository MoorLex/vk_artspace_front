<template>
  <div class="bg-cover bg-center relative"
       :style="{ paddingBottom: percent+'%', backgroundImage }">
    <div v-if="$slots.default"
         class="absolute inset-0 flex items-center justify-center">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ratio',
  props: {
    src: String,
    ratio: Number,
    loading: Boolean
  },
  computed: {
    percent() {
      return (this.ratio || 1) * 100
    },
    backgroundImage() {
      return this.src ? `url(${this.src})` : undefined
    }
  }
}
</script>


