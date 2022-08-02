const messages = new Set();

export function warnOnce(location: string, message: string) {
	const m = `[react-shared/${location}]: ${message}`;
	if (messages.has(m)) return;
	messages.add(m);
	console.warn(m);
}
