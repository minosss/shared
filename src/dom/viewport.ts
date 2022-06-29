import {isString} from '../is.js';

interface Options extends IntersectionObserverInit {}

/**
 * 观察元素进入 viewport
 */
export function observe(
	target: string | HTMLElement,
	callback: IntersectionObserverCallback,
	options?: Options
) {
	const {
		//
		...otherOptions
	} = options || {};

	const element = isString(target) ? document.querySelector<HTMLElement>(target) : target;

	if (!element) {
		throw new Error(`element not found, ${target}`);
	}

	const intersectionObserver = new IntersectionObserver(callback, {
		...otherOptions,
	});

	intersectionObserver.observe(element);

	return () => {
		intersectionObserver.disconnect();
	};
}
