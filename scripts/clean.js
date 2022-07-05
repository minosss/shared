import {rmSync, existsSync} from 'node:fs';
import {join} from 'node:path';

const packages = ['shared', 'react-shared'];

for (const name of packages) {
	const dist = join(process.cwd(), 'packages', name, 'dist');
	if (existsSync(dist)) {
		rmSync(dist, {recursive: true});
	}
}
