module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  collectCoverage: false,
  collectCoverageFrom: [ "src/**/*.{js,ts}" ],

  modulePathIgnorePatterns: [ "<rootDir>/dist/" ]
};
