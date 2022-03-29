import {isString} from '../src';

describe('is', () => {
	it('isString', () => {
		expect(isString('is')).toBe(true);
		expect(isString(0)).toBe(false);
	});
});
