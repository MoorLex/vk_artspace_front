<template>
  <ModalPage ref="modal">
    <template #header>
      <div class="bg-destructive pb-10 text-white relative overflow-hidden">
        <div class="relative"
             style="padding-top: var(--safe-area-inset-top)">
          <nav class="px-3 h-panelheader flex items-center">
            <button class="p-1 text-white rounded-full focus:outline-none"
                    @click="$refs.modal.close()">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </nav>
        </div>

        <div class="px-3 mt-3 text-center max-w-sm mx-auto">

          <h3 class="leading-5 text-lg font-bold mb-5">
            Поддержать автора
          </h3>

          <p class="mb-3">
            Вступите в сообщество и поддержите автора, чтобы получить кучу уникальных возможностей!
          </p>
        </div>

        <IconButton class="bg-white mb-5 absolute bottom-0 left-0 -mb-15 -ml-15 transform -rotate-12"
                    style="opacity: .15"
                    size="48"
                    circle>
          <svg class="w-36 h-36 text-destructive" fill="currentColor" stroke="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
        </IconButton>

        <IconButton class="bg-white mb-5 absolute top-0 right-0 -mt-24 -mr-24 transform rotate-45"
                    style="opacity: .15"
                    size="48"
                    circle>
          <svg class="w-36 h-36 text-destructive" fill="currentColor" stroke="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
        </IconButton>
      </div>
    </template>

    <div class="p-3 max-w-sm mx-auto">
      <ul class="leading-5 mb-3">
        <li class="flex items-center py-2">
          <IconButton color="primary"
                      size="6"
                      class="mr-3"
                      circle>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          </IconButton>
          <span>
            Рядом с Вашей автаркой появится иконка в виде звёздочки.
          </span>
        </li>
        <li class="flex items-center py-2">
          <IconButton color="primary"
                      size="6"
                      class="mr-3"
                      circle>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
          </IconButton>
          <span>
            Неограниченное количество публикаций.
          </span>
        </li>
        <li class="flex items-center py-2">
          <IconButton color="primary"
                      size="6"
                      class="mr-3"
                      circle>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
          </IconButton>
          <span>
            Возможность поменять статус под Вашим именем в профиле.
          </span>
        </li>
        <li class="flex items-center py-2">
          <IconButton color="primary"
                      size="6"
                      class="mr-3"
                      circle>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
          </IconButton>
          <span>
            Скрытые публикации, доступные только по ссылке.
          </span>
        </li>
      </ul>

      <p class="leading-4 text-sm text-secondary mb-3">
        Поддержка автора открывает для Вас уникальные возможности не только в данном сервисе, но и во всех остальных сервисах нашего сообщества.
      </p>

      <a href="https://vk.com/le__moore"
         target="_blank"
         class="block">
        <Button color="primary w-full"
                class="justify-center">
          Перейти в сообщество
        </Button>
      </a>
    </div>
  </ModalPage>
</template>

<script>
import Button from '../components/Button.vue'
import ModalPage from '../components/ModalPage.vue'
import IconButton from '../components/IconButton.vue'

export default {
  name: 'ModalDonut',
  components: {
    Button,
    ModalPage,
    IconButton,
  },
  data() {
    return {
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


