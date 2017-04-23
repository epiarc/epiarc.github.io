const fs = require('fs-extra')

module.exports = () => {
	return new Promise((resolve, reject) => {
		process.stdout.write('Cleaning… ')
		
		fs.removeSync('dist')
		fs.mkdirs('dist/css')
		
		process.stdout.write('done.\n')
		resolve('done')
	})
}