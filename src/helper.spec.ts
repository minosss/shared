import {clamp} from './helper';

describe('helper', () => {
	it('clamp', () => {
		expect(clamp(2)).toEqual(1);
		expect(clamp(-2)).toEqual(0);
		expect(clamp(2, 1, 10)).toEqual(2);
		expect(clamp(-2, 1, 10)).toEqual(1);
		expect(clamp(10, 1, 5)).toEqual(5);
	});
});
