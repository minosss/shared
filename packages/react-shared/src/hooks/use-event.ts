import {isString, observeKeyboard, runIfFn} from '@yme/shared';
import type {Fn} from '@yme/shared';
import {useEffect, useRef} from 'react';
import {useCallbackRef} from './use-callback-ref.js';

export type EventOptions = boolean | AddEventListenerOptions;

export function useEvent<EventType extends keyof WindowEventMap>(
	event: EventType,
	callback: (event: WindowEventMap[EventType]) => void,
	options?: EventOptions
): Fn;
export function useEvent<EventType extends keyof WindowEventMap>(
	target: Window,
	event: EventType,
	callback: (event: WindowEventMap[EventType]) => void
): Fn;
export function useEvent<EventType extends keyof DocumentEventMap>(
	target: Document,
	event: EventType,
	callback: (event: DocumentEventMap[EventType]) => void,
	options?: EventOptions
): Fn;
export function useEvent<EventType = Event>(
	target: EventTarget | (() => EventTarget),
	event: EventType,
	callback: (event: EventType) => void,
	options?: EventOptions
): Fn;
export function useEvent(...args: any[]) {
	let target: EventTarget | (() => EventTarget);
	let event: string;
	let callback: any;
	let options: EventOptions;

	if (isString(args[0])) {
		[event, callback, options] = args;
		target = globalThis.window;
	} else {
		[target, event, callback, options] = args;
	}

	const handler = useCallbackRef(callback);

	useEffect(() => {
		const el = runIfFn(target) ?? globalThis.window;

		el?.addEventListener(event, handler, options);

		return () => {
			el?.removeEventListener(event, handler, options);
		};
	}, [event, handler, options, target]);

	return () => {
		const el = runIfFn(target) ?? globalThis.window;
		el?.removeEventListener(event, handler, options);
	};
}

export function useKeyboard(
	keyOrCode: string | string[],
	callback?: (pressed: boolean) => void
) {
	const handler = useCallbackRef(callback);
	const unobserveRef = useRef<Fn>();

	useEffect(() => {
		unobserveRef.current = observeKeyboard(
			keyOrCode,
			(pressed: boolean) => {
				handler(pressed);
			},
			{}
		);

		return () => {
			unobserveRef.current?.();
			unobserveRef.current = undefined;
		};
	}, [keyOrCode, handler]);

	return () => {
		unobserveRef.current?.();
		unobserveRef.current = undefined;
	};
}
