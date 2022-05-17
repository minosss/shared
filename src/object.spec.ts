import {get} from './object.js';

describe('object', () => {
	it('get', () => {
		const a = {foo: 1, bar: 2, baz: {dog: 'woo'}, arr: [1, 2, 3]};

		expect(get(a, 'foo')).toEqual(1);
		expect(get(a, 'baz.dog')).toEqual('woo');
		expect(get(a, 'arr.2')).toEqual(3);
		expect(get(a, 'foo.bar.baz', 'fall')).toEqual('fall');
		expect(get(a, 'foo.bar.baz')).toEqual(undefined);
	});
});
