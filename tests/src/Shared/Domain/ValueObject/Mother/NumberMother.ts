import {MotherCreator} from './MotherCreator';

export class NumberMother {
    static random(min?: number, max?: number): number {
        return MotherCreator.random().datatype.number({
            min: min ?? 0,
            max: max ?? 10,
        });
    }
}
