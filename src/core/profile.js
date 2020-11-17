import User from './user'
import ShotsProcessor from './shots-processor'
import Api from '../api'
import Bridge from '@vkontakte/vk-bridge'

export default class Profile extends User {
  raw  = undefined
  token = undefined
  logged = false
  album = undefined

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
    const { data } = await Api.updateProfile({ status_id })
    this.raw = data
  }

  async getData(id) {
    this.shots.params = { id }
    const { data } = await Api.getProfile(id)
    this.raw = data
  }

  async login() {
    const { data } = await Api.login()
    this.raw = data
    this.album = data.album_id
    this.logged = true
  }

  async getToken() {
    const { access_token } = await Bridge.send("VKWebAppGetAuthToken", { app_id: 7588282, scope: "photos" })

    if (access_token) {
      this.token = access_token

      const { data } = await Api.updateProfile({
        token: access_token
      })

      this.raw = data
    }
  }

  async getAlbum() {
    if (!this.album) {
      const { response } = await Bridge.send('VKWebAppCallAPIMethod', {
        method: 'photos.createAlbum',
        params: {
          v: '5.124',
          title: 'ArtSpace',
          privacy_view: 'nobody',
          privacy_comment: 'nobody',
          access_token: this.token
        },
      })
      this.album = response.id

      await Api.updateProfile({
        album_id: response.id
      })
    }

    return this.album
  }

  async getUploadServer() {
    let data

    try {
      const { response } = await Bridge.send('VKWebAppCallAPIMethod', {
        method: 'photos.getUploadServer',
        params: {
          v: '5.124',
          access_token: this.token,
          album_id: this.album
        },
      })

      data = response
    } catch (err) {
      this.album = undefined
      await this.getAlbum()

      const { response } = await Bridge.send('VKWebAppCallAPIMethod', {
        method: 'photos.getUploadServer',
        params: {
          v: '5.124',
          access_token: this.token,
          album_id: this.album
        },
      })

      data = response
    }

    return data
  }

  async saveUploadedImages(params = {}) {
    const { response } = await Bridge.send('VKWebAppCallAPIMethod', {
      method: 'photos.save',
      params: {
        ...params,
        v: '5.124',
        access_token: this.token,
        album_id: this.album
      },
    })

    return response
  }
}
