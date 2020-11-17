import moment from 'moment'
import number from '../utils/number'
import processTextForUrls from '../utils/processTextForUrls'
import Api from '../api'

export default class Shot {
  raw

  constructor(raw = {}) {
    this.raw = raw
  }

  get id() {
    return this.raw.id
  }

  get authorName() {
    return this.raw.author.name
  }

  get authorId() {
    return this.raw.author.id
  }

  get authorAvatar() {
    return this.raw.author.avatar
  }

  get authorDonut() {
    return this.raw.author.donut
  }

  get isLiked() {
    return this.raw.is_liked
  }

  get isMeAuthor() {
    return this.raw.is_me_author
  }

  get title() {
    return this.raw.title
  }

  get description() {
    return processTextForUrls(this.raw.description.replace(/\n/g, '<br>'))
  }

  get tags() {
    return this.raw.tags || []
  }

  get views() {
    return number(this.raw.views)
  }

  get likes() {
    return number(this.raw.likes)
  }

  get preview() {
    return this.raw.media[0] || {}
  }

  get media() {
    return this.raw.media || []
  }

  get createdAt() {
    return moment(this.raw.created_at).calendar()
  }

  get isDeleted() {
    return this.raw.deleted
  }

  get private() {
    return this.raw.private
  }

  get published() {
    return this.raw.published
  }

  get blocked() {
    return this.raw.blocked
  }

  async like() {
    const { data } = await Api.likeShot(this.id)
    this.raw = data
  }

  async publish() {
    const { data } = await Api.publishShot(this.id)
    this.raw = data
  }

  async block(blockId) {
    const { data } = await Api.blockShot(this.id, blockId)
    this.raw = data
  }

  async update(params) {
    const { data } = await Api.updateShot(this.id, params)
    this.raw = data
  }

  async makePrivate() {
    const { data } = await Api.makeShotPrivate(this.id)
    this.raw = data
  }

  async makePublic() {
    const { data } = await Api.makeShotPublic(this.id)
    this.raw = data
  }

  async delete() {
    await Api.deleteShot(this.id)
    this.raw.deleted = true
  }
}
