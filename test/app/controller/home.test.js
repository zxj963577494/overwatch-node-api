'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });

  it('should GET /', () => app.httpRequest()
      .get('/')
      .expect('overwatch-node-api.\n    https://github.com/zxj963577494/overwatch-node-api')
      .expect(200));
});
