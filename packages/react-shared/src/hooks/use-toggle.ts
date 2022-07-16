import {useMemo, useState} from 'react';

export function useToggle(defaultValue?: boolean | (() => boolean)) {
	const [state, setState] = useState(defaultValue);

	const controls = useMemo(
		() => ({
			on: () => setState(true),
			off: () => setState(false),
			toggle: () => setState((v) => !v),
		}),
		[]
	);

	return [state, controls] as const;
}
