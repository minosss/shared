import {cx} from './index';

describe('dom', () => {
	it('cx', () => {
		expect(cx('foo', 'bar')).toEqual('foo bar');
		expect(cx('foo', '')).toEqual('foo');
		expect(cx('foo', null, false)).toEqual('foo');
		expect(cx('foo', {bar: true, bar2: false})).toEqual('foo bar');
		expect(cx({foo: false, [`bar`]: true})).toEqual('bar');
	});
});
