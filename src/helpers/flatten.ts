import { flatten as iflatten, unflatten as iunflatten } from 'flat';

export const flatten: FlatTypes.Flatten = iflatten;
export const unflatten: FlatTypes.Unflatten = iunflatten;

declare namespace FlatTypes {
    interface FlattenOptions {
        delimiter?: string;
        safe?: boolean;
        maxDepth?: number;
        transformKey?: (key: string) => string;
    }

    interface Flatten {
        flatten: Flatten;
        unflatten: Unflatten;

        <TTarget, TResult>(target: TTarget, options?: FlattenOptions): TResult;
    }

    interface UnflattenOptions {
        delimiter?: string;
        object?: boolean;
        overwrite?: boolean;
        transformKey?: (key: string) => string;
    }

    type Unflatten = <TTarget, TResult>(target: TTarget, options?: UnflattenOptions) => TResult;
}
