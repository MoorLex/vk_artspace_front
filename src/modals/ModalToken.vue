<template>
  <ModalCard ref="modal">
    <div class="px-3 py-5 text-center grid gap-5">

      <IconButton color="primary"
                  size="6"
                  class="mx-auto"
                  rounded="full">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
      </IconButton>

      <h3 class="leading-5 text-lg font-bold">
        У нас проблема
      </h3>

      <p class="leading-5">
        Вы не предоставили сервису доступ к фотографиям.
      </p>

      <Button color="primary w-full"
              class="justify-center"
              @click="profile.getToken">
        Открыть доступ
      </Button>
    </div>
  </ModalCard>
</template>

<script>
import profile from '../store/profile'
import platform from '../utils/platform'
import Button from '../components/Button.vue'
import ModalCard from '../components/ModalCard.vue'
import IconButton from '../components/IconButton.vue'

export default {
  name: 'ModalToken',
  components: {
    Button,
    ModalCard,
    IconButton,
  },
  data() {
    return {
      profile,
      platform,
      submitting: false,
    }
  },
  methods: {
    open() {
      this.$refs.modal.open()
    },
    close() {
      this.$refs.modal.close()
    },
  }
}
</script>


