'use strict'

const { Controller } = require('egg')

class SportController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = await ctx.service.sport.findAll()
  }
}

module.exports = SportController
