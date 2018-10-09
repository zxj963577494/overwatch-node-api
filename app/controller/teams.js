'use strict'

const { Controller } = require('egg')

class TeamsController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = await ctx.service.teams.findAll()
  }
}

module.exports = TeamsController
