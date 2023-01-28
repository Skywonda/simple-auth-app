var app = require("./app/app"),
  server = app(),
  connet = require("./config/db/connect");


connet()
server.listen(8000);
console.log("Server running on port 8000");
