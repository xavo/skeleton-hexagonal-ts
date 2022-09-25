import {ValueObject} from '@project/Shared/Domain/ValueObject/ValueObject';
import {Primitive} from '@project/Shared/Domain/Primitive';

export abstract class EnumValueObject<
    T extends Omit<Primitive, 'null' | 'undefined'>
> extends ValueObject<T> {
    constructor(value: T, readonly validValues: T[]) {
        super(value);
        this.checkValueIsValid(value);
    }

    public checkValueIsValid(value: T): void {
        if (!this.validValues.includes(value)) {
            this.throwErrorForInvalidValue(value);
        }
    }

    protected abstract throwErrorForInvalidValue(value: T): void;
}
