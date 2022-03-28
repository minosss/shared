import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testMatch: ['**/*.spec.ts'],
	globals: {
		'ts-jest': {
			tsconfig: './tsconfig.json',
		},
	},
};

export default config;
