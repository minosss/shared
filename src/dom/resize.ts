import {isString} from '../is.js';

interface Rect {
	x: number;
	y: number;
	width: number;
	height: number;
}

type unobserve = () => void;

interface Options extends ResizeObserverOptions {
	immediate?: boolean;
}

/**
 * 观察目标元素尺寸变化, 使用 `ResizeObserver`
 */
export function observe(
	target: string | HTMLElement,
	callback: (rect: Rect) => void,
	options?: Options
): unobserve {
	const {
		//
		immediate = true,
		...otherOptions
	} = options || {};

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
