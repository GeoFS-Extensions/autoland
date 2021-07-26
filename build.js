// copy extension to build env
import * as fs from 'fs'
import * as fse from 'fs-extra'
import * as rem from 'find-remove'
import pkg from 'async';
const { series } = pkg;
import pkhg from 'child_process'
const { exec } = pkhg

function deleteFolderRecursive(path) {
	if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
		fs.readdirSync(path).forEach(function (file, index) {
			var curPath = path + "/" + file;

			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});

		fs.rmdirSync(path);
	}
};

deleteFolderRecursive('build')

fse.copySync('extension/', 'build')

series([
	() => exec('npx tsc')
])

rem.default('/build', {extensions: ['.ts']})