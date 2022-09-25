import {EmailValueObject} from '@project/Shared/Domain/ValueObject/EmailValueObject';
import {InvalidEmailError} from '@project/Shared/Domain/ValueObject/InvalidEmailError';
import {EmailMother} from './Mother/EmailMother';

describe('EmailValueObject validator', () => {
    it('should create a value object with a valid email', () => {
        const email = EmailMother.random();
        const emailVO = new EmailValueObject(email);
        expect(emailVO.value).toBe(email.toLowerCase());
    });

    it('should convert email to lowercase', () => {
        const email = 'this.IS.an@email.com';
        const emailVO = new EmailValueObject(email);
        expect(emailVO.value).toBe(email.toLowerCase());
    });

    it('should fail if email is not valid', () => {
        const emails = [
            'this is not an email',
            'thisisnot@anemail',
            'thisisnotan.email',
            'thisisnotanemail@*.com',
        ];
        emails.forEach((email) =>
            expect(() => new EmailValueObject(email)).toThrow(InvalidEmailError)
        );
    });
});
