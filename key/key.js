const fs = require("fs");
const path = require("path");

const privateKey = fs.readFileSync(
  path.join(__dirname + "/private.key"),
  "utf-8"
);

const publicKey = fs.readFileSync(
  path.join(__dirname + "/public.key"),
  "utf-8"
);


module.exports = {
  privateKey,
  publicKey,
};
