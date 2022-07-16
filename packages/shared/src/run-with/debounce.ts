import {AnyFn} from '../types.js';

interface WithDebounceOptions {
	ms?: number;
	maxWait?: number;
}

export function withDebounce(fn: AnyFn, options: WithDebounceOptions = {}) {
	let timer: number | undefined;
	let maxTimer: number | undefined;

	function debounce(...args: unknown[]) {
		const {ms = 1000, maxWait} = options;

		if (timer) window.clearTimeout(timer);

		if (ms <= 0 || (maxWait !== undefined && maxWait <= 0)) {
			if (maxTimer) {
				window.clearTimeout(maxTimer);
				maxTimer = undefined;
			}
			return fn(...args);
		}

		if (maxWait && !maxTimer) {
			maxTimer = window.setTimeout(() => {
				if (timer) window.clearTimeout(timer);
				maxTimer = undefined;
				fn(...args);
			}, maxWait);
		}

		timer = window.setTimeout(() => {
			if (maxTimer) window.clearTimeout(maxTimer);
			maxTimer = undefined;
			fn(...args);
		}, ms);
	}

	return debounce;
}
