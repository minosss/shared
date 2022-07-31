import {isFunction, isNull} from '@yme/shared';

export type ReactRef<T> = null | React.RefCallback<T> | React.MutableRefObject<T | null>;

export function mergeRefs<T = any>(...refs: ReactRef<T>[]): React.RefCallback<T> {
	return (value) => {
		for (const ref of refs) {
			if (isNull(ref)) continue;

			if (isFunction(ref)) {
				ref(value);
				continue;
			}

			ref.current = value;
		}
	};
}
