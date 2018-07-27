console.log("Serverside Start up");
const debug = require('debug')("node-angular");
const http = require("http");
const app = require("./app");

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const onError = error => {
  if (error.syscall != "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  console.log(addr);
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};
// const port = normalizePort(process.env.PORT || 3002);
const port = normalizePort(process.env.PORT || 4199);
console.log(port, process.env.PORT);
app.set('port', port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);

// if (addr.family === 'IPv6') {
  // server.listen(port);

// } else if (addr.family === 'IPv4') {
  server.listen(port, '0.0.0.0');

// }
