import {isFunction, isObject} from '@yme/shared';
import React from 'react';
import {MaybeComputedRef} from '../types';

// check value has current property only
export function isRef(value: unknown): boolean {
	return isObject(value) && Object.prototype.hasOwnProperty.call(value, 'current');
}

export type ReactRef<T> =
	| undefined
	| null
	| React.RefCallback<T>
	| React.MutableRefObject<T | null>;

export function mergeRefs<T = any>(...refs: ReactRef<T>[]): React.RefCallback<T> {
	return (value) => {
		for (const ref of refs) {
			if (!ref) continue;

			if (isFunction(ref)) {
				ref(value);
				continue;
			}

			ref.current = value;
		}
	};
}

export function unref<T>(ref: MaybeComputedRef<T>): T {
	if (isFunction(ref)) return ref();

	if (isRef(ref)) return (ref as any).current as T;

	return ref as T;
}
