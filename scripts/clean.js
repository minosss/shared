import {rmSync} from 'node:fs';
import {join} from 'node:path';

const packages = ['shared', 'react-shared'];

for (const name of packages) {
	rmSync(join(process.cwd(), 'packages', name, 'dist'), {recursive: true});
}
