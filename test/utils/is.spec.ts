import {isString} from '../../src';

test('isString', () => {
	expect(isString('is')).toBe(true);
	expect(isString(0)).toBe(false);
});
