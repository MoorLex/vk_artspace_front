<template>
  <div @click="$router.push({ name, params: { deep, ...params } })"
       class="cursor-pointer">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Link',
  props: {
    deep: Boolean,
    route: String,
    params: Object,
  },
  computed: {
    name() {
      const parent = this.$route.matched[0]

      return `${parent.name}/${this.route}`
    }
  }
}
</script>


