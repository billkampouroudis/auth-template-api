module.exports = {
  env: {
    es2021: true
  },
  extends: [
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    'comma-dangle': ['warn', 'never'],
    'import/prefer-default-export': 0,
    'default-case': 0,
    'guard-for-in': 0,
    'max-len': ['warn', { code: 120, ignoreComments: true }],
    'no-underscore-dangle': 0,
    'import/no-mutable-exports': 0,
    camelcase: 0
  }
};
