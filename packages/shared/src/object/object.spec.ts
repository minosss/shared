import {describe, it, expect} from 'vitest';
import {get, omit, pick} from './object.js';

describe('object', () => {
	it('get', () => {
		const a = {foo: 1, bar: 2, baz: {dog: 'woo'}, arr: [1, 2, 3]};

		expect(get(a, 'foo')).toEqual(1);
		expect(get(a, 'baz.dog')).toEqual('woo');
		expect(get(a, 'arr.2')).toEqual(3);
		expect(get(a, 'foo.bar.baz', 'fall')).toEqual('fall');
		expect(get(a, 'foo.bar.baz')).toEqual(undefined);
	});

	it('omit', () => {
		const obj = {a: 1, b: 2, c: 3};

		expect(omit(obj, ['a', 'b'])).toHaveProperty('c', 3);
	});

	it('pick', () => {
		const obj = {a: 1, b: 2, c: 3};

		expect(pick(obj, ['a'])).toHaveProperty('a', 1);
	});
});
