import type {AnyFn} from '../types.js';

export function runTimeout(fn: AnyFn, ms = 3000) {
	let timer: number | null = null;

	function start() {
		if (timer) window.clearTimeout(timer);

		timer = window.setTimeout(() => {
			fn();
		}, ms);
	}

	function stop() {
		if (timer) {
			window.clearTimeout(timer);
		}
	}

	return {start, stop};
}
