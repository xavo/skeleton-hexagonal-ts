import {
    AggregateRoot,
    AggregateRootPrimitives,
} from '@project/Shared/Domain/AggregateRoot';

export abstract class AggregateCollection<A extends AggregateRoot> {
    constructor(public readonly collection: Array<A>) {}

    public get length(): number {
        return this.collection.length;
    }

    public forEach(callbackFn: (aggregate: A) => void): void {
        return this.collection.forEach(callbackFn);
    }

    public map<U>(callbackFn: (aggregate: A) => U): U[] {
        return this.collection.map(callbackFn);
    }

    public eachToPrimitives(): AggregateRootPrimitives[] {
        return this.map((aggregate) => aggregate.toPrimitives());
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public first(): A | null {
        return this.collection?.[0] ?? null;
    }

    public hasMoreThan(items: number): boolean {
        return this.length > items;
    }
}
