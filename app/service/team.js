const { Service } = require('egg')

class TeamService extends Service {
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10)

    if (isPaging) {
      if (search) {
        res = await this.ctx.model.Team.find({ name: { $regex: search } })
          .populate('players')
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ updateAt: -1 })
          .exec()
        count = res.length
      } else {
        res = await this.ctx.model.Team.find({})
          .populate('players')
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ updateAt: -1 })
          .exec()
        count = await this.ctx.model.Team.countDocuments({}).exec()
      }
    } else if (search) {
      res = await this.ctx.model.Team.find({ name: { $regex: search } })
        .populate('players')
        .sort({ updateAt: -1 })
        .exec()
      count = res.length
    } else {
      res = await this.ctx.model.Team.find({})
        .populate('players')
        .sort({ updateAt: -1 })
        .exec()
      count = await this.ctx.model.Team.countDocuments({}).exec()
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
    return this.ctx.model.Team.findOne({ _id: id }).populate('players')
  }

  async create(payload) {
    return this.ctx.model.Team.create(payload).then(data => ({
      id: data._id,
    }))
  }

  async update(payload) {
    const { ctx, service } = this
    const Team = await service.team.findById(payload.id)
    if (!Team) {
      ctx.throw(404, 'Team not found')
    }
    return ctx.model.Team.updateOne({ _id: payload.id }, payload.params).then(data => ({
      ...data,
      id: payload.id,
    }))
  }

  async remove(id) {
    return this.ctx.model.Team.deleteOne({ _id: id }).then(data => ({
      ...data,
      id,
    }))
  }
}

module.exports = TeamService
