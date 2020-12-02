<template>
  <Panel>
    <div class="grid gap-4 px-3 py-4">
      <div class="">
        <p class="block mb-1 text-sm font-medium leading-5 text-secondary">
          Основное
        </p>

        <div class="bg-tint rounded-lg py-1 overflow-hidden">
          <Link v-for="(item, idx) in items"
                :key="idx"
                :route="item.route"
                v-show="!item.hide"
                class="block"
                deep>
            <div class="flex items-center px-4 py-3 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                {{ item.label }}
              </div>
              <div>
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </Link>
          <a href="https://vk.com/le__moore"
             target="_blank"
             class="block">
            <div class="flex items-center px-4 py-3 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                Вступить в сообщество
              </div>
              <div>
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </a>
          <a href="https://vk.com/im?media=&sel=-197720041"
             target="_blank"
             class="block">
            <div class="flex items-center px-4 py-3 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                Обратная связь
              </div>
              <div>
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div>
        <p class="block mb-1 text-sm font-medium leading-5 text-secondary">
          Donut раздел
        </p>

        <div class="bg-tint rounded-lg py-1 overflow-hidden">
          <Link v-for="(item, idx) in vipItems"
                :key="idx"
                :route="item.route"
                class="block"
                :class="[
                  item.disabled && 'pointer-events-none opacity-50'
                ]"
                deep>
            <div class="flex items-center px-4 py-3 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                {{ item.label }}
              </div>
              <div>
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div v-if="adminItems.length > 0">
        <p class="block mb-1 text-sm font-medium leading-5 text-secondary">
          Администрация
        </p>

        <div class="bg-tint rounded-lg py-1 overflow-hidden">
          <Link v-for="(item, idx) in adminItems"
                :key="idx"
                :route="item.route"
                class="block"
                deep>
            <div class="flex items-center px-4 py-3 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                {{ item.label }}
              </div>
              <div>
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>

  </Panel>
</template>

<script>
import profile from '../store/profile'
import Panel from '../components/Panel.vue'
import Link from '../components/Link.vue'

export default {
  name: 'Settings',
  components: {
    Panel,
    Link,
  },
  computed: {
    items() {
      return [
        {
          label: 'Поменять обложку',
          route: 'settings/banner'
        },
        {
          label: 'Правила сервиса',
          route: 'rules'
        }
      ]
    },
    vipItems() {
      return [
        {
          label: 'Скрытые публикации',
          disabled: !profile.isDonut,
          route: 'settings/private'
        },
        {
          label: 'Поменять статус',
          disabled: !profile.isDonut,
          route: 'settings/status'
        }
      ]
    },
    adminItems() {
      return profile.isAdmin ? [
        {
          label: 'Жалобы',
          route: 'settings/complaints'
        },
        {
          label: 'Заблокированные профили',
          route: 'settings/banned'
        }
      ] : []
    }
  }
}
</script>
