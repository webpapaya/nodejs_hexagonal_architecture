/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    silent: false,
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testTimeout: 60000
};
