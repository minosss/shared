import {useRef} from 'react';
import {useSafeLayoutEffect} from './use-safe-layout-effect';

export function useLatestRef<T>(value: T) {
	const ref = useRef<T>(value);

	useSafeLayoutEffect(() => {
		ref.current = value;
	});

	return ref;
}
