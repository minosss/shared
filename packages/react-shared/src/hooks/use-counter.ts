import {clamp} from '@yme/shared';
import {useMemo, useRef, useState} from 'react';

export interface CounterOptions {
	min?: number;
	max?: number;
}

export function useCounter(defaultValue = 0, options: CounterOptions = {}) {
	const {min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY} = options;
	const defaultValueRef = useRef(defaultValue);
	const [state, setState] = useState(defaultValue);

	const actions = useMemo(
		() => ({
			inc: (step = 1) => setState((v) => Math.min(max, v + step)),
			dec: (step = 1) => setState((v) => Math.max(min, v - step)),
			set: (val: number) => setState(clamp(val, min, max)),
			reset: (val = defaultValueRef.current) => {
				defaultValueRef.current = clamp(val, min, max);
				return setState(defaultValueRef.current);
			},
		}),
		[max, min]
	);

	return [state, actions] as const;
}
