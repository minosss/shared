import type {AnyFn} from '../types.js';

export function runRaf(fn: AnyFn) {
	let running = false;
	function start() {
		running = true;

		async function run() {
			if (!running) return;

			// wait function is done;
			await fn();

			// next frame
			window.requestAnimationFrame(run);
		}

		run();
	}

	function stop() {
		running = false;
	}

	return {
		start,
		stop,
	};
}
