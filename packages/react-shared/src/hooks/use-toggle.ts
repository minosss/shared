import {useMemo, useState} from 'react';

export function useToggle(defaultValue?: boolean | (() => boolean)) {
	const [state, setState] = useState(defaultValue);

	const controls = useMemo(
		() => ({
			on: () => setState(true),
			off: () => setState(false),
			toggle: (val?: boolean) => setState((v) => val ?? !v),
		}),
		[]
	);

	return [state, controls] as const;
}
