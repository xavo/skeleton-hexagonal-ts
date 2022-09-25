import {DomainEvent, DomainEventClass} from './DomainEvent';

export interface DomainEventSubscriber<T extends DomainEvent = DomainEvent> {
    subscribedTo(): DomainEventClass<T>;

    on(domainEvent: T, ...otherParams: unknown[]): void;
}
