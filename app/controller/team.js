'use strict'

const { Controller } = require('egg')

class TeamController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.teamCreateRule = {
      name: { type: 'string', required: true },
      abbreviatedName: { type: 'string', required: false },
      homeLocation: { type: 'string', required: false },
      primaryColor: { type: 'string', required: false },
      secondaryColor: { type: 'string', required: false },
      addressCountry: { type: 'string', required: false },
      description: { type: 'string', required: false },
      createdTime: { type: 'date', required: false },
      status: { type: 'string', required: false },
      manager: { type: 'string', required: false },
      coaches: { type: 'string', required: false },
      rank: { type: 'string', required: false },
      logo: { type: 'string', required: false },
      icon: { type: 'string', required: false },
      accounts: { type: 'array', required: false },
      players: { type: 'array', required: false },
    }
  }

  async index() {
    const { ctx } = this
    const payload = ctx.query
    const res = await ctx.service.team.index(payload)
    ctx.helper.success({ ctx, res })
  }

  // 获取单个队伍
  async show() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.team.findById(id)
    ctx.helper.success({ ctx, res })
  }

  // 创建队伍
  async create() {
    const { ctx, service } = this
    ctx.validate(this.teamCreateRule)
    const payload = ctx.request.body || {}
    const res = await service.team.create(payload)
    ctx.status = 201
    ctx.helper.success({ ctx, res })
  }

  // 更新队伍
  async update() {
    const { ctx, service } = this
    const { id } = ctx.params
    ctx.validate(this.teamCreateRule)
    const res = await service.team.update({ id, params: ctx.request.body })
    ctx.status = 204
    ctx.helper.success({ ctx, res })
  }

  // 删除队伍
  async destroy() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.team.remove(id)
    ctx.status = 204
    ctx.helper.success({ ctx, res })
  }
}

module.exports = TeamController
