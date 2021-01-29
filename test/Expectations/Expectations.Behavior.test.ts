import { describe, test, expect } from '@jest/globals';
import { expect as assert } from '../../src/Expectations';

describe(`Expectations should throw correctly`, () => {
    test(`An expectancy with true result should not throw`, () => {
        expect(() => assert(1).toBe(1).orThrow(new Error())).not.toThrow();
    });

    test(`An expectancy with false result should throw`, () => {
        expect(() => assert(1).toBe(0).orThrow(new Error())).toThrow();
    });
});

describe(`Expectations should yield correctly`, () => {
    test(`An expectancy with false result should yield the given value`, () => {
        expect(assert(1).toBe(0).orYield(7)).toBe(7);

        expect(assert(1).toBe(0).orYield('hello world')).toBe('hello world');
    });

    test(`An expectancy with true result should yield undefined`, () => {
        expect(assert(1).toBe(1).orYield(7)).toBeUndefined();

        expect(assert(1).toBe(1).orYield('hello world')).toBeUndefined();
    });
});

describe(`Expectations should perform actions correctly`, () => {
    test(`An expectancy with true result should perform the andDo action`, () => {
        let comparer = 'non expected';
        assert(1)
            .toBe(1)
            .andDo(() => {
                comparer = 'expected';
            });
        expect(comparer).toBe('expected');
    });

    test(`An expectancy with false result should perform the orDo action`, () => {
        let comparer = 'non expected';
        assert(1)
            .toBe(0)
            .orDo(() => {
                comparer = 'expected';
            });
        expect(comparer).toBe('expected');
    });

    test(`An expectancy with false result should not perform the andDo action`, () => {
        let comparer = 'non expected';
        assert(1)
            .toBe(0)
            .andDo(() => {
                comparer = 'expected';
            });
        expect(comparer).toBe('non expected');
    });

    test(`An expectancy with true result should not perform the orDo action`, () => {
        let comparer = 'non expected';
        assert(1)
            .toBe(1)
            .orDo(() => {
                comparer = 'expected';
            });
        expect(comparer).toBe('non expected');
    });

    test(`An expectancy with true result should perform only the ifTrue action in andDoOr`, () => {
        let comparerIfTrue = 'non expected';
        let comparerIfFalse = 'non expected';

        assert(1)
            .toBe(1)
            .andDoOr(
                () => {
                    comparerIfTrue = 'expected';
                },
                () => {
                    comparerIfFalse = 'expected';
                }
            );

        expect(comparerIfTrue).toBe('expected');
        expect(comparerIfFalse).toBe('non expected');
    });

    // eslint-disable-next-line max-len
    test(`An expectancy with false result should perform only the ifFalse action in andDoOr`, () => {
        let comparerIfTrue = 'non expected';
        let comparerIfFalse = 'non expected';

        assert(1)
            .toBe(0)
            .andDoOr(
                () => {
                    comparerIfTrue = 'expected';
                },
                () => {
                    comparerIfFalse = 'expected';
                }
            );

        expect(comparerIfTrue).toBe('non expected');
        expect(comparerIfFalse).toBe('expected');
    });
});

describe(`Joiner expectations should join correctly`, () => {
    test(`An and over expectations should result true when all result true`, () => {
        expect(
            assert.and(assert(1).toBe(1), assert(1).toBe(1), assert(1).toBe(1)).getResult()
        ).toBe(true);
    });

    test(`An and over expectations should result false when no result is true`, () => {
        expect(
            assert.and(assert(1).toBe(0), assert(1).toBe(0), assert(1).toBe(0)).getResult()
        ).toBe(false);
    });

    test(`An and over expectations should result false when any result is false`, () => {
        expect(
            assert.and(assert(1).toBe(1), assert(1).toBe(0), assert(1).toBe(0)).getResult()
        ).toBe(false);

        expect(
            assert.and(assert(1).toBe(0), assert(1).toBe(1), assert(1).toBe(0)).getResult()
        ).toBe(false);

        expect(
            assert.and(assert(1).toBe(0), assert(1).toBe(1), assert(1).toBe(0)).getResult()
        ).toBe(false);
    });

    test(`An or over expectations should result true when all result true`, () => {
        expect(assert.or(assert(1).toBe(1), assert(1).toBe(1), assert(1).toBe(1)).getResult()).toBe(
            true
        );
    });

    test(`An or over expectations should result true when any result true`, () => {
        expect(assert.or(assert(1).toBe(1), assert(1).toBe(0), assert(1).toBe(0)).getResult()).toBe(
            true
        );

        expect(assert.or(assert(1).toBe(0), assert(1).toBe(1), assert(1).toBe(0)).getResult()).toBe(
            true
        );

        expect(assert.or(assert(1).toBe(0), assert(1).toBe(0), assert(1).toBe(1)).getResult()).toBe(
            true
        );
    });

    test(`An or over expectations should result false when no result is true`, () => {
        expect(assert.or(assert(1).toBe(0), assert(1).toBe(0), assert(1).toBe(0)).getResult()).toBe(
            false
        );
    });
});
