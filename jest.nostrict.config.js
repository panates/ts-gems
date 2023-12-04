module.exports = {
  testEnvironment: 'node',
  verbose: true,
  maxWorkers: "50%",
  "testMatch": [
    "<rootDir>/test/**/*.spec.ts"
  ],
  transform: {
    '^.+.ts?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig-nostrict.json'
    }]
  },
  moduleNameMapper: {
    '(\\..+)\\.js': '$1'
  }
};
