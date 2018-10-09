const { Service } = require('egg')

class HeroesService extends Service {
  // 获取所有英雄
  async findAll() {
    return this.ctx.model.Hero.find().exec()
  }

  async create(post) {
    this.ctx.model.Hero.create(post)
  }

  async findById(id) {
    return this.ctx.model.Hero.findById(id).exec()
  }

  async findAndUpdate(id, post) {
    this.ctx.model.Hero.findOneAndUpdate({ _id: id }, post).exec()
  }

  async findAndRemove(id) {
    this.ctx.model.Hero.remove({ _id: id }, err => {
      console.log(err)
    })
  }
}

module.exports = HeroesService
