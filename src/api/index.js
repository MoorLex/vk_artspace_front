import axios from 'axios'
import HttpMethodsEnum from './httpMethodsEnum'

export class Api {
  constructor () {
    this.baseUrl = import.meta.env.VITE_SERVER_URL
    this.axios = axios.create({
      baseURL: this.baseUrl
    })
    this.axios.defaults.headers.common['X-Vk-Auth-Url'] = import.meta.env.VITE_AUTH || window.location.href;
    this.axios.interceptors.request.use((config) => {
      config.requestStartTime = Date.now()
      return config
    })
    this.axios.interceptors.response.use((response) => {
      response.config.requestTime = Date.now() - response.config.requestStartTime
      // console.log({
      //   url: response.config.url,
      //   method: response.config.method,
      //   time: response.config.requestTime + ' ms'
      // })
      return response
    })
  }

  async request (method, url, params, headers = {}) {
    const config = {
      method: (method === HttpMethodsEnum.PUT) ? HttpMethodsEnum.POST : method,
      headers: headers,
      url: url
    }

    if (method === HttpMethodsEnum.GET) {
      config.params = params
    } else if (method === HttpMethodsEnum.POST) {
      if (params instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data'
      }
      config.data = params
    } else if (method === HttpMethodsEnum.PUT) {
      config.data = { ...params, _method: 'put' }
    }

    return await this.axios.request(config)
  }

  async login () {
    const { data } = await this.request(HttpMethodsEnum.POST, '/login')
    return data
  }

  async getUsers (page, filters) {
    const params = {
      page: page || 1,
      ...filters
    }
    const { data } = await this.request(HttpMethodsEnum.GET, '/users', params)
    return data
  }

  async getShots (page, filters) {
    const params = {
      page: page || 1,
      // page_size: 20,
      ...filters
    }
    const { data } = await this.request(HttpMethodsEnum.GET, '/shots', params)
    return data
  }

  async getPopularShots (page, filters) {
    const params = {
      page: page || 1,
      ...filters
    }
    const { data } = await this.request(HttpMethodsEnum.GET, '/shots/popular', params)
    return data
  }

  async getComplaints (page, filters) {
    const params = {
      page: page || 1,
      ...filters
    }
    const { data } = await this.request(HttpMethodsEnum.GET, '/complaints', params)
    return data
  }

  async getComplaint (id) {
    const { data } = await this.request(HttpMethodsEnum.GET, `/complaints/${id}`)
    return data
  }

  async deleteComplaint (id) {
    const { data } = await this.request(HttpMethodsEnum.DELETE, `/complaints/${id}`)
    return data
  }

  async postComplaint (params) {
    const { data } = await this.request(HttpMethodsEnum.POST, '/complaints', params)
    return data
  }

  async getComplaintsTypes (page, filters) {
    const params = {
      page: page || 1,
      ...filters
    }
    const { data } = await this.request(HttpMethodsEnum.GET, '/complaints/types', params)
    return data
  }

  async getFollowingShots (page, filters) {
    const params = {
      page: page || 1,
      ...filters
    }
    const { data } = await this.request(HttpMethodsEnum.GET, '/shots/following', params)
    return data
  }

  async getShotsByTag (page, tag, filters) {
    const params = {
      page: page || 1,
      ...filters
    }
    const { data } = await this.request(HttpMethodsEnum.GET, `/tags/${tag}/shots`, params)
    return data
  }

  async getFavorites (page, filters) {
    const params = {
      page: page || 1,
      // page_size: 20,
      ...filters
    }
    const { data } = await this.request(HttpMethodsEnum.GET, '/shots/favorites', params)
    return data
  }

  async getShot (id) {
    const { data } = await this.request(HttpMethodsEnum.GET, `/shots/${id}`)
    return data
  }

  async getProfile (id) {
    const { data } = await this.request(HttpMethodsEnum.GET, `/users/${id}`)
    return data
  }

  async getFollowing (id, page, filters) {
    const params = {
      page: page || 1,
      ...filters
    }
    const { data } = await this.request(HttpMethodsEnum.GET, `/users/${id}/following`, params)
    return data
  }

  async getFollowers (id, page, filters) {
    const params = {
      page: page || 1,
      ...filters
    }
    const { data } = await this.request(HttpMethodsEnum.GET, `/users/${id}/followers`, params)
    return data
  }

  async updateProfile (id, params) {
    const { data } = await this.request(HttpMethodsEnum.PUT, `/users/${id}`, params)
    return data
  }

  async saveProfileMedia (images) {
    const formData = new FormData()

    images.forEach((img) => {
      formData.append(`media[]`, JSON.stringify(img))
    })

    const { data } = await this.request(HttpMethodsEnum.POST, '/users/me/banner', formData)
    return data
  }

  async getProfileShots (id, page) {
    const params = {
      page: page || 1
    }
    const { data } = await this.request(HttpMethodsEnum.GET, `/users/${id}/shots`, params)
    return data
  }

  async getProfileLatestShots (id) {
    const { data } = await this.request(HttpMethodsEnum.GET, `/users/${id}/latest`)
    return data
  }

  async followProfile (id) {
    const { data } = await this.request(HttpMethodsEnum.POST, `/users/${id}/follow`)
    return data
  }

  async unfollowProfile (id) {
    const { data } = await this.request(HttpMethodsEnum.DELETE, `/users/${id}/follow`)
    return data
  }

  async banProfile (id) {
    const { data } = await this.request(HttpMethodsEnum.POST, `/users/${id}/ban`)
    return data
  }

  async likeShot (id) {
    const { data } = await this.request(HttpMethodsEnum.POST, `/shots/${id}/like`)
    return data
  }

  async publishShot (id) {
    const { data } = await this.request(HttpMethodsEnum.POST, `/shots/${id}/publish`)
    return data
  }

  async blockShot (id, blockId) {
    const { data } = await this.request(HttpMethodsEnum.POST, `/shots/${id}/block`, { block_id: blockId })
    return data
  }

  async deleteShot (id) {
    const { data } = await this.request(HttpMethodsEnum.DELETE, `/shots/${id}`)
    return data
  }

  async updateShot (id, params) {
    const { data } = await this.request(HttpMethodsEnum.PUT, `/shots/${id}`, params)
    return data
  }

  async uploadMedia (images, category) {
    const formData = new FormData()

    images.forEach((img) => {
      formData.append(`media[]`, img)
    })

    if (category) {
      formData.append(`category`, category)
    }

    const { data } = await this.request(HttpMethodsEnum.POST, '/media/upload', formData)
    return data
  }

  async createShot (form, images) {
    const formData = new FormData()

    if (form.title) {
      formData.append('title', form.title.replace(/\n{2,}/g, '\n').trim())
    }

    if (form.description) {
      formData.append('description', form.description.replace(/\n{3,}/g, '\n\n').trim())
    }

    if (form.private) {
      formData.append('private', form.private ? 1 : 0)
    }

    form.tags.forEach((tag) => {
      formData.append(`tags[]`, tag)
    })

    images.forEach((img) => {
      formData.append(`media[]`, JSON.stringify(img))
    })

    const { data } = await this.request(HttpMethodsEnum.POST, '/shots', formData)
    return data
  }

  async getTags (page, filters) {
    const params = {
      page: page || 1,
      page_size: 100,
      ...filters
    }
    const { data } = await this.request(HttpMethodsEnum.GET, '/tags', params)
    return data
  }

  async getTag (id) {
    const { data } = await this.request(HttpMethodsEnum.GET, `/tags/${id}`)
    return data
  }

  async getStatuses (page, filters) {
    const params = {
      page: page || 1,
      ...filters
    }
    const { data } = await this.request(HttpMethodsEnum.GET, '/statuses', params)
    return data
  }
}

export default new Api()
