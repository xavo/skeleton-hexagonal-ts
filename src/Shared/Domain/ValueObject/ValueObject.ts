import {Primitive} from '@project/Shared/Domain/Primitive';
import {InvalidArgumentError} from '@project/Shared/Domain/ValueObject/InvalidArgumentError';

type AllowedPrimitive = Omit<Primitive, 'null' | 'undefined'>;

export abstract class ValueObject<T extends AllowedPrimitive> {
    constructor(readonly value: T) {
        this.ensureIsDefined(value);
    }

    equals(other: ValueObject<T>): boolean {
        return (
            this.constructor.name === other.constructor.name &&
            this.value === other.value
        );
    }

    toString(): string {
        return this.value.toString();
    }

    private ensureIsDefined(value: T) {
        if (null === value || undefined === value) {
            throw new InvalidArgumentError('Value must be defined');
        }
    }
}
