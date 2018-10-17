const { Service } = require('egg')
const async = require('async')

class MapService extends Service {
  async list() {
    await this.ctx.model.Map.deleteMany()
    const url = 'https://api.overwatchleague.cn/maps?locale=zh-cn'
    const result = await this.ctx.curl(url, {
      followRedirect: true,
      dataType: 'json',
      timeout: 30000,
    })
    if (result.status === 200) {
      return result.data
    }
    return []
  }

  async saveDB(payload) {
    const mapsdb = await this.ctx.model.Map.find()

    const insertMaps = []
    const updateMaps = []

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

    result.forEach(x => {
      const ss = mapsdb.filter(y => y.name === x.name)
      if (ss.length > 0) {
        updateMaps.push(x)
      } else {
        insertMaps.push(x)
      }
    })

    this.ctx.model.Map.insertMany(insertMaps)

    async.eachSeries(updateMaps, (x, done) => {
      this.ctx.model.Team.updateOne({ teamId: x.teamId }, x, done)
    })
  }
}

module.exports = MapService
