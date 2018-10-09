'use strict'

const { Controller } = require('egg')

class PlayersController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = await ctx.service.players.findAll()
  }
}

module.exports = PlayersController
