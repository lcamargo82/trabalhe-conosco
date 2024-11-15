module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx$': 'ts-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!your-es6-module-to-transform).+\\.js$"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};
