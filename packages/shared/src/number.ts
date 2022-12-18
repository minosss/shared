/**
 * 限制数字范围
 */
export function clamp(value: number, min = 0, max = 1): number {
	return Math.min(Math.max(value, min), max);
}

export const minFn = (min: number) => (value: number) =>
	Number.isNaN(value) ? min : Math.max(min, value);

export const maxFn = (max: number) => (value: number) =>
	Number.isNaN(value) ? max : Math.min(max, value);

export const clampFn = (min: number, max: number) => {
	const _min = minFn(min);
	const _max = maxFn(max);
	return (value: number) => {
		return _max(_min(value));
	};
};
