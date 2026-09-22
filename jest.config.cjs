const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset({
  tsconfig: 'tsconfig.jest.json',
}).transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: 'jsdom',
  // Playwright specs live in e2e/ and run with `pnpm test:e2e`.
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  transform: {
    ...tsJestTransformCfg,
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|scss|less)$': 'identity-obj-proxy',
    '\\.(png|jpe?g|webp|gif|svg)$': '<rootDir>/jest.fileMock.cjs',
  },
};
