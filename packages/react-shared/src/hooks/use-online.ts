import {useState} from 'react';
import {useEvent} from './use-event.js';

/**
 * network online
 */
export function useOnline() {
	const [online, setOnline] = useState(false);

	useEvent('online', () => {
		setOnline(true);
	});

	useEvent('offline', () => {
		setOnline(false);
	});

	return online;
}
