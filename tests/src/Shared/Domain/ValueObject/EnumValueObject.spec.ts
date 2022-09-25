import {EnumValueObject} from '@project/Shared/Domain/ValueObject/EnumValueObject';

class StringEnumValueObject extends EnumValueObject<string> {
    protected throwErrorForInvalidValue(value: string): void {
        throw new Error(`Invalid value ${value}`);
    }
}

describe('StringEnumValueObject', () => {
    it('should throw error if selected value is not valid', () => {
        expect(() => new StringEnumValueObject('', ['a', 'b', 'c'])).toThrow(
            Error
        );
    });

    it('should check valid values as valid', () => {
        const enumValue = new StringEnumValueObject('a', ['a', 'b', 'c']);

        expect(() => enumValue.checkValueIsValid('a')).not.toThrow(Error);
    });

    it('should return the right valid values', () => {
        const validValues: string[] = ['1', '2', '3'];
        const enumValue = new StringEnumValueObject('1', validValues);

        expect(enumValue.validValues.sort()).toEqual(validValues.sort());
    });
});
