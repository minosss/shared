import {isArray} from './is.js';
import {runIfFn} from './run-with/if-fn.js';

/**
 * 生成范围数字数组
 * @param start 起始值
 * @param stop 结束值
 * @param step 递增
 *
 * @example
 * range(1, 5) // [1, 2, 3, 4, 5]
 * range(1, 10, 2) // [1, 3, 5, 7, 9]
 */
export function range(start: number, stop: number, step = 1): number[] {
	return Array.from({length: (stop - start) / step + 1}, (_, index) => start + index * step);
}

/**
 * 把数组分组
 * @param value 数组
 * @param size 每组大小
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1,2], [3,4], [5]]
 * chunk([1, 2, 3, 4, 5], 3) // [[1,2,3], [4,5]]
 */
export function chunk<T = any>(value: T[], size: number): T[][] {
	return Array.from({length: Math.ceil(value.length / size)}, (_, index) =>
		value.slice(index * size, index * size + size)
	);
}

/**
 * array grouping by key
 *
 * @param list array
 * @param key path
 *
 * @example
 * const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * groupBy(list, i => i % 2);
 */
export function groupBy<T extends object>(list: T[], key: string | ((obj: T) => string)) {
	const map: Record<string, T[]> = {};
	for (const item of list) {
		const _key = runIfFn(key, item);
		map[_key] = [...(map[_key] ?? []), item];
	}
	return map;
}

// ensure returns an array
export function toArray<T>(arr: T | T[]): T[] {
	return isArray(arr) ? arr : [arr];
}

// returns first element of array
export function takeOne<T>(arr: T | T[]): T | undefined {
	return isArray(arr) ? arr[0] : arr;
}
