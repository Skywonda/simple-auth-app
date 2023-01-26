var app = require("./app/app"),
  model = require("./app/models"),

  server = app();

server.listen(8000)
console.log('Server running on port 8000')
