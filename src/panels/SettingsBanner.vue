<template>
  <Panel :divider="false">
    <div class="mb-4">
      <Ratio :ratio="9/22"
             :src="profile.banner && profile.banner.lg"
             class="bg-button-secondary">
        <div class="bg-button-secondary absolute inset-0 transition duration-300"
             :class="!submitting && 'opacity-0'" />
      </Ratio>

      <div class="flex-shrink-0 flex group block px-3 pt-4 relative">
        <div class="flex items-end flex-1">
          <div class="-mt-12 p-2 bg-content rounded-full">
            <img class="inline-block h-20 w-20 rounded-full"
                 :src="profile.avatar"
                 alt="">
          </div>
          <div class="ml-3 flex-1 pb-2">
            <p class="text-sm leading-5 font-medium">
              {{ profile.name }}
            </p>
            <p class="text-xs leading-4 font-medium text-secondary">
              {{ profile.status.name }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex px-3">
      <Button color="primary"
              class="w-full justify-center"
              :loading="submitting"
              @click="input.click()">
        Загрузить
      </Button>
    </div>

    <ModalToken ref="token" />

    <Alert ref="alert"
           title="Ошибка"
           text="Что-то пошло не так, попробуйте загрузить обложку чуть позже..."
           cancel-text="Обидно" />
    <Alert ref="maxSizeAlert"
           title="Ошибка"
           text="Ого, какое большое творение. Попробуйте загрузить поменьше."
           cancel-text="Хорошо" />
    <Alert ref="formatAlert"
           title="Ошибка"
           text="Сервис принимает изображения только в формате JPG, JPEG и PNG."
           cancel-text="Хорошо" />
  </Panel>
</template>

<script>
import profile from '../store/profile'
import Panel from '../components/Panel.vue'
import Ratio from '../components/Ratio.vue'
import Button from '../components/Button.vue'
import Alert from '../components/Alert.vue'
import IconButton from '../components/IconButton.vue'
import ModalToken from '../modals/ModalToken.vue'
import Api from "../api";

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export default {
  name: 'SettingsBanner',
  components: {
    Panel,
    Ratio,
    Button,
    Alert,
    IconButton,
    ModalToken,
  },
  data() {
    return {
      profile,
      submitting: false,
      input: document.createElement('input')
    }
  },
  computed: {
    items() {
      return [
        {
          label: 'Поменять обложку',
          route: 'settings'
        },
        {
          label: 'Поменять профессию',
          route: 'settings'
        },
        {
          label: 'Жалобы',
          hide: !profile.isAdmin,
          route: 'settings'
        },
      ]
    }
  },
  created() {
    this.input.type = 'file'
    this.input.accept = 'image/jpeg,image/png'
    this.input.onchange = (e) => this.onFileChange(e)
  },
  methods: {
    async onFileChange (e) {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]

        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
          this.$refs.formatAlert.open()
          return
        }

        if (file.size > 2810000) {
          this.$refs.maxSizeAlert.open()
          return
        }

        await this.submit(file)
      }
      this.input.value = ''
    },
    async submit(file) {
      await profile.getToken()

      if (!profile.token) {
        this.$refs.token.open()
        return
      }

      this.submitting = true

      try {
        await profile.getAlbum()
        const { upload_url } = await profile.getUploadServer()
        const options = await Api.uploadMedia(upload_url, [file])
        const files = await profile.saveUploadedImages(options)
        const { data } = await Api.saveProfileMedia(files)

        const image = new Image()
        image.src = data.banner.lg
        image.onload = () => {
          setTimeout(() => {
            this.submitting = false
            profile.raw.banner = data.banner
          }, 100)
        }
      } catch (e) {
        this.$refs.alert.open()
        this.submitting = false
      }
    }
  }
}
</script>
