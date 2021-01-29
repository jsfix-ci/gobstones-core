/**
 * This module provides the [[JoinedExpectation]] class that provides
 * a way to create an expectation that has a result the result of
 * applying the joiner to every expectation in the result.
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */
import { FinishedExpectation } from './FinishedExpectation';
import { IFinishedExpectation } from './Interfaces';

/**
 * A joined expectation consist of multiple expectations joined by a specific
 * joiner function. A JoinedExpectation implements [[FinishedExpectation]],
 * where the result is calculated using the given joiner function.
 *
 * Currently two join forms are provided, [[Expectations.expect.and]],
 * and [[Expectations.expect.or]].
 */
export class JoinedExpectation extends FinishedExpectation {
    /**
     * The result of a joined expectation, set at construction time.
     */
    private result: boolean;

    /**
     * Create a new instance of a JoinedExpectation for the given set
     * of expectations, using the provided joiner.
     *
     * @param expectations The expectations that ought to be joined.
     * @param joiner The joiner to use to calculate the result.
     */
    public constructor(
        expectations: IFinishedExpectation[],
        joiner: (expectations: IFinishedExpectation[]) => boolean
    ) {
        super();
        this.result = joiner(expectations);
    }

    /** @inheritdoc [[IFinishedExpectancy.toBeInstanceOf]] */
    public getResult(): boolean {
        return this.result;
    }
}
