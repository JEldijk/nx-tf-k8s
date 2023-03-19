/* eslint-disable */
const esModules = ['p-retry'].join('|');

export default {
  displayName: 'p-retry',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/p-retry',
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
};
