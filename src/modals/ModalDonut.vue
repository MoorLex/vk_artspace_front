<template>
  <ModalCard ref="modal">
    <div class="px-3 py-5 text-center grid gap-5">

      <IconButton color="primary"
                  size="6"
                  class="mx-auto"
                  rounded="full">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      </IconButton>

      <h3 class="leading-5 text-lg font-bold">
        Вам не хватает прав доступа
      </h3>

      <p class="leading-5">
        У вас отсутвует VIP подписка для загрузки нескольких творений в день.
      </p>

      <a v-if="!platform.ios"
         href="https://vk.com/le__moore"
         target="_blank"
         class="block">
        <Button color="primary w-full"
                class="justify-center">
          Перейти в сообщество
        </Button>
      </a>
    </div>
  </ModalCard>
</template>

<script>
import platform from '../utils/platform'
import Button from '../components/Button.vue'
import ModalCard from '../components/ModalCard.vue'
import IconButton from '../components/IconButton.vue'

export default {
  name: 'ModalDonut',
  components: {
    Button,
    ModalCard,
    IconButton,
  },
  data() {
    return {
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


