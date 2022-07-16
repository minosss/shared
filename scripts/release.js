import {readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {execSync} from 'node:child_process';
import semver from 'semver';

function isClean() {
	const r = execSync('git status -s', {encoding: 'utf8'});
	return r.length === 0;
}

async function readJson(path) {
	const raw = await readFile(path, {encoding: 'utf8'});
	return JSON.parse(raw);
}

async function writeJson(path, data) {
	await writeFile(path, JSON.stringify(data, null), {encoding: 'utf8'});
}

async function run() {
	const [release = 'patch'] = process.argv.slice(2);

	if (!isClean()) {
		throw new Error(`git workspace is not clean, commit the changes or make stash`);
	}

	const pkg = await readJson('package.json');
	const {version} = pkg;

	const nextVersion = semver.inc(version, release);

	if (!nextVersion) {
		throw new Error(`version ${nextVersion} is invalid`);
	}

	const packages = ['shared', 'react-shared'];
	for (const name of packages) {
		const pkgPath = join(process.cwd(), 'packages', name, 'package.json');
		const ipkg = await readJson(pkgPath);
		ipkg.version = nextVersion;

		await writeJson(pkgPath, ipkg);
		console.log(`Updated version @yme/${name}@${nextVersion}`);
	}

	pkg.version = nextVersion;
	await writeJson('package.json', pkg);

	execSync('git add .', {stdio: 'inherit'});
	execSync(`git commit -m "chore(release): prepare for v${nextVersion}"`, {stdio: 'inherit'});
	execSync(`git tag -a v${nextVersion} -m "v${nextVersion}"`, {stdio: 'inherit'});
}

await run();
