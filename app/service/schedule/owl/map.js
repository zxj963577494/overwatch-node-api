const { Service } = require('egg')

class MapService extends Service {
  async list() {
    const maps = await this.ctx.model.Map.find()
      .limit(1)
      .exec()
    if (maps.length === 0) {
      const url = 'https://api.overwatchleague.cn/maps?locale=zh-cn'
      const result = await this.ctx.curl(url, {
        followRedirect: true,
        dataType: 'json',
      })
      if (result.status === 200) {
        return result.data
      }
      return []
    }
    return []
  }

  async saveDB(payload) {
    const result = payload.map(x => {
      if (x.guid != '0x08000000000006C7') {
        return {
          name: x.id,
          cnname: x.name.zh_CN,
          gameModes: x.gameModes && x.gameModes.map(y => ({ name: y.Name, cnname: y.Name })),
          thumbnail: x.thumbnail,
          type: x.type,
          cnType: x.type,
        }
      }
    })
    return this.ctx.model.Map.insertMany(result)
  }
}

module.exports = MapService
