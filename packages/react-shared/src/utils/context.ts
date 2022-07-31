// chakra-ui/react-utils
import React from 'react';

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

interface CreateContextOptions {
	name: string;
	strict?: boolean;
	errorMessage?: string;
}

export function createContext<T>(options: string | CreateContextOptions) {
	if (typeof options === 'string') {
		options = {name: options};
	}

	const {name, strict = true, errorMessage = `${name}: context is undefined`} = options;

	const Context = React.createContext<T | undefined>(undefined);

	Context.displayName = name;

	function useContext() {
		const context = React.useContext(Context);

		if (!context && strict) {
			const error = new Error(errorMessage);
			error.name = 'ContextError';
			Error.captureStackTrace?.(error, useContext);
			throw error;
		}

		return context;
	}

	return [Context.Provider, useContext, Context] as CreateContextReturn<T>;
}
