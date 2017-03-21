'use strict'

var bcrypt = require('bcryptjs')

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
	console.log(bcrypt.hashSync(input, 10))
	process.exit()
})
