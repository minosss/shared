import {clamp} from '@yme/shared';
import {useMemo} from 'react';

interface UseClampOptions {
	min?: number;
	max?: number;
}

export function useClamp(value: number, options: UseClampOptions = {}) {
	const {min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY} = options;
	return useMemo(() => clamp(value, min, max), [max, min, value]);
}
