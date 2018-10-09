'use strict'

const { Controller } = require('egg')

class HeroesController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = await ctx.service.heroes.findAll()
  }
}

module.exports = HeroesController
