import {readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {execSync} from 'node:child_process';

function isClean() {
	const r = execSync('git status -s', {encoding: 'utf8'});
	return r.length === 0;
}

async function readJson(path) {
	const raw = await readFile(path, {encoding: 'utf8'});
	return JSON.parse(raw);
}

async function writeJson(path, data) {
	writeFile(path, JSON.stringify(data, null), {encoding: 'utf8'});
}

async function run() {
	if (!isClean()) {
		throw new Error(`git workspace is not clean, commit the changes or make stash`);
	}

	const pkg = await readJson('package.json');
	const {version} = pkg;

	const packages = ['shared', 'react-shared'];
	for (const name of packages) {
		const pkgPath = join(process.cwd(), 'packages', name, 'package.json');
		const ipkg = await readJson(pkgPath);
		ipkg.version = version;

		await writeJson(pkgPath, ipkg);
		console.log(`Updated version @yme/${name}@${version}`);
	}

	execSync('git add .', {stdio: 'inherit'});
	execSync(`git commit -m "chore(release): prepare for v${version}"`, {stdio: 'inherit'});
	execSync(`git tag -a v${version} -m "v${version}"`, {stdio: 'inherit'});
}

await run();
