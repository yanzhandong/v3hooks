module.exports = {
  moduleFileExtensions: ['js', 'ts', 'jsx', 'tsx'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!<rootDir>/packages/__tests__/**/*',
    '!<rootDir>/dist/**/*',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/__fixtures__/', '/fixtures/', '/__tests__/helpers/', '/__tests__/utils/', '__mocks__'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  globals: {
    'ts-jest': {
      babelConfig: './babel.config.js',
    },
  }
};