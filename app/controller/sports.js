'use strict'

const { Controller } = require('egg')

class SportsController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = await ctx.service.sports.findAll()
  }
}

module.exports = SportsController
