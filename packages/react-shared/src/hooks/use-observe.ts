import {useCallback, useEffect, useRef} from 'react';

type Unobserve = () => any;

// ensure the observe function will not update on every renders
export function useObserve(observe: () => Unobserve): Unobserve {
	const unobserve = useRef<Unobserve>();
	const wrapper = useCallback(() => {
		unobserve.current?.();
		unobserve.current = undefined;
	}, []);

	useEffect(() => {
		unobserve.current = observe();

		return () => {
			unobserve.current?.();
			unobserve.current = undefined;
		};
	}, [observe]);

	return wrapper;
}
