const { Service } = require('egg')

class SportService extends Service {
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10)

    if (isPaging) {
      if (search) {
        res = await this.ctx.model.Sport.find({ name: { $regex: search } })
          .populate('heroes')
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ updateAt: -1 })
          .exec()
        count = res.length
      } else {
        res = await this.ctx.model.Sport.find({})
          .populate('heroes')
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ updateAt: -1 })
          .exec()
        count = await this.ctx.model.Sport.countDocuments({}).exec()
      }
    } else if (search) {
      res = await this.ctx.model.Sport.find({ name: { $regex: search } })
        .populate('heroes')
        .sort({ updateAt: -1 })
        .exec()
      count = res.length
    } else {
      res = await this.ctx.model.Sport.find({})
        .populate('heroes')
        .sort({ updateAt: -1 })
        .exec()
      count = await this.ctx.model.Sport.countDocuments({}).exec()
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
    return this.ctx.model.Sport.findOne({ _id: id }).populate('heroes')
  }

  async create(payload) {
    return this.ctx.model.Sport.create(payload).then(data => ({
      id: data._id,
    }))
  }

  async update(payload) {
    const { ctx, service } = this
    const Sport = await service.sport.findById(payload.id)
    if (!Sport) {
      ctx.throw(404, 'Sport not found')
    }
    return ctx.model.Sport.updateOne({ _id: payload.id }, payload.params).then(data => ({
      ...data,
      id: payload.id,
    }))
  }

  async remove(id) {
    return this.ctx.model.Sport.deleteOne({ _id: id }).then(data => ({
      ...data,
      id,
    }))
  }
}

module.exports = SportService
