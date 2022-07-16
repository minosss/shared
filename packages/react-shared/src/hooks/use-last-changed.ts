import {timestamp as now} from '@yme/shared';
import {DependencyList, useEffect, useState} from 'react';

export interface LastChangedOptions {
	defaultValue?: number;
	timestamp?: (pre?: number) => number;
}

export function useLastChanged(deps: DependencyList, options: LastChangedOptions = {}) {
	const {timestamp = now, defaultValue} = options;
	const [ms, setMs] = useState<number | undefined>(defaultValue);

	useEffect(() => {
		setMs((v) => timestamp(v));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	return ms;
}
