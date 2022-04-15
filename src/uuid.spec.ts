import {uuid} from './uuid';

describe('uuid', () => {
	it('random 1 million should be unique', () => {
		const s = new Set();
		for (let index = 0; index < 1_000_000; index++) {
			s.add(uuid());
		}
		expect(s.size === 1_000_000).toBe(true);
	});
});
