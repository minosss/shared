/**
 * 限制数字范围
 */
export function clamp(value: number, min = 0, max = 1): number {
	return Math.min(Math.max(value, min), max);
}
