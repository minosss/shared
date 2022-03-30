import {isString} from './is';

describe('is', () => {
	it('isString', () => {
		expect(isString('is')).toBe(true);
		expect(isString(0)).toBe(false);
	});
});
