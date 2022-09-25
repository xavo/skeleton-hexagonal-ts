import {StringValueObject} from '@project/Shared/Domain/ValueObject/StringValueObject';

class NonAbstractStringValueObject extends StringValueObject {}

describe('StringValueObject', () => {
    it('should return the same value when toString is called', () => {
        const value = 'hello';
        const stringValueObject = new NonAbstractStringValueObject(value);

        const toString = stringValueObject.toString();

        expect(toString).toEqual(value);
    });
});
