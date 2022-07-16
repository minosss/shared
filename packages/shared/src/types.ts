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
