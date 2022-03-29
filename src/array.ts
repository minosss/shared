/**
 * 生成范围数字数组
 * @param start 起始值
 * @param stop 结束值
 * @param step 递增
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
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1,2], [3,4], [5]]
 * chunk([1, 2, 3, 4, 5], 3) // [[1,2,3], [4,5]]
 */
export function chunk<T = any>(value: T[], size: number): T[][] {
	return Array.from({length: Math.ceil(value.length / size)}, (_, index) =>
		value.slice(index * size, index * size + size)
	);
}
