import {
	isArray,
	isBoolean,
	isBooleanLike,
	isBooleanString,
	isBrowser,
	isEmptyArray,
	isEmptyMap,
	isEmptyObject,
	isEmptySet,
	isEmptyString,
	isFunction,
	isMap,
	isNull,
	isNumber,
	isNumberLike,
	isNumberString,
	isObject,
	isPromise,
	isSet,
	isString,
	isUndefined,
} from './is';

describe('is', () => {
	it('isString', () => {
		expect(isString('is')).toBe(true);
		expect(isString(0)).toBe(false);
	});

	it('isEmptyString', () => {
		expect(isEmptyString('')).toBe(true);
		expect(isEmptyString('is')).toBe(false);
	});

	it('isNumber', () => {
		expect(isNumber(0)).toBe(true);
		expect(isNumber('1')).toBe(false);
	});

	it('isNumberString', () => {
		expect(isNumberString('0')).toBe(true);
		expect(isNumberString(1)).toBe(false);
	});

	it('isNumberLike', () => {
		expect(isNumberLike('0')).toBe(true);
		expect(isNumberLike('1')).toBe(true);
		expect(isNumberLike(2)).toBe(true);
		expect(isNumberLike('a')).toBe(false);
	});

	it('isBoolean', () => {
		expect(isBoolean(true)).toBe(true);
		expect(isBoolean(false)).toBe(true);
	});

	it('isBooleanString', () => {
		expect(isBooleanString('true')).toBe(true);
		expect(isBooleanString('false')).toBe(true);
		expect(isBooleanString(true)).toBe(false);
	});

	it('isBooleanLike', () => {
		expect(isBooleanLike('true')).toBe(true);
		expect(isBooleanLike(false)).toBe(true);
	});

	it('isArray', () => {
		expect(isArray([])).toBe(true);
		expect(isArray('[]')).toBe(false);
	});

	it('isEmptyArray', () => {
		expect(isEmptyArray([])).toBe(true);
		expect(isEmptyArray([1])).toBe(false);
	});

	it('isObject', () => {
		expect(isObject({})).toBe(true);
		expect(isObject([])).toBe(false);
		expect(isObject(2)).toBe(false);
	});

	it('isEmptyObject', () => {
		expect(isEmptyObject({})).toBe(true);
		expect(isEmptyObject({a: 1})).toBe(false);
	});

	it('isNull', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(isNull(null)).toBe(true);
		expect(isNull({})).toBe(false);
	});

	it('isUndefined', () => {
		// eslint-disable-next-line unicorn/no-useless-undefined
		expect(isUndefined(undefined)).toBe(true);
		// eslint-disable-next-line unicorn/no-null
		expect(isUndefined(null)).toBe(false);
	});

	it('isFunction', () => {
		expect(isFunction(Array.isArray)).toBe(true);
		expect(isFunction(() => {})).toBe(true);
	});

	it('isPromise', () => {
		expect(isPromise(new Promise(() => {}))).toBe(true);
		expect(isPromise(() => {})).toBe(false);
	});

	it('isSet', () => {
		expect(isSet(new Set())).toBe(true);
		expect(isEmptySet(new Set())).toBe(true);
		expect(isEmptySet(new Set([1, 2, 3]))).toBe(false);
	});

	it('isMap', () => {
		expect(isMap(new Map())).toBe(true);
		expect(isEmptyMap(new Map())).toBe(true);
		expect(isEmptySet(new Map([[0, 0]]))).toBe(false);
	});

	it('isBrowser', () => {
		expect(isBrowser()).toBe(false);
	});
});
