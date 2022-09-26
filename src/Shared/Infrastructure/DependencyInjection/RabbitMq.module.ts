import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import rabbitmqConfig from '@project/Project/Shared/Infrastructure/EventBus/RabbitMq/rabbitmq.config';
import RabbitMqConfig from '@project/Shared/Infrastructure/EventBus/RabbitMq/RabbitMqConfig';
import RabbitMqEventbus from '@project/Shared/Infrastructure/EventBus/RabbitMq/RabbitMqEventBus';
import {WinstonLogger} from '@project/Shared/Infrastructure/WinstonLogger';
import {SharedModule} from './Shared.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [rabbitmqConfig],
        }),
        SharedModule,
    ],
    providers: [
        {
            provide: RabbitMqEventbus,
            useFactory: function (
                configService: ConfigService,
                logger: WinstonLogger
            ): RabbitMqEventbus {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const config =
                    configService.get<RabbitMqConfig>('rabbitMqConfig')!;
                return new RabbitMqEventbus(config, logger);
            },
            inject: [ConfigService, 'Logger'],
        },
        {
            provide: 'EventBus',
            useExisting: RabbitMqEventbus,
        },
    ],
    exports: ['EventBus'],
})
export class RabbitMqModule {}
