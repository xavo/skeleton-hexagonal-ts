import {DomainEventClass} from '@project/Shared/Domain/EventBus/DomainEvent';

export class DomainEventMapping extends Map<string, DomainEventClass> {
    for(name: string): DomainEventClass | null {
        return this.get(name) ?? null;
    }
}
