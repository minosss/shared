module.exports = {
	preset: 'ts-jest/presets/default-esm',
	testMatch: ['**/*.spec.ts'],
	globals: {
		'ts-jest': {
			useESM: true,
			tsconfig: './tsconfig.json',
		},
	},
};
