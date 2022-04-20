export function sleep(time = 3000) {
	return new Promise<void>((r) => setTimeout(r, time));
}

/**
 * 限制数字范围
 */
export function clamp(value: number, min = 0, max = 1): number {
	return Math.min(Math.max(value, min), max);
}
