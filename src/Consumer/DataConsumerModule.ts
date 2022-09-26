import {Inject, Module, OnModuleInit} from '@nestjs/common';
import {EventBus} from '@project/Shared/Domain/EventBus/EventBus';
import {RabbitMqModule} from '@project/Shared/Infrastructure/DependencyInjection/RabbitMq.module';
import {SharedModule} from '@project/Shared/Infrastructure/DependencyInjection/Shared.module';
import {EventBusConsumer} from '@project/Shared/Infrastructure/EventBus/EventBusConsumer';
import {Logger} from 'winston';

@Module({
    imports: [SharedModule, RabbitMqModule],
    providers: [
        {
            provide: EventBusConsumer,
            useFactory: (bus: EventBus) => new EventBusConsumer(bus),
            inject: ['EventBus'],
        },
    ],
})
export class DataConsumerModule implements OnModuleInit {
    constructor(
        private readonly eventConsumer: EventBusConsumer,
        @Inject('Logger') private readonly logger: Logger
    ) {}
    onModuleInit(): void {
        // here put a subscribers
        this.eventConsumer.addSubscribers();
        void this.eventConsumer.start().catch((reason) => {
            this.logger.log('error', reason);
        });
    }
}
