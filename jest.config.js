module.exports = {
  testEnvironment: 'jsdom',
  verbose: true,
  testPathIgnorePatterns: ['cypress'],
  modulePathIgnorePatterns: ['cypress'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    },
    './src/components/': {
      branches: 40,
      statements: 40
    },
    './src/redux/**/*.js': {
      statements: 90
    }
  }
};
