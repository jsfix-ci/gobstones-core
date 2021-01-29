/**
 * This enum represent the valid Gobstones Colors.
 * It's accompanied by a namespace with the same name, that provides additional
 * functionality, such as asking for the first or the last color, or iterate over
 * the elements of this enum.
 *
 * Note that directions are sorted in the following order, from first to last.
 * * Color.Blue
 * * Color.Black
 * * Color.Red
 * * Color.Green
 *
 * Always prefer using the enum over the string values it represents,
 * even as object keys.
 */
export enum Color {
    Blue = 'a',
    Black = 'n',
    Red = 'r',
    Green = 'v'
}

/**
 * This namespace provides additional functionality that extends the simple
 * Color enum, by providing some helper functions.
 */
export namespace Color {
    /**
     * The smallest Color possible, currently [[Color.Blue]]
     *
     * @returns The smallest color.
     */
    export const min = (): Color => Color.Blue;

    /**
     * The biggest Color possible, currently [[Color.Green]]
     *
     * @returns The biggest color.
     */
    export const max = (): Color => Color.Green;

    /**
     * The next Color of a given Color. Colors are sorted
     * in the following way, from first to last:
     * * Color.Blue
     * * Color.Black
     * * Color.Red
     * * Color.Green
     *
     * And they are cyclic, that is, the next color of Green is Blue.
     *
     * @param color The color to obtain the next value from.
     *
     * @returns The next color of the given one.
     */
    export const next = (color: Color): Color => {
        switch (color) {
            case Color.Blue:
                return Color.Black;
            case Color.Black:
                return Color.Red;
            case Color.Red:
                return Color.Green;
            case Color.Green:
                return Color.Blue;
            /* istanbul ignore next */
            default:
                return undefined;
        }
    };

    /**
     * The next Color of a given Color. Color are sorted
     * in the following way, from last to first:
     * * Color.Green
     * * Color.Red
     * * Color.Black
     * * Color.Blue
     *
     * And they are cyclic, that is, the previous color of Blue is Green.
     *
     * @param color The color to obtain the previous value from.
     *
     * @returns The previous color of the given one.
     */
    export const previous = (color: Color): Color => {
        switch (color) {
            case Color.Blue:
                return Color.Green;
            case Color.Black:
                return Color.Blue;
            case Color.Red:
                return Color.Black;
            case Color.Green:
                return Color.Red;
            /* istanbul ignore next */
            default:
                return undefined;
        }
    };

    /**
     * Iterate over all the colors, in their defined order, from the smallest,
     * to the biggest, performing the callback over each color. A function that
     * expects a color and returns void is expected as an argument.
     *
     * @param f The callback to call on each iteration.
     */
    export function foreach(f: (color: Color) => void): void {
        let current = Color.min();
        while (current !== Color.max()) {
            f(current);
            current = Color.next(current);
        }
        f(current);
    }
}
