import type {DependencyList} from 'react';
import {useMemo} from 'react';
import {runTimeout} from '@yme/shared';
import {useCallbackRef} from './use-callback-ref.js';
import {useControls} from './use-controls.js';

export interface UseTimeoutOptions {
	immediate?: boolean;
}

export function useTimeout(
	fn: () => any,
	ms = 3000,
	options: UseTimeoutOptions = {},
	deps: DependencyList = []
) {
	const {immediate = true} = options;
	const handler = useCallbackRef(fn, deps);
	const source = useMemo(() => runTimeout(handler, ms), [handler, ms]);
	return useControls(source, immediate);
}
