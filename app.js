module.exports = app => {
  app.beforeStart(async () => {
    await app.runSchedule('get_owl_maps')
  })
}
