module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    '@react-native', 
    'plugin:@typescript-eslint/recommended', 
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['node_modules/'],
};