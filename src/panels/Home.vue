<template>
  <Panel>
    <template #header>
      <TopBar>
        <template #left
                  v-if="platform.web">
          <button class="p-1 text-header-tint rounded-full focus:outline-none"
                  @click="refresh">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          </button>
        </template>
        <template #title>
          <span class="flex items-center cursor-pointer"
                @click="$refs.menu.toggle()">
            <span>{{ tab.label }}</span>
            <svg class="w-4 h-4 ml-2 mt-1 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </span>
        </template>
      </TopBar>
      <div class="border-t mx-3"></div>
    </template>

    <TopBarMenu ref="menu"
                :items="items"/>

    <div class="px-3 mt-5 mb-3 flex">
      <Link route="tags"
            class="flex-1"
            deep>
        <Button color="secondary"
                class="w-full">
          Все творения
        </Button>
      </Link>
      <Link route="search"
            class="ml-3"
            deep>
        <IconButton color="secondary">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </IconButton>
      </Link>
      <IconButton color="secondary"
                  @click="config.grid = !config.grid"
                  class="ml-3">
        <svg v-if="!config.grid" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
      </IconButton>
    </div>

    <div class="p-3 grid gap-3"
         v-ptr="getData"
         :class="config.grid ? 'grid-cols-2' : 'grid-cols-1'">
      <div v-for="(shot, idx) in feed.hits"
           :key="idx">
        <Link route="shot"
              :params="{ id: shot.id }"
              deep>
          <Shot :shot="shot"
                :small="config.grid" />
        </Link>
      </div>
    </div>

    <div v-if="feed.empty"
         class="flex flex-col items-center mb-10 text-center px-3 max-w-sm mx-auto leading-5">
      <svg class="w-36 h-36 mb-5 text-placeholder" fill="none" stroke="currentColor" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m 5.2402,19.1572 v -1.625 a 2.3335,2.3335 0 0 1 2.3386,-2.3384 h 24.8894 a 2.3335,2.3335 0 0 1 2.3387,2.3386 v 24.8895 a 2.3335,2.3335 0 0 1 -2.3387,2.3386 H 7.5788 A 2.3335,2.3335 0 0 1 5.2402,42.4219 V 28.6775" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m 13.8557,14.9893 3.8086,-8.3855 c 0.5358,-1.1796 1.9215,-1.6926 3.0996,-1.1535 l 3.7895,1.7339 m 6.3878,2.9228 12.4555,5.6991 c 1.1781,0.539 1.6912,1.9208 1.1536,3.0996 l -9.721,21.3138" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m 23.4923,37.357 -5.611,-10.2266 c -0.7493,-1.2831 -2.0117,-1.271 -2.754,0 l -4.7741,8.0488 c -0.3945,0.6833 -0.5285,1.2014 -0.5285,1.8972 v 2.0145 c 0,1.1772 0.8807,1.8692 1.8908,1.8692 H 28.514 c 1.2953,0 2.165,-0.8695 2.165,-2.1401 v -2.2523 c 0,-1.4933 -0.8647,-2.107 -2.3774,-3.6196 -1.0884,-1.076 -2.0553,-0.8194 -2.8842,0 l -1.6442,1.3613 c -0.951,0.9313 -1.9064,0.0733 -2.2608,-0.5147 m 7.4281,-10.149 a 2.2679,2.2679 0 0 1 -2.2679,2.2678 2.2679,2.2679 0 0 1 -2.2678,-2.2678 2.2679,2.2679 0 0 1 2.2678,-2.2679 2.2679,2.2679 0 0 1 2.2679,2.2679 z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m 27.494968,8.7654263 0.0078,0.00391" />
      </svg>

      <h3 class="text-lg font-medium mb-1">
        Творений не найдено
      </h3>

      <p class="mb-3 text-secondary">
        Нам очень жаль, что эта лента пуста, попробуйте обновить страницу, вдруг поможет...
      </p>
    </div>

    <ProcessorObserve :processor="feed" />
  </Panel>
</template>

<script>
import platform from '../utils/platform'
import lists from '../store/lists'
import profile from '../store/profile'
import config from '../store/config'
import TopBar from '../components/TopBar.vue'
import TopBarMenu from '../components/TopBarMenu.vue'
import Panel from '../components/Panel.vue'
import Shot from '../components/Shot.vue'
import Link from '../components/Link.vue'
import IconButton from '../components/IconButton.vue'
import Button from '../components/Button.vue'
import ProcessorObserve from '../components/ProcessorObserve.vue'

export default {
  name: 'Home',
  components: {
    Link,
    Shot,
    TopBar,
    Panel,
    Button,
    TopBarMenu,
    IconButton,
    ProcessorObserve
  },
  data() {
    return {
      config,
      platform,
      feeds: lists.feed
    }
  },
  computed: {
    items() {
      return [
        {
          label: 'Новые',
          id: 'main',
          click: () => config.homeTab = 'main'
        },
        {
          label: 'Популярные',
          id: 'popular',
          click: () => config.homeTab = 'popular'
        },
        {
          label: 'Подписки',
          id: 'following',
          click: () => config.homeTab = 'following'
        },
        {
          label: 'На проверке',
          id: 'check',
          hide: !profile.role,
          click: () => config.homeTab = 'check'
        }
      ]
    },
    tab() {
      return this.items.find(({ id }) => id === config.homeTab)
    },
    feed() {
      return this.feeds[config.homeTab]
    }
  },
  watch: {
    tab() {
      this.refresh()
    }
  },
  created() {
    if (this.feed.length === 0) {
      this.getData()
    }
  },
  methods: {
    async getData() {
      return await this.feed.getData(true)
    },
    async refresh() {
      this.feed.reset()
      return await this.getData()
    }
  }
}
</script>
