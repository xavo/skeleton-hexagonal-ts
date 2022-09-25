import {NumberValueObject} from '@project/Shared/Domain/ValueObject/NumberValueObject';

class NonAbstractNumberValueObject extends NumberValueObject {}

describe('NumberValueObject', () => {
    it('should evaluate equal numbers as equal and different ones as different', () => {
        const equalNumber1 = new NonAbstractNumberValueObject(10);
        const equalNumber2 = new NonAbstractNumberValueObject(10);

        const equalsAreEqual = equalNumber1.equals(equalNumber2);

        expect(equalsAreEqual).toBeTruthy();

        const differentNumber = new NonAbstractNumberValueObject(11);

        const differentAreEqual = equalNumber1.equals(differentNumber);

        expect(differentAreEqual).toBeFalsy();
    });

    it('should check that a number is bigger than another', () => {
        const lowerNumber = new NonAbstractNumberValueObject(0);
        const biggerNumber = new NonAbstractNumberValueObject(1);

        const biggerIsBigger = biggerNumber.isBiggerThan(lowerNumber);
        expect(biggerIsBigger).toBeTruthy();

        const lowerIsBigger = lowerNumber.isBiggerThan(biggerNumber);
        expect(lowerIsBigger).toBeFalsy();
    });
});
