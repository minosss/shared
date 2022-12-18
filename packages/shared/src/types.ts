export type Fn = () => void;
export type AnyFn = (...args: any[]) => any;

export type MaybeArray<T> = T | T[];

export interface Point {
	x: number;
	y: number;
}

export interface Rect {
	x: number;
	y: number;
	width: number;
	height: number;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type FunctionArguments<T extends Function> = T extends (...args: infer R) => any
	? R
	: never;

export type ValueOf<T, K extends keyof T = keyof T> = T[K];
