// chakra-ui
import {useCallback} from 'react';
import {useLatestRef} from './use-latest-ref';

export function useCallbackRef<T extends (...args: any[]) => any>(
	fn: T | undefined,
	deps: React.DependencyList = []
): T {
	const ref = useLatestRef<T | undefined>(fn);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useCallback(((...args) => ref.current?.(...args)) as T, deps);
}
