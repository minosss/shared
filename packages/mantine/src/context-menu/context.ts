import {createContext} from '@yme/react-shared';
import React from 'react';
import {TriggerEvent} from './types';

interface ContextMenuContext {
	lastEventRef: React.MutableRefObject<React.MouseEvent | null>;
	toggleDropdown(e: React.MouseEvent): void;
	trigger?: TriggerEvent;
}

export const [ContextMenuProvider, useContextMenuContext] = createContext<ContextMenuContext>({
	name: 'ContextMenuContext',
});
