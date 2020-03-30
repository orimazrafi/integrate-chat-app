const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const log = console.log;
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);
app.use(cors());
module.exports = { app, io };

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

server.listen(PORT, () => {
  log(`port is listining on port: ${PORT}`);
});

require("./server/routes/users");
require("./server/socket/socket");
