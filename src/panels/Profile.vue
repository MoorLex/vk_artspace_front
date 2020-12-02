<template>
  <Panel :loading="!profile && !error">
    <template #header>
      <TopBar :title="panelTitle">
        <template #left>

          <Link route="settings"
                deep>
            <button v-if="profile && profile.isMe && $route.name === 'user/main'"
                    class="p-1 text-header-tint rounded-full focus:outline-none">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
          </Link>
          <button v-if="platform.web"
                  class="p-1 text-header-tint rounded-full focus:outline-none"
                  @click="refresh">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          </button>
        </template>
      </TopBar>
    </template>

    <div v-if="!error"
         class="grid gap-4 mb-4"
         v-ptr="refresh">
      <div class="">
        <Ratio :ratio="9/22"
               :src="profile.banner && profile.banner.lg"
               class="bg-button-secondary"/>

        <div class="block px-3 pt-4 relative flex">
          <div class="-mt-12 p-2 bg-content rounded-full">
            <div class="w-20">
              <Ratio :src="profile.avatar"
                     class="rounded-full">
                <IconButton v-if="profile.isDonut"
                            class="absolute bottom-0 right-0 -mr-1 -mb-1 bg-donut"
                            size="6"
                            rounded="full">
                  <svg class="w-4 h-4 text-white" fill="currentColor" stroke="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                </IconButton>
              </Ratio>
            </div>
          </div>
          <div class="flex flex-1 truncate">
            <a :href="profile.link"
               target="_blank"
               class="flex items-end flex-1 truncate">
              <div class="ml-3 flex-1 pb-2 truncate">
                <p class="text-sm leading-5 font-medium truncate">
                  {{ profile.name }}
                </p>
                <p class="text-xs leading-4 font-medium truncate text-secondary">
                  {{ profile.status.name }}
                </p>
              </div>
            </a>
            <IconButton class="ml-3"
                        @click="$refs.options.open()">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </IconButton>
          </div>
        </div>
      </div>

      <Banner v-if="profile.isBanned"
              class="mx-3 rounded-lg"
              title="Профиль заблокирован."
              text="Увы, но доступ к данному профилю был заблокирован за несоблюдение правил сервиса."/>

      <div class="flex">
        <div class="flex-1 px-3 text-center">
          <p class="font-bold">
            {{ profile.shotsCount }}
          </p>
          <p class="text-sm text-secondary">
            {{ pronunciation(profile.stats.shots, ['Творение', 'Творения', 'Творений']) }}
          </p>
        </div>
        <Link route="followers"
              deep
              :params="profile.isMe ? undefined : { id }"
              class="flex-1 px-3 text-center">
          <p class="font-bold">
            {{ profile.followers }}
          </p>
          <p class="text-sm text-secondary">
            {{ pronunciation(profile.followers, ['Подписчик', 'Подписчика', 'Подписчиков']) }}
          </p>
        </Link>
        <Link route="following"
              deep
              :params="profile.isMe ? undefined : { id }"
              class="flex-1 px-3 text-center">
          <p class="font-bold">
            {{ profile.following }}
          </p>
          <p class="text-sm text-secondary">
            {{ pronunciation(profile.following, ['Подписка', 'Подписки', 'Подписок']) }}
          </p>
        </Link>
      </div>

      <div v-if="canFollow"
           class="flex px-3">
        <Button color="primary"
                @click="() => profile.follow()"
                class="w-full justify-center">
          Подписаться
        </Button>
      </div>

      <div class="mx-3 grid grid-cols-2 gap-3">
        <Link v-for="(shot, idx) in profile.shots.hits"
              :key="idx"
              route="shot"
              :params="{ id: shot.id }"
              deep>
          <Shot :shot="shot"
                small />
        </Link>
      </div>

      <div v-if="profile.shots.empty"
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
          Хмм... мы были уверены, что каждый делится своим творчеством.
        </p>
      </div>

      <ProcessorObserve :processor="profile.shots" />
    </div>
    <div v-else-if="error"
         class="flex flex-col items-center text-center px-3 max-w-sm mx-auto leading-5 my-10">
      <svg class="w-36 h-36 mb-5 text-placeholder" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <h3 class="text-lg font-medium mb-1">
        Не найдено
      </h3>

      <p class="mb-3 text-secondary">
        Такого творца нет.
      </p>
    </div>

    <ActionSheet v-if="!error"
                 ref="options"
                 :items="items"/>

    <ModalComplaint ref="complaint"
                    :model="{ type: 'user', id }"/>
  </Panel>
</template>

<script>
import Bridge from '@vkontakte/vk-bridge'
import lists from '../store/lists'
import profile from '../store/profile'
import user from '../core/user'
import Api from '../api'
import platform from '../utils/platform'
import pronunciation from '../utils/pronunciation'
import number from '../utils/number'
import Ratio from '../components/Ratio.vue'
import Shot from '../components/Shot.vue'
import TopBar from '../components/TopBar.vue'
import Button from '../components/Button.vue'
import IconButton from '../components/IconButton.vue'
import Link from '../components/Link.vue'
import Banner from '../components/Banner.vue'
import Spinner from '../components/Spinner.vue'
import Panel from '../components/Panel.vue'
import ActionSheet from '../components/ActionSheet.vue'
import ProcessorObserve from '../components/ProcessorObserve.vue'
import ModalComplaint from '../modals/ModalComplaint.vue'

export default {
  name: 'Profile',
  props: {
    id: {
      type: [Number, String],
      default: 'me'
    }
  },
  components: {
    Ratio,
    Shot,
    TopBar,
    Panel,
    Spinner,
    Link,
    Button,
    Banner,
    IconButton,
    ActionSheet,
    ModalComplaint,
    ProcessorObserve
  },
  data() {
    return {
      platform,
      error: undefined,
      profile: this.id === 'me' ? profile : lists.user[this.id]
    }
  },
  watch: {
    $route(route) {
      const id = parseInt(route.params.id) || profile.id

      if (id !== this.profile.id) {
        this.profile = undefined
        this.$nextTick(() => {
          this.profile = this.id === 'me' ? profile : lists.user[this.id]
          this.load()
        })
      }
    }
  },
  computed: {
    panelTitle() {
      return this.$route.meta.title || ''
    },
    canSubscribe() {
      return this.profile.isMe && !profile.isDonut
    },
    canFollow() {
      return !this.profile.isBanned &&
        !this.profile.isMe &&
        !profile.isBanned &&
        !this.profile.isFollowed
    },
    items() {
      return [
        {
          label: 'Поделиться',
          click: () => this.share()
        },
        {
          label: 'Отписаться',
          hide: !this.profile.isFollowed,
          click: () => this.profile.unfollow()
        },
        {
          label: 'Заблокировать',
          hide: this.profile.isMe || !profile.isAdmin || this.profile.isBanned,
          click: () => this.profile.ban()
        },
        {
          label: 'Пожаловаться',
          hide: this.profile.isMe,
          click: () => {
            setTimeout(() => {
              this.$refs.complaint.open()
            }, 200)
          }
        }
      ]
    }
  },
  created() {
    this.load()
  },
  methods: {
    pronunciation,
    number,
    share() {
      const link = `https://vk.com/app7588282#/user/profile/${this.profile.id}`

      Bridge.send("VKWebAppShare", { link });
    },
    async load() {
      if (this.profile) {
        this.profile.getData && this.profile.getData(this.id)

        if (this.profile.shots.entries === 0) {
          await this.getData()
        }
      } else {
        try {
          const { data } = await Api.getProfile(this.id)
          this.profile = new user(data)
          lists.user[this.id] = this.profile
          await this.getData()
        } catch (e) {
          this.error = e.response.status
        }
      }
    },
    async getData() {
      await this.profile.shots.getData(true)
    },
    async refresh() {
      const { data } = await Api.getProfile(this.id)
      this.profile = new user(data)
      this.profile.shots.reset()

      lists.user[this.id] = this.profile

      await this.getData()
    }
  }
}
</script>
