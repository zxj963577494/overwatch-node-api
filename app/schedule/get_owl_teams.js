const { Subscription } = require('egg')

class GetOWLTeams extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '999999m', // 无限时长
      type: 'all', // 指定所有的 worker 都需要执行
    }
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { ctx } = this
    const teams = await ctx.service.schedule.owl.team.list()
    if (teams.length === 0) {
      ctx.logger.info('map api no data')
    } else {
      await ctx.service.schedule.owl.team.saveDB(teams)
    }
  }
}

module.exports = GetOWLTeams
