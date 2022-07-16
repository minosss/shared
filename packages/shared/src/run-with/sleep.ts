export function sleep(time = 3000): Promise<void> {
	return new Promise<void>((r) => setTimeout(r, time));
}
