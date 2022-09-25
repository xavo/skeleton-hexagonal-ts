process.env.NODE_ENV = 'test';

module.exports = {
    default: [
        '--require-module ts-node/register',
        '--require-module tsconfig-paths/register',
        '--require tests/apps/**/*.steps.ts',
        '--format @cucumber/pretty-formatter',
        '--publish-quiet',
    ].join(' '),
};
