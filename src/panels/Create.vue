<template>
  <Panel>
    <div class="grid gap-4 px-3 py-4">
      <Banner title="Все публикации проходят модерацию."
              class="rounded-lg">
        <p class="text-sm leading-4 text-secondary">
          В случае несоответствия контента
          <a href="https://vk.com/dev/uterms"
             target="_blank"
             class="text-link inline-block">
            правилам ВКонтакте,
          </a>
          а также
          <Link route="rules"
                class="text-link inline-block">
            сервиса,
          </Link>
          Ваша публикация может быть отклонена.
        </p>
      </Banner>

      <Ratio :ratio="3/4"
             class="bg-button-secondary rounded-lg overflow-hidden border">
        <div v-if="loading"
             class="bg-button-secondary z-50 absolute inset-0 flex items-center justify-center">
          <Spinner size="10"/>
        </div>
        <div v-if="ready"
             class="absolute inset-0">
          <div v-for="(file, idx) in form.files"
               :key="file.src"
               class="absolute inset-0"
               :class="idx !== selected && 'opacity-0 invisible'">
            <Cropper :src="file.src"
                     :ref="`cropper_${idx}`"
                     @crop="onCrop"
                     :viewMode="3"
                     :data="file.details"
                     :autoCropArea="1"
                     dragMode="move"
                     :preview="this.$refs[`preview_${idx}`]"
                     :restore="false"
                     :modal="false"
                     :guides="false"
                     :center="false"
                     :highlight="false"
                     :cropBoxMovable="false"
                     :cropBoxResizable="false"
                     :toggleDragModeOnDblclick="false"/>
          </div>
        </div>
        <div v-if="form.files.length === 0"
             class="absolute inset-0 flex items-center justify-center"
             @click="input.click()">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </div>
      </Ratio>

      <div class="grid grid-cols-3 gap-3">
        <Ratio v-for="(file, idx) in form.files"
               :key="idx"
               :ratio="3/4"
               :src="file.preview"
               class="bg-button-secondary cursor-pointer rounded-lg overflow-hidden border">
          <div class="absolute inset-0"
               @click="onPreviewClick(idx)"/>

          <div class="top-0 right-0 p-1 absolute">
            <IconButton color="secondary"
                        size="6"
                        rounded="full"
                        @click="removePreview(idx)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </IconButton>
          </div>
        </Ratio>
        <Ratio v-for="idx in 3 - form.files.length"
               :key="idx"
               :ratio="3/4"
               class="bg-button-secondary cursor-pointer rounded-lg overflow-hidden border">
          <div class="absolute inset-0 flex justify-center items-center"
               @click="onPreviewClick(3)">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          </div>
        </Ratio>
      </div>

      <Input label="Имя (200 символов)"
             placeholder="Назовите своё творение"
             aria-label=""
             v-model="form.title"
             :valid="form.title.length < 200" />
      <TextArea label="Информация (500 символов)"
                placeholder="Расскажите о своем творении"
                aria-label=""
                v-model="form.description"
                :valid="form.description.length < 500" />
      <div class="cursor-pointer"
           @click="$refs.tags.open()">
        <Input label="Теги"
               placeholder="Максимум 5 тегов"
               aria-label=""
               tabindex="-1"
               :value="form.tags.map(({ name }) => name).join(', ')"
               class="pointer-events-none" />
      </div>
      <div v-if="profile.isDonut"
           class="cursor-pointer"
           @click="$refs.options.open()">
        <Input label="Видимость"
               aria-label=""
               tabindex="-1"
               :value="form.private ? 'Только по ссылке' : 'Видно всем'"
               class="pointer-events-none" />
      </div>

      <Button color="primary"
              class="w-full justify-center"
              :loading="submitting"
              @click="onSubmit">
        Загрузить
      </Button>
    </div>

    <ModalTags ref="tags" />
    <ModalDonut ref="donut" />
    <ModalToken ref="token" />

    <Alert ref="errorAlert"
           title="Ошибка"
           text="Что-то пошло не так, попробуйте загрузить своё творение чуть позже."
           cancel-text="Хорошо" />
    <Alert ref="requiredAlert"
           title="Ошибка"
           text="Вам необходимо загрузить хотя бы одно изображение."
           cancel-text="Хорошо" />
    <Alert ref="linkAlert"
           title="Ошибка"
           text="Согласно правилам сервиса, доступны только ссылки на vk.com."
           cancel-text="Хорошо" />
    <Alert ref="maxLengthAlert"
           title="Ошибка"
           text="Мы не можем опубликовать пост, содержащий большое количество букв в названии или описании."
           cancel-text="Хорошо" />
    <Alert ref="maxSizeAlert"
           title="Ошибка"
           text="Ого, какое большое творение. Попробуйте загрузить поменьше."
           cancel-text="Хорошо" />

    <ActionSheet ref="options"
                 :items="items"/>
  </Panel>
</template>

<script>
import Api from '../api'
import form from '../store/shot'
import profile from '../store/profile'
import asyncMap from '../utils/asyncMap'
import Cropper from '../utils/cropper'
import debounce from '../utils/debounce'
import { checkUrlsInText } from '../utils/processTextForUrls'
import Ratio from '../components/Ratio.vue'
import Input from '../components/Input.vue'
import TextArea from '../components/TextArea.vue'
import Button from '../components/Button.vue'
import IconButton from '../components/IconButton.vue'
import ActionSheet from '../components/ActionSheet.vue'
import Spinner from '../components/Spinner.vue'
import Banner from '../components/Banner.vue'
import Panel from '../components/Panel.vue'
import Alert from '../components/Alert.vue'
import Link from '../components/Link.vue'
import ModalTags from '../modals/ModalTags.vue'
import ModalDonut from '../modals/ModalDonut.vue'
import ModalToken from '../modals/ModalToken.vue'

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

function getCanvasBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      resolve(blob)
    })
  })
}

function str(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default {
  name: 'Empty',
  components: {
    Link,
    Spinner,
    Ratio,
    Input,
    Alert,
    Button,
    Banner,
    TextArea,
    ModalTags,
    ModalDonut,
    ModalToken,
    IconButton,
    ActionSheet,
    Panel,
    Cropper
  },
  data() {
    return {
      form,
      profile,
      selected: 0,
      ready: false,
      loading: false,
      type: undefined,
      submitting: false,
      input: document.createElement('input')
    }
  },
  computed: {
    items() {
      return [
        {
          label: 'Видно всем',
          click: () => this.form.private = false
        },
        {
          label: 'Только по ссылке',
          click: () => this.form.private = true
        }
      ]
    }
  },
  created() {
    this.input.type = 'file'
    this.input.onchange = (e) => this.onFileChange(e)

    this.form.title = ''
    this.form.description = ''
    this.form.private = false
    this.form.tags = []
    this.form.files = []
  },
  mounted() {
    this.$nextTick(() => {
      this.ready = true
    })
  },
  methods: {
    onCrop: debounce(function(event) {
      const cropper = this.$refs[`cropper_${this.selected}`]

      this.form.files[this.selected].detail = event.detail
      this.form.files[this.selected].preview = cropper.getCroppedCanvas({ maxHeight: 600, maxWidth: 600 }).toDataURL()
    }, 400),
    onPreviewClick(select) {
      if (this.form.files[select]) {

        if (select === this.selected) {
          this.type = 'change'
          this.input.click()
        }

        this.selected = select
      } else {
        this.type = 'upload'
        this.input.click()
      }
    },
    removePreview(select) {
      this.form.files.splice(select, 1)

      if (select > 0 && !this.form.files[select]) {
        this.selected--
      }
    },
    async onFileChange (e) {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]
        const image = {
          id: str(5),
          src: await readFile(file),
          detail: {},
          preview: undefined
        }

        if (file.size > 2810000) {
          this.$refs.maxSizeAlert.open()
          return
        }

        this.loading = true

        if (this.type === 'change') {
          this.form.files[this.selected] = image
        } else {
          this.form.files.push(image)
        }

        setTimeout(() => {
          if (this.type === 'upload') {
            this.selected = this.form.files.length - 1
          }

          this.loading = false
        }, 200)
      }

      this.input.value = ''
    },
    async onSubmit() {
      await profile.getToken()

      if (!profile.token) {
        this.$refs.token.open()
        return
      }

      if (!checkUrlsInText(this.form.description)) {
        this.$refs.linkAlert.open()
        return
      }

      if (this.form.files.length === 0) {
        this.$refs.requiredAlert.open()
        return
      }

      if (this.form.title.length > 200 || this.form.title.description > 500) {
        this.$refs.maxLengthAlert.open()
        return
      }

      try {
        await this.submit()
      } catch (e) {
        this.$refs.errorAlert.open()
      }
    },
    async submit() {
      this.submitting = true

      try {
        await profile.getAlbum()
        const { upload_url } = await profile.getUploadServer()

        const tags = this.form.tags.map(({ id }) => id)
        const images = await asyncMap(this.form.files, async (v, idx) => {
          const cropper = this.$refs[`cropper_${idx}`]
          return await getCanvasBlob(cropper.getCroppedCanvas())
        })

        const options = await Api.uploadMedia(upload_url, images)
        const files = await profile.saveUploadedImages(options)
        const { data } = await Api.createShot({ ...this.form, tags }, files)

        profile.shots.push(data)

        await this.$router.push({ name: 'create/shot', params: { id: data.id, deep: true } })
      } catch (e) {
        if (e.response.data.errors.donut) {
          this.$refs.donut.open()
        } else {
          this.$refs.errorAlert.open()
        }
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>
