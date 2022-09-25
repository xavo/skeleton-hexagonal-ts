import {EnumValueObject} from '@project/Shared/Domain/ValueObject/EnumValueObject';
import {InvalidArgumentError} from '@project/Shared/Domain/ValueObject/InvalidArgumentError';

enum Operator {
    EQUAL = '=',
    NOT_EQUAL = '!=',
    GT = '>',
    LT = '<',
    CONTAINS = 'CONTAINS',
    NOT_CONTAINS = 'NOT_CONTAINS',
}

export class FilterOperator extends EnumValueObject<Operator> {
    public static readonly Equal = Operator.EQUAL;
    public static readonly NotEqual = Operator.NOT_EQUAL;
    public static readonly GT = Operator.GT;
    public static readonly LT = Operator.LT;
    public static readonly Contains = Operator.CONTAINS;
    public static readonly NotContains = Operator.NOT_CONTAINS;

    constructor(value: Operator) {
        super(value, Object.values(Operator));
    }

    static fromValue(value: string): FilterOperator {
        switch (value) {
            case Operator.EQUAL:
                return new FilterOperator(Operator.EQUAL);
            case Operator.NOT_EQUAL:
                return new FilterOperator(Operator.NOT_EQUAL);
            case Operator.GT:
                return new FilterOperator(Operator.GT);
            case Operator.LT:
                return new FilterOperator(Operator.LT);
            case Operator.CONTAINS:
                return new FilterOperator(Operator.CONTAINS);
            case Operator.NOT_CONTAINS:
                return new FilterOperator(Operator.NOT_CONTAINS);
            default:
                throw new InvalidArgumentError(
                    `The filter operator ${value} is invalid`
                );
        }
    }

    public isPositive(): boolean {
        return (
            this.value !== Operator.NOT_EQUAL &&
            this.value !== Operator.NOT_CONTAINS
        );
    }

    public isContainsOrNotContains(): boolean {
        return this.isContains() || this.isNotContains();
    }

    public isContains(): boolean {
        return this.value === FilterOperator.Contains;
    }

    public isNotContains(): boolean {
        return this.value === FilterOperator.NotContains;
    }

    protected throwErrorForInvalidValue(value: Operator): void {
        throw new InvalidArgumentError(
            `The filter operator ${value} is invalid`
        );
    }

    static equal(): FilterOperator {
        return this.fromValue(Operator.EQUAL);
    }
}
