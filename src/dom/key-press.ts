import {isArray} from '../is.js';

interface Options {
	target?: Window | Document | HTMLElement;
	KeyOrCode?: 'key' | 'code';
}

type unobserve = () => void;

/**
 * observe keyboard pressed event
 *
 * @param keyCode key or code of the keyboard event, default is e.key
 * @param callback
 * @param options custom key or code, and target element, default: document
 * @returns unobserve function
 *
 * @example
 * // listen keyboard press `Ctrl+g`
 * observe('Ctrl+g', (pressed) => {
 *   console.log(pressed ? 'on' : 'off);
 * })
 *
 * // listen multiple keys at once
 * observe(['g', 'j'], (pressed) => {
 * 	 console.log(pressed ? 'g or j pressed' : 'not pressed');
 * })
 */
export function observe(
	keyCode: string | string[],
	callback: (value: boolean) => void,
	options?: Options
): unobserve {
	const {
		//
		target = globalThis.document,
		KeyOrCode = 'key',
	} = options || {};

	const pressed = new Set<string>([]);
	const keyCodes = (isArray(keyCode) ? keyCode : [keyCode])
		.filter((kc) => typeof kc === 'string')
		.map((kc) => kc.split('+'));

	const onKeyDown = (event: KeyboardEvent) => {
		if (isInputDOMNode(event.target as HTMLElement)) {
			return false;
		}

		pressed.add(event[KeyOrCode]);

		if (isMatchingKey(keyCodes, pressed, false)) {
			event.preventDefault();
			callback(true);
		}
		return;
	};

	const onKeyUp = (event: KeyboardEvent) => {
		if (isInputDOMNode(event.target as HTMLElement)) {
			return false;
		}

		if (isMatchingKey(keyCodes, pressed, true)) {
			pressed.clear();
			callback(false);
		} else {
			pressed.delete(event[KeyOrCode]);
		}
		return;
	};

	const onReset = () => {
		pressed.clear();
		callback(false);
	};

	target?.addEventListener('keydown', onKeyDown as EventListenerOrEventListenerObject);
	target?.addEventListener('keyup', onKeyUp as EventListenerOrEventListenerObject);
	globalThis.window.addEventListener('blur', onReset);

	return () => {
		target?.removeEventListener('keydown', onKeyDown as EventListenerOrEventListenerObject);
		target?.removeEventListener('keyup', onKeyUp as EventListenerOrEventListenerObject);
		globalThis.window.removeEventListener('blur', onReset);
	};
}

function isMatchingKey(keyCodes: string[][], pressedKeys: Set<string>, isUp: boolean): boolean {
	return keyCodes
		.filter((keys) => isUp || keys.length === pressedKeys.size)
		.some((keys) => keys.every((key) => pressedKeys.has(key)));
}

export function isInputDOMNode(element: HTMLElement) {
	return ['INPUT', 'SELECT', 'TEXTAREA'].includes(element?.nodeName);
}
