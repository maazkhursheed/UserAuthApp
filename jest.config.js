module.exports = {
  preset: 'react-native',
   transform: {
    '^.+\\.(js|ts|tsx)$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-async-storage|@react-navigation|react-native-paper)/)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
