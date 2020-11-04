<template>
  <ModalPage ref="modal"
             title="Теги">
    <div v-for="(tag, idx) in tags.hits"
         :key="idx"
         @click="toggleTag(tag)"
         class="flex items-center px-4 py-4 sm:px-6">
      <div class="mr-4">
        <div class="h-5 w-5 rounded border flex items-center justify-center text-white"
             :class="[
               form.tags.find((item) => item.id === tag.id) && 'bg-accent'
             ]">
          <div v-if="form.tags.find((item) => item.id === tag.id)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
        </div>
      </div>
      <div class="min-w-0 flex-1 flex items-center">
        {{ tag.name }}
      </div>
    </div>
    <template #footer>
      <div class="sticky bottom-0 bg-content border-t"
           style="padding-bottom: var(--safe-area-inset-bottom)">
        <div class="p-3">
          <Button color="primary w-full"
                  class="justify-center"
                  @click="close">
            Выбрать {{ form.tags.length }} из 5
          </Button>
        </div>
      </div>
    </template>
  </ModalPage>
</template>

<script>
import lists from '../store/lists'
import form from '../store/shot'
import ModalPage from '../components/ModalPage.vue'
import Button from '../components/Button.vue'

export default {
  name: 'ModalTags',
  components: {
    Button,
    ModalPage
  },
  data() {
    return {
      form,
      tags: lists.tags
    }
  },
  mounted() {
    if (this.tags.length === 0) {
      this.tags.getData()
    }
  },
  methods: {
    open() {
      this.$refs.modal.open()
    },
    close() {
      this.$refs.modal.close()
    },
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


