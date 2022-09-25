import {StringValueObject} from '@project/Shared/Domain/ValueObject/StringValueObject';

export class OrderBy extends StringValueObject {
    constructor(value: string) {
        super(value);
    }
}
