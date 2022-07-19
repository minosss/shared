import {isArray, isString} from '../is.js';

export interface IntersectionOptions extends IntersectionObserverInit {}

/**
 * observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.
 *
 * @see http://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
 */
export function observe(
	target: string | HTMLElement | HTMLElement[],
	callback: IntersectionObserverCallback,
	options: IntersectionOptions = {}
) {
	const {
		//
		root,
		rootMargin = '0px',
		threshold = 0.1,
	} = options;

	const elements = isString(target)
		? [...globalThis.document.querySelectorAll(target)]
		: isArray(target)
		? target
		: [target];

	if (elements.length === 0) {
		throw new Error(`element not found, ${target}`);
	}

	const intersectionObserver = new IntersectionObserver(callback, {
		rootMargin,
		threshold,
		root,
	});

	for (const el of elements) {
		intersectionObserver.observe(el);
	}

	return () => {
		intersectionObserver.disconnect();
	};
}
