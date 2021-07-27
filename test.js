const fs = require('fs')
const glob = require("glob")

/**
 * Gets all the files in the build dir with a certain extension
 * @param {string} extension file extension to look for
 * @returns {Promise<string[]>} array of files
 */
async function getFiles(extension) {
	return new Promise((resolve, reject) => {
		glob(`build/**/*.${extension}`, function (er, files) {
			if (er) {
				reject(er)
			}
			resolve(files)
		})
	})
}

// lint js
(async function() {
	var toLint = await getFiles('js')

	toLint.forEach(async (element) => {
		var file = await fs.readFileSync(element, {
			encoding: 'utf8'
		})
		
	});
})()