<template>
  <Panel :loading="!complaint">
    <div class="px-3">
      <div class="py-3">
        <h3 class="text-secondary font-medium mb-3">
          Отправитель
        </h3>

        <Link route="profile"
              :params="{ id: complaint.user.id }"
              deep
              class="flex items-center flex-1">
          <div>
            <img class="inline-block h-9 w-9 rounded-full"
                 :src="complaint.user.avatar"
                 alt="">
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm leading-5 font-medium">
              {{ complaint.user.name }}
            </p>
            <div class="flex items-center text-secondary">
              <p class="text-xs leading-4 font-medium">
                {{ moment(complaint.created_at).calendar() }}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div class="leading-5 border-t py-3">
        <h3 class="text-secondary font-medium mb-3">
          Жалоба
        </h3>

        <p class="text-sm text-secondary mb-1">
          {{ complaint.type.name }}
        </p>
        <p class="">
          {{ complaint.type.description }}
        </p>

        <div v-if="complaint.message"
             class="mt-3">
          <p class="text-sm text-secondary mb-1">
            Коментарий
          </p>
          <p class="">
            {{ complaint.message }}
          </p>
        </div>
      </div>

      <div v-if="model"
           class="leading-5 border-t py-3">
        <h3 class="text-secondary font-medium mb-3">
          Объект
        </h3>

        <Link v-if="complaint.model_type === 'shot'"
              route="shot"
              :params="{ id: complaint.model_id }"
              deep>
          <Shot :shot="model"/>
        </Link>

        <Link v-if="complaint.model_type === 'user'"
              route="profile"
              :params="{ id: complaint.model_id }"
              deep
              class="flex items-center flex-1">
          <div>
            <img class="inline-block h-9 w-9 rounded-full"
                 :src="model.avatar"
                 alt="">
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm leading-5 font-medium">
              {{ model.name }}
            </p>
            <div class="flex items-center text-secondary">
              <p class="text-xs leading-4 font-medium">
                {{ model.banned ? 'Заблокированный' : 'Активный' }}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <Button color="primary"
              class="justify-center w-full mb-3"
              @click="submit">
        Закрыть
      </Button>
    </div>

    <Alert ref="alert"
           title="Готово"
           text="Жалоба была закрыта."
           cancel-text="Хорошо"/>
  </Panel>
</template>

<script>
import moment from 'moment'
import Api from '../api'
import ShotData from '../core/shot'
import Shot from '../components/Shot.vue'
import Link from '../components/Link.vue'
import Alert from '../components/Alert.vue'
import Panel from '../components/Panel.vue'
import Button from '../components/Button.vue'

export default {
  name: 'SettingsComplaints',
  props: {
    id: Number
  },
  components: {
    Shot,
    Link,
    Alert,
    Panel,
    Button
  },
  data() {
    return {
      complaint: undefined,
      model: undefined
    }
  },
  async created() {
    const { data } = await Api.getComplaint(this.id)
    this.complaint = data

    await this.loadModel()
  },
  methods: {
    moment,
    async loadModel() {
      if (this.complaint.model_type === 'shot') {
        const { data } = await Api.getShot(this.complaint.model_id)
        this.model = new ShotData(data)
      }

      if (this.complaint.model_type === 'user') {
        const { data } = await Api.getProfile(this.complaint.model_id)
        this.model = data
      }
    },
    async submit() {
      await Api.deleteComplaint(this.id)
      this.$refs.alert.open()
    }
  }
}
</script>
