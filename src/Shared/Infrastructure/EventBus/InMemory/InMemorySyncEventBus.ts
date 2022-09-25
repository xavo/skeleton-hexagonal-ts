import {DomainEvent} from '@project/Shared/Domain/EventBus/DomainEvent';
import {DomainEventSubscriber} from '@project/Shared/Domain/EventBus/DomainEventSubscriber';
import {EventBus} from '@project/Shared/Domain/EventBus/EventBus';

export class InMemorySyncEventBus implements EventBus {
    protected readonly subscribers = new Map<string, DomainEventSubscriber[]>();

    start(): Promise<void> {
        return Promise.resolve();
    }

    async publish(events: Array<DomainEvent>): Promise<void> {
        await Promise.all(
            events.map((event) => {
                const subscribers = this.subscribers.get(event.eventName) ?? [];
                return Promise.all(
                    subscribers.map((subscriber) => subscriber.on(event))
                );
            })
        );
    }

    addSubscribers(
        ...subscribers: Array<DomainEventSubscriber<DomainEvent>>
    ): void {
        subscribers.forEach((subscriber) => {
            const eventName = subscriber.subscribedTo().EVENT_NAME;
            this.subscribers.set(eventName, [
                ...(this.subscribers.get(eventName) ?? []),
                subscriber,
            ]);
        });
    }
}
