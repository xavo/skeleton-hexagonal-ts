import {StringValueObject} from '@project/Shared/Domain/ValueObject/StringValueObject';
import {InvalidEmailError} from '@project/Shared/Domain/ValueObject/InvalidEmailError';

export class EmailValueObject extends StringValueObject {
    public static readonly EMAIL_REGEX =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@*"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    constructor(value: string) {
        super(value.toLowerCase());
        EmailValueObject.ensureIsValidEmail(this.value);
    }

    private static ensureIsValidEmail(email: string): void {
        if (!EmailValueObject.validate(email)) {
            throw new InvalidEmailError(
                `${email} is not a valid email address`
            );
        }
    }

    static validate(email: string): boolean {
        return EmailValueObject.EMAIL_REGEX.test(email);
    }
}
