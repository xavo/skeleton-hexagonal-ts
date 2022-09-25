import {EventBus} from '@project/Shared/Domain/EventBus/EventBus';
import {InMemorySyncEventBus} from '@project/Shared/Infrastructure/EventBus/InMemory/InMemorySyncEventBus';
import {
    DomainEvent,
    DomainEventPrimitives,
} from '@project/Shared/Domain/EventBus/DomainEvent';
import {DomainEventSubscriber} from '@project/Shared/Domain/EventBus/DomainEventSubscriber';

export class TestingEventBus extends InMemorySyncEventBus implements EventBus {
    private _events: DomainEventPrimitives[] = [];

    public get events(): DomainEventPrimitives[] {
        return this._events;
    }

    async publish(events: Array<DomainEvent>): Promise<void> {
        this._events.push(...events.map((event) => event.toPrimitives()));
        return super.publish(events);
    }

    addSubscribers(...subscribers: DomainEventSubscriber[]) {
        super.addSubscribers(...subscribers);
    }

    reset(): void {
        this._events = [];
    }
}
