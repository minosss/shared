import {useState, useMemo} from 'react';
import {useSafeLayoutEffect} from './use-safe-layout-effect';

export interface Controls {
	start(): void;
	stop(): void;
}

export function useControls(
	source: Controls,
	immediate = true
): Readonly<[boolean, Readonly<Controls>]> {
	const [running, setRunning] = useState(false);
	const controls = useMemo(
		() => ({
			start() {
				source.start();
				setRunning(true);
			},
			stop() {
				source.stop();
				setRunning(false);
			},
		}),
		[source]
	);

	useSafeLayoutEffect(() => {
		if (immediate) {
			controls.start();
		}

		return () => {
			controls.stop();
		};
	}, [immediate, controls]);

	return [running, controls] as const;
}
