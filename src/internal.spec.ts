import {getInternal, setInternal} from './internal';

describe('internal', () => {
	it('internal', () => {
		const foo = {a: 0, b: 1, c: 2};
		const keys = Object.keys(foo);
		expect(keys).toStrictEqual(['a', 'b', 'c']);

		setInternal(foo, 'bar');
		expect(keys).toStrictEqual(['a', 'b', 'c']);

		const bar = getInternal(foo);
		expect(bar === 'bar').toBe(true);
	});
});
