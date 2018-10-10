'use strict'

module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)

  // router.delete('/api/role', controller.role.removes)
  // router.resources('role', '/api/role', controller.role)

  // router.post('/api/user/access/login', controller.userAccess.login)
  // router.get('/api/user/access/current', app.jwt, controller.userAccess.current)
  // router.get('/api/user/access/logout', controller.userAccess.logout)
  // router.put('/api/user/access/resetPsw', app.jwt, controller.userAccess.resetPsw)


  // router.delete('/api/user', controller.user.removes)
  // router.resources('user', '/api/user', controller.user)

  app.router.resources('topics', '/api/v2/topics', 'topic')
  app.router.resources('heroes', '/api/v1/heroes', 'hero')
  app.router.resources('players', '/api/v1/players', 'player')
  app.router.resources('teams', '/api/v1/teams', 'team')
  app.router.resources('sports', '/api/v1/sports', 'sport')
}
