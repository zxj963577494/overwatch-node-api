const { Service } = require('egg')

class PlayerService extends Service {
  async index(payload) {
    const { currentPage = 1, pageSize = 10, isPaging = 1, search } = payload
    let res = []
    let count = 0
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10)

    if (parseInt(isPaging, 10)) {
      if (search) {
        res = await this.ctx.model.Player.find({ name: { $regex: search } })
          .populate('heroes')
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ updateAt: -1 })
          .exec()
        count = res.length
      } else {
        res = await this.ctx.model.Player.find({})
          .populate('heroes')
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ updateAt: -1 })
          .exec()
        count = await this.ctx.model.Player.countDocuments({}).exec()
      }
    } else if (search) {
      res = await this.ctx.model.Player.find({ name: { $regex: search } })
        .populate('heroes')
        .sort({ updateAt: -1 })
        .exec()
      count = res.length
    } else {
      res = await this.ctx.model.Player.find({})
        .populate('heroes')
        .sort({ updateAt: -1 })
        .exec()
      count = await this.ctx.model.Player.countDocuments({}).exec()
    }

    const data = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.id = e._doc._id
      jsonObject.key = e._doc._id
      return jsonObject
    })

    return {
      list: data,
      pagination: {
        total: count,
        pageSize: Number(pageSize),
        current: Number(currentPage),
      },
    }
  }

  async findById(id) {
    return this.ctx.model.Player.findOne({ _id: id }).populate('heroes')
  }

  async create(payload) {
    return this.ctx.model.Player.create(payload).then(data => ({
      id: data._id,
    }))
  }

  async update(payload) {
    const { ctx, service } = this
    const Player = await service.player.findById(payload.id)
    if (!Player) {
      ctx.throw(404, 'Player not found')
    }
    return ctx.model.Player.updateOne({ _id: payload.id }, payload.params).then(data => ({
      ...data,
      id: payload.id,
    }))
  }

  async remove(id) {
    return this.ctx.model.Player.deleteOne({ _id: id }).then(data => ({
      ...data,
      id,
    }))
  }
}

module.exports = PlayerService
