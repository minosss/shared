import {observeKeyboard} from '@yme/shared';
import {useCallbackRef} from './use-callback-ref.js';
import {useObserve} from './use-observe.js';

export function useKeyboard(
	keyOrCode: string | string[],
	callback?: (pressed: boolean) => void
) {
	const handler = useCallbackRef(callback);
	return useObserve(() =>
		observeKeyboard(
			keyOrCode,
			(pressed: boolean) => {
				handler(pressed);
			},
			{}
		)
	);
}
