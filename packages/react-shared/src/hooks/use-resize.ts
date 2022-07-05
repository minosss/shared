import {observeResize} from '@yme/shared';
import {useEffect} from 'react';
import {useCallbackRef} from './use-callback-ref.js';

export function useResize(target: string | HTMLElement, callback: (rect: any) => void) {
	const handler = useCallbackRef(callback);

	useEffect(() => {
		const unobserve = observeResize(target, handler);

		return () => {
			unobserve();
		};
	}, [handler, target]);
}
