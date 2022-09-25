import {ValueObject} from '@project/Shared/Domain/ValueObject/ValueObject';

export abstract class NumberValueObject extends ValueObject<number> {
    isBiggerThan(other: NumberValueObject): boolean {
        return this.value > other.value;
    }
}
