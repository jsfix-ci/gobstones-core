import { describe, expect, it } from '@jest/globals';

import { Color } from '../../src/Board';

describe(`Color`, () => {
    it(`Answers min and max correctly`, () => {
        expect(Color.min()).toBe(Color.Blue);
        expect(Color.max()).toBe(Color.Green);
    });

    it(`Answers with next correctly`, () => {
        expect(Color.next(Color.Blue)).toBe(Color.Black);
        expect(Color.next(Color.Black)).toBe(Color.Red);
        expect(Color.next(Color.Red)).toBe(Color.Green);
        expect(Color.next(Color.Green)).toBe(Color.Blue);
    });

    it(`Answers with previous correctly`, () => {
        expect(Color.previous(Color.Blue)).toBe(Color.Green);
        expect(Color.previous(Color.Black)).toBe(Color.Blue);
        expect(Color.previous(Color.Red)).toBe(Color.Black);
        expect(Color.previous(Color.Green)).toBe(Color.Red);
    });

    it(`Iterates in the same order than next`, () => {
        let currentColor = Color.Blue;
        Color.foreach((c) => {
            expect(c).toBe(currentColor);
            currentColor = Color.next(currentColor);
        });
    });
});
