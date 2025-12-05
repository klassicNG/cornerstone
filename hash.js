const bcrypt = require("bcrypt");
bcrypt.hash("123456", 10, function (err, hash) {
  console.log(hash);
});
