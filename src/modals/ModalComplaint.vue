<template>
  <ModalPage ref="modal"
             title="Жалоба">
    <div class="p-3">
      <div class="mb-4"
           @click="select">
        <Input label="Тема"
               placeholder="Причина жалобы"
               aria-label=""
               tabindex="-1"
               :value="typeSelected"
               class="pointer-events-none" />
      </div>

      <TextArea label="Коментарий"
                placeholder="Опишите проблему подробнее, если это необходимо."
                aria-label=""
                v-model="form.message"
                class="mb-4" />

      <Button color="primary w-full"
              class="justify-center"
              :loading="submitting"
              @click="submit">
        Отправить
      </Button>
    </div>

    <ActionSheet ref="blockOptions"
                 :items="blockItems"/>
    <Alert ref="errorAlert"
           title="Ошибка"
           text="Что-то пошло не так, попробуйте отправить жалобу чуть позже."
           cancel-text="Хорошо" />
    <Alert ref="requiredAlert"
           title="Ошибка"
           text="Вам необходимо выбрать тему жалобы."
           cancel-text="Хорошо" />
    <Alert ref="successAlert"
           title="Готово"
           text="Ваша жалоба была отправлена, мы обязательно ее рассмотрим."
           cancel-text="Хорошо"
           @cancel="close" />
  </ModalPage>
</template>

<script>
import Api from '../api'
import Alert from '../components/Alert.vue'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import TextArea from '../components/TextArea.vue'
import ModalPage from '../components/ModalPage.vue'
import ActionSheet from '../components/ActionSheet.vue'

export default {
  name: 'ModalComplaint',
  props: {
    model: Object
  },
  components: {
    Alert,
    Input,
    Button,
    TextArea,
    ModalPage,
    ActionSheet
  },
  data() {
    return {
      submitting: false,
      typeSelected: '',
      blockItems: [],
      form: {
        type: '',
        message: ''
      }
    }
  },
  methods: {
    open() {
      this.$refs.modal.open()
    },
    close() {
      this.$refs.modal.close()
    },
    async select() {
      if (this.blockItems.length === 0) {
        const { data } = await Api.getComplaintsTypes()
        this.blockItems = data.map((item) => ({
          label: item.name,
          click: () => {
            this.typeSelected = item.name
            this.form.type = item.id
          }
        }))
      }

      this.$refs.blockOptions.open()
    },
    async submit() {
      const form = { ...this.form }

      if (!form.type) {
        this.$refs.requiredAlert.open()
        return
      }

      this.submitting = true

      if (this.model) {
        Object.keys(this.model).map((key) => {
          form[`model_${key}`] = this.model[key]
        })
      }

      try {
        await Api.postComplaint(form)

        this.form.type = ''
        this.form.message = ''
        this.typeSelected = ''

        this.$refs.successAlert.open()
      } catch (e) {
        this.$refs.errorAlert.open()
      } finally {
        this.submitting = false
      }
    },
  }
}
</script>


