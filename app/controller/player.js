'use strict'

const { Controller } = require('egg')

class PlayerController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = await ctx.service.player.findAll()
  }
}

module.exports = PlayerController
