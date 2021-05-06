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
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', 'cypress'],
  clearMocks: true,
  snapshotSerializers: ['./node_modules/enzyme-to-json/serializer'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};
