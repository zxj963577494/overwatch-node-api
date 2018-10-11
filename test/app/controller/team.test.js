const mock = require('egg-mock')

describe('test/controller/team.test.js', () => {
  let app

  before(() => {
    // 创建当前应用的 app 实例
    app = mock.app()
    // 等待 app 启动成功，才能执行测试用例
    return app.ready()
  })

  it('should GET /api/v1/teams', done => {
    app
      .httpRequest()
      .get('/api/v1/teams')
      .expect(200, done)
  })

  it('should GET /api/v1/teams/:id', done => {
    const team = new app.model.Team({ name: '测试队伍' })
    team.save((err, model) => {
      app
        .httpRequest()
        .get(`/api/v1/teams/${model._id}`)
        .expect(200)
        .end(() => {
          app.model.Team.deleteOne({ _id: model._id }).exec()
          done()
        })
    })
  })

  it('should POST /api/v1/teams', done => {
    const params = {
      name: '测试选手',
      handle: '测试选手.2345',
    }
    app
      .httpRequest()
      .post('/api/v1/teams')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(params))
      .expect(201)
      .end((err, res) => {
        app.model.Team.deleteOne({ _id: res.body.data.id }).exec()
        done()
      })
  })

  it('should PUT /api/v1/teams/:id', done => {
    const team = new app.model.Team({ name: '测试队伍' })
    team.save((err, model) => {
      app
        .httpRequest()
        .put(`/api/v1/teams/${model._id}`)
        .set('Content-Type', 'application/json')
        .send({ name: '测试队伍1' })
        .expect(200)
        .end(() => {
          app.model.Team.deleteOne({ _id: model._id }).exec()
          done()
        })
    })
  })

  it('should DELETE /api/v1/teams/:id', done => {
    const team = new app.model.Team({ name: '测试队伍' })
    team.save((err, model) => {
      app
        .httpRequest()
        .del(`/api/v1/teams/${model._id}`)
        .expect(200, done)
    })
  })
})
