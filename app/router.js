'use strict'

module.exports = app => {
  app.router.resources('topics', '/api/v2/topics', 'topics')
  app.router.resources('heroes', '/api/v1/heroes', 'heroes')
  app.router.resources('players', '/api/v1/players', 'players')
  app.router.resources('teams', '/api/v1/teams', 'teams')
  app.router.resources('sports', '/api/v1/sports', 'sports')
}
