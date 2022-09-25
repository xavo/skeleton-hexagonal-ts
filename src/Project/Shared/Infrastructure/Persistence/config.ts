import {ConnectionOptions} from 'typeorm';
import {get} from 'env-var';
import {join} from 'path';
import {SnakeCaseNamingStrategy} from '@project/Shared/Infrastructure/Persistence/SnakeCaseNamingStrategy';

const ROOT_DIRECTORY = join(__dirname, '../../../../');
const SRC_DIRECTORY = join(ROOT_DIRECTORY, './src');
const MIGRATIONS_DIRECTORY = join(ROOT_DIRECTORY, './migrations');
const NODE_ENV = get('NODE_ENV').asString() || 'dev';

export const config: ConnectionOptions = {
    type: 'mysql',
    host: get('MYSQL_HOST').required().asString(),
    port: get('MYSQL_PORT').default(3306).asPortNumber(),
    username: get('MYSQL_USER').required().asString(),
    password: get('MYSQL_PASSWORD').asString(),
    database: get('MYSQL_DATABASE').required().asString(),
    synchronize: false,
    logging: ['production', 'staging'].includes(NODE_ENV)
        ? ['error', 'warn', 'migration']
        : true,
    entities: [join(SRC_DIRECTORY, '**', '*EntitySchema.{ts,js}')],
    migrationsRun: true,
    migrationsTableName: 'migrations',
    migrations: [join(MIGRATIONS_DIRECTORY, '*.{ts,js}')],
    cli: {
        migrationsDir: MIGRATIONS_DIRECTORY,
    },
    namingStrategy: new SnakeCaseNamingStrategy(),
};

export default config;
