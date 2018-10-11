const mock = require('egg-mock')

describe('test/controller/player.test.js', () => {
  let app

  before(() => {
    // 创建当前应用的 app 实例
    app = mock.app()
    // 等待 app 启动成功，才能执行测试用例
    return app.ready()
  })

  it('should GET /api/v1/players', done => {
    app
      .httpRequest()
      .get('/api/v1/players')
      .expect(200, done)
  })

  it('should GET /api/v1/players/:id', done => {
    const player = new app.model.Player({ name: '测试选手' })
    player.save((err, model) => {
      app
        .httpRequest()
        .get(`/api/v1/players/${model._id}`)
        .expect(200)
        .end(() => {
          app.model.Player.deleteOne({ _id: model._id }).exec()
          done()
        })
    })
  })

  it('should POST /api/v1/players', done => {
    const params = {
      name: '测试选手',
      handle: '测试选手.2345',
    }
    app
      .httpRequest()
      .post('/api/v1/players')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(params))
      .expect(201)
      .end((err, res) => {
        app.model.Player.deleteOne({ _id: res.body.data.id }).exec()
        done()
      })
  })

  it('should PUT /api/v1/players/:id', done => {
    const player = new app.model.Player({ name: '测试选手' })
    player.save((err, model) => {
      app
        .httpRequest()
        .put(`/api/v1/players/${model._id}`)
        .set('Content-Type', 'application/json')
        .send({ name: '测试选手1' })
        .expect(200)
        .end(() => {
          app.model.Player.deleteOne({ _id: model._id }).exec()
          done()
        })
    })
  })

  it('should DELETE /api/v1/players/:id', done => {
    const player = new app.model.Player({ name: '测试选手' })
    player.save((err, model) => {
      app
        .httpRequest()
        .del(`/api/v1/players/${model._id}`)
        .expect(200, done)
    })
  })
})
