import {useState, useEffect} from 'react';

const createElement = (id: string): HTMLElement => {
	const el = globalThis.document.createElement('div');
	el.setAttribute('id', id);
	return el;
};

export function usePortal(selectId: string) {
	const id = `portal-${selectId}`;
	const [portal, setPortal] = useState<HTMLElement | null>(null);

	useEffect(() => {
		const targetEl = globalThis.document?.body;

		if (!targetEl) return;

		let el = targetEl.querySelector<HTMLElement>(`#${id}`);
		if (!el) {
			el = createElement(id);
			targetEl.append(el);
		}
		setPortal(el);

		return () => setPortal(null);
	}, [id]);

	return portal;
}
