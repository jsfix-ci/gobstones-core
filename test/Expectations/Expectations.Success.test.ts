import { describe, test, expect } from '@jest/globals';
import { expect as assert } from '../../src/Expectations';

describe(`Expectations should have true results`, () => {
    test(`When using toBe with the same element`, () => {
        expect(assert(5).toBe(5).getResult()).toBe(true);

        expect(assert('hello').toBe('hello').getResult()).toBe(true);

        const someArray = [1, 2, 3, 4];
        expect(assert(someArray).toBe(someArray).getResult()).toBe(true);

        const someObject = { a: 1, b: 2, c: 'hello', d: 'world' };
        expect(assert(someObject).toBe(someObject).getResult()).toBe(true);
    });

    test(`When using toBeLike with similar elements or same element`, () => {
        expect(assert(5).toBeLike(5.0).getResult()).toBe(true);

        expect(assert('hello').toBeLike('hello').getResult()).toBe(true);

        expect(assert([1, 2, 3, 4]).toBeLike([1, 2, 3, 4]).getResult()).toBe(true);

        expect(
            assert({ a: 1, b: 2, c: 'hello', d: 'world' })
                .toBeLike({ a: 1, b: 2, c: 'hello', d: 'world' })
                .getResult()
        ).toBe(true);

        expect(
            assert({ a: 1, b: 2, c: 'hello', d: { x: 5, y: 8 } })
                .toBeLike({ a: 1, b: 2, c: 'hello', d: { x: 5, y: 8 } })
                .getResult()
        ).toBe(true);
    });

    test(`When using toBeDefined with defined`, () => {
        expect(assert(5).toBeDefined().getResult()).toBe(true);

        expect(assert('hello').toBeDefined().getResult()).toBe(true);

        expect(assert(0).toBeDefined().getResult()).toBe(true);

        expect(assert('').toBeDefined().getResult()).toBe(true);

        expect(assert(false).toBeDefined().getResult()).toBe(true);

        // eslint-disable-next-line no-null/no-null
        expect(assert(null).toBeDefined().getResult()).toBe(true);
    });

    test(`When using toBeUndefined with undefined`, () => {
        expect(assert(undefined).toBeUndefined().getResult()).toBe(true);
    });

    test(`When using toBeNull when null`, () => {
        // eslint-disable-next-line no-null/no-null
        expect(assert(null).toBeNull().getResult()).toBe(true);
    });

    test(`When using toBeTruthy with truthy value`, () => {
        expect(assert(5).toBeTruthy().getResult()).toBe(true);

        expect(assert('hello').toBeTruthy().getResult()).toBe(true);

        expect(assert(true).toBeTruthy().getResult()).toBe(true);

        expect(assert({ a: 'a' }).toBeTruthy().getResult()).toBe(true);
    });

    test(`When using toBeFalsy with falsy values`, () => {
        expect(assert(0).toBeFalsy().getResult()).toBe(true);

        expect(assert('').toBeFalsy().getResult()).toBe(true);

        expect(assert(false).toBeFalsy().getResult()).toBe(true);

        // eslint-disable-next-line no-null/no-null
        expect(assert(null).toBeFalsy().getResult()).toBe(true);

        expect(assert(undefined).toBeFalsy().getResult()).toBe(true);
    });

    test(`When using toHaveType with correct types`, () => {
        expect(assert(5).toHaveType('number').getResult()).toBe(true);

        expect(assert('hello').toHaveType('string').getResult()).toBe(true);

        expect(assert(false).toHaveType('boolean').getResult()).toBe(true);

        expect(assert({ a: 'hello', b: 5 }).toHaveType('object').getResult()).toBe(true);

        expect(assert([1, 3, 4]).toHaveType('array').getResult()).toBe(true);
    });

    test(`When using toBeGreaterThan with greater elements`, () => {
        expect(assert(5).toBeGreaterThan(3).getResult()).toBe(true);

        expect(assert(0).toBeGreaterThan(-1).getResult()).toBe(true);
    });

    test(`When using toBeGreaterThanOrEqual with greater elements`, () => {
        expect(assert(5).toBeGreaterThanOrEqual(3).getResult()).toBe(true);

        expect(assert(5).toBeGreaterThanOrEqual(5).getResult()).toBe(true);
    });

    test(`When using toBeLowerThan with lower elements`, () => {
        expect(assert(2).toBeLowerThan(3).getResult()).toBe(true);

        expect(assert(-4).toBeLowerThan(-1).getResult()).toBe(true);
    });

    test(`When using toBeLowerOrEqualThan with lower elements`, () => {
        expect(assert(2).toBeLowerThanOrEqual(3).getResult()).toBe(true);

        expect(assert(5).toBeLowerThanOrEqual(5).getResult()).toBe(true);
    });

    test(`When using toBeBetween when within range`, () => {
        expect(assert(2).toBeBetween(1, 3).getResult()).toBe(true);

        expect(assert(5).toBeBetween(5, 8).getResult()).toBe(true);

        expect(assert(8).toBeBetween(5, 8).getResult()).toBe(true);
    });

    test(`When using toBeInfinity when Infinity`, () => {
        expect(assert(Infinity).toBeInfinity().getResult()).toBe(true);

        expect(assert(-Infinity).toBeInfinity().getResult()).toBe(true);
    });

    test(`When using toBeNaN when NaN`, () => {
        expect(assert(NaN).toBeNaN().getResult()).toBe(true);
    });

    test(`When using toBeCloseTo when closed`, () => {
        expect(
            assert(3.0 + 1.0)
                .toBeCloseTo(4.0)
                .getResult()
        ).toBe(true);

        expect(
            assert(3.0 + 1.001)
                .toBeCloseTo(4.0, 2)
                .getResult()
        ).toBe(true);

        expect(
            assert(3.0 + 1.0001)
                .toBeCloseTo(4.0, 3)
                .getResult()
        ).toBe(true);
    });

    test(`When using toHaveSubstring when a valid substring is given`, () => {
        expect(assert('Hello World').toHaveSubstring('ello').getResult()).toBe(true);

        expect(assert('Hello World').toHaveSubstring('He').getResult()).toBe(true);

        expect(assert('Hello World').toHaveSubstring('rld').getResult()).toBe(true);
    });

    test(`When using toStartWith when a valid start is given`, () => {
        expect(assert('Hello World').toStartWith('Hello').getResult()).toBe(true);

        expect(assert('Hello World').toStartWith('He').getResult()).toBe(true);

        expect(assert('Hello World').toStartWith('H').getResult()).toBe(true);
    });

    test(`When using toEndWith when a valid end is given`, () => {
        expect(assert('Hello World').toEndWith('World').getResult()).toBe(true);

        expect(assert('Hello World').toEndWith('ld').getResult()).toBe(true);

        expect(assert('Hello World').toEndWith('d').getResult()).toBe(true);
    });

    test(`When using toMatch when a valid substring is given`, () => {
        expect(
            assert('Hello World')
                .toMatch(/Hello World/)
                .getResult()
        ).toBe(true);

        expect(
            assert('Hello World')
                .toMatch(/[A-Za-z]+ [A-Za-z]+/)
                .getResult()
        ).toBe(true);
    });

    test(`When using toHaveLength with array of given length`, () => {
        expect(assert([1, 2, 3]).toHaveLength(3).getResult()).toBe(true);

        expect(assert([1]).toHaveLength(1).getResult()).toBe(true);

        expect(assert([]).toHaveLength(0).getResult()).toBe(true);
    });

    test(`When using toContain with array with existing element`, () => {
        expect(assert([1, 2, 3]).toContain(3).getResult()).toBe(true);

        expect(assert([1, 2, 3]).toContain(2).getResult()).toBe(true);

        expect(assert([1]).toContain(1).getResult()).toBe(true);
    });

    test(`When using toHaveAtPosition with array with such element at such position`, () => {
        expect(assert([1, 2, 3]).toHaveAtPosition(3, 2).getResult()).toBe(true);

        expect(assert([1, 2, 3]).toHaveAtPosition(2, 1).getResult()).toBe(true);

        expect(assert([1]).toHaveAtPosition(1, 0).getResult()).toBe(true);
    });

    test(`When using allToSatisfy with a function that all satisfy`, () => {
        expect(
            assert([1, 2, 3])
                .allToSatisfy((e) => e < 5)
                .getResult()
        ).toBe(true);

        expect(
            assert([2, 4, 6])
                .allToSatisfy((e) => e % 2 === 0)
                .getResult()
        ).toBe(true);
    });

    test(`When using anyToSatisfy with a function that a given amount satisfy`, () => {
        expect(
            assert([1, 2, 3])
                .anyToSatisfy((e) => e < 2)
                .getResult()
        ).toBe(true);

        expect(
            assert([2, 5, 4, 3, 6])
                .anyToSatisfy((e) => e % 2 === 0)
                .getResult()
        ).toBe(true);
    });

    test(`When using anyToSatisfy with a function that all satisfy`, () => {
        expect(
            assert([1, 2, 3])
                .amountToSatisfy(1, (e) => e < 2)
                .getResult()
        ).toBe(true);

        expect(
            assert([2, 5, 4, 3, 6])
                .amountToSatisfy(3, (e) => e % 2 === 0)
                .getResult()
        ).toBe(true);
    });

    test(`When using toHavePropertyCount with object that contains that many properties`, () => {
        expect(assert({ a: 'hello', b: 5 }).toHavePropertyCount(2).getResult()).toBe(true);

        // eslint-disable-next-line no-null/no-null
        expect(assert({ a: 'hello', b: 5, c: null }).toHavePropertyCount(3).getResult()).toBe(true);

        expect(assert({}).toHavePropertyCount(0).getResult()).toBe(true);
    });

    test(`When using toHaveProperty with object that contains that property`, () => {
        expect(assert({ a: 'hello', b: 5 }).toHaveProperty('a').getResult()).toBe(true);
    });

    test(`When using toBeInstanceOf with object the correct class`, () => {
        expect(assert(new Error()).toBeInstanceOf(Error).getResult()).toBe(true);

        // eslint-disable-next-line prefer-regex-literals
        expect(assert(new RegExp('[a-z]')).toBeInstanceOf(RegExp).getResult()).toBe(true);
    });
});
