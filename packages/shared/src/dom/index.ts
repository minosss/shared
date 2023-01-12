import {isObject} from '../is/is.js';

function cxIf(classobj: any): string {
	return Object.entries(classobj)
		.map(([k, v]) => v && k)
		.filter(Boolean)
		.join(' ');
}

export function cx(...classes: any[]): string {
	return classes
		.map((v) => (isObject(v) ? cxIf(v) : v))
		.filter(Boolean)
		.join(' ');
}

export function canUseDom() {
	return !!globalThis.window?.document?.createElement;
}

export const isBrowser = canUseDom();
