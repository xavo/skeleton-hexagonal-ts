import {EventBus} from '@project/Shared/Domain/EventBus/EventBus';
import {DomainEventSubscriber} from '@project/Shared/Domain/EventBus/DomainEventSubscriber';
import {DomainEvent} from '@project/Shared/Domain/EventBus/DomainEvent';

export class EventBusConsumer {
    constructor(private bus: EventBus) {}

    addSubscribers(
        ...subscribers: Array<DomainEventSubscriber<DomainEvent>>
    ): void {
        this.bus.addSubscribers(...subscribers);
    }

    async start(): Promise<void> {
        await this.bus.start();
    }
}
