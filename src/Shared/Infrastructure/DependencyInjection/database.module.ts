import {Inject, Module, OnApplicationShutdown} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import typeormConfig from '@project/Project/Shared/Infrastructure/Persistence/typeorm.config';
import {Connection, ConnectionOptions, createConnection} from 'typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [typeormConfig],
        }),
    ],
    providers: [
        {
            provide: 'TypeOrmConnection',
            useFactory: async function (
                configService: ConfigService
            ): Promise<Connection> {
                const config =
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    configService.get<ConnectionOptions>('TypeOrmConfig')!;

                return await createConnection(config);
            },
            inject: [ConfigService],
        },
        {
            provide: 'DataDataSource',
            useExisting: 'TypeOrmConnection',
        },
    ],
    exports: ['TypeOrmConnection'],
})
export class DatabaseModule implements OnApplicationShutdown {
    constructor(
        @Inject('TypeOrmConnection')
        private readonly typeOrmConnection: Connection
    ) {}

    async onApplicationShutdown(): Promise<void> {
        await this.typeOrmConnection.close();
    }
}
