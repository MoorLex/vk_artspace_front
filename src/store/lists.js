import { reactive } from 'vue'
import ShotsProcessor from '../core/shots-processor'
import UsersProcessor from '../core/users-processor'
import Processor from '../core/processor'
import Api from '../api'

export const state = reactive({
  feed: {
    main: new ShotsProcessor({
      withPromo: true,
      fetch: (page, params) => Api.getShots(page, params)
    }),
    popular: new ShotsProcessor({
      fetch: (page, params) => Api.getPopularShots(page, params)
    }),
    following: new ShotsProcessor({
      fetch: (page, params) => Api.getFollowingShots(page, params)
    }),
    check: new ShotsProcessor({
      fetch: (page, params) => Api.getShots(page, { ...params, check: true })
    })
  },
  search: new ShotsProcessor({
    fetch: (page, params) => Api.getShots(page, params)
  }),
  favorites: new ShotsProcessor({
    fetch: (page, params) => Api.getFavorites(page, params)
  }),
  users: new UsersProcessor({
    fetch: (page, params) => Api.getUsers(page, params)
  }),
  banned: new UsersProcessor({
    fetch: (page, params) => Api.getUsers(page, { ...params, banned: true })
  }),
  tags: new Processor({
    fetch: () => Api.getTags()
  }),
  statuses: new Processor({
    fetch: () => Api.getStatuses()
  }),
  complaints: new Processor({
    fetch: () => Api.getComplaints()
  }),
  tag: [],
  user: [],
  followers: [],
  following: []
})

export default state
