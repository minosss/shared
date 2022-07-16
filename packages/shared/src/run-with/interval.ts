import type {AnyFn} from '../types.js';

export function runInterval(fn: AnyFn, ms = 1000) {
	let timer: number | null = null;

	function start() {
		if (timer) window.clearInterval(timer);

		timer = window.setInterval(() => {
			fn();
		}, ms);
	}

	function stop() {
		if (timer) {
			window.clearInterval(timer);
		}
	}

	return {start, stop};
}
