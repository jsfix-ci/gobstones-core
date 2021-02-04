import { describe, expect, it } from '@jest/globals';

import { Matrix } from '../../src/helpers/matrix';

describe(`Matrix`, () => {
    it(`Contains as much columns as the ones indicated on creation`, () => {
        const matrixA = Matrix(3, 4);
        expect(matrixA.length).toBe(3);

        const matrixB = Matrix(6, 9);
        expect(matrixB.length).toBe(6);
    });

    it(`Contains as much rows in each column as the ones indicated on creation`, () => {
        const matrixA = Matrix(3, 4);
        for (const column of matrixA) {
            expect(column.length).toBe(4);
        }

        const matrixB = Matrix(6, 9);
        for (const column of matrixB) {
            expect(column.length).toBe(9);
        }
    });

    it(`Contains undefined in each position if no value function given`, () => {
        const matrixA = Matrix(3, 4);
        for (const column of matrixA) {
            for (const value of column) {
                expect(value).toBe(undefined);
            }
        }

        const matrixB = Matrix(6, 9);
        for (const column of matrixB) {
            for (const value of column) {
                expect(value).toBe(undefined);
            }
        }
    });

    it(`Contains the given value in each position if a function given`, () => {
        const matrixA = Matrix(3, 4, () => 'A');
        for (const column of matrixA) {
            for (const value of column) {
                expect(value).toBe('A');
            }
        }

        const matrixB = Matrix(6, 9, (i, j) => i + j);
        for (const column of matrixB) {
            for (const value of column) {
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThanOrEqual(13);
            }
        }
    });

    it(`Allows to access elements by x first, then y`, () => {
        const matrixA = Matrix(3, 4, (i, j) => [i, j]);
        for (let i = 0; i < matrixA.length; i++) {
            for (let j = 0; j < matrixA[i].length; j++) {
                expect(matrixA[i][j]).toStrictEqual([i, j]);
            }
        }
    });

    it(`Be an array, and have arrays in each column`, () => {
        const matrixA = Matrix(3, 4, (i, j) => [i, j]);
        expect(matrixA).toBeInstanceOf(Array);
        for (const column of matrixA) {
            expect(column).toBeInstanceOf(Array);
        }
    });

    it(`Throws an error if width or height are non positive`, () => {
        expect(() => Matrix(0, 4)).toThrow();
        expect(() => Matrix(3, 0)).toThrow();
        expect(() => Matrix(-3, 4)).toThrow();
        expect(() => Matrix(3, -4)).toThrow();
    });
});
