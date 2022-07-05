const toString = Object.prototype.toString;

export function isString(value: any): value is string {
	return toString.call(value) === '[object String]';
}

export function isEmptyString(value: any) {
	return isString(value) && value.length === 0;
}

export function isNumber(value: any): value is number {
	return toString.call(value) === '[object Number]';
}

export function isNumberString(value: any) {
	return isString(value) && /^\d+(\.\d+)?$/.test(value);
}

export function isNumberLike(value: any) {
	return isNumber(value) || isNumberString(value);
}

export function isBoolean(value: any): value is boolean {
	return toString.call(value) === '[object Boolean]';
}

export function isBooleanString(value: any) {
	return value === 'true' || value === 'false';
}

export function isBooleanLike(value: any) {
	return isBoolean(value) || isBooleanString(value);
}

export function isArray<T = any>(value: any): value is T[] {
	return Array.isArray(value);
}

export function isEmptyArray(value: any) {
	return isArray(value) && value.length === 0;
}

export function isObject(value: any) {
	return toString.call(value) === '[object Object]';
}

export function isEmptyObject(value: any) {
	return isObject(value) && Object.keys(value).length === 0;
}

export function isNull(value: any): value is null {
	return toString.call(value) === '[object Null]';
}

export function isUndefined(value: any): value is undefined {
	return toString.call(value) === '[object Undefined]';
}

export function isDefined(value: any) {
	return !isUndefined(value);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction<T extends Function = Function>(value: any): value is T {
	return toString.call(value) === '[object Function]';
}

export function isPromise<T = void>(value: any): value is Promise<T> {
	return toString.call(value) === '[object Promise]' && isFunction(value.then);
}

export function isSet<T = any>(value: any): value is Set<T> {
	return toString.call(value) === '[object Set]';
}

export function isEmptySet(value: any) {
	return isSet(value) && value.size === 0;
}

export function isMap<K = string, V = any>(value: any): value is Map<K, V> {
	return toString.call(value) === '[object Map]';
}

export function isEmptyMap(value: any) {
	return isMap(value) && value.size === 0;
}

export function isEmpty(value: any) {
	return (
		isEmptyString(value) ||
		isEmptyObject(value) ||
		isEmptyArray(value) ||
		isEmptySet(value) ||
		isEmptyMap(value)
	);
}
