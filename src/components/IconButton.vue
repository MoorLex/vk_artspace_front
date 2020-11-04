<template>
  <button type="button"
          class="inline-flex flex-shrink-0 items-center justify-center text-sm font-medium focus:outline-none"
          :class="[
              circle ? 'rounded-full' : 'rounded-lg',
              color && `text-button-${color} bg-button-${color}`,
              `h-${size} w-${size}`,
          ]">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: String,
    circle: Boolean,
    size: {
      type: String,
      default: '12'
    },
  }
}
</script>


