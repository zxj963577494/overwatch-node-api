const { Service } = require('egg')

class RankingService extends Service {
  async list() {
    await this.ctx.model.Ranking.deleteMany()
    const url = 'https://api.overwatchleague.cn/ranking?locale=zh-cn'
    const result = await this.ctx.curl(url, {
      followRedirect: true,
      dataType: 'json',
    })
    if (result.status === 200) {
      return result.data
    }
    return null
  }

  async saveDB(payload) {
    return this.ctx.model.Ranking.create(payload)
  }
}

module.exports = RankingService
