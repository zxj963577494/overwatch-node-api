'use strict'

const { Controller } = require('egg')

class TeamController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = await ctx.service.team.findAll()
  }
}

module.exports = TeamController
