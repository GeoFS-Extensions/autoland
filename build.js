// copy extension to build env
import * as fs from 'fs'
import * as fse from 'fs-extra'
import pkg from 'async';
import { zip } from 'zip-a-folder';
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

deleteFolderRecursive('build/extension')


fse.copySync('extension/', 'build/extension')


series([
	() => exec('npx tsc')
])


class zipper {
	static async main() {
		await zip('build/extension', 'build/extension.zip');
	}
}

zipper.main()