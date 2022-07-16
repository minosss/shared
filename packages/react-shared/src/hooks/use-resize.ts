import {observeResize} from '@yme/shared';
import {useCallback} from 'react';
import {useCallbackRef} from './use-callback-ref.js';
import {useObserve} from './use-observe.js';

export function useResize(target: string | HTMLElement, callback: (rect: any) => void) {
	const handler = useCallbackRef(callback);
	const observe = useCallback(() => {
		return observeResize(target, handler);
	}, [handler, target]);
	return useObserve(observe);
}
