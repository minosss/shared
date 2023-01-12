import {isString} from '../is/is.js';
import type {Rect} from '../types.js';

export interface ResizeOptions extends ResizeObserverOptions {
	immediate?: boolean;
}

/**
 * 观察目标元素尺寸变化, 使用 `ResizeObserver`
 *
 * @see http://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 */
export function observe(
	target: string | HTMLElement,
	callback: (rect: Rect) => void,
	options: ResizeOptions = {}
) {
	const {
		//
		immediate = true,
		...otherOptions
	} = options;

	const element = isString(target) ? document.querySelector<HTMLElement>(target) : target;

	if (!element) {
		throw new Error(`element not found, ${target}`);
	}

	const onResize = () => {
		callback({
			x: element.offsetLeft,
			y: element.offsetTop,
			width: element.offsetWidth,
			height: element.offsetHeight,
		});
	};

	const resizeObserver = new ResizeObserver(onResize);

	resizeObserver.observe(element, {
		...otherOptions,
	});

	if (immediate) {
		onResize();
	}

	return () => {
		resizeObserver.disconnect();
	};
}
