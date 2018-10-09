const { Service } = require('egg')

class PlayersService extends Service {
  // 获取所有选手
  async findAll() {
    return this.ctx.model.Player.find().exec()
  }

  async create(post) {
    this.ctx.model.Player.create(post)
  }

  async findById(id) {
    return this.ctx.model.Player.findById(id).exec()
  }

  async findAndUpdate(id, post) {
    this.ctx.model.Player.findOneAndUpdate({ _id: id }, post).exec()
  }

  async findAndRemove(id) {
    this.ctx.model.Player.remove({ _id: id }, err => {
      console.log(err)
    })
  }
}

module.exports = PlayersService
