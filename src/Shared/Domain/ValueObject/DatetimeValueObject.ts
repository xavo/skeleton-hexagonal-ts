import {ValueObject} from '@project/Shared/Domain/ValueObject/ValueObject';
import {InvalidArgumentError} from '@project/Shared/Domain/ValueObject/InvalidArgumentError';

export abstract class DatetimeValueObject extends ValueObject<string> {
    constructor(value: string | Date) {
        value =
            value instanceof Date
                ? value.toISOString()
                : DatetimeValueObject.ensureIsDate(value);

        super(value);
    }

    protected static ensureIsDate(value: string): string {
        const date = new Date(value);

        if (!date.getDate()) {
            throw new InvalidArgumentError(`${value} is not a valid Date`);
        }

        return date.toISOString();
    }

    isBefore(other: DatetimeValueObject): boolean {
        return this.value < other.value;
    }

    isAfter(other: DatetimeValueObject): boolean {
        return this.value > other.value;
    }
}
