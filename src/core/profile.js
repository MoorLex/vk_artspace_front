import User from './user'
import ShotsProcessor from './shots-processor'
import Api from '../api'

export default class Profile extends User {
  raw  = undefined
  token = undefined
  logged = false

  constructor() {
    super(null, {
      shots: new ShotsProcessor({
        fetch: (page, params) => Api.getProfileShots(params.id, page)
      })
    })
  }

  async follow() {
    const { data } = await Api.followProfile(this.id)
    this.raw = data
  }

  async unfollow() {
    const { data } = await Api.unfollowProfile(this.id)
    this.raw = data
  }

  async setStatus(status_id) {
    const { data } = await Api.updateProfile('me', { status_id })
    this.raw = data
  }

  async getData(id) {
    this.shots.params = { id }
    const { data } = await Api.getProfile(id)
    this.raw = data
  }

  async updateBanner(file) {
    const files = await Api.uploadMedia([file], 'banner')
    return await Api.saveProfileMedia(files)
  }

  async login() {
    const { data } = await Api.login()
    this.raw = data
    this.logged = true
  }
}
