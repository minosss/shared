import {isFunction} from './is.js';

export const noop = () => {};

export function sleep(time = 3000) {
	return new Promise<void>((r) => setTimeout(r, time));
}

export function runIfFn<T, U>(valueOrFn: T | ((...args: U[]) => T), ...args: U[]): T {
	return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}
