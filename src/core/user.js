import number from '../utils/number'
import profile from '../store/profile'
import ShotsProcessor from './shots-processor'
import Api from '../api'

export default class User {
  raw

  constructor(raw, params = {}) {
    this.raw = raw
    this.shots = params.shots || new ShotsProcessor({
      fetch: (page) => Api.getProfileShots(raw.id, page)
    })
    this.latest = params.latest || new ShotsProcessor({
      fetch: () => Api.getProfileLatestShots(raw.id)
    })
  }

  get id() {
    return this.raw.id
  }

  get name() {
    return this.raw.name
  }

  get avatar() {
    return this.raw.avatar
  }

  get banner() {
    return this.raw.banner || { lg: '/banner.png' }
  }

  get following() {
    return number(this.stats.following || 0)
  }

  get followers() {
    return number(this.stats.followers || 0)
  }

  get shotsCount() {
    return number(this.stats.shots || 0)
  }

  get status() {
    return this.isDonut ? this.raw.status : {
      id: 0,
      name: 'Пользователь'
    }
  }

  get stats() {
    return this.raw.stats || {}
  }

  get role() {
    return this.raw.role || ''
  }

  get isAdmin() {
    return this.raw.role === 'admin'
  }

  get isFollowed() {
    return this.raw.is_followed
  }

  get isMe() {
    return this.id === profile.id
  }

  get isBanned() {
    return this.raw.banned
  }

  get isDonut() {
    return this.raw.donut
  }

  get link() {
    return `https://vk.com/id${this.raw.vk_id}`
  }

  async follow() {
    const { data } = await Api.followProfile(this.id)
    this.raw = data
  }

  async unfollow() {
    const { data } = await Api.unfollowProfile(this.id)
    this.raw = data
  }

  async ban() {
    const { data } = await Api.banProfile(this.id)
    this.raw = data
  }
}
