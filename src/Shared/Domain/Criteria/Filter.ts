import {FilterField} from './FilterField';
import {FilterOperator} from './FilterOperator';
import {FilterValue} from './FilterValue';
import {Nullable} from '@project/Shared/Domain/Nullable';

export class Filter {
    readonly field: FilterField;
    readonly operator: FilterOperator;
    readonly value: Nullable<FilterValue>;

    constructor(
        field: FilterField,
        operator: FilterOperator,
        value: Nullable<FilterValue>
    ) {
        this.field = field;
        this.operator = operator;
        this.value = value;
    }

    static fromPrimitives({
        field,
        operator,
        value,
    }: {
        field: string;
        operator: string;
        value: string | null;
    }): Filter {
        return new Filter(
            new FilterField(field),
            FilterOperator.fromValue(operator),
            value != null ? new FilterValue(value) : null
        );
    }
}
