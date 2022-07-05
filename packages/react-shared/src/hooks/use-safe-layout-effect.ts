import {isBrowser} from '@yme/shared';
import {useEffect, useLayoutEffect} from 'react';

export const useSafeLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
