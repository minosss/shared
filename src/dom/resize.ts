import {isString} from '../is.js';

interface Rect {
	x: number;
	y: number;
	width: number;
	height: number;
}

type unobserve = () => void;

interface Options {
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
	const {immediate = true} = options || {};

	const element = isString(target) ? document.querySelector<HTMLElement>(target) : target;
	const onResize = () => {
		if (element) {
			callback({
				x: element.offsetLeft,
				y: element.offsetTop,
				width: element.offsetWidth,
				height: element.offsetHeight,
			});
		}
	};

	let resizeObserver: ResizeObserver;
	if (element) {
		resizeObserver = new ResizeObserver(onResize);
		resizeObserver.observe(element);
	}

	if (immediate) {
		onResize();
	}

	return () => {
		if (resizeObserver && element) {
			resizeObserver.unobserve(element);
		}
	};
}
