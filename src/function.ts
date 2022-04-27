export const noop = () => {};

export function sleep(time = 3000) {
	return new Promise<void>((r) => setTimeout(r, time));
}
