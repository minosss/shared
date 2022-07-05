import React from 'react';

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

export function createContext<T>(name: string) {
	const Context = React.createContext<T | undefined>(undefined);

	Context.displayName = name;

	function useContext() {
		const context = React.useContext(Context);

		if (!context) {
			throw new Error(`context ${name} is undefined`);
		}

		return context;
	}

	return [Context.Provider, useContext, Context] as CreateContextReturn<T>;
}
