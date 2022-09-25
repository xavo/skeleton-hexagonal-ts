import {v4, validate, version} from 'uuid';
import {InvalidArgumentError} from './InvalidArgumentError';
import {ValueObject} from '@project/Shared/Domain/ValueObject/ValueObject';

export class UuidValueObject extends ValueObject<string> {
    constructor(value: string) {
        UuidValueObject.ensureIsValidUuid(value);
        super(value);
    }

    static random(): UuidValueObject {
        return new UuidValueObject(v4());
    }

    private static ensureIsValidUuid(uuid: string): void {
        if (!UuidValueObject.isValidUuid(uuid)) {
            throw new InvalidArgumentError(
                `<${this.constructor.name}> does not allow the value <${uuid}>`
            );
        }
    }

    private static isValidUuid(uuid: string): boolean {
        return validate(uuid) && version(uuid) === 4;
    }
}
