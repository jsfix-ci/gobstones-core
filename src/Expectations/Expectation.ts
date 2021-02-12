import { MatcherCall, Matchers } from './Matchers';

/**
 * This module provides the [[Expectation]] class that implements
 * all interfaces for expectations.
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */
import { FinishedExpectation } from './FinishedExpectation';
import { IFinishedExpectation } from './Interfaces';

export class Expectation<T> extends FinishedExpectation {
    /**
     * The querying element of this expectation.
     */
    protected element: any;
    /**
     * The current result of this expectation. Undefined until
     * the first matcher is run.
     */
    protected result: boolean;
    /**
     * true if this expectation is a negated expectation, that is,
     * the `not` property was accessed.
     */
    protected isNot: boolean;
    /**
     * An array of the matchers run in this expectation.
     */
    protected states: MatcherCall[];

    /**
     * Create a new expectation for the given element.
     *
     * @param element The element to query to.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public constructor(element: any) {
        super();
        this.states = [];
        this.element = element;
        this.isNot = false;
    }

    /** @inheritdoc [[IGenericExpectation.not]] */
    public get not(): Expectation<T> {
        this.isNot = !this.isNot;
        return this;
    }

    /** @inheritdoc [[IGenericExpectation.toBe]] */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public toBe(value: any): this & IFinishedExpectation {
        return this.runMatcher('toBe', [value]);
    }

    /** @inheritdoc [[IGenericExpectation.toBeLike]] */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public toBeLike(value: any): this & IFinishedExpectation {
        return this.runMatcher('toBeLike', [value]);
    }

    /** @inheritdoc [[IGenericExpectation.toBeNull]] */
    public toBeNull(): this & IFinishedExpectation {
        return this.runMatcher('toBeNull', []);
    }

    /** @inheritdoc [[IGenericExpectation.toBeDefined]] */
    public toBeDefined(): this & IFinishedExpectation {
        return this.runMatcher('toBeDefined', []);
    }

    /** @inheritdoc [[IGenericExpectation.toBeUndefined]] */
    public toBeUndefined(): this & IFinishedExpectation {
        return this.runMatcher('toBeUndefined', []);
    }

    /** @inheritdoc [[IGenericExpectation.toBeTruthy]] */
    public toBeTruthy(): this & IFinishedExpectation {
        return this.runMatcher('toBeTruthy', []);
    }

    /** @inheritdoc [[IGenericExpectation.toBeFalsy]] */
    public toBeFalsy(): this & IFinishedExpectation {
        return this.runMatcher('toBeFalsy', []);
    }

    /** @inheritdoc [[IGenericExpectation.toHaveType]] */
    public toHaveType(typeName: string): this & IFinishedExpectation {
        return this.runMatcher('toHaveType', [typeName]);
    }

    // INumberExpectation

    /** @inheritdoc [[INumberExpectation.toBeGreaterThan]] */
    public toBeGreaterThan(value: number): this & IFinishedExpectation {
        return this.runMatcher('toBeGreaterThan', [value]);
    }

    /** @inheritdoc [[INumberExpectation.toBeGreaterThanOrEqual]] */
    public toBeGreaterThanOrEqual(value: number): this & IFinishedExpectation {
        return this.runMatcher('toBeGreaterThanOrEqual', [value]);
    }

    /** @inheritdoc [[INumberExpectation.toBeLowerThan]] */
    public toBeLowerThan(value: number): this & IFinishedExpectation {
        return this.runMatcher('toBeLowerThan', [value]);
    }

    /** @inheritdoc [[INumberExpectation.toBeLowerThanOrEqual]] */
    public toBeLowerThanOrEqual(value: number): this & IFinishedExpectation {
        return this.runMatcher('toBeLowerThanOrEqual', [value]);
    }

    /** @inheritdoc [[INumberExpectation.toBeBetween]] */
    public toBeBetween(from: number, to: number): this & IFinishedExpectation {
        return this.runMatcher('toBeBetween', [from, to]);
    }

    /** @inheritdoc [[INumberExpectation.toBeInfinity]] */
    public toBeInfinity(): this & IFinishedExpectation {
        return this.runMatcher('toBeInfinity', []);
    }

    /** @inheritdoc [[INumberExpectation.toBeNaN]] */
    public toBeNaN(): this & IFinishedExpectation {
        return this.runMatcher('toBeNaN', []);
    }

    /** @inheritdoc [[INumberExpectation.toBeCloseTo]] */
    public toBeCloseTo(value: number, digits: number = 5): this & IFinishedExpectation {
        return this.runMatcher('toBeCloseTo', [value, digits]);
    }

    // IStringExpectation

    /** @inheritdoc [[IStringExpectation.toHaveSubstring]] */
    public toHaveSubstring(substring: string): this & IFinishedExpectation {
        return this.runMatcher('toHaveSubstring', [substring]);
    }

    /** @inheritdoc [[IStringExpectation.toStartWith]] */
    public toStartWith(start: string): this & IFinishedExpectation {
        return this.runMatcher('toStartWith', [start]);
    }

    /** @inheritdoc [[IStringExpectation.toEndWith]] */
    public toEndWith(end: string): this & IFinishedExpectation {
        return this.runMatcher('toEndWith', [end]);
    }

    /** @inheritdoc [[IStringExpectation.toMatch]] */
    public toMatch(regexp: RegExp): this & IFinishedExpectation {
        return this.runMatcher('toMatch', [regexp]);
    }

    // IArrayExpectation

    /** @inheritdoc [[IArrayExpectation.toHaveLength]] */
    public toHaveLength(count: number): this & IFinishedExpectation {
        return this.runMatcher('toHaveLength', [count]);
    }
    /** @inheritdoc [[IArrayExpectation.toContain]] */
    public toContain(value: T): this & IFinishedExpectation {
        return this.runMatcher('toContain', [value]);
    }
    /** @inheritdoc [[IArrayExpectation.toHaveAtPosition]] */
    public toHaveAtPosition(value: T, position: number): this & IFinishedExpectation {
        return this.runMatcher('toHaveAtPosition', [value, position]);
    }
    /** @inheritdoc [[IArrayExpectation.allToSatisfy]] */
    public allToSatisfy(criteria: (item: T) => boolean): this & IFinishedExpectation {
        return this.runMatcher('allToSatisfy', [criteria]);
    }
    /** @inheritdoc [[IArrayExpectation.anyToSatisfy]] */
    public anyToSatisfy(criteria: (item: T) => boolean): this & IFinishedExpectation {
        return this.runMatcher('anyToSatisfy', [criteria]);
    }
    /** @inheritdoc [[IArrayExpectation.amountToSatisfy]] */
    public amountToSatisfy(
        count: number,
        criteria: (item: T) => boolean
    ): this & IFinishedExpectation {
        return this.runMatcher('amountToSatisfy', [count, criteria]);
    }

    // IObjectExpectation

    /** @inheritdoc [[IObjectExpectation.toHavePropertyCount]] */
    public toHavePropertyCount(count: number): this & IFinishedExpectation {
        return this.runMatcher('toHavePropertyCount', [count]);
    }
    /** @inheritdoc [[IObjectExpectation.toHaveAtLeast]] */
    public toHaveAtLeast(keys: string[]): this & IFinishedExpectation {
        return this.runMatcher('toHaveAtLeast', keys, false);
    }
    /** @inheritdoc [[IObjectExpectation.toHaveNoOtherThan]] */
    public toHaveNoOtherThan(keys: string[]): this & IFinishedExpectation {
        return this.runMatcher('toHaveNoOtherThan', keys, false);
    }
    /** @inheritdoc [[IObjectExpectation.toHaveProperty]] */
    public toHaveProperty(propertyName: string): this & IFinishedExpectation {
        return this.runMatcher('toHaveProperty', [propertyName]);
    }
    /** @inheritdoc [[IObjectExpectation.toBeInstanceOf]] */
    // eslint-disable-next-line @typescript-eslint/ban-types
    public toBeInstanceOf(classConstructor: Function): this & IFinishedExpectation {
        return this.runMatcher('toBeInstanceOf', [classConstructor]);
    }

    // IFinishedExpectation

    /** @inheritdoc [[IFinishedExpectation.getResult]] */
    public getResult(): boolean {
        return this.result;
    }

    /**
     * Set the given value as the result of this
     * expectation. The result is directly set, when
     * no previous result existed, or joined with a
     * logic conjunction with the previous result if
     * a value already exists.
     *
     * @value The value to set.
     */
    protected setResult(value: boolean): void {
        if (this.result === undefined) {
            this.result = value;
        } else {
            this.result = this.result && value;
        }
    }

    /**
     * Run a matcher with the given name, passing the
     * querying element as a first argument, and all additional
     * given arguments. The result of running the matcher is stores,
     * and a new state is pushed to this particular matcher.
     *
     * @param matcherName The matcher name to run
     * @param args The arguments to pass to the matcher
     */
    protected runMatcher(matcherName: string, args: any[], sparse: boolean = true): this {
        const matcherArgs = sparse ? [this.element, ...args] : [this.element, args];
        const matcherResult = Matchers[matcherName].call(this, ...matcherArgs);
        const result = this.isNot ? !matcherResult : matcherResult;
        this.states.push({
            matcher: matcherName,
            args,
            result
        });
        this.setResult(result);
        return this;
    }
}
