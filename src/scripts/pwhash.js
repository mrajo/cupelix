'use strict'

var bcrypt = require('bcrypt')

function prompt(question, callback) {
	var stdin = process.stdin
	var stdout = process.stdout

	stdin.resume()
	stdout.write(question)

	stdin.once('data', function (data) {
		callback(data.toString().trim())
	})
}

prompt('Enter password to hash: ', function (input) {
	console.log(bcrypt.hashSync('zMw2a3XcSZHQ0p7ZozlCeKNGWyfc9T8Y', 10))
	process.exit()
});
