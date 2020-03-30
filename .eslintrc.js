module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "eol-last": 0,
    'space-before-function-paren': 0,
    'object-curly-spacing': 0,
    'keyword-spacing': 0,
    'no-trailing-spaces': 0,
    'import/first': 0,
    'object-property-newline': 0,
    'object-curly-newline': 0,
    'vue/no-unused-vars': 0
  }
}
