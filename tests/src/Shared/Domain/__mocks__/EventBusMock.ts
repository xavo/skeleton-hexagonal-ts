import {expect, jest} from '@jest/globals';
import {DomainEvent} from '@project/Shared/Domain/EventBus/DomainEvent';
import {DomainEventSubscriber} from '@project/Shared/Domain/EventBus/DomainEventSubscriber';
import {EventBus} from '@project/Shared/Domain/EventBus/EventBus';
import {DomainEventMapping} from '@project/Shared/Infrastructure/EventBus/DomainEventMapping';

export default class EventBusMock implements EventBus {
    private publishSpy = jest.fn<void, DomainEvent[][]>();

    async publish(events: DomainEvent[]): Promise<void> {
        await this.publishSpy(events);
    }

    async start(): Promise<void> {
        return await undefined;
    }

    addSubscribers(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ..._subscribers: DomainEventSubscriber<DomainEvent>[]
    ): void {
        return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setDomainEventMapping(_domainEventMapping: DomainEventMapping): void {
        return undefined;
    }

    assertLastPublishedEventIs(expectedEvent: DomainEvent): void {
        const publishSpyCalls = this.publishSpy.mock.calls;

        expect(publishSpyCalls.length).toBeGreaterThan(0);

        const lastPublishSpyCall = publishSpyCalls.pop();
        const lastPublishedEvent = lastPublishSpyCall
            ?.pop()
            ?.pop() as DomainEvent;

        expect(this.getDataFromDomainEvent(expectedEvent)).toMatchObject(
            this.getDataFromDomainEvent(lastPublishedEvent)
        );
    }

    assertNoPublishedEvents(): void {
        const publishSpyCalls = this.publishSpy.mock.calls;

        expect(publishSpyCalls.length).toBe(0);
    }

    private getDataFromDomainEvent(event: DomainEvent): DomainEventData {
        const {eventId, ...plainEvent} = event;
        const result: Record<string, unknown> = {};

        //Loop though event keys to equalize dates to same millisecond
        Object.keys(plainEvent).forEach((key) => {
            let value = (plainEvent as unknown as Record<string, unknown>)[
                key
            ] as string;
            const testDate = new Date(value);

            if (testDate && testDate.getDate()) {
                //value is a date, set same millis
                testDate.setMilliseconds(0);
                value = testDate.toISOString();
            }

            result[key] = value;
            return;
        });

        return result as DomainEventData;
    }
}

type DomainEventData = {
    aggregateId: string;
    eventName: string;
};
