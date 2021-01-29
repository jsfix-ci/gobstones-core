/**
 * This module exports the [[expect]] function, that is the kickoff to create
 * "expectations" over a specific element as shown in the following example:
 * @example
 * ```
 * expect(x+y).toBeGreaterThan(z)
 *     .orThrow(new Error('x and y need to add up to more than z'));
 * ```
 *
 * The [[expect]] function expects to receive a single argument of any type. Given that element
 * a new "expectation"" is returned, whose specific type depends of the type of the element
 * given to expect as an argument. So `expect(x)` returns an expectation. An expectation is
 * an object that accepts any number of matchers to be called upon it, such as `toBe`,
 * `toBeGreaterThan`, `toHaveLength` and so on. The specific set of matchers available depends
 * on the type of the expectation, which, as said, depends on the type of the argument given to
 * expect.
 *
 * When a matcher is called, the element given to expect is passed to the [[Matchers]] as the actual
 * value, where the additional arguments over the matcher are the arguments given to the matcher
 * methods called, so for example, `expect(x).toBe(y)` calls the
 * [[Matchers.toBe]] with `x` as
 * `actual` argument and `y` as `expected` argument.
 *
 * Once the first matcher is called over an expectation, a [[IFinishedExpectation]] is obtained.
 * A finished matcher has a result, that may be one of `true` (if the matcher was satisfied) or
 * `false` if not. A finished matcher may be queried for the result, by calling
 * [[IFinishedExpectation.getResult | getResult]], but additional helper methods are provided by
 * the interface in order to fullfill different needs, such as throwing an error if the expectation
 * was not satisfied, or calling a function if it was.
 *
 * New matchers may be called over a finished expectation, and the result of the matcher would be
 * calculated as an and over all the results.
 * @example
 * ```
 * expect(x).toBeGreaterThan(y).toBeLowerThan(z)
 * ```
 * This creates a new expectations that is satisfied only when both parts (x being greater
 * than y, and x being lower than z) are true. This itself returns a new [[IFinishedExpectation]],
 * that can be extended with new matchers, or queried about the results as previously mentioned.
 *
 * To see a list of all matchers, read the [[expect]] documentation, and the [[Matchers]]
 * documentation.
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */
import {
    IFinishedExpectation,
    INumberExpectation,
    IStringExpectation,
    IArrayExpectation,
    IObjectExpectation
} from './Interfaces';
import { Expectation } from './Expectation';
import { JoinedExpectation } from './JoinedExpectation';

/**
 * Create a new expectation over an element. The type of the returned expectation
 * depends on the type of the element passed, and thus, different matchers may be
 * executed over the expectation.
 * The generic matchers can be called over any expectation for any element, this include:
 * * [[Matchers.toBe | toBe]]
 * * [[Matchers.toBeLike | toBeLike]]
 * * [[Matchers.toBeDefined | toBeDefined]]
 * * [[Matchers.toBeUndefined | toBeUndefined]]
 * * [[Matchers.toBeNull | toBeNull]]
 * * [[Matchers.toBeTruthy | toBeTruthy]]
 * * [[Matchers.toBeFalsy | toBeFalsy]]
 * * [[Matchers.toHaveType | toHaveType]]
 *
 * If the given element is a number, then an [[INumberExpectation]] is returned, and so
 * the following additional matchers are added to the previous list:
 * * [[Matchers.toBeGreaterThan | toBeGreaterThan]]
 * * [[Matchers.toBeGreaterThanOrEqual | toBeGreaterThanOrEqual]]
 * * [[Matchers.toBeLowerThan | toBeLowerThan]]
 * * [[Matchers.toBeLowerThanOrEqual | toBeLowerThanOrEqual]]
 * * [[Matchers.toBeBetween | toBeBetween]]
 * * [[Matchers.toBeInfinity | toBeInfinity]]
 * * [[Matchers.toBeNaN | toBeNaN]]
 * * [[Matchers.toBeCloseTo | toBeCloseTo]]
 *
 * If a string is used instead, the list is expanded with the following matchers:
 * * [[Matchers.toHaveSubstring | toHaveSubstring]]
 * * [[Matchers.toStartWith | toStartWith]]
 * * [[Matchers.toEndWith | toEndWith]]
 * * [[Matchers.toMatch | toMatch]]
 * Note that matchers for string to not check things such as size, if you want that,
 * we recommend calling expect over the string length and not the whole string.
 *
 * For the case of arrays, additional to the general ones, the following matchers
 * are provided, that allow to test things over the elements of the array.
 * * [[Matchers.toHaveLength | toHaveLength]]
 * * [[Matchers.toContain | toContain]]
 * * [[Matchers.toHaveAtPosition | toHaveAtPosition]]
 * * [[Matchers.allToSatisfy | allToSatisfy]]
 * * [[Matchers.anyToSatisfy | anyToSatisfy]]
 * * [[Matchers.amountToSatisfy | amountToSatisfy]]
 *
 * For object, the focus of the matcher is put on the instance type (class it belongs to)
 * and the properties it contains (attribute keys), extending so with:
 * * [[Matchers.toHavePropertyCount | toHavePropertyCount]]
 * * [[Matchers.toHaveProperty | toHaveProperty]]
 * * [[Matchers.toBeInstanceOf | toBeInstanceOf]]
 *
 * @param element The element that is going to be queried by the created expectation.
 */
export function expect(element?: number): INumberExpectation;
export function expect(element?: string): IStringExpectation;
export function expect<T>(element?: T[]): IArrayExpectation<T>;
export function expect<T>(element?: T): IObjectExpectation<T>;
// eslint-disable-next-line max-len
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions, @typescript-eslint/explicit-module-boundary-types
export function expect(element?: any): any {
    return new Expectation<any>(element);
}

/**
 * This namespace provides additional hany operations for the expect function.
 */
export namespace expect {
    /**
     * Create a new [[JoinedExpectation]] where all the expectations need to have a `true` result
     * in order for the result of the joined one to be also `true`. That is, an expectation
     * that joins it's components with a logical and.
     * @param expectations A list of expectations that need to be fulfilled in order to
     *      return `true` as result.
     */
    export const and = (...expectations: IFinishedExpectation[]): IFinishedExpectation =>
        new JoinedExpectation(expectations, (exp) =>
            exp.reduce((r, e) => r && e.getResult(), true)
        );

    /**
     * Create a new [[JoinedExpectation]] where any of the expectations need to have a `true` result
     * in order for the result of the joined one to be also `true`. That is, an expectation
     * that joins it's components with a logical or.
     * @param expectations A list of expectations where one need to be fulfilled in order to
     *      return `true` as result.
     */
    export const or = (...expectations: IFinishedExpectation[]): IFinishedExpectation =>
        new JoinedExpectation(expectations, (exp) =>
            exp.reduce((r, e) => r || e.getResult(), false)
        );
}
