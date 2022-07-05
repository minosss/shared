import {isFunction} from './is.js';

export const noop = () => {};

export function sleep(time = 3000) {
	return new Promise<void>((r) => setTimeout(r, time));
}

export function runIfFn<T, U>(valueOrFn: T | ((...args: U[]) => T), ...args: U[]): T {
	return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

export function pipe<R>(...fns: Array<(a: R) => R>) {
	return (r: R) => {
		for (const fn of fns) {
			r = fn(r);
		}
		return r;
	};
}
