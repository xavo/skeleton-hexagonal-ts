const {pathsToModuleNameMapper} = require('ts-jest/utils');
const {compilerOptions} = require('./tsconfig.json');

module.exports = {
    roots: ['<rootDir>/src', '<rootDir>/tests/src'],
    coverageDirectory: 'coverage',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
    collectCoverage: true,
    verbose: true,
    coverageReporters: ['text-summary', 'html', 'lcov'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
        '!**/__tests__/**',
        '!**/events/producers/**',
        '!**/events/consumers/**',
        '!**/*.config.ts',
        '!**/infrastructure/**',
        '!**/Shared/**',
        '!**/*.module.ts',
        '!**/*.controller.ts',
        '!tests/src/**',
        '!main.ts',
        '!test/**',
    ],
    testRegex: '.*\\.spec\\.ts$',
    preset: 'ts-jest',
};
