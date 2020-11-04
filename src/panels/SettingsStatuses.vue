<template>
  <Panel>
    <div v-for="(status, idx) in statuses.hits"
         :key="idx"
         @click="() => submit(status.id)"
         class="flex items-center px-4 py-4 sm:px-6">
      <div class="mr-4">
        <div class="h-5 w-5 rounded-full border flex items-center justify-center">
          <div v-if="profile.status.id === status.id"
               class="h-3 w-3 rounded-full bg-accent"/>
        </div>
      </div>
      <div class="min-w-0 flex-1 flex items-center">
        {{ status.name }}
      </div>
    </div>
  </Panel>
</template>

<script>
import lists from '../store/lists'
import profile from '../store/profile'
import Panel from '../components/Panel.vue'
import Link from '../components/Link.vue'

export default {
  name: 'SettingsProfession',
  components: {
    Panel,
    Link,
  },
  data() {
    return {
      profile,
      statuses: lists.statuses
    }
  },
  created() {
    if (this.statuses.entries === 0) {
      this.statuses.getData()
    }
  },
  methods: {
    async submit(id) {
      await profile.setStatus(id)
    }
  }
}
</script>
