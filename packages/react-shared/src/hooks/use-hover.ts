import {useState} from 'react';
import {useEvent} from './use-event';

export function useHover(target: EventTarget) {
	const [hover, setHover] = useState(false);

	useEvent(target, 'mouseenter', () => {
		setHover(true);
	});
	useEvent(target, 'mouseleave', () => {
		setHover(false);
	});

	return hover;
}
