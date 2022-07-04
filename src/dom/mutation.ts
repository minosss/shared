import {isString} from '../is.js';

export interface MutationOptions extends MutationObserverInit {}

/**
 * watch for changes being made to the DOM tree.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */
export function observe(
	target: string | HTMLElement,
	callback: MutationCallback,
	options: MutationOptions = {}
) {
	const {
		//
		childList = true,
		subtree = true,
		attributes = false,
		...otherOptions
	} = options;

	const element = isString(target) ? document.querySelector<HTMLElement>(target) : target;

	if (!element) {
		throw new Error(`element not found, ${target}`);
	}

	const mutationObserver = new MutationObserver(callback);

	mutationObserver.observe(element, {
		childList,
		subtree,
		attributes,
		...otherOptions,
	});

	return () => {
		mutationObserver.disconnect();
	};
}
