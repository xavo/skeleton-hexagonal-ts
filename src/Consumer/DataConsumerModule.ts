import {Module, OnModuleInit} from '@nestjs/common';
import {EventBus} from '@project/Shared/Domain/EventBus/EventBus';
import {EventBusConsumer} from '@project/Shared/Infrastructure/EventBus/EventBusConsumer';

@Module({
    imports: [],
    providers: [
        {
            provide: EventBusConsumer,
            useFactory: (bus: EventBus) => new EventBusConsumer(bus),
            inject: ['EventBus'],
        },
    ],
})
export class DataConsumerModule implements OnModuleInit {
    constructor(private readonly eventConsumer: EventBusConsumer) {}

    onModuleInit(): void {
        // here put a subscribers
        this.eventConsumer.addSubscribers();

        void this.eventConsumer.start();
    }
}
