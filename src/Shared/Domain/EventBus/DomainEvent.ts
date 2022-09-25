import type {Primitive} from '@project/Shared/Domain/Primitive';
import {UuidValueObject} from '@project/Shared/Domain/ValueObject/UuidValueObject';

type DomainEventPayload = Record<string, Primitive | Primitive[]>;
export type DomainEventPrimitives<T = DomainEventPayload> = {
    eventName: string;
    eventId: string;
    aggregateId: string;
    occurredOn: string;
    payload: T | null;
};

export abstract class DomainEvent<
    T extends DomainEventPayload = DomainEventPayload
> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromPrimitives: (primitives: any) => any;

    public readonly eventName: string;
    public readonly eventId: string;
    public readonly aggregateId: string;
    public readonly occurredOn: string;
    public readonly payload: T | null;

    constructor(
        eventName: string,
        aggregateId: string,
        eventId?: string,
        occurredOn?: string,
        payload?: T
    ) {
        this.eventName = eventName;
        this.eventId = eventId || UuidValueObject.random().value;
        this.aggregateId = aggregateId;
        this.occurredOn = occurredOn || new Date().toISOString();
        this.payload = payload ?? null;
    }

    public toPrimitives(): DomainEventPrimitives {
        return {
            eventName: this.eventName,
            eventId: this.eventId,
            aggregateId: this.aggregateId,
            occurredOn: this.occurredOn,
            payload: this.payload,
        };
    }
}

export type DomainEventClass<T extends DomainEvent = DomainEvent> = {
    EVENT_NAME: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromPrimitives: (primitives: any) => T;
};
