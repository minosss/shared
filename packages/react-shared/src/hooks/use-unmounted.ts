import {DependencyList, useEffect} from 'react';

export function useUnmounted(fn: () => void, deps: DependencyList = []) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useEffect(() => () => fn(), deps);
}
