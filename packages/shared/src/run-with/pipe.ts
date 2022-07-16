export function pipe<R>(...fns: Array<(a: R) => R>) {
	return (r: R) => {
		for (const fn of fns) {
			r = fn(r);
		}
		return r;
	};
}
