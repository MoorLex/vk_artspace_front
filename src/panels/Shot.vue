<template>
  <Panel :loading="!shot && !error">
    <div v-if="!error">
      <div class="grid gap-4 px-3 py-4">
        <div class="">
          <div class="flex-shrink-0 group block focus:outline-none">
            <div class="flex items-center">
              <Link route="profile"
                    :params="{ id: shot.authorId }"
                    deep
                    class="flex items-center flex-1">
                <div class="w-9">
                  <Ratio :src="shot.authorAvatar"
                         class="rounded-full">
                    <IconButton v-if="shot.authorDonut"
                                class="absolute bottom-0 right-0 -mr-1 -mb-1 bg-donut"
                                size="4"
                                rounded="full">
                      <svg class="w-3 h-3 text-white" fill="currentColor" stroke="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    </IconButton>
                  </Ratio>
                </div>
                <div class="ml-3 flex-1">
                  <p class="text-sm leading-5 font-medium">
                    {{ shot.authorName }}
                  </p>
                  <div class="flex items-center text-secondary">
                    <p class="text-xs leading-4 font-medium">
                      {{ shot.createdAt }}
                    </p>
                  </div>
                </div>
              </Link>
              <Button class="bg-transparent text-button-secondary"
                      @click="$refs.options.open()">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
              </Button>
            </div>
          </div>
        </div>

        <Banner v-if="shot.private"
                class="rounded-lg"
                title="Творение скрыто"
                text="Данное творение видно только по ссылке." />
      </div>

      <div class="">
        <div v-if="shot.isDeleted"
             class="px-3">
          <Ratio :ratio="3/4"
                 class="bg-button-secondary rounded-lg">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </Ratio>
        </div>
        <div v-else-if="!ready"
             class="px-3">
          <Ratio :ratio="3/4"
                 class="bg-button-secondary rounded-lg">
            <Spinner size="6" />
          </Ratio>
        </div>
        <Swiper v-else-if="!unmounted"
                :slides-per-view="1"
                @swiper="setSwiper"
                @slideChange="slide = $event.activeIndex">
          <SwiperSlide v-for="(image, idx) in shot.media"
                       :key="idx">
            <div class="px-3">
              <Ratio :ratio="3/4"
                     :src="image.lg"
                     class="bg-button-secondary rounded-lg cursor-move"/>
            </div>
          </SwiperSlide>
        </Swiper>
        <div v-else
             class="px-3">
          <Ratio :ratio="3/4"
                 :src="shot.media[slide].lg"
                 class="bg-button-secondary rounded-lg cursor-move"/>
        </div>
      </div>

      <div v-if="shot.media.length > 1"
           class="mt-4 px-3">
        <div class="grid grid-cols-3 gap-3">
          <Ratio v-for="(image, idx) in shot.media"
                 :key="idx"
                 :ratio="3/4"
                 :src="image.sm"
                 @click="swiper && swiper.slideTo(idx)"
                 class="bg-button-secondary rounded-lg overflow-hidden transition duration-100 cursor-pointer"
                 :class="slide !== idx && 'opacity-50'"/>
        </div>
      </div>

      <div class="flex justify-between px-3">
        <button type="button"
                class="inline-flex items-center font-bold px-2 py-2 text-sm leading-5 font-medium rounded-lg focus:outline-none"
                @click="toggleLike">
          <svg class="w-4 h-4 mr-2" :class="shot.isLiked && 'text-like'" :fill="shot.isLiked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          <span>{{ shot.likes }}</span>
        </button>
        <button type="button"
                class="inline-flex mr-auto items-center font-bold px-2 py-2 text-sm leading-5 font-medium rounded-lg focus:outline-none"
                @click="share">
          <svg class="w-4 h-6 transform scale-x-mirror" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
        </button>
        <button type="button"
                class="inline-flex pointer-events-none items-center font-bold px-2 py-2 text-sm leading-5 font-medium rounded-lg focus:outline-none">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          <span>{{ shot.views }}</span>
        </button>
      </div>

      <PromoBanner v-if="promo"
                   :data="promo"
                   class="mt-4"
                   @close="promo = undefined" />

      <div class="grid gap-4 px-3 py-4">

        <div v-if="shot.title || shot.description || shot.tags.length > 0"
             class="grid gap-2">
          <h3 v-if="shot.title"
              class="text-lg leading-5 font-bold wrap-long">
            {{ shot.title }}
          </h3>

          <p class="wrap-long"
             v-html="shot.description" />

          <div v-if="shot.tags.length > 0"
               class="flex flex-wrap -mx-1 -mt-2">
            <Link v-for="(tag, idx) in shot.tags"
                  :key="idx"
                  route="tag"
                  :params="tag"
                  deep
                  class="block mx-1 mt-2 bg-button-secondary px-3 text-sm leading-8 rounded-full">
              {{ tag.name }}
            </Link>
          </div>
        </div>

        <Banner v-if="shot.blocked"
                class="rounded-lg"
                title="Заблокировано"
                :text="shot.blocked.description">
          <Link route="rules"
                class="mt-3 inline-block"
                deep>
            <Button color="primary"
                    size="sm">
              Узнать больше
            </Button>
          </Link>
        </Banner>
        <div v-else-if="!shot.published">
          <Banner class="rounded-lg"
                  title="На рассмотрении"
                  text="Данное творение проходит модерацию, будьте терпеливы. Как только эксперты одобрят данное творение, все смогут его увидеть.">
            <Link route="rules"
                  class="mt-3 inline-block"
                  deep>
              <Button color="primary"
                      size="sm">
                Узнать больше
              </Button>
            </Link>
          </Banner>
          <div v-if="canModerate"
               class="flex mt-3">
            <Button color="secondary"
                    @click="block"
                    class="w-full justify-center mr-3">
              Отклонить
            </Button>
            <Button color="primary"
                    @click="publish"
                    class="w-full justify-center">
              Пропустить
            </Button>
          </div>
        </div>

        <div v-if="latest.length > 0">
          <h3 class="leading-5 text-secondary font-medium mb-3">
            Больше от автора
          </h3>
          <div class="grid grid-cols-2 gap-3">
            <Link v-for="(shot, idx) in latest.hits"
                  :key="idx"
                  route="shot"
                  :params="{ id: shot.id }"
                  deep>
              <Ratio :ratio="3/4"
                     :src="shot.preview.lg"
                     class="bg-button-secondary rounded-lg"/>
            </Link>
          </div>
        </div>
      </div>

      <ActionSheet ref="options"
                   :items="items"/>
      <ActionSheet ref="blockOptions"
                   :items="blockItems"/>

      <Alert ref="alert"
             title="Вы уверены что хотите удалить творение?"
             text="После удаления вернуть творение будет очень трудно, подумайте дважды!"
             :items="[{ label: 'Удалить', click: () => this.remove() }]"/>

      <Alert ref="blockAlert"
             title="Вы уверены что хотите заблокировать творение?"
             text="Заблокировать творение можно только если оно и правда нарушает правила сервиса!"
             :items="[{ label: 'Заблокировать', click: () => this.blockShot() }]"/>

      <ModalComplaint ref="complaint"
                      :model="{ type: 'shot', id }"/>
    </div>
    <div v-else-if="error"
         class="flex flex-col items-center text-center px-3 max-w-sm mx-auto leading-5 my-10">
      <svg class="w-36 h-36 mb-5 text-placeholder" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <h3 class="text-lg font-medium mb-1">
        Не найдено
      </h3>

      <p class="mb-3 text-secondary">
        Такого творения нет.
      </p>
    </div>
  </Panel>
</template>

<script>
import Bridge from '@vkontakte/vk-bridge'
import Api from '../api'
import lists from '../store/lists'
import profile from '../store/profile'
import Shot from '../core/shot'
import ShotsProcessor from '../core/shots-processor'
import IconButton from '../components/IconButton.vue'
import Ratio from '../components/Ratio.vue'
import Button from '../components/Button.vue'
import Link from '../components/Link.vue'
import Spinner from '../components/Spinner.vue'
import Panel from '../components/Panel.vue'
import ActionSheet from '../components/ActionSheet.vue'
import Alert from '../components/Alert.vue'
import Banner from '../components/Banner.vue'
import PromoBanner from '../components/PromoBanner.vue'
import ModalComplaint from '../modals/ModalComplaint.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'

export default {
  name: 'Shot',
  props: {
    id: Number
  },
  components: {
    Spinner,
    Link,
    Alert,
    Ratio,
    Panel,
    Button,
    Swiper,
    Banner,
    IconButton,
    SwiperSlide,
    PromoBanner,
    ActionSheet,
    ModalComplaint
  },
  watch: {
    $route(route) {
      if (route.name.split('/').includes('shot')) {
        this.shot = undefined
        this.$nextTick(() => {
          this.getPromo()
          this.load()
        })
      }
    }
  },
  data() {
    return {
      slide: 0,
      blockItems: [],
      ready: false,
      loading: false,
      shot: undefined,
      error: undefined,
      promo: undefined,
      unmounted: false,
      swiper: undefined,
      latest: undefined,
      blockId: undefined
    }
  },
  computed: {
    items() {
      return [
        {
          label: 'Удалить',
          hide: !this.shot.isMeAuthor,
          click: () => this.$refs.alert.open()
        },
        {
          label: 'Скрыть',
          hide: !this.shot.isMeAuthor || !profile.isDonut || this.shot.private,
          click: () => this.shot.makePrivate()
        },
        {
          label: 'Открыть доступ',
          hide: !this.shot.isMeAuthor || !this.shot.private,
          click: () => this.shot.makePublic()
        },
        {
          label: 'Поделиться',
          click: () => this.share()
        },
        {
          label: 'Пожаловаться',
          click: () => this.$refs.complaint.open()
        }
      ]
    },
    canModerate() {
      return profile.role === 'admin' ||
        profile.role === 'moder'
    }
  },
  mounted() {
    this.getPromo()
    this.load()
  },
  beforeRouteLeave() {
    this.unmounted = true
  },
  methods: {
    setSwiper(swiper) {
      this.swiper = swiper;
    },
    share() {
      const link = 'https://vk.com/app7588282' + this.$route.href

      Bridge.send("VKWebAppShare", { link });
    },
    async getPromo() {
      if (!profile.isDonut) {
        this.promo = await Bridge.send('VKWebAppGetAds')
      }
    },
    async toggleLike() {
      if (!this.loading && !profile.isBanned) {
        this.loading = true;
        this.shot.raw.is_liked = !this.shot.raw.is_liked;

        await this.shot.like()
        this.updateShot()

        if (this.shot.raw.is_liked) {
          lists.favorites.push(this.shot.raw)
        } else {
          lists.favorites.remove(this.shot)
        }

        this.loading = false;
      }
    },
    async publish() {
      if (!this.loading) {
        this.loading = true;

        await this.shot.publish()
        this.updateShot()
        profile.shots.update(this.shot.raw)

        this.loading = false;
      }
    },
    async block() {
      if (this.blockItems.length === 0) {
        const { data } = await Api.getComplaintsTypes()
        this.blockItems = data.map((item) => ({
          label: item.name,
          click: () => {
            this.blockId = item.id
            this.$refs.blockAlert.open()
          }
        }))
      }

      this.$refs.blockOptions.open()
    },
    async load() {
      try {
        const { data } = await Api.getShot(this.id)
        this.shot = new Shot(data)
        this.latest = new ShotsProcessor({
          fetch: () => Api.getProfileLatestShots(this.shot.authorId)
        })
        await this.latest.getData()
        await this.$nextTick(() => {
          this.ready = true
        })
      } catch (e) {
        this.error = e.response.status
      }
    },
    async remove() {
      await this.shot.delete()

      lists.favorites.remove(this.shot)
      profile.shots.remove(this.shot)
      Object.keys(lists.feed).map((key) => {
        lists.feed[key].remove(this.shot)
      })
    },
    async blockShot() {
      if (!this.loading && this.blockId) {
        this.loading = true;

        await this.shot.block(this.blockId)
        this.updateShot()
        profile.shots.update(this.shot.raw)

        this.loading = false;
      }
    },
    updateShot() {
      Object.keys(lists.feed).map((key) => {
        lists.feed[key].update(this.shot.raw)
      })
      lists.favorites.update(this.shot.raw)
    }
  }
}
</script>
