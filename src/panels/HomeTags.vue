<template>
  <Panel>
    <Link v-for="(tag, idx) in tags.hits"
          :key="idx"
          route="tag"
          :params="tag"
          class="block"
          deep>
      <div class="flex items-center px-4 py-4 sm:px-6">
        <div class="min-w-0 flex-1 flex items-center">
          {{ tag.name }}
        </div>
        <div>
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </Link>
  </Panel>
</template>

<script>
import lists from '../store/lists'
import Panel from '../components/Panel.vue'
import Link from '../components/Link.vue'

export default {
  name: 'HomeTags',
  components: {
    Panel,
    Link
  },
  data() {
    return {
      tags: lists.tags
    }
  },
  created() {
    if (this.tags.entries === 0) {
      this.tags.getData()
    }
  }
}
</script>
