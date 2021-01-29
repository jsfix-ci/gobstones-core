import { describe, test, expect } from '@jest/globals';
import { expect as assert } from '../../src/Expectations';

describe(`Expectations should have false results`, () => {
    test(`When using toBe with different elements`, () => {
        expect(assert(5).toBe(7).getResult()).toBe(false);

        expect(assert('hello').toBe('world').getResult()).toBe(false);

        expect(assert([1, 2, 3, 4]).toBe([5, 6, 7, 8]).getResult()).toBe(false);

        expect(
            assert({ a: 1, b: 2, c: 'hello', d: 'world' })
                .toBe({ a: 7, b: 8, c: 'hi', d: 'earth' })
                .getResult()
        ).toBe(false);

        // Should match the same object, not deep matching
        expect(assert([1, 2, 3, 4]).toBe([1, 2, 3, 4]).getResult()).toBe(false);

        expect(
            assert({ a: 1, b: 2, c: 'hello', d: 'world' })
                .toBe({ a: 1, b: 2, c: 'hello', d: 'world' })
                .getResult()
        ).toBe(false);
    });

    test(`When using toBeLike with non similar elements nor same element`, () => {
        expect(assert(5).toBeLike(6).getResult()).toBe(false);

        expect(assert('hello').toBeLike('hi').getResult()).toBe(false);

        expect(assert([1, 2, 3, 4]).toBeLike([1, 2, 3, 9]).getResult()).toBe(false);

        expect(assert([1, 2, 3, 4]).toBeLike([1, 2, 3, 4, 5]).getResult()).toBe(false);

        expect(
            assert({ a: 1, b: 2, c: 'hello', d: 'world' })
                .toBeLike({ a: 1, b: 2, c: 'hi', d: 'earth' })
                .getResult()
        ).toBe(false);

        expect(
            assert({ a: 1, b: 2, c: 'hello', d: { x: 5, y: 8 } })
                .toBeLike({ a: 1, b: 2, c: 'hello', d: { x: 5, y: 9 } })
                .getResult()
        ).toBe(false);
    });

    test(`When using toBeDefined with undefined`, () => {
        expect(assert(undefined).toBeDefined().getResult()).toBe(false);
    });

    test(`When using toBeUndefined with non undefined`, () => {
        expect(assert(4).toBeUndefined().getResult()).toBe(false);

        expect(assert('hello').toBeUndefined().getResult()).toBe(false);

        // eslint-disable-next-line no-null/no-null
        expect(assert(null).toBeUndefined().getResult()).toBe(false);

        expect(assert({}).toBeUndefined().getResult()).toBe(false);

        expect(assert([]).toBeUndefined().getResult()).toBe(false);
    });

    test(`When using toBeNull when not null`, () => {
        expect(assert(4).toBeNull().getResult()).toBe(false);

        expect(assert('hello').toBeNull().getResult()).toBe(false);

        expect(assert({}).toBeNull().getResult()).toBe(false);

        expect(assert([]).toBeNull().getResult()).toBe(false);
    });

    test(`When using toBeTruthy with falsy value`, () => {
        expect(assert(0).toBeTruthy().getResult()).toBe(false);

        expect(assert('').toBeTruthy().getResult()).toBe(false);

        expect(assert(false).toBeTruthy().getResult()).toBe(false);

        // eslint-disable-next-line no-null/no-null
        expect(assert(null).toBeTruthy().getResult()).toBe(false);
    });

    test(`When using toBeFalsy with truthy values`, () => {
        expect(assert(5).toBeFalsy().getResult()).toBe(false);

        expect(assert('hello').toBeFalsy().getResult()).toBe(false);

        expect(assert(true).toBeFalsy().getResult()).toBe(false);

        expect(assert({ a: 'a' }).toBeFalsy().getResult()).toBe(false);
    });

    test(`When using toHaveType with incorrect types`, () => {
        expect(assert(5).toHaveType('string').getResult()).toBe(false);

        expect(assert({ a: 'hello' }).toHaveType('string').getResult()).toBe(false);

        expect(assert([1, 2, 3]).toHaveType('string').getResult()).toBe(false);

        expect(assert('hello').toHaveType('number').getResult()).toBe(false);

        expect(assert({ a: 'hello' }).toHaveType('number').getResult()).toBe(false);

        expect(assert([1, 2, 3]).toHaveType('number').getResult()).toBe(false);

        expect(assert([1, 2, 3]).toHaveType('object').getResult()).toBe(false);
    });

    test(`When using toBeGreaterThan with lower or equal elements`, () => {
        expect(assert(5).toBeGreaterThan(7).getResult()).toBe(false);

        expect(assert(0).toBeGreaterThan(0).getResult()).toBe(false);
    });

    test(`When using toBeGreaterThanOrEqual with lower elements`, () => {
        expect(assert(5).toBeGreaterThanOrEqual(7).getResult()).toBe(false);
    });

    test(`When using toBeLowerThan with greater or equal elements`, () => {
        expect(assert(2).toBeLowerThan(1).getResult()).toBe(false);

        expect(assert(-4).toBeLowerThan(-4).getResult()).toBe(false);
    });

    test(`When using toBeLowerOrEqualThan with greater elements`, () => {
        expect(assert(2).toBeLowerThanOrEqual(1).getResult()).toBe(false);
    });

    test(`When using toBeBetween when not in range`, () => {
        expect(assert(2).toBeBetween(5, 3).getResult()).toBe(false);

        expect(assert(5).toBeBetween(6, 8).getResult()).toBe(false);

        expect(assert(8).toBeBetween(5, 7).getResult()).toBe(false);
    });

    test(`When using toBeInfinity when not Infinity`, () => {
        expect(assert(9892).toBeInfinity().getResult()).toBe(false);

        expect(assert(-2924892).toBeInfinity().getResult()).toBe(false);

        expect(assert(NaN).toBeInfinity().getResult()).toBe(false);
    });

    test(`When using toBeNaN when not NaN`, () => {
        expect(assert(392).toBeNaN().getResult()).toBe(false);

        expect(assert(Infinity).toBeNaN().getResult()).toBe(false);

        expect(assert(-Infinity).toBeNaN().getResult()).toBe(false);
    });

    test(`When using toBeCloseTo when not close`, () => {
        expect(
            assert(3.0 + 1.0005)
                .toBeCloseTo(4.0)
                .getResult()
        ).toBe(false);

        expect(
            assert(3.0 + 1.001)
                .toBeCloseTo(4.0, 3)
                .getResult()
        ).toBe(false);

        expect(
            assert(3.0 + 1.0001)
                .toBeCloseTo(4.0, 4)
                .getResult()
        ).toBe(false);

        expect(
            assert(3.0 + 1.1)
                .toBeCloseTo(4.0, 1)
                .getResult()
        ).toBe(false);
    });

    test(`When using toHaveSubstring when no valid substring is given`, () => {
        expect(assert('Hello World').toHaveSubstring('ELO').getResult()).toBe(false);

        expect(assert('Hello World').toHaveSubstring('Pit').getResult()).toBe(false);

        expect(assert('Hello World').toHaveSubstring('Fall').getResult()).toBe(false);
    });

    test(`When using toStartWith when a non valid start is given`, () => {
        expect(assert('Hello World').toStartWith('World').getResult()).toBe(false);

        expect(assert('Hello World').toStartWith('W').getResult()).toBe(false);

        expect(assert('Hello World').toStartWith('h').getResult()).toBe(false);
    });

    test(`When using toEndWith when a valid substring is given`, () => {
        expect(assert('Hello World').toEndWith('Hello').getResult()).toBe(false);

        expect(assert('Hello World').toEndWith('llo').getResult()).toBe(false);

        expect(assert('Hello World').toEndWith('D').getResult()).toBe(false);
    });

    test(`When using toMatch when a valid substring is given`, () => {
        expect(
            assert('Hello World')
                .toMatch(/[0-9]+/)
                .getResult()
        ).toBe(false);

        expect(
            assert('Hello World')
                .toMatch(/$[A-Za-z]+$/)
                .getResult()
        ).toBe(false);
    });

    test(`When using toHaveLength with array of another length`, () => {
        expect(assert([1, 2, 3]).toHaveLength(4).getResult()).toBe(false);

        expect(assert([1]).toHaveLength(2).getResult()).toBe(false);

        expect(assert([]).toHaveLength(1).getResult()).toBe(false);
    });

    test(`When using toContain with array with non existing element`, () => {
        expect(assert([1, 2, 3]).toContain(4).getResult()).toBe(false);

        expect(assert([1, 2, 3]).toContain(0).getResult()).toBe(false);

        expect(assert([1]).toContain(2).getResult()).toBe(false);
    });

    test(
        `When using toHaveAtPosition with array with no such element at` +
            `such position or invalid position`,
        () => {
            expect(assert([1, 2, 3]).toHaveAtPosition(4, 2).getResult()).toBe(false);

            expect(assert([1, 2, 3]).toHaveAtPosition(3, 1).getResult()).toBe(false);

            expect(assert([1]).toHaveAtPosition(0, 0).getResult()).toBe(false);

            expect(assert([1]).toHaveAtPosition(0, -1).getResult()).toBe(false);

            expect(assert([1]).toHaveAtPosition(0, 3).getResult()).toBe(false);
        }
    );

    test(`When using allToSatisfy with a function that some not satisfy`, () => {
        expect(
            assert([1, 2, 3])
                .allToSatisfy((e) => e < 2)
                .getResult()
        ).toBe(false);

        expect(
            assert([2, 4, 5])
                .allToSatisfy((e) => e % 2 === 0)
                .getResult()
        ).toBe(false);
    });

    test(`When using anyToSatisfy with a function that none satisfy`, () => {
        expect(
            assert([1, 2, 3])
                .anyToSatisfy((e) => e < 0)
                .getResult()
        ).toBe(false);

        expect(
            assert([2, 5, 4, 3, 6])
                .anyToSatisfy((e) => e > 10)
                .getResult()
        ).toBe(false);
    });

    // eslint-disable-next-line max-len
    test(`When using anyToSatisfy with a function that a given amount satisfy with wrong amount`, () => {
        expect(
            assert([1, 2, 3])
                .amountToSatisfy(3, (e) => e < 2)
                .getResult()
        ).toBe(false);

        expect(
            assert([2, 5, 4, 3, 6])
                .amountToSatisfy(2, (e) => e % 2 === 0)
                .getResult()
        ).toBe(false);
    });

    // eslint-disable-next-line max-len
    test(`When using toHavePropertyCount with object that not contains that many properties`, () => {
        expect(assert({ a: 'hello', b: 5 }).toHavePropertyCount(3).getResult()).toBe(false);

        // eslint-disable-next-line no-null/no-null
        expect(assert({ a: 'hello', b: 5, c: null }).toHavePropertyCount(2).getResult()).toBe(
            false
        );

        expect(assert({}).toHavePropertyCount(1).getResult()).toBe(false);
    });

    test(`When using toHaveAttr with object that does not contains that property`, () => {
        expect(assert({ a: 'hello', b: 5 }).toHaveProperty('c').getResult()).toBe(false);
    });

    test(`When using toBeInstanceOf with object and not the correct class`, () => {
        expect(assert(new Error()).toBeInstanceOf(RegExp).getResult()).toBe(false);

        // eslint-disable-next-line prefer-regex-literals
        expect(assert(new RegExp('[a-z]')).toBeInstanceOf(Error).getResult()).toBe(false);
    });
});
