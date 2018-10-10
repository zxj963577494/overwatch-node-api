'use strict'

const { Controller } = require('egg')

class HeroController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = await ctx.service.hero.findAll()
  }
}

module.exports = HeroController
