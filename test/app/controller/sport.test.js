const mock = require('egg-mock')

describe('test/controller/sport.test.js', () => {
  let app

  before(() => {
    // 创建当前应用的 app 实例
    app = mock.app()
    // 等待 app 启动成功，才能执行测试用例
    return app.ready()
  })

  it('should GET /api/v1/sports', done => {
    app
      .httpRequest()
      .get('/api/v1/sports')
      .expect(200, done)
  })

  it('should GET /api/v1/sports/:id', done => {
    const sport = new app.model.Sport({ title: '测试赛事', })
    sport.save((err, model) => {
      app
        .httpRequest()
        .get(`/api/v1/sports/${model._id}`)
        .expect(200)
        .end(() => {
          app.model.Sport.deleteOne({ _id: model._id }).exec()
          done()
        })
    })
  })

  it('should POST /api/v1/sports', done => {
    const params = {
      title: '测试赛事',
    }
    app
      .httpRequest()
      .post('/api/v1/sports')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(params))
      .expect(201)
      .end((err, res) => {
        app.model.Sport.deleteOne({ _id: res.body.data.id }).exec()
        done()
      })
  })

  it('should PUT /api/v1/sports/:id', done => {
    const sport = new app.model.Sport({ title: '测试赛事' })
    sport.save((err, model) => {
      app
        .httpRequest()
        .put(`/api/v1/sports/${model._id}`)
        .set('Content-Type', 'application/json')
        .send({ title: '测试赛事1' })
        .expect(200)
        .end(() => {
          app.model.Sport.deleteOne({ _id: model._id }).exec()
          done()
        })
    })
  })

  it('should DELETE /api/v1/sports/:id', done => {
    const sport = new app.model.Sport({ title: '测试赛事' })
    sport.save((err, model) => {
      app
        .httpRequest()
        .del(`/api/v1/sports/${model._id}`)
        .expect(200, done)
    })
  })
})
