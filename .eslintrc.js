module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022,
    sourceType: 'module',
  },
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