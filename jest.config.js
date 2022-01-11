module.exports = {
  testEnvironment: 'jsdom',
  verbose: true,
  testPathIgnorePatterns: ['cypress', './scr/configs'],
  modulePathIgnorePatterns: ['cypress', './scr/configs'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'cypress',
    '__mocks__/',
    'src/setupTests.js',
    'babel.config.js',
    'jest.config.js'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  clearMocks: true,
  setupFilesAfterEnv: ['./src/setupTests.js'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
