import {runIfFn} from '@yme/shared';
import React, {useCallback, useState} from 'react';
import {useCallbackRef} from './use-callback-ref.js';

export function useControllableProp<T>(prop: T | undefined, state: T) {
	const isControlled = prop !== undefined;
	const value = isControlled && typeof prop !== 'undefined' ? prop : state;
	return [isControlled, value] as const;
}

export interface ControllableStateOptions<T> {
	value?: T;
	defaultValue?: T | (() => T);
	onChange?: (value: T) => void;
	shouldUpdate?: (prev: T, next: T) => boolean;
}

export function useControllableState<T>(options: ControllableStateOptions<T>) {
	const {
		value: valueProp,
		defaultValue,
		onChange: onChangeProp,
		shouldUpdate: shouldUpdateProp = (prev, next) => prev !== next,
	} = options;

	const onChange = useCallbackRef(onChangeProp);
	const shouldUpdate = useCallbackRef(shouldUpdateProp);

	const [valueState, setValue] = useState(defaultValue as T);

	const isControlled = valueProp !== undefined;
	const value = isControlled ? (valueProp as T) : valueState;

	const updateValue = useCallback(
		(next: React.SetStateAction<T>) => {
			const nextValue = runIfFn(next, value);

			if (!shouldUpdate(value, nextValue)) {
				return;
			}

			if (!isControlled) {
				setValue(nextValue);
			}

			onChange?.(nextValue);
		},
		[isControlled, onChange, shouldUpdate, value]
	);

	return [value, updateValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
