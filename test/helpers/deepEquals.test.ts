import { describe, test, expect } from '@jest/globals';
import { deepEquals } from '../../src/helpers/deepEquals';

describe(`deepEquals should act correctly`, () => {
    test(`Should return true for simple types when equal`, () => {
        expect(deepEquals(4, 4)).toBe(true);
        expect(deepEquals(-100, -100)).toBe(true);
        expect(deepEquals(4.0, 4.0)).toBe(true);
        expect(deepEquals(4.001, 4.001)).toBe(true);
        expect(deepEquals('hello', 'hello')).toBe(true);
        // eslint-disable-next-line no-null/no-null
        expect(deepEquals(null, null)).toBe(true);
        expect(deepEquals(undefined, undefined)).toBe(true);
        expect(deepEquals(Infinity, Infinity)).toBe(true);
        expect(deepEquals(-Infinity, -Infinity)).toBe(true);
        expect(deepEquals(NaN, NaN)).toBe(true);
    });

    test(`Should return false for simple types when same type but not equal`, () => {
        expect(deepEquals(4, 5)).toBe(false);
        expect(deepEquals(-100, -101)).toBe(false);
        expect(deepEquals(4.0, 4.1)).toBe(false);
        expect(deepEquals(4.001, 4.002)).toBe(false);
        expect(deepEquals('hello', 'world')).toBe(false);
        expect(deepEquals(Infinity, -Infinity)).toBe(false);
        expect(deepEquals(-Infinity, Infinity)).toBe(false);
        expect(deepEquals(NaN, Infinity)).toBe(false);
        expect(deepEquals(NaN, 7)).toBe(false);
        expect(deepEquals(7, Infinity)).toBe(false);
    });

    test(`Should return false when elements are not the same type`, () => {
        expect(deepEquals(4, '4' as unknown)).toBe(false);
        // eslint-disable-next-line no-null/no-null
        expect(deepEquals(4, null)).toBe(false);
        // eslint-disable-next-line no-null/no-null
        expect(deepEquals('null', null as unknown)).toBe(false);
        expect(deepEquals('undefined', undefined as unknown)).toBe(false);
        expect(deepEquals('NaN', NaN as unknown)).toBe(false);
        // eslint-disable-next-line no-null/no-null
        expect(deepEquals(null, NaN as unknown)).toBe(false);
        // eslint-disable-next-line no-null/no-null
        expect(deepEquals(null, undefined as unknown)).toBe(false);

        expect(deepEquals(4, {} as unknown)).toBe(false);
        expect(deepEquals('{}', {} as unknown)).toBe(false);
        expect(deepEquals([], {})).toBe(false);
        expect(deepEquals({}, [])).toBe(false);
    });

    test(`Should return true when two arrays are equal`, () => {
        expect(deepEquals([], [])).toBe(true);
        expect(deepEquals([1, 2, 3, 4], [1, 2, 3, 4])).toBe(true);
        expect(deepEquals(['a', 'b'], ['a', 'b'])).toBe(true);
        expect(deepEquals([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(true);
    });

    test(`Should return false when two arrays are different in size`, () => {
        expect(deepEquals([], [1, 2, 3, 4])).toBe(false);
        expect(deepEquals([1, 2, 3, 4], [1, 2, 3])).toBe(false);
        expect(deepEquals(['a', 'b'], ['a', 'b', 'c'])).toBe(false);
        expect(deepEquals([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }, { c: 3 }])).toBe(false);
    });

    test(`Should return false when two arrays have different element in same position`, () => {
        expect(deepEquals([1, 2, 0, 4], [1, 2, 3, 4])).toBe(false);
        expect(deepEquals([0, 2, 3, 4], [1, 2, 3, 4])).toBe(false);
        expect(deepEquals(['a', 'b', 'c'], ['a', 'x', 'c'])).toBe(false);
        expect(deepEquals([{ a: 1 }, { b: 2 }, { d: 0 }], [{ a: 1 }, { b: 2 }, { c: 3 }])).toBe(
            false
        );
        expect(deepEquals([{ a: 1 }, { b: 0 }, { c: 3 }], [{ a: 1 }, { b: 2 }, { c: 3 }])).toBe(
            false
        );
    });

    test(`Should return true when two object have same shape and values`, () => {
        expect(deepEquals({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).toBe(true);
        expect(
            deepEquals({ a: 1, b: 2, c: { ca: 31, cb: 32 } }, { a: 1, b: 2, c: { ca: 31, cb: 32 } })
        ).toBe(true);
        expect(
            deepEquals(
                { a: 1, b: 2, c: { ca: 31, cb: { cba: 321, cbb: 322 } } },
                { a: 1, b: 2, c: { ca: 31, cb: { cba: 321, cbb: 322 } } }
            )
        ).toBe(true);
    });

    test(`Should return false when two object do not have the same shape`, () => {
        expect(deepEquals({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3, d: 4 })).toBe(false);
        expect(
            deepEquals({ a: 1, b: 2, c: { ca: 31, cc: 33 } }, { a: 1, b: 2, c: { ca: 31, cb: 32 } })
        ).toBe(false);
        expect(
            deepEquals(
                { a: 1, b: 2, c: { ca: 31, cb: { cba: 321, cbb: 322 } } },
                { a: 1, b: 2, c: { ca: 31, cb: { cbb: 322 } } }
            )
        ).toBe(false);
    });

    test(`Should return false when two object have the same shape but not the same values`, () => {
        expect(deepEquals({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 0 })).toBe(false);
        expect(
            deepEquals({ a: 1, b: 2, c: { ca: 31, cb: 0 } }, { a: 1, b: 2, c: { ca: 31, cb: 32 } })
        ).toBe(false);
        expect(
            deepEquals(
                { a: 1, b: 2, c: { ca: 31, cb: { cba: 321, cbb: 322 } } },
                { a: 1, b: 2, c: { ca: 31, cb: { cba: 0, cbb: 322 } } }
            )
        ).toBe(false);
    });

    test(`Should return true when two same regexp are given`, () => {
        expect(deepEquals(/a/, /a/)).toBe(true);
        expect(deepEquals(/[a-z][A-Z]+/, /[a-z][A-Z]+/)).toBe(true);
    });

    test(`Should return false when two different regexp are given`, () => {
        expect(deepEquals(/a/, /b/)).toBe(false);
        expect(deepEquals(/[a-z][A-Z]+/, /[A-Z][a-z]+/)).toBe(false);
    });

    test(`Should return true when two same sets are given`, () => {
        expect(deepEquals(new Set([1, 2, 3]), new Set([3, 2, 1]))).toBe(true);
        expect(deepEquals(new Set(['a', 'b']), new Set(['b', 'a']))).toBe(true);
    });

    test(`Should return false when two different sets are given`, () => {
        expect(deepEquals(new Set([2, 3]), new Set([3, 2, 1]))).toBe(false);
        expect(deepEquals(new Set(['a', 'b', 'c']), new Set(['b', 'a']))).toBe(false);
        expect(deepEquals(new Set([0, 2, 3]), new Set([3, 2, 1]))).toBe(false);
        expect(deepEquals(new Set(['a', 'b', 'c']), new Set(['b', 'a', 'd']))).toBe(false);
    });

    test(`Should return true when two same maps are given`, () => {
        expect(
            deepEquals(
                new Map([
                    [1, 'a'],
                    [2, 'b'],
                    [3, 'c']
                ]),
                new Map([
                    [3, 'c'],
                    [2, 'b'],
                    [1, 'a']
                ])
            )
        ).toBe(true);
        expect(
            deepEquals(
                new Map([
                    ['a', 1],
                    ['b', 2]
                ]),
                new Map([
                    ['b', 2],
                    ['a', 1]
                ])
            )
        ).toBe(true);
    });

    test(`Should return false when two different maps are given`, () => {
        expect(
            deepEquals(
                new Map([
                    [2, 'b'],
                    [3, 'c']
                ]),
                new Map([
                    [3, 'c'],
                    [2, 'b'],
                    [1, 'a']
                ])
            )
        ).toBe(false);
        expect(
            deepEquals(
                new Map([
                    ['a', 1],
                    ['b', 2],
                    ['c', 3]
                ]),
                new Map([
                    ['b', 2],
                    ['a', 1]
                ])
            )
        ).toBe(false);
        expect(
            deepEquals(
                new Map([
                    [0, '-'],
                    [2, 'b'],
                    [3, 'c']
                ]),
                new Map([
                    [3, 'c'],
                    [2, 'b'],
                    [1, 'a']
                ])
            )
        ).toBe(false);
        expect(
            deepEquals(
                new Map([
                    ['a', 1],
                    ['b', 2],
                    ['c', 3]
                ]),
                new Map([
                    ['b', 2],
                    ['a', 1],
                    ['d', 4]
                ])
            )
        ).toBe(false);
        expect(
            deepEquals(
                new Map([
                    [1, 'd'],
                    [2, 'b'],
                    [3, 'c']
                ]),
                new Map([
                    [3, 'c'],
                    [2, 'b'],
                    [1, 'a']
                ])
            )
        ).toBe(false);
        expect(
            deepEquals(
                new Map([
                    ['a', 1],
                    ['b', 2],
                    ['c', 3]
                ]),
                new Map([
                    ['a', 2],
                    ['b', 1],
                    ['c', 4]
                ])
            )
        ).toBe(false);
    });

    test(`Should return true with two equal buffers`, () => {
        expect(deepEquals(Buffer.from('Hello World'), Buffer.from('Hello World'))).toBe(true);
    });

    test(`Should return false with two non equal buffers`, () => {
        expect(deepEquals(Buffer.from('Hello World'), Buffer.from('Hi Earth'))).toBe(false);
        expect(deepEquals(Buffer.from('Hello World'), Buffer.from('Hallo World'))).toBe(false);
    });

    test(`Should return true with two equal dates`, () => {
        expect(deepEquals(new Date(2000, 0, 1), new Date(2000, 0, 1))).toBe(true);
        expect(deepEquals(new Date(2000, 0, 1), new Date('1/1/2000'))).toBe(true);
        expect(deepEquals(new Date(2000, 0, 1), new Date('1/1/2000'))).toBe(true);
        expect(deepEquals(new Date(2000, 0, 1, 12, 30, 25), new Date('1/1/2000 12:30:25'))).toBe(
            true
        );
        expect(deepEquals(new Date(2000, 0, 1), new Date('January 1, 2000'))).toBe(true);
        expect(
            deepEquals(new Date(2000, 0, 1, 12, 30, 45, 265), new Date('2000-1-1 12:30:45.265'))
        ).toBe(true);
        expect(
            deepEquals(new Date(2000, 0, 1, 12, 30, 45, 265), new Date('2000-1-1 12:30:45.265'))
        ).toBe(true);
    });

    test(`Should return false with two non equal dates`, () => {
        expect(deepEquals(new Date(2000, 1, 1), new Date(2000, 0, 1))).toBe(false);
        expect(deepEquals(new Date(2000, 0, 1), new Date('1/1/2001'))).toBe(false);
        expect(deepEquals(new Date(2000, 0, 1), new Date('1/1/2000 12:30:45'))).toBe(false);
        expect(deepEquals(new Date(2000, 0, 1, 12, 30, 25), new Date('1/1/2001 12:30:25'))).toBe(
            false
        );
        expect(deepEquals(new Date(2000, 0, 1), new Date('January 1, 2010'))).toBe(false);
        expect(
            deepEquals(new Date(2000, 0, 1, 12, 30, 45, 265), new Date('2000-1-1 12:30:45.266'))
        ).toBe(false);
    });

    test(`Should return true with two equal errors`, () => {
        expect(deepEquals(new Error(), new Error())).toBe(true);
        expect(deepEquals(new Error('Hello world'), new Error('Hello world'))).toBe(true);
    });

    test(`Should return false with two non equal errors`, () => {
        expect(deepEquals(new Error('something'), new Error())).toBe(false);
        expect(deepEquals(new Error(), new Error('something'))).toBe(false);
        expect(deepEquals(new Error('Hello world'), new Error('Bye world'))).toBe(false);
    });

    test(`Should return false with two non equal class instances`, () => {
        // eslint-disable-next-line prefer-regex-literals
        expect(deepEquals(new Date(), new RegExp('[a-z]') as unknown)).toBe(false);
        // eslint-disable-next-line prefer-regex-literals
        expect(deepEquals(new Error(), new RegExp('[a-z]') as unknown)).toBe(false);
        expect(deepEquals(new Set(), new Map() as unknown)).toBe(false);
        expect(deepEquals(new Set(), new Date() as unknown)).toBe(false);
        expect(deepEquals(new Date(), new Map() as unknown)).toBe(false);
        expect(deepEquals({ a: 1 }, new Map() as unknown)).toBe(false);
        expect(deepEquals(new Map(), { a: 1 } as unknown)).toBe(false);
    });
});
