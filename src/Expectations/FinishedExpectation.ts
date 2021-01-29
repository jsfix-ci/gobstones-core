/**
 * This module provides the [[IFinishedExpectation]] interface that provides
 * the methods for obtaining the result or performing additional actions based
 * on the result.
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */
import { IFinishedExpectation } from './Interfaces';

/**
 * This abstract class provides finished expectation behavior for
 * all actions based on the fact that it's subclass provides
 * an implementation for [[getResult]].
 */
export abstract class FinishedExpectation implements IFinishedExpectation {
    /** @inheritdoc [[IFinishedExpectancy.orThrow]] */
    public orThrow(error: Error): void {
        if (!this.getResult()) {
            throw error;
        }
    }

    /** @inheritdoc [[IFinishedExpectancy.orYield]] */
    public orYield<T>(value: T): T {
        return !this.getResult() ? value : undefined;
    }

    /** @inheritdoc [[IFinishedExpectancy.andDoOr]] */
    public andDoOr(actionWhenTrue: () => void, actionWhenFalse: () => void): void {
        if (this.getResult()) {
            actionWhenTrue();
        } else {
            actionWhenFalse();
        }
    }

    /** @inheritdoc [[IFinishedExpectancy.andDo]] */
    public andDo(action: () => void): void {
        // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-function
        this.andDoOr(action, () => {});
    }

    /** @inheritdoc [[IFinishedExpectancy.orDo]] */
    public orDo(action: () => void): void {
        // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-function
        this.andDoOr(() => {}, action);
    }

    abstract getResult(): boolean;
}
