/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
import {ValueObject} from '@project/Shared/Domain/ValueObject/ValueObject';

type NewableClass<T> = new (...args: any[]) => T;

export const ValueObjectTransformer = <T extends ValueObject<any>>(
    ValueObjectClass: NewableClass<T>
) => ({
    to: (value: T): unknown => value?.value,
    from: (value: any): T | null =>
        value !== null ? new ValueObjectClass(value) : null,
});
