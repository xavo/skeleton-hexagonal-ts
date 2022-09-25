import {DatetimeValueObject} from '@project/Shared/Domain/ValueObject/DatetimeValueObject';

class NonAbstractDatetimeValueObject extends DatetimeValueObject {}

describe('DateTimeValueObject', () => {
    it('should evaluate equal dates as equal and different ones as different', () => {
        const date = new Date();
        const dateTimeValue1 = new NonAbstractDatetimeValueObject(date);
        const dateTimeValue2 = new NonAbstractDatetimeValueObject(date);

        let theyAreEquals = dateTimeValue1.equals(dateTimeValue2);

        expect(theyAreEquals).toBeTruthy();

        const dateTimeValue3 = new NonAbstractDatetimeValueObject(
            new Date('1976-12-11')
        );

        theyAreEquals = dateTimeValue1.equals(dateTimeValue3);

        expect(theyAreEquals).toBeFalsy();
    });

    it('should compare dates', () => {
        const smallerDateTime = new NonAbstractDatetimeValueObject(
            new Date('1976-12-11')
        );
        const greaterDateTime = new NonAbstractDatetimeValueObject(new Date());

        const smallerIsBefore = smallerDateTime.isBefore(greaterDateTime);
        expect(smallerIsBefore).toBeTruthy();

        const greaterIsBefore = greaterDateTime.isBefore(smallerDateTime);
        expect(greaterIsBefore).toBeFalsy();

        const greaterIsAfter = greaterDateTime.isAfter(smallerDateTime);
        expect(greaterIsAfter).toBeTruthy();

        const smallerIsAfter = smallerDateTime.isAfter(greaterDateTime);
        expect(smallerIsAfter).toBeFalsy();
    });

    it('should recognize equal dates as not before and not after one to another', () => {
        const date = new Date();
        const dateTimeValue1 = new NonAbstractDatetimeValueObject(date);
        const dateTimeValue2 = new NonAbstractDatetimeValueObject(date);

        const before = dateTimeValue1.isBefore(dateTimeValue2);
        expect(before).toBeFalsy();

        const after = dateTimeValue1.isAfter(dateTimeValue2);
        expect(after).toBeFalsy();
    });
});
