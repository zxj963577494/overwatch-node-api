'use strict'

const { Controller } = require('egg')

class PlayerController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.playerCreateRule = {
      handle: { type: 'string', required: false },
      name: { type: 'string', required: true },
      homeLocation: { type: 'string', required: false },
      familyName: { type: 'string', required: false },
      givenName: { type: 'string', required: false },
      nationality: { type: 'string', required: false },
      headshot: { type: 'string', required: false },
      accounts: { type: 'array', required: false },
      heroes: { type: 'array', required: false },
    }
  }

  async index() {
    const { ctx } = this
    const payload = ctx.query
    const res = await ctx.service.player.index(payload)
    ctx.helper.success({ ctx, res })
  }

  // 获取单个选手
  async show() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.player.findById(id)
    ctx.helper.success({ ctx, res })
  }

  // 创建选手
  async create() {
    const { ctx, service } = this
    ctx.validate(this.playerCreateRule)
    const payload = ctx.request.body || {}
    const res = await service.player.create(payload)
    ctx.status = 201
    ctx.helper.success({ ctx, res })
  }

  // 更新选手
  async update() {
    const { ctx, service } = this
    const { id } = ctx.params
    ctx.validate(this.playerCreateRule)
    const res = await service.player.update({ id, params: ctx.request.body })
    ctx.helper.success({ ctx, res })
  }

  // 删除选手
  async destroy() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.player.remove(id)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = PlayerController
