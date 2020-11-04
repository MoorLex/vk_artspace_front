<template>
  <router-view v-slot="{ Component }">
    <transition
      mode="out-in"
      :enter-active-class="routeTimes > 0 ? `transition duration-300 ease-in-out` : ''"
      :enter-from-class="`transform ${transition.enter.split('|')[0]}`"
      :enter-to-class="`transform ${transition.enter.split('|')[1]}`"
      :leave-active-class="`transition duration-300 ease-in-out ${transition.leave.split('|')[2] || ''}`"
      :leave-from-class="`transform ${transition.leave.split('|')[0]}`"
      :leave-to-class="`transform ${transition.leave.split('|')[1]}`"
    >
      <component :is="Component"
                 class="min-h-screen"
                 style="padding-bottom: calc(var(--tabbar_height) + var(--safe-area-inset-bottom))" />
    </transition>
  </router-view>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      routeTimes: 0,
      transition: {
        enter: '|',
        leave: '|',
      },
    }
  },
  watch: {
    '$route' (to) {
      if (to.params.deep) {
        this.routeTimes++
        this.transition.enter = 'translate-x-4 opacity-0|translate-x-0'
        this.transition.leave = 'translate-x-0|-translate-x-4 opacity-0|z-1'
      } else {
        this.transition.enter = '-translate-x-4 opacity-0|translate-x-0'
        this.transition.leave = 'translate-x-0|translate-x-4 opacity-0|z-10'
      }
    }
  }
}
</script>
