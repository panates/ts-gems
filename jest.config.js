module.exports = {
  preset: 'ts-jest',
  rootDir: ".",
  testEnvironment: 'node',
  "testMatch": [
    "<rootDir>/test/**/*.spec.ts"
  ],
  transform: {
    '^.+.ts?$': ['ts-jest', {
      'tsconfig': '<rootDir>/test/tsconfig.json'
    }]
  },
};
