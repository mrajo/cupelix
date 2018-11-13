"use strict";

const bcrypt = require("bcryptjs");
const chalk = require("chalk");

function prompt(question, callback) {
  var stdin = process.stdin;
  var stdout = process.stdout;

  stdin.resume();
  stdout.write(question);

  stdin.once("data", function (data) {
    callback(data.toString().trim());
  });
}

prompt("Enter password to hash: ", function (pw) {
  prompt("Enter hash to check against: ", function (hash) {
    if (bcrypt.compareSync(pw, hash)) {
      console.log(chalk.green("\n\u2714 password matched"));
    } else {
      console.log(chalk.red("\n\uFF58 password failed"));
    }
    process.exit();
  });
});
