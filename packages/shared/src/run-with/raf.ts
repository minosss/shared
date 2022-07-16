import type {AnyFn} from '../types.js';

export function runRaf(fn: AnyFn) {
	let running = false;
	function start() {
		running = true;
		window.requestAnimationFrame(() => {
			if (!running) return;

			fn();
			start();
		});
	}

	function stop() {
		running = false;
	}

	return {
		start,
		stop,
	};
}
