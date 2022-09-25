import {
    DomainEvent,
    DomainEventPrimitives,
} from 'src/Shared/Domain/EventBus/DomainEvent';
import {Nullable} from 'src/Shared/Domain/Nullable';
import {DomainEventMapping} from './DomainEventMapping';

export class DomainEventJsonDeserializer {
    private mapping: DomainEventMapping;

    constructor(mapping: DomainEventMapping) {
        this.mapping = mapping;
    }

    deserialize(event: string): Nullable<DomainEvent> {
        const domainEventPrimitives: DomainEventPrimitives = JSON.parse(
            event
        ) as DomainEventPrimitives;

        const eventClass = this.mapping.for(domainEventPrimitives.eventName);

        if (!eventClass) {
            return null;
        }

        return eventClass.fromPrimitives(domainEventPrimitives);
    }
}
