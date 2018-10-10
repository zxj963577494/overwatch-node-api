const { Service } = require('egg')

class SportService extends Service {
  // 获取所有选手
  async findAll() {
    return this.ctx.model.Sport.find().exec()
  }

  async create(post) {
    this.ctx.model.Sport.create(post)
  }

  async findById(id) {
    return this.ctx.model.Sport.findById(id).exec()
  }

  async findAndUpdate(id, post) {
    this.ctx.model.Sport.findOneAndUpdate({ _id: id }, post).exec()
  }

  async findAndRemove(id) {
    this.ctx.model.Sport.remove({ _id: id }, err => {
      console.log(err)
    })
  }
}

module.exports = SportService
