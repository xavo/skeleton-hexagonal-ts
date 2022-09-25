import { DomainEvent } from "./EventBus/DomainEvent";
import { Primitive } from "@project/Shared/Domain/Primitive";

export type AggregateRootPrimitives = Record<string, Primitive | Primitive[]>;
export abstract class AggregateRoot<
    T extends AggregateRootPrimitives = AggregateRootPrimitives
> {
    private domainEvents: DomainEvent[] = [];

    pullDomainEvents(): Array<DomainEvent> {
        const domainEvents = this.domainEvents.slice();
        this.domainEvents = [];

        return domainEvents;
    }

    record(event: DomainEvent): void {
        this.domainEvents.push(event);
    }

    abstract toPrimitives(): T;
}
