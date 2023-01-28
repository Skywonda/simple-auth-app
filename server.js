var app = require("./app/app"),

  server = app();

server.listen(8000)
console.log('Server running on port 8000')
