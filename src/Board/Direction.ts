/**
 * This enum represent the valid Gobstones Directions.
 * It's accompanied by a namespace with the same name, that provides additional
 * functionality, such as asking for the first or the last direction, or iterate over
 * the elements of this enum.
 *
 * Note that directions are sorted in the following order, from first to last.
 * * Direction.North
 * * Direction.East
 * * Direction.South
 * * Direction.West
 *
 * Always prefer using the enum over the string values it represents,
 * even as object keys.
 */
export enum Direction {
    North = 'n',
    East = 'e',
    South = 's',
    West = 'w'
}

/**
 * This namespace provides additional functionality that extends the simple
 * Direction enum, by providing some helper functions.
 */
export namespace Direction {
    /**
     * The smallest Direction possible, currently [[Direction.North]]
     *
     * @returns The smallest direction.
     */
    export const min = (): Direction => Direction.North;

    /**
     * The biggest Direction possible, currently [[Direction.West]]
     *
     * @returns The biggest direction.
     */
    export const max = (): Direction => Direction.West;

    /**
     * The next Direction of a given Direction. Directions are sorted
     * in the following way, from first to last:
     * * Direction.North
     * * Direction.East
     * * Direction.South
     * * Direction.West
     *
     * And they are cyclic, that is, the next direction of West is North.
     *
     * @param dir The direction to obtain the next value from.
     *
     * @returns The next direction of the given one.
     */
    export const next = (dir: Direction): Direction => {
        switch (dir) {
            case Direction.North:
                return Direction.East;
            case Direction.East:
                return Direction.South;
            case Direction.South:
                return Direction.West;
            case Direction.West:
                return Direction.North;
            /* istanbul ignore next */
            default:
                return undefined;
        }
    };

    /**
     * The next Direction of a given Direction. Directions are sorted
     * in the following way, from last to first:
     * * Direction.West
     * * Direction.South
     * * Direction.East
     * * Direction.North
     *
     * And they are cyclic, that is, the previous direction of North is West.
     *
     * @param dir The direction to obtain the previous value from.
     *
     * @returns The previous direction of the given one.
     */
    export const previous = (color: Direction): Direction => {
        switch (color) {
            case Direction.North:
                return Direction.West;
            case Direction.East:
                return Direction.North;
            case Direction.South:
                return Direction.East;
            case Direction.West:
                return Direction.South;
            /* istanbul ignore next */
            default:
                return undefined;
        }
    };

    /**
     * The opposite Direction of a given Direction. Directions are opposed
     * to each other in pairs, those being:
     * * Direction.West is opposite to Direction.East and vice versa
     * * Direction.North is opposite to Direction.South and vice versa
     *
     * @param dir The direction to obtain the opposite value from.
     *
     * @returns The opposite direction of the given one.
     */
    export const opposite = (color: Direction): Direction => {
        switch (color) {
            case Direction.North:
                return Direction.South;
            case Direction.East:
                return Direction.West;
            case Direction.South:
                return Direction.North;
            case Direction.West:
                return Direction.East;
            /* istanbul ignore next */
            default:
                return undefined;
        }
    };

    /**
     * Answer wether or not the given direction is vertical,
     * that is, one of Direction.North or Direction.South.
     *
     * @param dir The direction to find out if it's vertical.
     *
     * @returns `true` if it's vertical, `false` otherwise.
     */
    export const isVertical = (dir: Direction): boolean =>
        dir === Direction.North || dir === Direction.South;

    /**
     * Answer wether or not the given direction is horizontal,
     * that is, one of Direction.East or Direction.West.
     *
     * @param dir The direction to find out if it's horizontal.
     *
     * @returns `true` if it's horizontal, `false` otherwise.
     */
    export const isHorizontal = (dir: Direction): boolean => !Direction.isVertical(dir);

    /**
     * Iterate over all the directions, in their defined order, from the smallest,
     * to the biggest, performing the callback over each direction. A function that
     * expects a direction and returns void is expected as an argument.
     *
     * @param f The callback to call on each iteration.
     */
    export const foreach = (f: (dir: Direction) => void): void => {
        let current = Direction.min();
        while (current !== Direction.max()) {
            f(current);
            current = Direction.next(current);
        }
        f(current);
    };
}
