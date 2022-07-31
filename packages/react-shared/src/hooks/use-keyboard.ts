import {observeKeyboard} from '@yme/shared';
import {useCallback} from 'react';
import {useCallbackRef} from './use-callback-ref.js';
import {useObserve} from './use-observe.js';

export function useKeyboard(
	keyOrCode: string | string[],
	callback?: (pressed: boolean) => void
) {
	const handler = useCallbackRef(callback);
	const observe = useCallback(() => {
		return observeKeyboard(
			keyOrCode,
			(pressed: boolean) => {
				handler(pressed);
			},
			{}
		);
	}, [handler, keyOrCode]);
	return useObserve(observe);
}
