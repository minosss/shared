import {isFunction} from '../is.js';

export function runIfFn<T, U>(valueOrFn: T | ((...args: U[]) => T), ...args: U[]): T {
	return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}
