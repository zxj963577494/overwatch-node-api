'use strict'

module.exports = appInfo => {
  const config = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1538998765871_5147'

  // add your config here
  config.middleware = ['errorHandler']

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/overwatch',
    options: {},
  }

  return config
}
