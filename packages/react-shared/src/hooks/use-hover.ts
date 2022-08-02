import {useState} from 'react';
import type {MaybeComputedRef} from '../types';
import {useEvent} from './use-event.js';

export function useHover(target: MaybeComputedRef<EventTarget>) {
	const [hover, setHover] = useState(false);

	useEvent(
		target,
		'mouseenter',
		() => {
			setHover(true);
		},
		// ignore event listener if target is not existing
		{strict: true}
	);
	useEvent(
		target,
		'mouseleave',
		() => {
			setHover(false);
		},
		{strict: true}
	);

	return hover;
}
