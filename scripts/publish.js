import {execSync} from 'node:child_process';
import {join} from 'node:path';

execSync('npm run build', {stdio: 'inherit'});

const packages = ['shared', 'react-shared'];
for (const name of packages) {
	execSync('npm publish --access public', {stdio: 'inherit', cwd: join('packages', name)});
	console.log(`Published @yme/${name}`);
}
