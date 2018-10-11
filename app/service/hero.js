const { Service } = require('egg')

class HeroService extends Service {
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10)

    if (isPaging) {
      if (search) {
        res = await this.ctx.model.Hero.find({ name: { $regex: search } })
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ updateAt: -1 })
          .exec()
        count = res.length
      } else {
        res = await this.ctx.model.Hero.find({})
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ updateAt: -1 })
          .exec()
        count = await this.ctx.model.Hero.countDocuments({}).exec()
      }
    } else if (search) {
      res = await this.ctx.model.Hero.find({ name: { $regex: search } })
        .sort({ updateAt: -1 })
        .exec()
      count = res.length
    } else {
      res = await this.ctx.model.Hero.find({})
        .sort({ updateAt: -1 })
        .exec()
      count = await this.ctx.model.Hero.countDocuments({}).exec()
    }

    const data = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = e._doc._id
      return jsonObject
    })

    return {
      count,
      list: data,
      pageSize: Number(pageSize),
      currentPage: Number(currentPage),
    }
  }

  async findById(id) {
    return this.ctx.model.Hero.findOne({ _id: id }).exec()
  }

  async create(payload) {
    return this.ctx.model.Hero.create(payload).then(data => ({
      id: data._id,
    }))
  }

  async update(payload) {
    const { ctx, service } = this
    const Hero = await service.hero.findById(payload.id)
    if (!Hero) {
      ctx.throw(404, 'Hero not found')
    }
    return ctx.model.Hero.updateOne({ _id: payload.id }, payload.params).then(data => ({
      ...data,
      id: data._id,
    }))
  }

  async remove(id) {
    return this.ctx.model.Hero.deleteOne({ _id: id }).then(data => ({
      ...data,
      id,
    }))
  }
}

module.exports = HeroService
