<template>
  <Panel class="bg-content">
    <div v-for="(tag, idx) in tags.hits"
         :key="idx"
         @click="toggleTag(tag)"
         class="flex items-center px-4 py-4 sm:px-6">
      <div class="mr-4">
        <div class="h-5 w-5 rounded-full border"
             :class="form.tags.find((item) => item.id === tag.id) && 'bg-white'" />
      </div>
      <div class="min-w-0 flex-1 flex items-center">
        {{ tag.name }}
      </div>
    </div>
  </Panel>
</template>

<script>
import form from '../store/shot'
import lists from '../store/lists'
import Panel from '../components/Panel.vue'

export default {
  name: 'Empty',
  components: {
    Panel,
  },
  computed: {
    title() {
      return this.$route.meta.title || ''
    }
  },
  data() {
    return {
      form,
      tags: lists.tags
    }
  },
  created() {
    if (this.tags.entries === 0) {
      this.tags.getData()
    }
  },
  methods: {
    toggleTag(tag) {
      const { tags } = this.form
      const index = tags.findIndex((item) => item.id === tag.id)

      if (index >= 0) {
        this.form.tags = tags.filter((item) => item.id !== tag.id)
      } else if (tags.length < 5) {
        this.form.tags = [...tags, tag]
      }
    }
  }
}
</script>
