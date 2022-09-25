import {StringValueObject} from '@project/Shared/Domain/ValueObject/StringValueObject';

export class FilterField extends StringValueObject {
    constructor(value: string) {
        super(value);
    }
}
