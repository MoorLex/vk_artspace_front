<template>
  <Panel>
    <div class="p-3 grid grid-cols-2 gap-3"
         v-ptr="getData">
      <Link v-for="(shot, idx) in favorites.hits"
            :key="idx"
            route="shot"
            :params="{ id: shot.id }"
            deep>
        <Shot :shot="shot"
              small />
      </Link>
    </div>

    <div v-if="favorites.empty"
         class="flex flex-col items-center text-center px-3 max-w-sm mx-auto leading-5">
      <svg class="w-36 h-36 mb-5 text-placeholder" fill="none" stroke="currentColor" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M 18.8862,10.3506 C 20.7679,9.5644 22.8332,9.1301 25,9.1301 33.7647,9.1301 40.8699,16.2353 40.8699,25 40.8699,33.7647 33.7647,40.8698 25,40.8699 16.2353,40.8699 9.1301,33.7647 9.1301,25 c 0,-2.2422 0.465,-4.3759 1.304,-6.3097" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M 36.1997,41.2932 C 33.016,43.4858 29.1579,44.7694 25,44.7694 14.0817,44.7694 5.2306,35.9184 5.2306,25 5.2306,14.0817 14.0816,5.2306 25,5.2306 c 10.9183,0 19.7694,8.851 19.7694,19.7694 0,4.039 -1.2112,7.795 -3.2903,10.9249" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m 25.0037,19.3981 c 4.2106,-4.9079 11.629,1.9866 5.6098,8.0476 l -5.6257,4.825 -5.6366,-4.849 c -5.528,-5.5664 0.4051,-12.8325 5.6525,-8.0235 z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m 39.088021,38.958605 0.0078,0.0039" />
      </svg>

      <h3 class="text-lg font-medium mb-1">
        Тут пусто
      </h3>

      <p class="mb-3 text-secondary">
        Если Вам понравится творение, обязательно поставьте ему лайк.
      </p>
    </div>

    <ProcessorObserve :processor="favorites" />
  </Panel>
</template>

<script>
import lists from '../store/lists'
import Shot from '../components/Shot.vue'
import TopBar from '../components/TopBar.vue'
import Link from '../components/Link.vue'
import Panel from '../components/Panel.vue'
import ProcessorObserve from '../components/ProcessorObserve.vue'

export default {
  name: 'Home',
  components: {
    Shot,
    TopBar,
    Panel,
    Link,
    ProcessorObserve
  },
  computed: {
    title() {
      return this.$route.meta.title || ''
    }
  },
  data() {
    return {
      favorites: lists.favorites
    }
  },
  created() {
    if (this.favorites.entries === 0) {
      this.getData()
    }
  },
  methods: {
    async getData() {
      return await this.favorites.getData(true)
    }
  }
}
</script>
