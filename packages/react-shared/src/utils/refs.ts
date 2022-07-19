import {isFunction} from '@yme/shared';
import * as React from 'react';

export type ReactRef<T> = React.RefCallback<T> | React.MutableRefObject<T | null>;

export function mergeRefs<T = any>(...refs: ReactRef<T>[]): React.RefCallback<T> {
	return (value) => {
		for (const ref of refs) {
			if (isFunction(ref)) {
				ref(value);
				continue;
			}

			ref.current = value;
		}
	};
}
