import {ConnectionOptions} from 'typeorm';

export default async (): Promise<{TypeOrmConfig: ConnectionOptions}> => {
    const {config} = await import('./config');

    return {TypeOrmConfig: config};
};
