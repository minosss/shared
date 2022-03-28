import {isString} from '../../src/utils/is';

test('isString', () => {
	expect(isString('is')).toBe(true);
	expect(isString(0)).toBe(false);
});
