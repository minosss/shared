import {useMemo} from 'react';
import type {DependencyList} from 'react';
import {runInterval} from '@yme/shared';
import {useCallbackRef} from './use-callback-ref.js';
import {useControls} from './use-controls.js';

export interface UseIntervalOptions {
	immediate?: boolean;
}

export function useInterval(
	fn: () => any,
	ms = 1000,
	options: UseIntervalOptions = {},
	deps: DependencyList = []
) {
	const {immediate = true} = options;
	const handler = useCallbackRef(fn, deps);
	const interval = useMemo(() => runInterval(handler, ms), [handler, ms]);
	return useControls(interval, immediate);
}
