/**
 * This is just a helper module that re-export the useful
 * [binier/tiny-typed-emitter](https://github.com/binier/tiny-typed-emitter).
 * You can check out information about this module at their README.
 *
 * @see https://github.com/binier/tiny-typed-emitter
 *
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 *
 * @packageDocumentation
 */
import { TypedEmitter as TinyTypedEmmiter } from 'tiny-typed-emitter';

/**
 * This is a rename of EventEmitter that allows for type checking
 * of the event's emitting in a class. Just extend your event
 * throwing classes with TypeEmitter with the events signature as a
 * generic type, and expect that calling emit throws errors when not
 * typechecking. The on event over instances of the class will also
 * throws errors when invalid event names are used.
 *
 * @see [binier/tiny-typed-emitter](https://github.com/binier/tiny-typed-emitter)
 *      to read more information about how all this works.
 */
export const TypedEmitter = TinyTypedEmmiter;
