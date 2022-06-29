import {isString} from '../is.js';

interface Options extends MutationObserverInit {}

type unobserve = () => void;

/**
 * 观察 DOM 有没有更新
 */
export function observe(
	target: string | HTMLElement,
	callback: MutationCallback,
	options?: Options
): unobserve {
	const {
		//
		childList = true,
		subtree = true,
		attributes = false,
		...otherOptions
	} = options || {};

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
