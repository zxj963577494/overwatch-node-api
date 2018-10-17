const { Service } = require('egg')
const async = require('async')

class TeamsService extends Service {
  async list() {
    const url = 'https://api.overwatchleague.cn/teams?expand=team.content&locale=zh_CN'
    const result = await this.ctx.curl(url, {
      followRedirect: true,
      dataType: 'json',
      timeout: 30000,
    })
    if (result.status === 200) {
      return result.data
    }
    return null
  }

  async saveDB(payload) {
    const result = payload.competitors.map(x => ({
      teamId: x.competitor.id,
      handle: x.competitor.handle,
      name: x.competitor.name,
      abbreviatedName: x.competitor.abbreviatedName,
      homeLocation: x.competitor.homeLocation,
      primaryColor: x.competitor.primaryColor,
      secondaryColor: x.competitor.secondaryColor,
      addressCountry: x.competitor.addressCountry,
      description: x.competitor.content.description || '',
      rank: 'owl',
      accounts: x.competitor.accounts.map(y => ({
        account: y.accountType,
        url: y.value,
      })),
      attributes: x.competitor.attributes,
      icon: x.competitor.icon,
      logo: x.competitor.logo,
      secondaryPhoto: x.competitor.secondaryPhoto,
      owl_division: x.competitor.owl_division,
      teamWebsite: x.competitor.content.teamWebsite,
      players: x.competitor.players.map(z => ({
        playerId: z.player.id,
        accounts: z.player.accounts.map(y => ({
          account: y.accountType,
          url: y.value,
        })),
        attributes: z.player.attributes,
        erased: z.player.erased,
        familyName: z.player.familyName,
        givenName: z.player.givenName,
        handle: z.player.handle,
        headshot: z.player.headshot,
        homeLocation: z.player.homeLocation,
        name: z.player.name,
        nationality: z.player.nationality,
        teamId: x.competitor.id,
      })),
    }))

    const teamdb = await this.ctx.model.Team.find()
    const playerdb = await this.ctx.model.Player.find()

    const insertTeams = []
    const insertPlayers = []
    const updateTeams = []
    const updatePlayers = []

    result.forEach(x => {
      x.players.forEach(y => {
        const ss = playerdb.filter(z => z.playerId === y.playerId)
        if (ss.length > 0) {
          updatePlayers.push(y)
        } else {
          insertPlayers.push(y)
        }
      })
    })
    this.ctx.model.Player.insertMany(insertPlayers)

    async.eachSeries(updatePlayers, (x, done) => {
      this.ctx.model.Player.updateOne({ playerId: x.playerId }, x, done)
    })

    result.forEach(x => {
      const ss = teamdb.filter(y => y.teamId === x.teamId)
      delete x.players
      if (ss.length > 0) {
        updateTeams.push(x)
      } else {
        insertTeams.push(x)
      }
    })

    this.ctx.model.Team.insertMany(insertTeams)

    async.eachSeries(updateTeams, (x, done) => {
      this.ctx.model.Team.updateOne({ teamId: x.teamId }, x, done)
    })
  }
}

module.exports = TeamsService
