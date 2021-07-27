const fs = require('fs')
const path = require('path')
const fse = require('fs-extra')
const series = require('async').series
const exec = require('child_process').exec

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

// TODO: delete the .ts files in build dir