<template>
  <Panel refresh
         @refresh="refresh">
    <div class="px-3"
         v-ptr="getData">
      <Link v-for="(user, idx) in users.hits"
            :key="idx"
            route="profile"
            :params="{ id: user.id }"
            deep
            class="my-4 block">
        <div class="flex-shrink-0 group block focus:outline-none">
          <div class="flex items-center">
            <div>
              <img class="inline-block h-9 w-9 rounded-full"
                   :src="user.avatar"
                   alt="">
            </div>
            <div class="ml-3 flex-1 truncate">
              <p class="text-sm leading-5 font-medium truncate">
                {{ user.name }}
              </p>
              <p class="text-xs leading-4 font-medium text-secondary truncate">
                {{ user.status.name }}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>

    <div v-if="users.empty"
         class="flex flex-col items-center text-center px-3 max-w-sm mx-auto leading-5 py-10">
      <svg class="w-36 h-36 mb-5 text-placeholder" fill="none" stroke="currentColor" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m 22.933725,5.3051078 h 12.29435 c 4.03536,0 7.28404,3.48471 7.28404,7.8132492 0,3.0524 -1.6155,5.68517 -3.98314,6.97225 l 0.0433,4.91017 -4.41324,-4.06918 h -6.52471 l -2.59586,4.09256 -3.08696,-4.09256 h -6.40779 l -4.2112,4.06918 0.0733,-4.85675 c -2.4221402,-1.26665 -4.0833202,-3.93042 -4.0833202,-7.02567 0,-4.3285393 3.2486902,-7.8132493 7.2840502,-7.8132493 h 3e-5 0.79683"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m 34.647035,8.4207478 0.004,0.003" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m 37.758505,9.5788973 c 2.09057,2.4799297 2.09175,4.8351197 0.004,7.0655997" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m 25.036465,10.467577 c 2.04605,-2.3684393 5.65083,0.95868 2.72592,3.88359 l -2.73361,2.32841 -2.73894,-2.34004 c -2.68621,-2.6862 0.19683,-6.1926692 2.74663,-3.87196 z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m 11.688545,29.448347 h 0.36301 c 1.66756,0 3.01003,1.34366 3.01003,3.0127 v 0.72668 c 0,1.66903 -1.34247,3.0127 -3.01003,3.0127 h -0.36301 c -1.66755,0 -3.0100302,-1.34367 -3.0100302,-3.0127 v -0.72668 c 0,-1.66904 1.3424802,-3.0127 3.0100302,-3.0127 z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m 24.818495,29.448347 h 0.36301 c 1.66756,0 3.01003,1.34366 3.01003,3.0127 v 0.72668 c 0,1.66903 -1.34247,3.0127 -3.01003,3.0127 h -0.36301 c -1.66755,0 -3.01003,-1.34367 -3.01003,-3.0127 v -0.72668 c 0,-1.66904 1.34248,-3.0127 3.01003,-3.0127 z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m 37.981515,29.448347 h 0.36301 c 1.66756,0 3.01003,1.34366 3.01003,3.0127 v 0.72668 c 0,1.66903 -1.34247,3.0127 -3.01003,3.0127 h -0.36301 c -1.66755,0 -3.01003,-1.34367 -3.01003,-3.0127 v -0.72668 c 0,-1.66904 1.34248,-3.0127 3.01003,-3.0127 z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M 5.2720048,44.694967 H 44.727995 v -3.77031 c 0,-1.61921 -1.48484,-4.72399 -6.33607,-4.72399 -4.85123,0 -6.80535,2.66718 -6.80535,4.72399 0,-2.05347 -1.54668,-4.63021 -6.53696,-4.63021 -4.99028,0 -6.64766,2.78827 -6.64766,4.63021 0,-1.738 -0.91757,-4.56406 -6.54843,-4.56406 -5.6308602,0 -6.5649802,2.83789 -6.5649802,4.56406 z"/>
      </svg>

      <h3 class="text-lg font-medium mb-1">
        Подписок нет
      </h3>

      <p class="mb-3 text-secondary">
        Подпишитесь на любимых творцов и следите за их работами.
      </p>
    </div>

    <ProcessorObserve :processor="users" />
  </Panel>
</template>

<script>
import Api from '../api'
import lists from '../store/lists'
import UsersProcessor from '../core/users-processor'
import Panel from '../components/Panel.vue'
import Link from '../components/Link.vue'
import ProcessorObserve from '../components/ProcessorObserve.vue'

export default {
  name: 'Following',
  props: {
    id: {
      type: [Number, String],
      default: 'me'
    }
  },
  components: {
    Panel,
    Link,
    ProcessorObserve
  },
  data() {
    return {
      users: lists.following[this.id]
    }
  },
  created() {
    if (!this.users) {

      this.users = new UsersProcessor({
        id: this.id,
        fetch: (page, params) => Api.getFollowing(params.id, page, params)
      })

      lists.following[this.id] = this.users
      this.getData()
    }
  },
  methods: {
    async getData() {
      return await this.users.getData(true)
    },
    async refresh() {
      this.users.reset()
      return await this.getData()
    }
  }
}
</script>
