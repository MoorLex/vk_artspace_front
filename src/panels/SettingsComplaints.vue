<template>
  <Panel refresh
         @refresh="refresh">
    <div v-ptr="getData">
      <Link v-for="(item, idx) in complaints.hits"
            :key="idx"
            route="settings/complaint"
            :params="{ id: item.id }"
            class="block"
            deep>
        <div class="flex items-center px-4 py-4 sm:px-6">
          <div class="min-w-0 flex-1 flex items-center">
            <div class="flex leading-5">
            <span class="text-secondary mr-2">
              #{{ item.id }}
            </span>
              <div>
                <p>{{ item.type.name }}</p>
                <p v-if="item.model_type"
                   class="text-secondary text-sm">
                  {{ item.model_type }} / {{ item.model_id }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </Link>
    </div>

    <ProcessorObserve :processor="complaints" />
  </Panel>
</template>

<script>
import lists from '../store/lists'
import Link from '../components/Link.vue'
import Panel from '../components/Panel.vue'
import ProcessorObserve from '../components/ProcessorObserve.vue'

export default {
  name: 'Settings',
  components: {
    Link,
    Panel,
    ProcessorObserve
  },
  data() {
    return {
      complaints: lists.complaints
    }
  },
  created() {
    if (this.complaints.entries === 0) {
      this.getData()
    }
  },
  methods: {
    async getData() {
      return await this.complaints.getData(true)
    },
    async refresh() {
      this.complaints.reset()
      return await this.getData()
    }
  }
}
</script>
