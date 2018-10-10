module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    strict: 0,
    'no-underscore-dangle': 0,
  },
}
