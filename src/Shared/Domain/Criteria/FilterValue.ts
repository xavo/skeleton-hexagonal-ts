import {StringValueObject} from '@project/Shared/Domain/ValueObject/StringValueObject';

export class FilterValue extends StringValueObject {
    constructor(value: string) {
        super(value);
    }
}
