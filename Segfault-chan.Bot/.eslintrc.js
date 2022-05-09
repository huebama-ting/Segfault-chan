module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    'eol-last': 'error',
    'eqeqeq': ['error', 'smart'],
    'no-empty-function': ['error', { 'allow': ['constructors'] }],
    'quotes': ['error', 'single'],
    'semi': 'error'
  }
};
