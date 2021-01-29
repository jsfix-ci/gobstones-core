import { describe, test, expect } from '@jest/globals';
import { expect as assert } from '../../src/Expectations';

describe(`Expectations with not should have false returns`, () => {
    test(`When using toBe with the same element`, () => {
        expect(assert(5).not.toBe(5).getResult()).toBe(false);

        expect(assert('hello').not.toBe('hello').getResult()).toBe(false);

        const someArray = [1, 2, 3, 4];
        expect(assert(someArray).not.toBe(someArray).getResult()).toBe(false);

        const someObject = { a: 1, b: 2, c: 'hello', d: 'world' };
        expect(assert(someObject).not.toBe(someObject).getResult()).toBe(false);
    });

    test(`When using toBeLike with similar elements or same element`, () => {
        expect(assert(5).not.toBeLike(5.0).getResult()).toBe(false);

        expect(assert('hello').not.toBeLike('hello').getResult()).toBe(false);

        expect(assert([1, 2, 3, 4]).not.toBeLike([1, 2, 3, 4]).getResult()).toBe(false);

        expect(
            assert({ a: 1, b: 2, c: 'hello', d: 'world' })
                .not.toBeLike({ a: 1, b: 2, c: 'hello', d: 'world' })
                .getResult()
        ).toBe(false);

        expect(
            assert({ a: 1, b: 2, c: 'hello', d: { x: 5, y: 8 } })
                .not.toBeLike({ a: 1, b: 2, c: 'hello', d: { x: 5, y: 8 } })
                .getResult()
        ).toBe(false);
    });

    test(`When using toBeDefined with defined`, () => {
        expect(assert(5).not.toBeDefined().getResult()).toBe(false);

        expect(assert('hello').not.toBeDefined().getResult()).toBe(false);

        expect(assert(0).not.toBeDefined().getResult()).toBe(false);

        expect(assert('').not.toBeDefined().getResult()).toBe(false);

        expect(assert(false).not.toBeDefined().getResult()).toBe(false);

        // eslint-disable-next-line no-null/no-null
        expect(assert(null).not.toBeDefined().getResult()).toBe(false);
    });

    test(`When using toBeUndefined with undefined`, () => {
        expect(assert(undefined).not.toBeUndefined().getResult()).toBe(false);
    });

    test(`When using toBeNull when null`, () => {
        // eslint-disable-next-line no-null/no-null
        expect(assert(null).not.toBeNull().getResult()).toBe(false);
    });

    test(`When using toBeTruthy with truthy value`, () => {
        expect(assert(5).not.toBeTruthy().getResult()).toBe(false);

        expect(assert('hello').not.toBeTruthy().getResult()).toBe(false);

        expect(assert(true).not.toBeTruthy().getResult()).toBe(false);

        expect(assert({ a: 'a' }).not.toBeTruthy().getResult()).toBe(false);
    });

    test(`When using toBeFalsy with falsy values`, () => {
        expect(assert(0).not.toBeFalsy().getResult()).toBe(false);

        expect(assert('').not.toBeFalsy().getResult()).toBe(false);

        expect(assert(false).not.toBeFalsy().getResult()).toBe(false);

        // eslint-disable-next-line no-null/no-null
        expect(assert(null).not.toBeFalsy().getResult()).toBe(false);

        expect(assert(undefined).not.toBeFalsy().getResult()).toBe(false);
    });

    test(`When using toHaveType with correct types`, () => {
        expect(assert(5).not.toHaveType('number').getResult()).toBe(false);

        expect(assert('hello').not.toHaveType('string').getResult()).toBe(false);

        expect(assert(false).not.toHaveType('boolean').getResult()).toBe(false);

        expect(assert({ a: 'hello', b: 5 }).not.toHaveType('object').getResult()).toBe(false);

        expect(assert([1, 3, 4]).not.toHaveType('array').getResult()).toBe(false);
    });

    test(`When using toBeGreaterThan with greater elements`, () => {
        expect(assert(5).not.toBeGreaterThan(3).getResult()).toBe(false);

        expect(assert(0).not.toBeGreaterThan(-1).getResult()).toBe(false);
    });

    test(`When using toBeGreaterThanOrEqual with greater elements`, () => {
        expect(assert(5).not.toBeGreaterThanOrEqual(3).getResult()).toBe(false);

        expect(assert(5).not.toBeGreaterThanOrEqual(5).getResult()).toBe(false);
    });

    test(`When using toBeLowerThan with lower elements`, () => {
        expect(assert(2).not.toBeLowerThan(3).getResult()).toBe(false);

        expect(assert(-4).not.toBeLowerThan(-1).getResult()).toBe(false);
    });

    test(`When using toBeLowerOrEqualThan with lower elements`, () => {
        expect(assert(2).not.toBeLowerThanOrEqual(3).getResult()).toBe(false);

        expect(assert(5).not.toBeLowerThanOrEqual(5).getResult()).toBe(false);
    });

    test(`When using toBeBetween when within range`, () => {
        expect(assert(2).not.toBeBetween(1, 3).getResult()).toBe(false);

        expect(assert(5).not.toBeBetween(5, 8).getResult()).toBe(false);

        expect(assert(8).not.toBeBetween(5, 8).getResult()).toBe(false);
    });

    test(`When using toBeInfinity when Infinity`, () => {
        expect(assert(Infinity).not.toBeInfinity().getResult()).toBe(false);

        expect(assert(-Infinity).not.toBeInfinity().getResult()).toBe(false);
    });

    test(`When using toBeNaN when NaN`, () => {
        expect(assert(NaN).not.toBeNaN().getResult()).toBe(false);
    });

    test(`When using toBeCloseTo when closed`, () => {
        expect(
            assert(3.0 + 1.0)
                .not.toBeCloseTo(4.0)
                .getResult()
        ).toBe(false);

        expect(
            assert(3.0 + 1.001)
                .not.toBeCloseTo(4.0, 2)
                .getResult()
        ).toBe(false);

        expect(
            assert(3.0 + 1.0001)
                .not.toBeCloseTo(4.0, 3)
                .getResult()
        ).toBe(false);
    });

    test(`When using toHaveSubstring when a valid substring is given`, () => {
        expect(assert('Hello World').not.toHaveSubstring('ello').getResult()).toBe(false);

        expect(assert('Hello World').not.toHaveSubstring('He').getResult()).toBe(false);

        expect(assert('Hello World').not.toHaveSubstring('rld').getResult()).toBe(false);
    });

    test(`When using toStartWith when a valid start is given`, () => {
        expect(assert('Hello World').not.toStartWith('Hello').getResult()).toBe(false);

        expect(assert('Hello World').not.toStartWith('He').getResult()).toBe(false);

        expect(assert('Hello World').not.toStartWith('H').getResult()).toBe(false);
    });

    test(`When using toEndWith when a valid end is given`, () => {
        expect(assert('Hello World').not.toEndWith('World').getResult()).toBe(false);

        expect(assert('Hello World').not.toEndWith('ld').getResult()).toBe(false);

        expect(assert('Hello World').not.toEndWith('d').getResult()).toBe(false);
    });

    test(`When using toMatch when a valid substring is given`, () => {
        expect(
            assert('Hello World')
                .not.toMatch(/Hello World/)
                .getResult()
        ).toBe(false);

        expect(
            assert('Hello World')
                .not.toMatch(/[A-Za-z]+ [A-Za-z]+/)
                .getResult()
        ).toBe(false);
    });

    test(`When using toHaveLength with array of given length`, () => {
        expect(assert([1, 2, 3]).not.toHaveLength(3).getResult()).toBe(false);

        expect(assert([1]).not.toHaveLength(1).getResult()).toBe(false);

        expect(assert([]).not.toHaveLength(0).getResult()).toBe(false);
    });

    test(`When using toContain with array with existing element`, () => {
        expect(assert([1, 2, 3]).not.toContain(3).getResult()).toBe(false);

        expect(assert([1, 2, 3]).not.toContain(2).getResult()).toBe(false);

        expect(assert([1]).not.toContain(1).getResult()).toBe(false);
    });

    test(`When using toHaveAtPosition with array with such element at such position`, () => {
        expect(assert([1, 2, 3]).not.toHaveAtPosition(3, 2).getResult()).toBe(false);

        expect(assert([1, 2, 3]).not.toHaveAtPosition(2, 1).getResult()).toBe(false);

        expect(assert([1]).not.toHaveAtPosition(1, 0).getResult()).toBe(false);
    });

    test(`When using allToSatisfy with a function that all satisfy`, () => {
        expect(
            assert([1, 2, 3])
                .not.allToSatisfy((e) => e < 5)
                .getResult()
        ).toBe(false);

        expect(
            assert([2, 4, 6])
                .not.allToSatisfy((e) => e % 2 === 0)
                .getResult()
        ).toBe(false);
    });

    test(`When using anyToSatisfy with a function that all satisfy`, () => {
        expect(
            assert([1, 2, 3])
                .not.anyToSatisfy((e) => e < 2)
                .getResult()
        ).toBe(false);

        expect(
            assert([2, 5, 4, 3, 6])
                .not.anyToSatisfy((e) => e % 2 === 0)
                .getResult()
        ).toBe(false);
    });

    test(`When using anyToSatisfy with a function that a given amount satisfy`, () => {
        expect(
            assert([1, 2, 3])
                .not.amountToSatisfy(1, (e) => e < 2)
                .getResult()
        ).toBe(false);

        expect(
            assert([2, 5, 4, 3, 6])
                .not.amountToSatisfy(3, (e) => e % 2 === 0)
                .getResult()
        ).toBe(false);
    });

    test(`When using toHavePropertyCount with object that contains that many properties`, () => {
        expect(assert({ a: 'hello', b: 5 }).not.toHavePropertyCount(2).getResult()).toBe(false);

        // eslint-disable-next-line no-null/no-null
        expect(assert({ a: 'hello', b: 5, c: null }).not.toHavePropertyCount(3).getResult()).toBe(
            false
        );

        expect(assert({}).not.toHavePropertyCount(0).getResult()).toBe(false);
    });

    test(`When using toHaveProperty with object that contains that property`, () => {
        expect(assert({ a: 'hello', b: 5 }).not.toHaveProperty('a').getResult()).toBe(false);
    });

    test(`When using toBeInstanceOf with object the correct class`, () => {
        expect(assert(new Error()).not.toBeInstanceOf(Error).getResult()).toBe(false);

        // eslint-disable-next-line prefer-regex-literals
        expect(assert(new RegExp('[a-z]')).not.toBeInstanceOf(RegExp).getResult()).toBe(false);
    });
});
