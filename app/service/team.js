const { Service } = require('egg')

class TeamService extends Service {
  // 获取所有选手
  async findAll() {
    return this.ctx.model.Team.find().exec()
  }

  async create(post) {
    this.ctx.model.Team.create(post)
  }

  async findById(id) {
    return this.ctx.model.Team.findById(id).exec()
  }

  async findAndUpdate(id, post) {
    this.ctx.model.Team.findOneAndUpdate({ _id: id }, post).exec()
  }

  async findAndRemove(id) {
    this.ctx.model.Team.remove({ _id: id }, err => {
      console.log(err)
    })
  }
}

module.exports = TeamService
