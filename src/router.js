import { createRouter, createWebHashHistory } from 'vue-router'
import Main from './views/Main.vue'

const stack = (root) => [
  {
    path: 'shot/:id',
    name: `${root}/shot`,
    component: () => import('./panels/Shot.vue'),
    props: ({ params }) => ({
      id: parseInt(params.id)
    }),
    meta: {
      title: 'Творение',
    },
  },
  {
    path: 'profile/:id',
    name: `${root}/profile`,
    component: () => import('./panels/Profile.vue'),
    props: ({ params }) => ({
      id: parseInt(params.id)
    }),
    meta: {
      title: 'Профиль',
    },
  },
  {
    path: 'tag/:id',
    name: `${root}/tag`,
    component: () => import('./panels/TagFeed.vue'),
    props: ({ params }) => ({
      id: parseInt(params.id)
    }),
    meta: {
      title: 'Тег',
    },
  },
  {
    path: 'followers/:id?',
    name: `${root}/followers`,
    component: () => import('./panels/Followers.vue'),
    props: ({ params }) => ({
      id: params.id ? parseInt(params.id) : undefined
    }),
    meta: {
      title: 'Подписчики',
    },
  },
  {
    path: 'following/:id?',
    name: `${root}/following`,
    component: () => import('./panels/Following.vue'),
    props: ({ params }) => ({
      id: params.id ? parseInt(params.id) : undefined
    }),
    meta: {
      title: 'Подписки',
    },
  },
  {
    path: 'rules',
    name: `${root}/rules`,
    component: () => import('./panels/Rules.vue'),
    meta: {
      title: 'Правила'
    },
  },
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: async () => ({ ...Main }),
      children: [
        {
          path: '',
          name: 'home/main',
          component: () => import('./panels/Home.vue'),
          meta: {
            title: 'ArtSpace',
            static: true
          },
        },
        {
          path: 'search',
          name: 'home/search',
          component: () => import('./panels/Search.vue'),
          meta: {
            title: 'Поиск',
          },
        },
        {
          path: 'tags',
          name: 'home/tags',
          component: () => import('./panels/HomeTags.vue'),
          meta: {
            title: 'Теги',
          },
        },
        ...stack('home')
      ]
    },
    {
      path: '/users',
      name: 'users',
      component: async () => ({ ...Main }),
      children: [
        {
          path: '',
          name: 'users/main',
          component: () => import('./panels/Users.vue'),
          meta: {
            title: 'Пользователи',
            static: true
          },
        },
        ...stack('users')
      ]
    },
    {
      path: '/create',
      name: 'create',
      component: async () => ({ ...Main }),
      children: [
        {
          path: '',
          name: 'create/main',
          component: () => import('./panels/Create.vue'),
          meta: {
            title: 'Сотворить',
            static: true
          },
        },
        ...stack('create')
      ]
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: async () => ({ ...Main }),
      children: [
        {
          path: '',
          name: 'favorites/main',
          component: () => import('./panels/Favorites.vue'),
          meta: {
            title: 'Понравилось',
            static: true
          },
        },
        ...stack('favorites')
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: async () => ({ ...Main }),
      children: [
        {
          path: '',
          name: 'user/main',
          component: () => import('./panels/Profile.vue'),
          meta: {
            title: 'Профиль',
            static: true
          },
        },
        {
          path: 'settings',
          name: 'user/settings',
          component: () => import('./panels/Settings.vue'),
          meta: {
            title: 'Настройки',
          },
        },
        {
          path: 'settings/banner',
          name: 'user/settings/banner',
          component: () => import('./panels/SettingsBanner.vue'),
          meta: {
            title: 'Обложка',
          },
        },
        {
          path: 'settings/status',
          name: 'user/settings/status',
          component: () => import('./panels/SettingsStatuses.vue'),
          meta: {
            title: 'Статус',
          },
        },
        {
          path: 'settings/banned',
          name: 'user/settings/banned',
          component: () => import('./panels/SettingsBanned.vue'),
          meta: {
            title: 'Заблокированные',
          },
        },
        {
          path: 'settings/complaints',
          name: 'user/settings/complaints',
          component: () => import('./panels/SettingsComplaints.vue'),
          meta: {
            title: 'Жалобы',
          },
        },
        {
          path: 'settings/complaint/:id',
          name: 'user/settings/complaint',
          component: () => import('./panels/SettingsComplaint.vue'),
          props: ({ params }) => ({
            id: parseInt(params.id)
          }),
          meta: {
            title: 'Жалоба',
          },
        },
        ...stack('user')
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('./panels/NotFound.vue'),
      meta: {
        title: 'Не найдено',
      },
    }
  ],
  scrollBehavior: (to, from, savedPosition) => {
    let position

    if (from.hash === '#action' || from.hash === '#alert' || from.hash === '#modal') {
      return
    }

    if (savedPosition) {
      position = savedPosition
    } else {
      position = { left: 0, top: 0 }

      if (to.meta.static) {
        return position
      }
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(position)
      }, 350)
    })
  }
})

export default router
