import {UuidValueObject} from '@project/Shared/Domain/ValueObject/UuidValueObject';
import {InvalidArgumentError} from '@project/Shared/Domain/ValueObject/InvalidArgumentError';

class NonAbstractUuidValueObject extends UuidValueObject {}

describe('UuidValueObject', () => {
    it('should accept another UuidValueObject value as valid', () => {
        const uuid = NonAbstractUuidValueObject.random();

        const sameUuid = new NonAbstractUuidValueObject(uuid.value);

        expect(sameUuid).toBeDefined();
    });

    it('should throw an error when created from invalid UUID', () => {
        const badUuid = 'hello!';
        expect(() => {
            new NonAbstractUuidValueObject(badUuid);
        }).toThrow(InvalidArgumentError);
    });
});
