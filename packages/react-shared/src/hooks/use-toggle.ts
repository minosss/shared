import {useMemo, useState} from 'react';

export function useToggle(defaultValue?: boolean | (() => boolean)) {
	const [state, setState] = useState(defaultValue);

	const actions = useMemo(
		() => ({
			on: () => setState(true),
			off: () => setState(false),
			toggle: () => setState((v) => !v),
		}),
		[]
	);

	return [state, actions] as const;
}
