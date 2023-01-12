import type {AnyFn, FunctionArguments} from '../types';

// run event handlers
// you can break the loop by event.preventDefault();
export function runEventHandlers<T extends (event: any) => void>(...fns: (T | undefined)[]) {
	return function handler(event: FunctionArguments<T>[0]) {
		fns.some((fn) => {
			fn?.(event);
			return event?.defaultPrevented;
		});
	};
}

// run functions with the same arguments
export function runFunctions<T extends AnyFn>(...fns: (T | undefined)[]) {
	return function mergedFn(this: any, ...args: any[]) {
		fns.some((fn) => fn?.apply(this, args) === false);
	};
}
