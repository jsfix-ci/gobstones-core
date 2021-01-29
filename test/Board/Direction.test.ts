import { describe, test, expect } from '@jest/globals';
import { Direction } from '../../src/Board';

describe(`A Direction should`, () => {
    test(`Answer min and max correctly`, () => {
        expect(Direction.min()).toBe(Direction.North);
        expect(Direction.max()).toBe(Direction.West);
    });

    test(`Answer with next correctly`, () => {
        expect(Direction.next(Direction.North)).toBe(Direction.East);
        expect(Direction.next(Direction.East)).toBe(Direction.South);
        expect(Direction.next(Direction.South)).toBe(Direction.West);
        expect(Direction.next(Direction.West)).toBe(Direction.North);
    });

    test(`Answer with previous correctly`, () => {
        expect(Direction.previous(Direction.North)).toBe(Direction.West);
        expect(Direction.previous(Direction.East)).toBe(Direction.North);
        expect(Direction.previous(Direction.South)).toBe(Direction.East);
        expect(Direction.previous(Direction.West)).toBe(Direction.South);
    });

    test(`Iterate in the same order than next`, () => {
        let currentDirection = Direction.North;
        Direction.foreach((c) => {
            expect(c).toBe(currentDirection);
            currentDirection = Direction.next(currentDirection);
        });
    });

    test(`Answer with opposite correctly`, () => {
        expect(Direction.opposite(Direction.North)).toBe(Direction.South);
        expect(Direction.opposite(Direction.East)).toBe(Direction.West);
        expect(Direction.opposite(Direction.South)).toBe(Direction.North);
        expect(Direction.opposite(Direction.West)).toBe(Direction.East);
    });

    test(`Answer with isVertical correctly`, () => {
        expect(Direction.isVertical(Direction.North)).toBe(true);
        expect(Direction.isVertical(Direction.East)).toBe(false);
        expect(Direction.isVertical(Direction.South)).toBe(true);
        expect(Direction.isVertical(Direction.West)).toBe(false);
    });

    test(`Answer with isHorizontal correctly`, () => {
        expect(Direction.isHorizontal(Direction.North)).toBe(false);
        expect(Direction.isHorizontal(Direction.East)).toBe(true);
        expect(Direction.isHorizontal(Direction.South)).toBe(false);
        expect(Direction.isHorizontal(Direction.West)).toBe(true);
    });
});
