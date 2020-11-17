<template>
  <button type="button"
          class="inline-flex flex-shrink-0 items-center justify-center text-sm font-medium focus:outline-none"
          :class="[
              color && `text-button-${color} bg-button-${color}`,
              `h-${size} w-${size}`,
              `rounded-${rounded}`,
          ]">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: String,
    size: {
      type: String,
      default: '12'
    },
    rounded: {
      type: String,
      default: 'lg'
    },
  }
}
</script>


