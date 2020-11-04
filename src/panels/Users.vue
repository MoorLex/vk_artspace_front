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
            <div class="w-9">
              <Ratio :src="user.avatar"
                     class="rounded-full">
                <IconButton v-if="user.isDonut"
                            class="absolute bottom-0 right-0 -mr-1 -mb-1 bg-donut"
                            size="4"
                            circle>
                  <svg class="w-3 h-3 text-white" fill="currentColor" stroke="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                </IconButton>
              </Ratio>
            </div>
            <div class="ml-3 flex-1 truncate">
              <p class="text-sm leading-5 truncate font-medium">
                {{ user.name }}
              </p>
              <p class="text-xs leading-4 truncate font-medium text-secondary">
                {{ user.status.name }} • {{ user.shotsCount }} {{ pronunciation(user.stats.shots, ['Творение', 'Творения', 'Творений']) }}
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
import pronunciation from '../utils/pronunciation'
import Ratio from '../components/Ratio.vue'
import Link from '../components/Link.vue'
import Panel from '../components/Panel.vue'
import IconButton from '../components/IconButton.vue'
import ProcessorObserve from '../components/ProcessorObserve.vue'

export default {
  name: 'Users',
  components: {
    Panel,
    Ratio,
    Link,
    IconButton,
    ProcessorObserve
  },
  data() {
    return {
      users: lists.users
    }
  },
  created() {
    if (this.users.entries === 0) {
      this.getData()
    }
  },
  methods: {
    pronunciation,
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
