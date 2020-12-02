<template>
  <Panel title="Ошибка"
         no-back>
    <div class="flex flex-col items-center text-center px-3 max-w-sm mx-auto leading-5 my-10">
      <svg class="w-36 h-36 mb-5 text-placeholder" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>

      <h3 class="text-lg font-medium mb-1">
        Ай ай ай
      </h3>

      <p class="mb-10 text-secondary">
        Не стоит так часто тревожить сервер, через пару минут сервис вновь будет доступен.
      </p>

      <Button color="secondary"
              size="sm"
              @click="refresh">
        Обновить
      </Button>
    </div>
  </Panel>
</template>

<script>
import Panel from '../components/Panel.vue'
import Button from '../components/Button.vue'

export default {
  name: 'NetworkError',
  components: {
    Panel,
    Button
  },
  methods: {
    refresh() {
      window.location.reload()
    }
  }
}
</script>
