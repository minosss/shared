import {isString} from '../is/is.js';

export function get(object: any, path: string | number, fallback?: any) {
	const keys = isString(path) ? path.split('.') : [path];

	let result = object;
	for (const key of keys) {
		if (!result) break;
		result = result[key];
	}

	return result ?? fallback;
}

export function omit<T extends object, K extends keyof T>(object: T, keys: K[]) {
	return pick(
		object,
		Object.keys(object).filter((key) => !keys.includes(key as K)) as K[]
	) as unknown as Omit<T, K>;
}

export function pick<T extends object, K extends keyof T>(object: T, keys: K[]) {
	// eslint-disable-next-line no-use-before-define
	const result = {} as {[P in K]: T[P]};

	for (const key of keys) {
		if (key in object) {
			result[key] = object[key];
		}
	}

	return result;
}
