'use strict'

module.exports = appInfo => {
  const config = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1538998765871_5147`

  // add your config here
  config.middleware = ['errorHandler']

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/overwatch',
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  }

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://localhost:7001'],
  }

  // config.bcrypt = {
  //   saltRounds: 10, // default 10
  // }

  // config.multipart = {
  //   fileExtensions: [
  //     '.apk',
  //     '.pptx',
  //     '.docx',
  //     '.csv',
  //     '.doc',
  //     '.ppt',
  //     '.pdf',
  //     '.pages',
  //     '.wav',
  //     '.mov',
  //   ], // 增加对 .apk 扩展名的支持
  // }

  // config.jwt = {
  //   secret: 'overwatch',
  //   enable: true, // default is false
  //   match: '/jwt', // optional
  // }

  return config
}
