<template>
  <Panel>
    <div class="p-3">
      <SearchBox v-model="query"
                 @input="loading = true" />
    </div>

    <div class="flex justify-center py-5"
         v-if="loading">
      <Spinner size="6" />
    </div>

    <div v-else-if="shots.empty"
         class="flex flex-col items-center text-center px-3 max-w-sm mx-auto leading-5 my-10">
      <svg class="w-36 h-36 mb-5 text-placeholder" fill="none" stroke="currentColor" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M19.321 13.436c1.748-.7303 3.6663-1.1336 5.679-1.1336 8.1413 0 14.741 6.5998 14.741 14.741 0 8.1413-6.5997 14.7411-14.741 14.7411s-14.741-6.5998-14.741-14.741c0-2.0828.4319-4.0647 1.211-5.861"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M35.0641 41.6846C32.2032 43.6548 28.7363 44.8083 25 44.8083c-9.8113 0-17.7649-7.9536-17.7649-17.7649 0-9.8112 7.9536-17.7649 17.7649-17.7649 9.8113 0 17.7649 7.9537 17.7649 17.765 0 3.6294-1.0884 7.0046-2.9567 9.817M27.008 7.1997A2.008 2.008 0 0125 9.2077a2.008 2.008 0 01-2.008-2.008A2.008 2.008 0 0125 5.1917a2.008 2.008 0 012.008 2.008z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M22.054 24.124l-3.6416 9.488 9.5549-3.5412 3.508-9.321z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M37.9144 39.6776l.004.003M24.9977 27.0184l.004.0031"/>
      </svg>

      <h3 class="text-lg font-medium mb-1">
        Не найдено
      </h3>

      <p class="mb-3 text-secondary">
        Нам не удалось найти творения по вашему запросу.
      </p>
    </div>

    <div v-else
         class="px-3">
      <div v-for="(shot, idx) in shots.hits"
           :key="idx"
           class="mb-3">
        <Link route="shot"
              :params="{ id: shot.id }"
              deep>
          <Shot :shot="shot" />
        </Link>
      </div>
    </div>
  </Panel>
</template>

<script>
import ShotsProcessor from '../core/shots-processor'
import Api from '../api'
import debounce from '../utils/debounce'
import Panel from '../components/Panel.vue'
import SearchBox from '../components/SearchBox.vue'
import Shot from '../components/Shot.vue'
import Link from '../components/Link.vue'
import Spinner from '../components/Spinner.vue'

export default {
  name: 'Search',
  components: {
    Panel,
    Shot,
    Link,
    Spinner,
    SearchBox
  },
  data() {
    return {
      query: '',
      loading: false,
      shots: new ShotsProcessor({
        fetch: (page, params) => Api.getShots(page, params)
      })
    }
  },
  watch: {
    query(v) {
      this.onSearch(v)
    }
  },
  methods: {
    onSearch: debounce(async function(query) {
      if (query) {
        this.shots.params = { query }
        await this.shots.getData(true)
      } else {
        this.shots.hits = []
      }

      this.loading = false
    }, 500)
  }
}
</script>
