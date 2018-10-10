'use strict'

const { Controller } = require('egg')

class HeroController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.heroCreateRule = {
      name: { type: 'string', required: true },
      real_name: { type: 'string', required: false },
      role: { type: 'string', required: false },
      description: { type: 'string', required: false },
      base_of_operations: { type: 'string', required: false },
      age: { type: 'string', required: false },
      difficulty: { type: 'string', required: false },
      fullshot: { type: 'string', required: false },
      extra: { type: 'array', required: false },
      abilities: { type: 'array', required: false },
      avatar: { type: 'string', required: false },
      profession: { type: 'string', required: false },
      height: { type: 'string', required: false },
      health: { type: 'string', required: false },
      armour: { type: 'string', required: false },
      shield: { type: 'string', required: false },
    }
  }

  async index() {
    const { ctx } = this
    const payload = ctx.query
    const res = await ctx.service.hero.index(payload)
    ctx.helper.success({ ctx, res })
  }

  // 获取单个英雄
  async show() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.hero.findById(id)
    ctx.helper.success({ ctx, res })
  }

  // 创建英雄
  async create() {
    const { ctx, service } = this
    ctx.validate(this.heroCreateRule)
    const payload = ctx.request.body || {}
    const res = await service.hero.create(payload)
    ctx.status = 201
    ctx.helper.success({ ctx, res })
  }

  // 更新英雄
  async update() {
    const { ctx, service } = this
    const { id } = ctx.params
    ctx.validate(this.heroCreateRule)
    const res = await service.hero.update({ id, params: ctx.request.body })
    ctx.status = 204
    ctx.helper.success({ ctx, res })
  }

  // 删除英雄
  async destroy() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.hero.remove(id)
    ctx.status = 204
    ctx.helper.success({ ctx, res })
  }
}

module.exports = HeroController
