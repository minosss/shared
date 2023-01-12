import {describe, it, expect} from 'vitest';
import {chunk, range} from './array.js';

describe('array', () => {
	it('chunk', () => {
		const chunks = chunk([1, 2, 3, 4, 5], 3);
		expect(chunks).toHaveLength(2);
		expect(chunks[0]).toStrictEqual([1, 2, 3]);
	});

	it('range', () => {
		expect(range(1, 5)).toStrictEqual([1, 2, 3, 4, 5]);
		expect(range(1, 10, 2)).toStrictEqual([1, 3, 5, 7, 9]);
	});
});
