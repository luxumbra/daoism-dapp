module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json',
      enableTsDiagnostics: true,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@root/(.*)': '<rootDir>/$1',
    '@daoism/(.*)': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['./dist/', './test/mocks.ts'],
  coveragePathIgnorePatterns: ['./test/mocks.ts'],
};
export {};