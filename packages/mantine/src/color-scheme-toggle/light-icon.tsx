import React from 'react';

export const LightIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 24 24'
		stroke='currentColor'
		fill='none'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		width='1em'
		height='1em'
		{...props}
	>
		<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
		<circle cx='12' cy='12' r='4'></circle>
		<path d='M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7'></path>
	</svg>
);
