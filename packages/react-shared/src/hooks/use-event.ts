import {isObject, isString} from '@yme/shared';
import type {Fn} from '@yme/shared';
import {useEffect} from 'react';
import {MaybeComputedRef} from '../types.js';
import {unref} from '../utils/refs.js';
import {warnOnce} from '../utils/warn.js';
import {useCallbackRef} from './use-callback-ref.js';

export type UseEventOptions = boolean | (AddEventListenerOptions & {strict?: boolean});

export function useEvent<EventType extends keyof WindowEventMap>(
	event: EventType,
	callback: (event: WindowEventMap[EventType]) => void,
	options?: UseEventOptions
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
	options?: UseEventOptions
): Fn;
export function useEvent<EventType = Event>(
	target: EventTarget | (() => EventTarget),
	event: EventType,
	callback: (event: EventType) => void,
	options?: UseEventOptions
): Fn;
export function useEvent<EventType = Event>(
	target: MaybeComputedRef<EventTarget>,
	event: EventType,
	callback: (event: EventType) => void,
	options?: UseEventOptions
): Fn;
export function useEvent(...args: any[]) {
	let target: MaybeComputedRef<EventTarget>;
	let event: string;
	let callback: any;
	let options: UseEventOptions;

	if (isString(args[0])) {
		[event, callback, options] = args;
		target = globalThis.window;
	} else {
		[target, event, callback, options] = args;
	}

	const handler = useCallbackRef(callback);

	useEffect(() => {
		// dont add event listener if target is null and strict is true
		const strict = isStrict(options);
		const el = unref(target) ?? strict ? null : globalThis.window;

		if (!el) {
			warnOnce('use-event', `element is empty, ${event} won't works`);
		}

		el?.addEventListener(event, handler, options);

		return () => {
			el?.removeEventListener(event, handler, options);
		};
	}, [event, handler, options, target]);

	return () => {
		const strict = isStrict(options);
		const el = unref(target) ?? strict ? null : globalThis.window;
		el?.removeEventListener(event, handler, options);
	};
}

function isStrict(options: UseEventOptions) {
	return isObject(options) && (options as any).strict === true;
}
