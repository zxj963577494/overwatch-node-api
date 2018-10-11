'use strict'

const { Controller } = require('egg')

class SportController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.sportCreateRule = {
      title: { type: 'string', required: true },
      abbreviatedTitle: { type: 'string', required: false },
      englishTitle: { type: 'string', required: false },
      description: { type: 'string', required: false },
      logo: { type: 'string', required: false },
      pic: { type: 'string', required: false },
      startDate: { type: 'date', required: false },
      endDate: { type: 'date', required: false },
      status: { type: 'array', required: false },
    }
  }

  async index() {
    const { ctx } = this
    const payload = ctx.query
    const res = await ctx.service.sport.index(payload)
    ctx.helper.success({ ctx, res })
  }

  // 获取单个赛事
  async show() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.sport.findById(id)
    ctx.helper.success({ ctx, res })
  }

  // 创建赛事
  async create() {
    const { ctx, service } = this
    ctx.validate(this.sportCreateRule)
    const payload = ctx.request.body || {}
    const res = await service.sport.create(payload)
    ctx.status = 201
    ctx.helper.success({ ctx, res })
  }

  // 更新赛事
  async update() {
    const { ctx, service } = this
    const { id } = ctx.params
    ctx.validate(this.sportCreateRule)
    const res = await service.sport.update({ id, params: ctx.request.body })
    ctx.helper.success({ ctx, res })
  }

  // 删除赛事
  async destroy() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.sport.remove(id)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = SportController
