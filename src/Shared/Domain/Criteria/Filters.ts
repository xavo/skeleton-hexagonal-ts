import {Filter} from './Filter';

export class Filters {
    constructor(private readonly collection: Array<Filter> = []) {}

    public get length(): number {
        return this.collection.length;
    }

    static fromPrimitives(
        filters: Array<{field: string; operator: string; value: string | null}>
    ): Filters {
        return new Filters(
            filters.map((values) => Filter.fromPrimitives(values))
        );
    }

    static none(): Filters {
        return new Filters();
    }

    public map<T>(callbackFn: (filter: Filter) => T): T[] {
        return this.collection.map<T>(callbackFn);
    }

    public forEach(callbackFn: (filter: Filter) => void): void {
        this.collection.forEach(callbackFn);
    }
}
