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
            <div class="ml-3 flex-1">
              <p class="text-sm leading-5 font-medium">
                {{ user.name }}
              </p>
              <p class="text-xs leading-4 font-medium text-secondary">
                {{ user.status.name }}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>

    <ProcessorObserve :processor="users" />
  </Panel>
</template>

<script>
import lists from '../store/lists'
import Ratio from '../components/Ratio.vue'
import Link from '../components/Link.vue'
import Panel from '../components/Panel.vue'
import ProcessorObserve from '../components/ProcessorObserve.vue'

export default {
  name: 'SettingsBanner',
  components: {
    Panel,
    Ratio,
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
      users: lists.banned
    }
  },
  created() {
    if (this.users.entries === 0) {
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
