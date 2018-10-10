const { Controller } = require('egg')

class HomeController extends Controller {
  async index() {
    this.ctx.body = `overwatch-node-api.
    https://github.com/zxj963577494/overwatch-node-api`
  }
}

module.exports = HomeController
