const mock = require('egg-mock')

describe('test/controller/hero.test.js', () => {
  let app

  before(() => {
    // 创建当前应用的 app 实例
    app = mock.app()
    // 等待 app 启动成功，才能执行测试用例
    return app.ready()
  })

  it('should GET /api/v1/heroes', done => {
    app
      .httpRequest()
      .get('/api/v1/heroes')
      .expect(200, done)
  })

  it('should GET /api/v1/heroes/:id', done => {
    const hero = new app.model.Hero({ name: '测试英雄' })
    hero.save((err, model) => {
      app
        .httpRequest()
        .get(`/api/v1/heroes/${model._id}`)
        .expect(200)
        .end(() => {
          app.model.Hero.remove({ _id: model._id }).exec()
          done()
        })
    })
  })

  it('should POST /api/v1/heroes', done => {
    const params = {
      name: '英雄名称',
      real_name: '英雄真实姓名',
      role: 'support',
      description: '英雄描述',
      base_of_operations: '基地',
      age: '年龄',
      difficulty: '难度星级',
      fullshot: 'http://overwatch.nos.netease.com/1/assets/images/hero/brigitte/full-portrait.png',
      extra: [],
      abilities: [],
      avatar: 'http://overwatch.nos.netease.com/1/assets/images/hero/brigitte/icon-portrait.png',
      profession: '职业',
      height: '200',
      health: '身高',
      armour: '0',
      shield: '0',
    }
    app
      .httpRequest()
      .post('/api/v1/heroes')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(params))
      .expect(201)
      .end((err, res) => {
        app.model.Hero.remove({ _id: res.body.data.id }).exec()
        done()
      })
  })

  it('should PUT /api/v1/heroes/:id', done => {
    const hero = new app.model.Hero({ name: '测试英雄' })
    hero.save((err, model) => {
      app
        .httpRequest()
        .put(`/api/v1/heroes/${model._id}`)
        .set('Content-Type', 'application/json')
        .send({ name: '测试英雄1' })
        .expect(204)
        .end(() => {
          app.model.Hero.remove({ _id: model._id }).exec()
          done()
        })
    })
  })

  it('should DELETE /api/v1/heroes/:id', done => {
    const hero = new app.model.Hero({ name: '测试英雄2' })
    hero.save((err, model) => {
      app
        .httpRequest()
        .del(`/api/v1/heroes/${model._id}`)
        .expect(204, done)
    })
  })
})
